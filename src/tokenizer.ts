const ALLOWED_CHARS = /[a-zA-Z0-9\/.:]/i;
const WHITESPACE = /\s/;

export class Tokenizer {
  static tokenize(input: string): unknown[] {
    const tokens: unknown[] = []
    let current = 0;
    while (current < input.length) {
      let chr = input[current];
      if (chr === '-') {
        tokens.push({
          type: 'hyphen',
          value: '-'
        });
        current++;
        continue;
      }
      if (chr === '[' || chr === ']') {
        tokens.push({
          type: 'bracket',
          value: chr
        });
        current++;
        continue;
      }
      if (chr === '(' || chr === ')') {
        tokens.push({
          type: 'paren',
          value: chr
        });
        current++;
        continue;
      }
      if (ALLOWED_CHARS.test(chr)) {
        let value = '';
        while (ALLOWED_CHARS.test(chr)) {
          value += chr;
          chr = input[++current];
        }
        tokens.push({
          type: 'word',
          value
        });
        continue;
      }
      if (WHITESPACE.test(chr)) {
        current++;
        continue;
      }
      throw new TypeError(`Unknown char: '${chr}'`);
    }
    return tokens;
  }
}
