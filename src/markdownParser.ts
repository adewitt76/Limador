import {Token, TokenType} from "./tokenizer";

export enum MdAstNodeType {
  DOCUMENT='document', WORD='word', HEADER_1='header_1', EOL='eol'
}
export interface MdAstNode {
  type: MdAstNodeType;
  body?: MdAstNode[];
  value?: string;
}

export function parseMarkdown(tokens: Token[]): MdAstNode {
  let current = 0;

  function walk(): MdAstNode {
    let token = tokens[current];
    if (token.type === TokenType.EOL) {
      return { type: MdAstNodeType.EOL };
    }
    if (token.type === TokenType.WORD) {
      current++;
      return {
        type: MdAstNodeType.WORD,
        value: token.value
      }
    }
    if (token.type === TokenType.SYMBOL && token.value === '#') {
      const expression: MdAstNode = {
        type: MdAstNodeType.HEADER_1,
        body: []
      };
      token = tokens[++current];
      while (token.type !== TokenType.EOL) {
        expression.body?.push(walk());
        token = tokens[current]
      }
      current++;
      return expression;
    }
    throw new TypeError(`Unknown token: '${token.type}'`);
  }

  const ast: MdAstNode = {
    type: MdAstNodeType.DOCUMENT,
    body: [walk()]
  }

  return ast;
}


