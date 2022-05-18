import { testables as test }from './index';

describe('Routes Index tests', () => {

  it('returns extension type of files to be used for router', () => {
    expect(test.getExtension()).toBe('.ts');
  });

  it('returns router exported by the file', () => {
    const router = test.importSubRouter('./health.ts');
    expect(router).toBeTruthy();
    expect(router).toHaveProperty('get');
  });

  it('returns an array of files names with routers', () => {
    const routes = test.readRouterFiles('.ts');
    expect(routes).toEqual(expect.arrayContaining(['health']));
  });
});
