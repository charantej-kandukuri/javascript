# Default export
When we export a function with `default` keyword, we can import it without curly braces and with any name.

We can default export a function without any name.

## Example (default export)
```JavaScript
// 📁 user.js
export default class User { // just add "default"
  constructor(name) {
    this.name = name;
  }
}

// 📁 main.js
import User from './user.js'; // not {User}, just User

new User('John');

```

## Exampole (named export)
```JavaScript
// 📁 user.js
export class User {
  constructor(name) {
    this.name = name;
  }
}

// 📁 main.js
import { User } from './user.js'; // note {}

new User('John');
```
