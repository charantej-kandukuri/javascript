// Excercise

// sum(1,2,3,4) => 10

// able to accept an array and able to return same result

function sum(...rest) {

    if(Array.isArray(rest[0])) {
        rest = [...rest[0]]
    }
    
    const result = rest.reduce((a, b) => a + b);
    return result;
}

console.log(sum([1,2,3,4]))