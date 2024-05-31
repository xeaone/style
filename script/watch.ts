import { serveDir } from 'https://deno.land/std@0.224.0/http/file_server.ts';
import postcssImport from 'https://deno.land/x/postcss_import@0.1.4/mod.js';
import postcss from 'https://deno.land/x/postcss@8.4.16/mod.js';
import generateLayout from './layout.ts';

const build = async () => {
    console.log('build started');

    const mainFile = await Deno.readTextFile('source/main.css');

    const bundle = await postcss()
        .use(postcssImport({ path: ['./source'] }))
        .process(`${mainFile}`, { from: 'source', to: 'docs' });

    await Deno.writeTextFile('docs/x-style.css', bundle.content);
    console.log('build done');
};

await generateLayout();
await build();

Deno.serve((req) => serveDir(req, { fsRoot: 'docs' }));

const watcher = Deno.watchFs('source', { recursive: true });
for await (const { kind } of watcher) {
    if (kind === 'modify') {
        await build();
    }
}
