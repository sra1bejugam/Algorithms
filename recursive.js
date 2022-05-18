function computeSum(arr) {
    if (arr.length === 1) {
        return arr[0];
    } else {
        return arr.pop() + computeSum(arr);
    }
}

let res = computeSum([7, 8, 9, 99]); // Returns 123
res