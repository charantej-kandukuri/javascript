# Let vs Var

## Issue 1 - function scoped
```JavaScript
function start() {
  for (var i = 0; i < 5; i++) 
    console.log(i);

  console.log(i);
}
```

```bash
node index.js

0
1
2
3
4
5
```

In the last iteration i = 5, and beacuse of 5 not less the 5 so the loop terminates and outside consoled.log() was printed, so this is the issue with the var keyword.

When we declare a varaible with `var` keyword its scope is not limited to the block in which it is defined is it limited to the function in which it is defined. This is a weired thing that we have in JavaScript for a long time.

Before ES6, `var` was the only way to declare the variables & constants.
``` 
var => function-scoped

ES6 (ES2015): let, const => block scoped 

```
### Another example
```JavaScript
function start() {
    for (let i = 0; i < 5; i++) {
        if (true) {
            var color = 'red';
        }
    }

    console.log(color); // var color can be accessed any where inside this function. (function-scoped)
}

start()
```

## Issue 2 - Global variables
When we declare a variable using ver keyword **outside of a function**, this creates a **global variable** and attaches that global variable to the **window** object in Browser.

In Browser, we have window object which is a compled object with lots of properties and methods. The frontend application work with this window object alot.

Example:
```JavaScript
var color = 'red';
let age = 30;
```

```bash
// Browser console
window.color
"red"
```
```bash
// Browser console
window.age
undefined <-- let dont attach to window obj
```

### Why it is bad to attach a variable to window object?

Because window is in central place there is only one instance of window object and let say you are using a third party library if that third party library also has a variable with same name (eg: var color) that variable can overite your variable.c

So, you should avoid adding stuff to the window object.

## window.Functions
when we declare a function as shown in below code, is technically a global function and is added to the window object, so we can call it on window object, but this is a bad practice.

```JavaScript
function sayHi() {
    console.log('hi');
}
```

```bash
window.sayHi()
hi
```

### How to prevent this?
We see that in `modules` section, will see how to encapsulate these functions in separate modules so they are not added to the window object.

## Takeaways
**Avoid using var** keyword becuase it creates variables that are **function-scoped** not block scoped.