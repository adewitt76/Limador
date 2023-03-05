import { Tokenizer } from "./tokenizer";

export class Compiler {
  static compile(input: string):string {
    // 1. Lexical Analysis
    const tokens = Tokenizer.tokenize(input);
    // 2. Sytactict Analysis
    // 3. Transformation
    // 4. Code Generation
    return JSON.stringify(tokens, null, 2);
  }
}
