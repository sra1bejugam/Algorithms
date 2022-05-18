function sumOfThree(...args) {
    return new Promise((resolve, reject) => {
        if (args.length > 3) {
            reject("Only three elments summation is allowed")
        } else {
            let sum = 0;
            let i = 0;
            while (i < args.length) {
                sum += args[i];
                i++;
            }
            resolve("sum of three is:" + sum);
        }
    })
}
sumOfThree(12, 12, 12)
.then(res => console.log(res))
.catch(err => console.log(err))