// String Challenge Have the function StringChallenge(strArr) read the array of strings stored in strArr, which will contain two elements, the first will be a positive decimal number and the second element will be a binary number. Your goal is to determine how many digits in the binary number need to be changed to represent the decimal number correctly (either 0 change to 1 or vice versa). For example: if strArr is ["56", "011000"] then your program should return 1 because only 1 digit needs to change in the binary number (the first zero needs to become a 1) to correctly represent 56 in binary.
// Input: ["5624", "0010111111001"]; Output: 2
// Input: ["44", "111111"]; Output: 3

let strArr = ["44", "111111"];
let a = (function convert(strArr) {
    let count = 0;
    let num = Number(strArr[0]).toString(2).split('')
    num.map((digit, index) => {
        if (digit !== strArr[1].charAt(index)) count++;
    })
    return count;
})(strArr)
a