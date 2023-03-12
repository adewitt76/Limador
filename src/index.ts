import * as fs  from 'fs';
import * as path from 'path';
import { Stats } from 'original-fs';
import { app } from 'electron';
import { mdToHTML } from './compiler';

const note_path ='/home/aaron/NoteBook/project-ideas/markdown-viewer.md';
console.info('Path:');
console.info('------------------');
console.info('dirname: ', path.dirname(note_path));
console.info('basename: ', path.basename(note_path));
console.info('extname: ', path.extname(note_path));
console.info();

// node.js provides both syncronous and async methods sync might work best here
let stats: Stats;
try {
  stats = fs.statSync(note_path);
  console.info('File:');
  console.info('------------------');
  console.info('isFile: ', stats.isFile());
  console.info('isDirectory: ', stats.isDirectory());
  console.info('isSymbolicLink: ', stats.isSymbolicLink());
  console.info('size: ', stats.size);
  console.info();
} catch (err) {
  console.error(err);
}

// how to get a file_descriptor for opps that require it
let file_descriptor = 0; 
try {
  file_descriptor = fs.openSync(note_path, 'r');
} catch (err) {
  console.error(err);
  if (file_descriptor) fs.close(file_descriptor);
  throw err;
}
fs.close(file_descriptor);

fs.readFile(note_path, 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data);
  mdToHTML(data);
});


// const input: string = '# This is a header\n';
// const output = Compiler.compile(input);
// console.log(output);

app.quit();
