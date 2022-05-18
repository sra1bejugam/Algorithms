// sum of two shld be target in sorted order
let a = [2, 7, 11, 15];
let target = 13;

let res = (function getIndex(a) {    
    let indices = [];
    let start = 0;
    let end = a.length - 1;
    while (start < end) {       
        if (a[start] + a[end] === target) {
            indices.push(start);
            indices.push(end);
            break;
        } else if (a[start] + a[end] < target) {
            start++
        } else {
            end--
        }
    }
    return indices
})(a)
res