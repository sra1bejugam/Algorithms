import regexIdentifier from './regex-identifier';
import { rentRollIdentifier } from './knowledge-base';

describe('regexIdentifier', () => {

  test('identifyFromFileName', () => {
    const res = regexIdentifier.regexIdentifier('rentroll.xlsx', rentRollIdentifier);
    expect(res.key).toBe('rentroll');
    expect(res.index).toBe(0);
  });

  test('identifyFromFileName 2', () => {
    const res = regexIdentifier.regexIdentifier('test.xlsx', rentRollIdentifier);
    expect(res.key).toBe(null);
    expect(res.index).toBe(null);
  });

  test('throws type error', () => {
    try {
      const testParam: any = 'test RR';
      regexIdentifier.regexIdentifier(testParam, undefined);
    } catch (err) {
      expect(err).toBeTruthy();
      expect(err.toString()).toContain('TypeError');
    }
  });

  test('regexPattern ', () => {
    const res = regexIdentifier.regexPattern([/(123)/, /(abc)/]);
    let sol = /(123)|(abc)/gi
    expect(JSON.stringify(res)).toBe(JSON.stringify(sol))
  });

  test('throws type error for regexPattern function', () => {
    try {
      regexIdentifier.regexPattern(undefined);
    } catch (err) {
      expect(err).toBeTruthy();
      expect(err.toString()).toContain('TypeError');
    }
  });
});
