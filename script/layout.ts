/*

    row | row-reverse + align-items = vertical
    row | row-reverse + justify-content = horizontal

    col | col-reverse + align-items = horizontal
    col | col-reverse + justify-content = vertical

    row + align-items + start = top
    row + align-items + end = bottom
    row + align-items + center = middle
    row + justify-content + start = left
    row + justify-content + end = right
    row + justify-content + center = center

    row-reverse + align-items + start = top
    row-reverse + align-items + end = bottom
    row-reverse + align-items + center = middle
    row-reverse + justify-content + end = left
    row-reverse + justify-content + start = right
    row-reverse + justify-content + center = center

    col + justify-content + start = top
    col + justify-content + end = bottom
    col + justify-content + center = middle
    col + align-items + start = left
    col + align-items + end = right
    col + align-items + center = center

    col-reverse + justify-content + end = top
    col-reverse + justify-content + start = bottom
    col-reverse + justify-content + center = middle
    col-reverse + align-items + start = left
    col-reverse + align-items + end = right
    col-reverse + align-items + center = center

    Units
        10

    Sizes
        s-... = 30em
        m-... = 50em
        l-... = 65em
*/

const units = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export default async () => {
    let result = '';

    const sizes = [
        { prefix: '.', open: '', close: '', result: '' },
        { prefix: '.s-', open: '@media only screen and (min-width: 30em) {\n', close: '}\n', result: '' },
        { prefix: '.m-', open: '@media only screen and (min-width: 50em) {\n', close: '}\n', result: '' },
        { prefix: '.l-', open: '@media only screen and (min-width: 65em) {\n', close: '}\n', result: '' },
    ];

    for (const size of sizes) {
        size.result += size.open;

        for (
            const [name, value] of [
                ['row', 'row'],
                ['col', 'column'],
                ['row-reverse', 'row-reverse'],
                ['col-reverse', 'column-reverse'],
            ]
        ) {
            size.result += `${size.prefix}${name},`;
            size.result += `${size.prefix}${name}-children>*`;
            size.result += `{`;
            size.result += `display: flex;`;
            size.result += `flex-direction: ${value};`;
            size.result += `box-sizing: border-box;`;
            size.result += `}\n`;
        }

        size.result += `${size.prefix}first,`;
        size.result += `${size.prefix}first-children>*`;
        size.result += `{ order: 1; }\n`;

        size.result += `${size.prefix}last,`;
        size.result += `${size.prefix}last-children>*`;
        size.result += `{ order: -1; }\n`;

        size.result += `${size.prefix}grow,`;
        size.result += `${size.prefix}grow-children>*`;
        size.result += `{ flex-grow: 1; }\n`;

        size.result += `${size.prefix}nogrow,`;
        size.result += `${size.prefix}nogrow-children>*`;
        size.result += `{ flex-grow: 0; }\n`;

        size.result += `${size.prefix}shrink,`;
        size.result += `${size.prefix}shrink-children>*`;
        size.result += `{ flex-shrink: 1; }\n`;

        size.result += `${size.prefix}noshrink,`;
        size.result += `${size.prefix}noshrink-children>*`;
        size.result += `{ flex-shrink: 0; }\n`;

        size.result += `${size.prefix}wrap,${size.prefix}wrap-children>*{ flex-wrap: wrap; }\n`;
        size.result += `${size.prefix}nowrap,${size.prefix}nowrap-children>*{ flex-wrap: nowrap; }\n`;

        size.result += `${size.prefix}flex,${size.prefix}flex-children>*{ display: flex; }\n`;
        size.result += `${size.prefix}contain,${size.prefix}contain-children>*{ overflow: hidden; text-overflow: ellipsis; }\n`;

        size.result += `${sizes.map((s) => `${s.prefix}row${size.prefix}top,${s.prefix}row-children>${size.prefix}top`).join(',')}{ align-items: start; align-content: start; }\n`;

        size.result += `${sizes.map((s) => `${s.prefix}row${size.prefix}bottom,${s.prefix}row-children>${size.prefix}bottom`).join(',')}{ align-items: end; align-content: end; }\n`;
        size.result += `${sizes.map((s) => `${s.prefix}row${size.prefix}middle,${s.prefix}row-children>${size.prefix}middle`).join(',')}{ align-items: center; align-content: center; }\n`;
        size.result += `${sizes.map((s) => `${s.prefix}row${size.prefix}left${s.prefix}row-children>${size.prefix}left`).join(',')}{ justify-items: start; justify-content: start; }\n`;
        size.result += `${sizes.map((s) => `${s.prefix}row${size.prefix}right,${s.prefix}row-children>${size.prefix}right`).join(',')}{ justify-items: end; justify-content: end; }\n`;
        size.result += `${sizes.map((s) => `${s.prefix}row${size.prefix}center,${s.prefix}row-children>${size.prefix}center`).join(',')}{ justify-items: center; justify-content: center; }\n`;

        size.result += `${sizes.map((s) => `${s.prefix}row${size.prefix}reverse${size.prefix}top,${s.prefix}row-children>${size.prefix}reverse${size.prefix}top`).join(',')}{ align-items: start; align-content: end; }\n`;
        size.result += `${sizes.map((s) => `${s.prefix}row${size.prefix}reverse${size.prefix}bottom,${s.prefix}row-children>${size.prefix}reverse${size.prefix}bottom`).join(',')}{ align-items: end; align-content: center; }\n`;
        size.result += `${sizes.map((s) => `${s.prefix}row${size.prefix}reverse${size.prefix}middle,${s.prefix}row-children>${size.prefix}reverse${size.prefix}middle`).join(',')}{ align-items: center; align-content: start; }\n`;
        size.result += `${sizes.map((s) => `${s.prefix}row${size.prefix}reverse${size.prefix}left,${s.prefix}row-children>${size.prefix}reverse${size.prefix}left`).join(',')}{ justify-items: end; justify-content: end; }\n`;
        size.result += `${sizes.map((s) => `${s.prefix}row${size.prefix}reverse${size.prefix}right,${s.prefix}row-children>${size.prefix}reverse${size.prefix}right`).join(',')}{ justify-items: start; justify-content: start; }\n`;
        size.result += `${sizes.map((s) => `${s.prefix}row${size.prefix}reverse${size.prefix}center,${s.prefix}row-children>${size.prefix}reverse${size.prefix}center`).join(',')}{ justify-items: center; justify-content: center; }\n`;

        size.result += `${sizes.map((s) => `${s.prefix}col${size.prefix}top,${s.prefix}col-children>${size.prefix}top`).join(',')}{ justify-items: start; justify-content: start; }\n`;
        size.result += `${sizes.map((s) => `${s.prefix}col${size.prefix}bottom,${s.prefix}col-children>${size.prefix}bottom`).join(',')}{ justify-items: end; justify-content: end; }\n`;
        size.result += `${sizes.map((s) => `${s.prefix}col${size.prefix}middle,${s.prefix}col-children>${size.prefix}middle`).join(',')}{ justify-items: center; justify-content: center; }\n`;
        size.result += `${sizes.map((s) => `${s.prefix}col${size.prefix}left,${s.prefix}col-children>${size.prefix}left`).join(',')}{ align-items: start; align-content: start; }\n`;
        size.result += `${sizes.map((s) => `${s.prefix}col${size.prefix}right,${s.prefix}col-children>${size.prefix}right`).join(',')}{ align-items: end; align-content: end; }\n`;
        size.result += `${sizes.map((s) => `${s.prefix}col${size.prefix}center,${s.prefix}col-children>${size.prefix}center`).join(',')}{ align-items: center; align-content: center; }\n`;

        size.result += `${sizes.map((s) => `${s.prefix}col${size.prefix}reverse${size.prefix}top,${s.prefix}col-children>${size.prefix}reverse${size.prefix}top`).join(',')}{ justify-items: end; justify-content: end; }\n`;
        size.result += `${sizes.map((s) => `${s.prefix}col${size.prefix}reverse${size.prefix}bottom,${s.prefix}col-children>${size.prefix}reverse${size.prefix}bottom`).join(',')}{ justify-items: start; justify-content: start; }\n`;
        size.result += `${sizes.map((s) => `${s.prefix}col${size.prefix}reverse${size.prefix}middle,${s.prefix}col-children>${size.prefix}reverse${size.prefix}middle`).join(',')}{ justify-items: center; justify-content: center; }\n`;
        size.result += `${sizes.map((s) => `${s.prefix}col${size.prefix}reverse${size.prefix}left,${s.prefix}col-children>${size.prefix}reverse${size.prefix}left`).join(',')}{ align-items: start; align-content: start; }\n`;
        size.result += `${sizes.map((s) => `${s.prefix}col${size.prefix}reverse${size.prefix}right,${s.prefix}col-children>${size.prefix}reverse${size.prefix}right`).join(',')}{ align-items: end; align-content: end; }\n`;
        size.result += `${sizes.map((s) => `${s.prefix}col${size.prefix}reverse${size.prefix}center,${s.prefix}col-children>${size.prefix}reverse${size.prefix}center`).join(',')}{ align-items: center; align-content: center; }\n`;

        size.result += `${size.prefix}row${size.prefix}reverse,`;
        size.result += `${size.prefix}row-children>${size.prefix}reverse`;
        size.result += `{ flex-direction: row-reverse; }\n`;

        size.result += `${size.prefix}col${size.prefix}reverse,`;
        size.result += `${size.prefix}col-children>${size.prefix}reverse`;
        size.result += `{ flex-direction: column-reverse; }\n`;

        for (const aj of ['align', 'justify']) {
            for (const sci of ['self', 'content', 'items']) {
                for (
                    const [name, value] of [
                        ['end', 'end'],
                        ['start', 'start'],
                        ['center', 'center'],
                        ['stretch', 'stretch'],
                        ['around', 'space-around'],
                        ['evenly', 'space-evenly'],
                        ['between', 'space-between'],
                    ]
                ) {
                    size.result += `${size.prefix}${aj}-${sci}-${name},`;
                    size.result += `${size.prefix}${aj}-${sci}-${name}-children>*`;
                    size.result += `{ ${aj}-${sci}: ${value}; }\n`;
                }
            }
        }

        size.result += `${size.prefix}wn,`;
        size.result += `${size.prefix}wnc>*,`;
        size.result += `${size.prefix}width-none-children>*`;
        size.result += `{ width: 0; }\n`;

        size.result += `${size.prefix}wa,`;
        size.result += `${size.prefix}width-auto,`;
        size.result += `${size.prefix}wac>*,`;
        size.result += `${size.prefix}width-auto-children>*`;
        size.result += `{ width: auto; }\n`;

        size.result += `${size.prefix}wf,`;
        size.result += `${size.prefix}width-fit,`;
        size.result += `${size.prefix}wfc>*,`;
        size.result += `${size.prefix}width-fit-children>*`;
        size.result += `{ width: fit-content; }\n`;

        size.result += `${size.prefix}hn,`;
        size.result += `${size.prefix}height-none,`;
        size.result += `${size.prefix}hnc>*`;
        size.result += `${size.prefix}height-none-children>*`;
        size.result += `{ height: 0; }\n`;

        size.result += `${size.prefix}ha,`;
        size.result += `${size.prefix}height-auto,`;
        size.result += `${size.prefix}hac>*,`;
        size.result += `${size.prefix}height-auto-children>*`;
        size.result += `{ height: auto; }\n`;

        size.result += `${size.prefix}hf,`;
        size.result += `${size.prefix}height-fit,`;
        size.result += `${size.prefix}hfc>*,`;
        size.result += `${size.prefix}height-fit-children>*`;
        size.result += `{ height: fit-content; }\n`;

        size.result += `${size.prefix}bn,`;
        size.result += `${size.prefix}basis-none,`;
        size.result += `${size.prefix}bnc>*,`;
        size.result += `${size.prefix}basis-none-children>*`;
        size.result += `{ flex-basis: 0; }\n`;

        size.result += `${size.prefix}ba,`;
        size.result += `${size.prefix}basis-auto,`;
        size.result += `${size.prefix}bac>*,`;
        size.result += `${size.prefix}basis-auto-children>*`;
        size.result += `{ flex-basis: auto; }\n`;

        size.result += `${size.prefix}bf,`;
        size.result += `${size.prefix}basis-fit,`;
        size.result += `${size.prefix}bfc>*,`;
        size.result += `${size.prefix}basis-fit-children>*`;
        size.result += `{ flex-basis: fit-content; }\n`;

        size.result += `${size.prefix}mn,`;
        size.result += `${size.prefix}margin-none,`;
        size.result += `${size.prefix}mnc>*,`;
        size.result += `${size.prefix}margin-none-children>*`;
        size.result += `{ margin: 0; }\n`;

        size.result += `${size.prefix}ma,`;
        size.result += `${size.prefix}margin-auto,`;
        size.result += `${size.prefix}mac>*,`;
        size.result += `${size.prefix}margin-auto-children>*`;
        size.result += `{ margin: auto; }\n`;

        size.result += `${size.prefix}pn,`;
        size.result += `${size.prefix}padding-none,`;
        size.result += `${size.prefix}pnc>*,`;
        size.result += `${size.prefix}padding-none-children>*`;
        size.result += `{ padding: 0; }\n`;

        size.result += `${size.prefix}pa,`;
        size.result += `${size.prefix}padding-auto,`;
        size.result += `${size.prefix}pac>*,`;
        size.result += `${size.prefix}padding-auto-children>*`;
        size.result += `{ padding: auto; }\n`;

        for (let i = 0; i < units.length; i++) {
            const unit = units[i];
            const fontScale = units.length / (units.length / 2);
            const fontAdjusted = (unit / fontScale) < 0.9 ? 0.9 : (unit / fontScale);

            size.result += `${size.prefix}f-${unit},`;
            size.result += `${size.prefix}font-${unit},`;
            size.result += `${size.prefix}f${unit}c>*,`;
            size.result += `${size.prefix}font-${unit}-children>*`;
            size.result += `{ font-size: ${fontAdjusted}rem; }\n`;

            size.result += `${size.prefix}m-${unit},`;
            size.result += `${size.prefix}margin-${unit},`;
            size.result += `${size.prefix}m-${unit}-c>*,`;
            size.result += `${size.prefix}margin-${unit}-children>*`;
            size.result += `{ margin: ${unit / units.length}rem; }\n`;

            size.result += `${size.prefix}p-${unit},`;
            size.result += `${size.prefix}padding-${unit},`;
            size.result += `${size.prefix}p-${unit}-c>*,`;
            size.result += `${size.prefix}padding-${unit}-children>*`;
            size.result += `{ padding: ${unit / units.length}rem; }\n`;

            size.result += `${size.prefix}w-${unit},`;
            size.result += `${size.prefix}width-${unit},`;
            size.result += `${size.prefix}w-${unit}-c>*,`;
            size.result += `${size.prefix}width-${unit}-children>*`;
            size.result += `{ width: ${unit * (100 / units.length)}%; }\n`;

            size.result += `${size.prefix}h-${unit},`;
            size.result += `${size.prefix}height-${unit},`;
            size.result += `${size.prefix}h-${unit}-c>*,`;
            size.result += `${size.prefix}height-${unit}-children>*`;
            size.result += `{ height: ${unit * (100 / units.length)}%; }\n`;

            size.result += `${size.prefix.replace('-', '')}${unit},`;

            size.result += `${size.prefix}b-${unit},`;
            size.result += `${size.prefix}basis-${unit},`;
            size.result += `${size.prefix}b-${unit}-c>*,`;
            size.result += `${size.prefix}basis-${unit}-children>*`;
            size.result += `{ flex-basis: ${unit * (100 / units.length)}%; }\n`;
        }

        size.result += size.close;
        result += size.result;
    }

    await Deno.writeTextFile('source/layout.css', result);
};
