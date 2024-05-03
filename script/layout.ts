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
            size.result += `${size.prefix}${name}{`;
            size.result += `display: flex;`;
            // size.result += `flex: 1 1 auto;`;
            // size.result += `flex-wrap: wrap;`;
            // size.result += `overflow: hidden;`;
            size.result += `flex-direction: ${value};`;
            size.result += `box-sizing: border-box;`;
            // size.result += `margin: 0; border: none; box-sizing: border-box;`;
            size.result += `}\n`;
        }

        size.result += `${size.prefix}first{ order: 1; }\n`;
        size.result += `${size.prefix}last{ order: -1; }\n`;

        size.result += `${size.prefix}grow{ flex-grow: 1; }\n`;
        size.result += `${size.prefix}nogrow{ flex-grow: 0; }\n`;

        size.result += `${size.prefix}shrink{ flex-shrink: 1; }\n`;
        size.result += `${size.prefix}noshrink{ flex-shrink: 0; }\n`;

        // size.result += `${size.prefix}basis{ flex-basis: auto; }\n`;
        // size.result += `${size.prefix}nobasis{ flex-basis: 0; }\n`;

        size.result += `${size.prefix}wrap{ flex-wrap: wrap; }\n`;
        size.result += `${size.prefix}nowrap{ flex-wrap: nowrap; }\n`;

        size.result += `${size.prefix}flex{ display: flex; }\n`;
        size.result += `${size.prefix}contain{ overflow: hidden; text-overflow: ellipsis; }\n`;

        size.result += `${sizes.map((s) => `${s.prefix}row${size.prefix}top`).join(',')}{ align-items: start; align-content: start; }\n`;
        size.result += `${sizes.map((s) => `${s.prefix}row${size.prefix}bottom`).join(',')}{ align-items: end; align-content: end; }\n`;
        size.result += `${sizes.map((s) => `${s.prefix}row${size.prefix}middle`).join(',')}{ align-items: center; align-content: center; }\n`;
        size.result += `${sizes.map((s) => `${s.prefix}row${size.prefix}left`).join(',')}{ justify-items: start; justify-content: start; }\n`;
        size.result += `${sizes.map((s) => `${s.prefix}row${size.prefix}right`).join(',')}{ justify-items: end; justify-content: end; }\n`;
        size.result += `${sizes.map((s) => `${s.prefix}row${size.prefix}center`).join(',')}{ justify-items: center; justify-content: center; }\n`;

        // size.result += `${sizes.map(s => `${s.prefix}row-reverse${size.prefix}top`).join(',')}{ align-items: start; align-content: end; }\n`;
        // size.result += `${sizes.map(s => `${s.prefix}row-reverse${size.prefix}bottom`).join(',')}{ align-items: end; align-content: center; }\n`;
        // size.result += `${sizes.map(s => `${s.prefix}row-reverse${size.prefix}middle`).join(',')}{ align-items: center; align-content: start; }\n`;
        // size.result += `${sizes.map(s => `${s.prefix}row-reverse${size.prefix}left`).join(',')}{ justify-items: end; justify-content: end; }\n`;
        // size.result += `${sizes.map(s => `${s.prefix}row-reverse${size.prefix}right`).join(',')}{ justify-items: start; justify-content: start; }\n`;
        // size.result += `${sizes.map(s => `${s.prefix}row-reverse${size.prefix}center`).join(',')}{ justify-items: center; justify-content: center; }\n`;
        size.result += `${sizes.map((s) => `${s.prefix}row${size.prefix}reverse${size.prefix}top`).join(',')}{ align-items: start; align-content: end; }\n`;
        size.result += `${sizes.map((s) => `${s.prefix}row${size.prefix}reverse${size.prefix}bottom`).join(',')}{ align-items: end; align-content: center; }\n`;
        size.result += `${sizes.map((s) => `${s.prefix}row${size.prefix}reverse${size.prefix}middle`).join(',')}{ align-items: center; align-content: start; }\n`;
        size.result += `${sizes.map((s) => `${s.prefix}row${size.prefix}reverse${size.prefix}left`).join(',')}{ justify-items: end; justify-content: end; }\n`;
        size.result += `${sizes.map((s) => `${s.prefix}row${size.prefix}reverse${size.prefix}right`).join(',')}{ justify-items: start; justify-content: start; }\n`;
        size.result += `${sizes.map((s) => `${s.prefix}row${size.prefix}reverse${size.prefix}center`).join(',')}{ justify-items: center; justify-content: center; }\n`;

        size.result += `${sizes.map((s) => `${s.prefix}col${size.prefix}top`).join(',')}{ justify-items: start; justify-content: start; }\n`;
        size.result += `${sizes.map((s) => `${s.prefix}col${size.prefix}bottom`).join(',')}{ justify-items: end; justify-content: end; }\n`;
        size.result += `${sizes.map((s) => `${s.prefix}col${size.prefix}middle`).join(',')}{ justify-items: center; justify-content: center; }\n`;
        size.result += `${sizes.map((s) => `${s.prefix}col${size.prefix}left`).join(',')}{ align-items: start; align-content: start; }\n`;
        size.result += `${sizes.map((s) => `${s.prefix}col${size.prefix}right`).join(',')}{ align-items: end; align-content: end; }\n`;
        size.result += `${sizes.map((s) => `${s.prefix}col${size.prefix}center`).join(',')}{ align-items: center; align-content: center; }\n`;

        // size.result += `${sizes.map(s => `${s.prefix}col-reverse${size.prefix}top`).join(',')}{ justify-items: end; justify-content: end; }\n`;
        // size.result += `${sizes.map(s => `${s.prefix}col-reverse${size.prefix}bottom`).join(',')}{ justify-items: start; justify-content: start; }\n`;
        // size.result += `${sizes.map(s => `${s.prefix}col-reverse${size.prefix}middle`).join(',')}{ justify-items: center; justify-content: center; }\n`;
        // size.result += `${sizes.map(s => `${s.prefix}col-reverse${size.prefix}left`).join(',')}{ align-items: start; align-content: start; }\n`;
        // size.result += `${sizes.map(s => `${s.prefix}col-reverse${size.prefix}right`).join(',')}{ align-items: end; align-content: end; }\n`;
        // size.result += `${sizes.map(s => `${s.prefix}col-reverse${size.prefix}center`).join(',')}{ align-items: center; align-content: center; }\n`;
        size.result += `${sizes.map((s) => `${s.prefix}col${size.prefix}reverse${size.prefix}top`).join(',')}{ justify-items: end; justify-content: end; }\n`;
        size.result += `${sizes.map((s) => `${s.prefix}col${size.prefix}reverse${size.prefix}bottom`).join(',')}{ justify-items: start; justify-content: start; }\n`;
        size.result += `${sizes.map((s) => `${s.prefix}col${size.prefix}reverse${size.prefix}middle`).join(',')}{ justify-items: center; justify-content: center; }\n`;
        size.result += `${sizes.map((s) => `${s.prefix}col${size.prefix}reverse${size.prefix}left`).join(',')}{ align-items: start; align-content: start; }\n`;
        size.result += `${sizes.map((s) => `${s.prefix}col${size.prefix}reverse${size.prefix}right`).join(',')}{ align-items: end; align-content: end; }\n`;
        size.result += `${sizes.map((s) => `${s.prefix}col${size.prefix}reverse${size.prefix}center`).join(',')}{ align-items: center; align-content: center; }\n`;

        size.result += `${size.prefix}row${size.prefix}reverse{ flex-direction: row-reverse; }\n`;
        size.result += `${size.prefix}col${size.prefix}reverse{ flex-direction: column-reverse; }\n`;

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
                    size.result += `${size.prefix}${aj}-${sci}-${name}`;
                    size.result += `{ ${aj}-${sci}: ${value}; }\n`;
                }
            }
        }

        size.result += `${size.prefix}w0,${size.prefix}width0${size.prefix}width-0{ width: 0; }\n`;
        size.result += `${size.prefix}wa,${size.prefix}widthauto,${size.prefix}width-auto{ width: auto; }\n`;
        size.result += `${size.prefix}wf,${size.prefix}widthfit,${size.prefix}width-fit{ width: fit-content; }\n`;

        size.result += `${size.prefix}h0,${size.prefix}height0${size.prefix}height-0{ height: 0; }\n`;
        size.result += `${size.prefix}ha,${size.prefix}heightauto,${size.prefix}height-auto{ height: auto; }\n`;
        size.result += `${size.prefix}hf,${size.prefix}heightfit,${size.prefix}height-fit{ height: fit-content; }\n`;

        size.result += `${size.prefix}b0,${size.prefix}basis0${size.prefix}basis-0{ flex-basis: 0; }\n`;
        size.result += `${size.prefix}ba,${size.prefix}basisauto,${size.prefix}basis-auto{ flex-basis: auto; }\n`;
        size.result += `${size.prefix}bf,${size.prefix}basisfit,${size.prefix}basis-fit{ flex-basis: fit-content; }\n`;

        size.result += `${size.prefix}m0,${size.prefix}margin0${size.prefix}margin-0{ margin: 0; }\n`;
        size.result += `${size.prefix}ma,${size.prefix}marginauto,${size.prefix}margin-auto{ margin: auto; }\n`;

        size.result += `${size.prefix}p0,${size.prefix}padding0,${size.prefix}padding-0{ padding: 0; }\n`;
        size.result += `${size.prefix}pa,${size.prefix}paddingauto,${size.prefix}padding-auto{ padding: auto; }\n`;

        for (let i = 0; i < units.length; i++) {
            const unit = units[i];

            const fontScale = units.length / (units.length / 2);
            const fontAdjusted = (unit / fontScale) < 0.9 ? 0.9 : (unit / fontScale);

            size.result += `${size.prefix}f${unit},${size.prefix}font${unit},${size.prefix}font-${unit}{ font-size: ${fontAdjusted}rem; }\n`;

            size.result += `${size.prefix}m${unit},${size.prefix}margin${unit},${size.prefix}margin-${unit}{ margin: ${unit / units.length}rem; }\n`;
            size.result += `${size.prefix}p${unit},${size.prefix}padding${unit},${size.prefix}padding-${unit}{ padding: ${unit / units.length}rem; }\n`;

            size.result += `${size.prefix}w${unit},${size.prefix}width${unit},${size.prefix}width-${unit}{ width: ${unit * (100 / units.length)}%; }\n`;
            size.result += `${size.prefix}h${unit},${size.prefix}height${unit},${size.prefix}height-${unit}{ height: ${unit * (100 / units.length)}%; }\n`;

            size.result += `${size.prefix}b${unit},${size.prefix}basis${unit},${size.prefix}basis-${unit}{ flex-basis: ${unit * (100 / units.length)}%; }\n`;
        }

        size.result += size.close;

        result += size.result;
    }

    await Deno.writeTextFile('source/layout.css', result);
};
