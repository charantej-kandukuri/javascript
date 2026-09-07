# Objects

Source: [Object basics](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Object_basics)

## Contructors

Using object literals is fine when you only need to create one object, but if you have to create more than one, they are seriouly inadequate.

We would like a way to define a "shape" of an object &rarr; a set of methods and the properties it can have - and then create as manu objects as we like, just updating the values for the properties that are different.

**Without Contructors:**
``` JavaScript
function createPerson(name) {
    const obj = {}
    obj.name = name;
    obj.introduceSelf = function () {
        console.log(`Hi! I'm ${name}.`)
    }

    return obj;
}

// Now we can create as many objects as we like, reusing teh definition:
const salve = createPerson("Salve");
salve.introduceSelf();
// "Hi! I'm Salve."

const frankie = creatPerson("Frankie");
frankie.introduceSelf();
// "Hi! I'm frankie"
```

This works but it is a bit long-winded: we have to create an empty object, initialize it, and return it.

A better way is to use a **constructor**.

A constructor is just a function called using the new keyword.

When you call a contructor it will
- create a new object
- bind `this` keyword to the new object, so you can refer to `this` in your contructor code
- run the code in the constructor
- return the new object.

Constructors, by convention start with a capital letter and are named for the type of object they create. So we could rewrite our example like this:
``` JavaScript
function Person(name) {
    this.name: name

    this.introduce() {
        console.log(`Hi! I'm ${this.name}`);
    }
}

const salva = new Person("Salva");
salve.introduceSelf();
// "Hi! I'm Salva."

const frankie = new Person("Frankie");
frankie.introduceSelf();
// "HI! I'm Frankie."
```