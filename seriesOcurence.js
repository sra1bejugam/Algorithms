let str = 'aabbbcccc'
// let out = {a:1,b:2,c:3};

validate = (str) => {
    let obj = {};
    for (let i = 0; i < str.length; i++) {
        let current = str[i]
        if (!obj[current]) {
            obj[current] = 1
        } else {
            obj[current] += 1
        }
    }
    let values = Math.max(...Object.values(obj))
    values
    return obj
}
let res = validate(str)
console.log("🚀 ~ file: Untitled-1 ~ line 6 ~ res", res)