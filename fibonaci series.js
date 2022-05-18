//fibonaci series 
// input 5
// output 0,1,1,2,3,5,8,13,...

let res = (function (n) {
    let n1 = 0,
        n2 = 1,
        nextTerm;
    for (let i = 1; i <= n; i++) {
        console.log(n1)
        nextTerm = n1 + n2;
        n1 = n2;
        n2 = nextTerm;

    }
    return n1
})(4)
res