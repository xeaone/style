import postcss from 'https://deno.land/x/postcss@8.4.16/mod.js';
import generateLayout from './layout.ts';

await generateLayout();

const mainFile = await Deno.readTextFile('source/main.css');
const layoutFile = await Deno.readTextFile('source/layout.css');
const bundle = await postcss().process(`${mainFile}\n${layoutFile}`, { from: 'source', to: 'docs' });

await Deno.writeTextFile('docs/x-style.css', bundle.content);
await Deno.writeTextFile('build/x-style.css', bundle.content);
