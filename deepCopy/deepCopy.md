# Shallow Copy vs Deep Copy
The primary difference between a shallow copy and a deep copy in JavaScript lies in how they handle nested objects and arrays:

- **Shallow Copy:** Copies only the top-level properties of an object. If the object contains nested objects or arrays, it copies their references (memory addresses) rather than the actual data. Modifying a nested property in the copy will also modify the original object.

- **Deep Copy:** Recursively copies every level of the object. It creates a completely independent clone in memory. Modifying any part of the copy will never affect the original object.

# Core Comparison

| Feature                                 | Shallow Copy                              | Deep Copy                                       |
|-----------------------------------------|-------------------------------------------|-------------------------------------------------|
| Top-Level Primitives (strings, numbers) | Copied by value (independent)             | Copied by value (independent)                   |
| Nested Objects/Arrays                   | Shared by reference (linked)              | Fully duplicated (independent)                  |
| Mutating Nested Data                    | Affects the original object               | Does not affect the original                    |
| Performance Cost                        | Low (fast and lightweight)                | Higher (slower and uses more memory)            |
| Common Native Methods                   | Spread operator `{...obj}, Object.assign()` | `structuredClone(), JSON.parse(JSON.stringify())` |

---

### Code Examples

#### 1. Shallow Copy Behavior
When using the spread operator `(...)` or `Object.assign()`, changes to nested properties leak back into the source object.

```javascript
const original = {
  name: "Alice",
  address: { city: "New York" }
};

// Creating a shallow copy
const shallowCopy = { ...original };

// 1. Modifying a top-level property (Safe)
shallowCopy.name = "Bob"; 
console.log(original.name); // "Alice" (Unchanged)

// 2. Modifying a nested property (Leaks!)
shallowCopy.address.city = "Los Angeles";
console.log(original.address.city); // "Los Angeles" (The original changed!)
```

#### 2. Deep Copy Behavior
Modern JavaScript provides the native `structuredClone()` method to easily make full, isolated copies.

```javascript
const original = {
  name: "Alice",
  address: { city: "New York" }
};

// Creating a true deep copy
const deepCopy = structuredClone(original);

// Modifying a nested property (Safe)
deepCopy.address.city = "Miami";
console.log(original.address.city); // "New York" (The original is perfectly safe!)
console.log(deepCopy.address.city); // "Miami"
```
---

### Deep Copying: The Options & Pitfalls
If you need a deep copy, there are three primary ways to achieve it, each with trade-offs:

#### 1. structuredClone(obj) (Recommended): 
The modern, standard native solution. It handles complex structures, circular references, and diverse data types (like Date, RegExp, Map, Set) flawlessly.

#### 2. JSON.parse(JSON.stringify(obj)) (Legacy hack):
An old trick that converts an object to a string and back again. **Warning**: It breaks if your object contains functions, undefined, Infinity, Date objects (which turn into strings), or circular references.

#### 3. Lodash _.cloneDeep(obj) (External Library): 
A highly stable utility method commonly used in older codebases or specific enterprise scenarios before structuredClone became universally supported.