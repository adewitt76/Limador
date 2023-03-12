const ALPHA_NUM_CHARS = /\w/;
const SYMBOL_CHARS = /\W/;
const WHITESPACE = /\s/;

export enum TokenType {
  WORD = 'Word', SYMBOL = 'Symbol', EOL = 'EOL'
}

export interface Token {
  type: TokenType;
  value: string;
}

export function tokenizeMd(input: string): Token[] {
  const tokens: Token[] = []
  let current = 0;
  const pushToken = (type: TokenType, value: string) => {
    tokens.push({ type, value });
    current++;
  }

  while (current < input.length) {
    let chr = input[current];
    // escaped characters must come first
    // TODO: \t
    if (chr === '\n' || chr === '\r') {
      pushToken(TokenType.EOL, '\n');
      continue;
    }
    if (WHITESPACE.test(chr)) {
      current++;
      continue;
    }
    if (SYMBOL_CHARS.test(chr)) {
      pushToken(TokenType.SYMBOL, chr);
      continue;
    }
    if (ALPHA_NUM_CHARS.test(chr)) {
      let value = '';
      while (ALPHA_NUM_CHARS.test(chr)) {
        value += chr;
        chr = input[++current];
      }
      tokens.push({
        type: TokenType.WORD,
        value
      });
      continue;
    }
    throw new TypeError(`Unknown char: '${chr}'`);
  }

  return tokens;
}
