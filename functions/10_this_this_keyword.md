# The "this" keyword

"this" - references the **object** that is executing the current function.


- functions inside an object are called methods.
- function is a regular function that means its not part of an object "this" reference to global object, which is the **window** object in browser and **global** in node.

```text
// method -> obj
// function  -> global (window, global)
```

## this in Method()
```JavaScript
const video = {
    title: 'a',
    play() {
        console.log(this);
    }
}

video.stop = function() {
    console.log(this);
}

video.stop() // { "title": "a", play: f, stop: f }

```

## this in Regular function()
```JavaScript
function playVideo(){
    console.log(this); // Window{...}
}

```


## Constructor function
When we use the new operator this **new operator creates a new empty object** `{}`

and sets `this` in this constructor function to **point to this empty onject.**
```JavaScript
function Video(title) {
    this.title = title
    console.log(this);
}

const v = new Video('a') // Video { title: 'a' }

```

## forEach - annonymous function

By default if you try to access the `title` in forEach using the this keyword it will give `reference error`.
becuase here `this` points to `window`  global object.

**Solution**: forEach accepts **second argument** to pass this object.

```JavaScript
const video = {
    title:  'a',
    tags: ['a', 'b', 'c'],
    showTags() {
        this.tags.forEach(function(tag) {
            console.log(this.title, tag)
        }, this)
    }
}

video.showTags()
```

But not all methods in JavaScript give you the ability pass the `this` argument. (next topic)

## Takeaways
`this`- works differenctly in `methods()`, `functions` and `anonymous functions`.

| #                  | references      |
|--------------------|-----------------|
| method             | object it is in |
| function           | window          |
| anonymous function | window          |
