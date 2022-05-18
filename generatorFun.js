function* generator() {
    let count = 0;
    for (let i = 0; i < 2; i++) {
        count++;
        yield(i);
    }
    return count;
}
let genValu=generator();
console.log(genValu.next())
console.log(genValu.next())
console.log(genValu.next())
console.log(genValu.next())



