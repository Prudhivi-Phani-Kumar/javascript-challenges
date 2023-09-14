//Run in chrome dev tools:
var x = 3;
var y = 6;
const numbers = {
    x: 10,
    y: 20,
    add: function () {
        setTimeout(function () {
            console.log(this.x + this.y, "add");
        }, 1000);
    },
    addition: function () {
        console.log(this.x + this.y, "addition");
    },
    addArrow: () => {
        console.log(this.x + this.y, "addition arrow");
    }
}

numbers.add()
numbers.addition()
numbers.addArrow()