let str = 'aacccccbccdbbbcccc'
let out = 'a2b3c4';

let res = (function () {
    let count = 0
    let finalStr = ''
    for (let i = 0; i < str.length; i++) {
        if (str[i] === str[i + 1]) {
            count++
        } else {
            finalStr += str[i]
            finalStr += count
            count = 1;
        }
    }
    return finalStr
})(str);
res