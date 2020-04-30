import { C99Parser } from './syntax/c99';
import { IDE } from './ide/ide';


const parser = new C99Parser();

requestAnimationFrame(async () => {
    var ide = new IDE();

    await ide.open('/data/bincnt.c');
    ide.pass(parser);

    Object.assign(window, {ide});
})


Object.assign(window, {parser});