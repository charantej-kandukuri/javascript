# [Hoisting](https://www.educative.io/courses/javascript-interview-handbook/solution-review-hoisting)

**In JavaScript a variable can be declared after it has been used.**

This is becuase the variable declarations using `var are hoisted to the top of their functional scope.` Hence a variable can be initialized or used before it has been declared.

## Examples
```JavaScript
text = '123' // initialization
console.log(text) // used
var text; // declaration

// output
'123'
```

```JavaScript
function Add() {
    console.log(answer);
    var answer = 2
}

Add()

// Output:
undefined
```

```JavaScript
var temp = 'hi';
function Add() {
    console.log(temp);
    var temp = 'bye';
}

// Output:
undefined
```




