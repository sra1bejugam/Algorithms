import { Log } from './logger/logger';

class RegexIdentifier {

  regexIdentifier(text: string, identifier: RegExp) {
    try {
      const res = text.match(identifier);
      let key = null;
      let index = null;
      if (res) {
        key = res[0];
        index = res.index;
      }
      return { key, index };
    } catch (err) {
      Log.info('Error in regexIdentifier function', {
        message: err.message,
        stackTrace: err.stack,
        whereDisAt: 'utils/regexIdentifier.ts',
        value: text
      });
      throw err;
    }
  }

  regexPattern(valArr) {
    try {
      let rgx = new RegExp(valArr.map(function (r) {
        return (r + '').replace(/(^\/)|(\/g?i?$)/g, '');
      }).join("|"), "ig")
      return rgx;
    } catch (err) {
      Log.info('Error in regexPattern function', {
        message: err.message,
        stackTrace: err.stack,
        whereDisAt: 'utils/regexIdentifier.ts',
        value: valArr
      });
      throw err;
    }

  }
}
const regexIdentifier = new RegexIdentifier();
export default regexIdentifier;
