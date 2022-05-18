export function verifyRegularExpression(regularExpression, elements) {
  const regex = regularExpression.length ? formatRegularExpressions(regularExpression) : fetchregex(regularExpression);
  const verified = [], failedItems = [];
  for (const str of elements) {
    regex.test(str) ? verified.push(str) : failedItems.push(str);
  }
  const value = failedItems.length ? failedItems : true;
  return value;
}

export function formatRegularExpressions(array) {
  const formatsArrayWithBrackets = array.map((v) => '(' + v + ')');
  const formatsArrayString = '(' + formatsArrayWithBrackets.join('|') + ')';
  const formatsArrayRegex = new RegExp(formatsArrayString, 'i');// removed global property here..if required put 'g', (failing for consequetive words check)
  return formatsArrayRegex;
}

export function checkRegularExpression(regularExpression, elements) {
  const regex = fetchregex(regularExpression);
  const failedItems = [];
  for (const str of elements) {
    if (!regex.test(str)) {
      failedItems.push(str)
    }
  }
  return failedItems;
}

function fetchregex(regularExpression) {
  const regexString = `${regularExpression}`.slice(`${regularExpression}`.indexOf('/') + 1, `${regularExpression}`.lastIndexOf('/'));
  const value = `${regularExpression}`.slice(`${regularExpression}`.lastIndexOf('/') + 1,).replace('g', '');
  return new RegExp(regexString, value);
}