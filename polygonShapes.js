function solution(n) {
    if (n < 0) {
        return false
    }
    return (n * n) + ((n - 1) * (n - 1))
}
let res = solution(2)
res