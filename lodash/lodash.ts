import { LoDashStatic } from 'lodash';
import pick from 'lodash/pick';
import difference from 'lodash/difference';

type LoDashFunctions = Partial<LoDashStatic>;
const importedFunctions: LoDashFunctions = { pick, difference };

export function lodash(functions: string[] | string): LoDashFunctions {
  if (typeof functions === 'string') {
    functions = [functions];
  }
  const diffFunctions = difference(functions, Object.keys(importedFunctions));
  if (diffFunctions.length !== 0) {
    diffFunctions.forEach((func) => {
      importedFunctions[func] = require(`lodash/${func}`);
    });
  }
  return pick(importedFunctions, functions);
}
