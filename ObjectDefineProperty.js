let task = {
    name: 'my name',
    tag: "something"
}
Object.defineProperty(task, 'toString', {
    value: function () {
        return this.name + ' ' + this.tag
    },
    writable: true,
    enumerable: true,
    configurable: true,
})
let r = task.toString()
r