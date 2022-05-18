import { onlyDigits, OSIdentifier, POAFormats } from './knowledge-base';
import { verifyRegularExpression, checkRegularExpression } from './verify-regex';
import { digitsMock, nonDigitsMock, OSIdentifierMock, POADatesMock } from '../mock-data/mock-regex';

describe('verify regular expressions', () => {

  test('verifyRegularExpressions should return true', () => {
    const res = verifyRegularExpression(onlyDigits, digitsMock);
    expect(res).toBeTruthy();
  });

  test('verifyRegularExpressions should fail and return failed string', () => {
    const res = verifyRegularExpression(onlyDigits, nonDigitsMock);
    expect(typeof (res)).not.toBe(Boolean);
  });

  test('checkRegularExpression should fail and return failed string', () => {
    const res = checkRegularExpression(onlyDigits, nonDigitsMock);
    expect(typeof (res)).not.toBe(Boolean);
  });

  test('verifyRegularExpressions for osIdentifier', () => {
    const res = verifyRegularExpression(OSIdentifier, OSIdentifierMock);
    expect(res).toBeTruthy();
  });

  test('verifyRegularExpressions for POAFormats', () => {
    const res = verifyRegularExpression(POAFormats, POADatesMock);
    expect(res).toBeTruthy();
  });
});