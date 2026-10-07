# JavaScript Function Curring

Currying is a **functional programming technique** in JavaScript where a function that takes multiples arguments is transformed into a **nested series of functions**, each taking a **single argument** at a time.


``` JavaScript
// Traditional syntax
function add(a){
    return function (b) {
        return function (c) {
            return a+b+c;
        }
    }
}

//(OR) Modern Arrow Syntax
const add = a => b => c => a + b + c;

// Driver code
const bfn = add(1)
const cfn = bfn(2)
const result = cfn(3);

// (OR)
const result = add(1)(2)(3);

console.log({result}) // { result: 6 }

```

