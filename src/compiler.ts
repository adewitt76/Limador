import {parseMarkdown} from "./markdownParser";
import { tokenizeMd } from "./tokenizer";

export function mdToHTML(input: string):string {
  // 1. Lexical Analysis
  const tokens = tokenizeMd(input).slice(0,4);
  console.log(tokens); 
  // 2. Sytactict Analysis
  const mdAst = parseMarkdown(tokens);  
  console.log('\n', JSON.stringify(mdAst));  
  // 3. Transformation
  // 4. Code Generation
  return JSON.stringify(tokens, null, 2);
}
