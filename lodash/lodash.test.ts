import { lodash } from './lodash';

describe('Lodash importer test', () => {
  test('returns lodash functions given single input function', () => {
    expect(lodash('has')).toHaveProperty('has');
    expect(lodash('pick')).toHaveProperty('pick');
  });

  test('returns lodash functions given multiple input functions', () => {
    const functions = lodash(['has', 'uniqBy']);
    expect(functions).toHaveProperty('has');
    expect(functions).toHaveProperty('uniqBy');
  });
});