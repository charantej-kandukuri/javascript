function add(a){
    return function (b) {
        return function (c) {
            return a+b+c;
        }
    }
}

const bfn = add(1)
const cfn = bfn(2)
const result = cfn(3);

// (OR)
const result = add(1)(2)(3);

console.log({result}) // { result: 6 }