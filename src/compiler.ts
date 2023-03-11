import {parseMarkdown} from "./markdownParser";
import { Tokenizer } from "./tokenizer";

export function compileMdToHTML(input: string):string {
  // 1. Lexical Analysis
  const tokens = Tokenizer.tokenize(input).slice(0,4);
  console.log(tokens); 
  // 2. Sytactict Analysis
  parseMarkdown(tokens);  
  // 3. Transformation
  // 4. Code Generation
  return JSON.stringify(tokens, null, 2);
}
