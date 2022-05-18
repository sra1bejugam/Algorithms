let b = solution([2, 4, 3, 5, 1, 2])
b

function solution(a) {
    let first = Infinity
    for (let i = 0; i < a.length; i++) {
        let pointer = i + 1;
        while (pointer < a.length) {
            if (a[i] === a[pointer] && pointer < first) {
                first = pointer;
            }
            pointer += 1
        }
    }
    if (first === Infinity) {
        return -1
    }
    return a[first]
}