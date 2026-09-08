const personPrototype = {
    greet() {
        console.log(`hello, my name is ${this.name}!`)
    }
}

function Person(name) {
    this.name = name;
}


const carl = new Person("Carl");

console.log(Object.hasOwn(carl, "name")); // true
console.log(Object.hasOwn(carl, "greet")); // false