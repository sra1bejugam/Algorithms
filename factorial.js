// factorial-5
// 5!-5*4*3*2*1
//output- 120

let res = (function (n) {
    let val = 1;
    for (let i = n; i > 0; i--) {
        val *= i
    }
    return val
})(5)
res