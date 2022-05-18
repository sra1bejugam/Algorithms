function volume(length) {
    return function (breadth) {
        return function (height) {
            return length * height * breadth;
        }
    }
}
let vol=volume(1)(2)(3)
vol