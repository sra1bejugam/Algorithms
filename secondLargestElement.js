let myArray = [1, 2, 4, 10, 20, 100]
let biggest = myArray[0];
let nextbiggest = myArray[0];
for (let i = 0; i < myArray.length; i++) {
    if (myArray[i] > biggest) {
        nextbiggest = biggest;
        biggest = myArray[i];
    }
    else if (myArray[i] > nextbiggest && myArray[i] != biggest)
        nextbiggest = myArray[i];
}

console.log(nextbiggest);