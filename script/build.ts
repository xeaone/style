import { readFile, writeFile } from 'node:fs/promises';
import postcssImport from 'postcss-import';
import postcss from 'postcss';
import layout from './layout.ts';

await layout();

const mainFile = await readFile('source/main.css', 'utf8');

const bundle = await postcss()
    .use(postcssImport({ path: ['./source'] }))
    .process(`${mainFile}`, { from: 'source/main.css', to: 'docs/x-style.css' });

await writeFile('docs/x-style.css', bundle.content);
await writeFile('build/x-style.css', bundle.content);
