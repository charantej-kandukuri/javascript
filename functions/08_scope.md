# Scope

A scope of a variable or constant **determines where that variable or constant is accessible.**

## Local Scope
```JavaScript
{
    const message = 'hi'
}

console.log(message);
```

<span style="color:red">⚠️ Uncaught
ReferenceError: message is not defined</span>

when variables are declared using `let` and `const` their scope is limited to the block in which they are defined.


## Global Scope
Variable declared outside of any block has **global scope**, meaning that variable is accessible everywhere.
```JavaScript
const color = 'red'; // global scope

function start() {
    const message = 'hi';
    console.log(color) // red
}
```

## Local Precedence
Local variable or local constants in a function take precedence over global variables or constants.

```JavaScript
const color = 'red'; // global scope

function start() {
    const message = 'hi';
    const color = 'blue'; // local scope
    console.log(color) // blue
}
```

## Takeaways
In general we should **avoid defining global variables or constants, that is considered bad practice**.

Because they are accesible everywhere globally and each **function can accidentaly change** the value and this will lead to all kind of bugs and issues in our programs.

Metaphor: Imagine in the above code `color` is like toothbrush and functions are persons, you dont have a toothbrush that is share between multiple people, each person should have their own toothbrush.



