// Square the elements of the sorted array and return a new array in the sorted direction (ascending) Input - [-3, -2, 0, 1, 2] output - [0, 1, 4, 4, 9]
let a = [-3,-3, -2, 0, 1, 2];
const sortedarray = (a) => {
    let res = [];
    let start = 0;
    let end = a.length - 1;
    let position = end;
    while (start <= end) {
        if (a[start] ** 2 >= a[end] ** 2) {
            res[position--] = a[start++] ** 2;
        } else {
            res[position--] = a[end--] ** 2;
        }
    }
    return res
}

let res = sortedarray(a);
console.log("🚀 ~ file: Untitled-1 ~ line 10 ~ res", res)

// 2nd approach
let a = [-3, -3, -2, 0, 1, 2];
const sortedarray = (a) => {
    let res = [];
    let start = 0;
    let end = a.length - 1;
    while (start <= end) {
        if (a[start] * a[start] >= a[end] * a[end]) {
            res.push(a[start] * a[start]);
            start++
        } else {
            res.push(a[end] * a[end]);
            end--
        }
    }
    res.reverse()
    return res
}

let res = sortedarray(a);
console.log("🚀 ~ file: Untitled-1 ~ line 10 ~ res", res)