// partial code
var arr = [5, 6, 7, 8, 9, 10, 1, 2, 3]
var searchFor = 3
// find index = ?
function binS(first, last) {
    let mid = last + first / 2
    if (arr[mid] === searchFor) {
        return mid
    } else {
        if (arr[first] > arr[last] && searchFor <= arr[last]) {
            return binS(mid + 1, last)
        } else {
            return binS(first, mid - 1)
        }
    }
}
let res = binS(0, 9)
res
//8