import { watch } from 'node:fs';
import { readFile, stat, writeFile } from 'node:fs/promises';
import { createServer } from 'node:http';
import { extname, resolve, sep } from 'node:path';
import postcssImport from 'postcss-import';
import postcss from 'postcss';
import generateLayout from './layout.ts';

const docsRoot = resolve('docs');
const port = 8080;

const contentTypes = {
    '.css': 'text/css; charset=utf-8',
    '.html': 'text/html; charset=utf-8',
};

const build = async () => {
    console.log('build started');

    const mainFile = await readFile('source/main.css', 'utf8');

    const bundle = await postcss()
        .use(postcssImport({ path: ['./source'] }))
        .process(`${mainFile}`, { from: 'source/main.css', to: 'docs/x-style.css' });

    await writeFile('docs/x-style.css', bundle.content);
    console.log('build done');
};

await generateLayout();
await build();

createServer(async (request, response) => {
    try {
        const pathname = decodeURIComponent(new URL(request.url ?? '/', 'http://localhost').pathname);
        const requestedPath = resolve(docsRoot, `.${pathname}`);

        if (requestedPath !== docsRoot && !requestedPath.startsWith(`${docsRoot}${sep}`)) {
            response.writeHead(403).end('Forbidden');
            return;
        }

        const filePath = pathname.endsWith('/') ? resolve(requestedPath, 'index.html') : requestedPath;
        const fileInfo = await stat(filePath);
        if (!fileInfo.isFile()) {
            response.writeHead(404).end('Not Found');
            return;
        }

        response.writeHead(200, { 'content-type': contentTypes[extname(filePath)] ?? 'application/octet-stream' });
        response.end(await readFile(filePath));
    } catch {
        response.writeHead(404).end('Not Found');
    }
}).listen(port, () => console.log(`docs available at http://localhost:${port}`));

let buildTimer;
watch('source', { recursive: true }, (_eventType, filename) => {
    if (!filename?.toString().endsWith('.css')) return;

    clearTimeout(buildTimer);
    buildTimer = setTimeout(() => {
        build().catch((error) => console.error(error));
    }, 100);
});
