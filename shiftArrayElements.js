let arr = [2, 3, 4, 5, 7];

rotations = (arr, rotations) => {
    for (let i = 0; i < rotations; i++) {
        let ele = arr.pop();
        arr.unshift(ele)
    }
    return arr
}
let res = rotations(arr, 3);
res

//for multidirectional shift
function arrayRotate(arr, reverse) {
    if (reverse) arr.unshift(arr.pop());
    else arr.push(arr.shift());
    return arr;
  }