const ALPHA_NUM_CHARS = /\w/;
const SYMBOL_CHARS = /\W/;
const WHITESPACE = /\s/;

export class Tokenizer {
  static tokenize(input: string): unknown[] {
    const tokens: unknown[] = []
    let current = 0;
    const pushToken = (type: string, value: string) => {
      tokens.push({ type, value });
      current++;
    }

    while (current < input.length) {
      let chr = input[current];
      // escaped characters must come first
      // TODO: consider \t
      if (chr === '\n' || chr === '\r') {
        pushToken('CR', '\n');
        continue;
      }
      if (WHITESPACE.test(chr)) {
        current++;
        continue;
      }
      if (SYMBOL_CHARS.test(chr)) {
        pushToken('Symbol', chr);
        continue;
      }
      if (ALPHA_NUM_CHARS.test(chr)) {
        let value = '';
        while (ALPHA_NUM_CHARS.test(chr)) {
          value += chr;
          chr = input[++current];
        }
        tokens.push({
          type: 'Word',
          value
        });
        continue;
      }
      throw new TypeError(`Unknown char: '${chr}'`);
    }

    return tokens;
  }
}
