import postcssImport from 'https://deno.land/x/postcss_import@0.1.4/mod.js';
import postcss from 'https://deno.land/x/postcss@8.4.16/mod.js';
import generateLayout from './layout.ts';
// import postcssPurge from 'npm:@fullhuman/postcss-purgecss';

await generateLayout();

const mainFile = await Deno.readTextFile('source/main.css');
// const layoutFile = await Deno.readTextFile('source/layout.css');
// const bundle = await postcss().process(`${mainFile}\n${layoutFile}`, { from: 'source', to: 'docs' });

// const bundle = await postcss().process(`${mainFile}`, { from: 'source', to: 'docs' });

const bundle = await postcss()
    .use(postcssImport({ path: ['./source'] }))
    .process(`${mainFile}`, { from: 'source', to: 'docs' });

await Deno.writeTextFile('docs/x-style.css', bundle.content);
await Deno.writeTextFile('build/x-style.css', bundle.content);

await new Deno.Command('deno', {
    args: ['fmt'],
    stdin: 'inherit',
    stderr: 'inherit',
    stdout: 'inherit',
}).output();
