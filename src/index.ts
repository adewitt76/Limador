import { app } from 'electron';
import { Compiler } from './compiler';

const input: string = '- use [electron webpage](https://www.electronjs.org)';
const output = Compiler.compile(input);
console.log(output);

app.quit();
