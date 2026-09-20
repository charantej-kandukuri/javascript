# Prototypes

Source: [Prototype in JavaScript](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Advanced_JavaScript_objects/Object_prototypes)

Prototypes are the mechanism by which JavaScript objects inherits features from one another.


## The prototype chain
In the Browser's console. try creating an object literal:
```javascript
const myObject = {
    city: "Hyderabad",

    greet() {
        console.log('Greetings from '+ this.city);
    }
}

myObject.greet();
```

Acutually this is an object with one data property, `city` and one method, `greet()`. If you type the object's name _followed by a period_ in the console, like `myObject.`, then the console will pop up a list of all the properties available to this object. You will see that as well as `city` and `greet`, there are lots of other properties!

```text
__defineGetter__
__defineSetter__
__lookupGetter__
__lookupSetter__
__proto__
city
constructor
greet
hasOwnProperty
isPrototypeOf
propertyIsEnumerable
toLocaleString
toString
valueOf

```

**What are these extra properties, and where do they come from?**

Every object in JavaScript has a built-in property, which is called its **prototype**.

The prototype is itself an object, so the prototypes will have its own prototype, making whats called a **prototype chain**.

The chain ends when we reach a prototype that has `null` for this own prototype.

The standard way to access an objects prototype is the `Object.getPrototypeOf()` method.


**When you try to access a property of an object:**

if the property is not found in the object itself, the prototype is searched for the property.

If the property is still can't found,then the prototype's prototype is searched, and so on untill either the property is found, or the end of the chain is reached,in which case `undefined` is returned.

### Print the prototype chain:
```JavaScript
const d = new Date();
let object = d;


do {
    object = Object.getPrototypeOf(object);
    console.log(object);
} while (object);

// Date.prototype
// Object {}
// null

```


## Shadowing Properties
What happens if you define a property in an object, whan a property with the same bame is defined in the object's prototype? Let's see:

```JavaScript
const myDate = new Date(1995, 11, 17);

console.log(myDate.getTime()); // 8191296000000


myDate.getTime = function () {
    console.log("something else");
}

myDate.getTime(); // something else

```
Given the description of the prototype chain. When we call  `getTime()` the browser first looks in `myDate` for a property with that name, and only checks the prototype if `myDate`` does not define it.

So when we add `getTime()` to `myDate`, then the version in `myDate` is called.

## Setting Prototype

There are various ways to **setting an object's prototype** in JavaScript.

1. Object.create()
2. Constructors

### Using Object.create()
The `Object.create()` method create a new object and allows you to specify an object that will be used as the new Objects prototyps.

Here's an example:
```JavaScript
const personPrototype = {
    greet() {
        console.log("hello!")
    }
}

const carl = Object.create(personPrototype);

carl.greet() // hello!
```

### Using a contructor

In JavaScript, all functions have a property named `prototype`. When you call a function as a constructor, this property is set as the prototype of the newly constructed object(by convention, in the protpery name __proto_).

So if we set the `prototype` of the constructor, we can ensure that all the objects created with that constructor are given that prototype:
```JavaScript

const personPrototype = {
    greet() {
        console.log(`hello, my name is ${this.name}`)
    }
}

function Person(name) {
    this.name = name;
}

Object.assign(Person.prototype, personPrototype);

// or
// Person.prototype.greet = prosonPrototype.greet;

const carl = new Person('Carl')
carl.greet() // hello, my name is Carl!

```

### Own Properties
The objects we create using Person contructor have two properties:

- a `name` property, which is set in the constructor, so it appears directly in the `Person` objects.
- a `greet()` method, which is set in the prototype.

It's common to see this pattern, in which the methods are defined on the prototype, but data properties are defined in the constructor. That's because the methods are same for every object we create, while we ofter want our each object to have its own value for its data properties(just as here every person has a different name).

Properties that are difined directly on the object, are called **own properites** and you can check whether a property is an own property using the **static** `Object.hasOwn()` method.

Direct Properties  &rarr; own Properties

``` JavaScript
const carl = new Person("Carl");

console.log(Object.hasOwn(carl, "name")); // true
console.log(Object.hasOwn(carl, "greet")); // false

```

## Prototypes and Inheritance
Prototypes are a very poweful and very flexible feature of JavaScript, making it possible to resue code and combining objects.

