# Changing the value of `this`

## forEach
Suppose if the forEach method does not have a second argument.

**Solution 1:**
```JavaScript
const video = {
    title:  'a',
    tags: ['a', 'b', 'c'],
    showTags() {
        const self = this;
        this.tags.forEach(function(tag) {
            console.log(self.title, tag)
        })
    }
}

video.showTags()
```

**Solution 2**
Functions are objects in JavaScript.

The `call()` method on the function will change the referece to the new object.

```JavaScript
function playVideo() {
    console.log(this)
}

playVideo.call({ name: 'Mosh' }) // { name: "Mosh" } -> references new object

playVideo.apply({ name: "Mosh"}) // { name: "Mosh" } -> references new object

playVideo() // window {...} -> references global window object
```

## Call vs Apply vs bind (Old way)
The only differece b/w call and apply is only about passing arguments.


If we have multiple paramerters `function playVideo(a, b)


```JavaScript
playVideo.call({name: "Mosh"}, 1, 2)
playVideo.apply({name: "Mosh"}, [1,2])

```

The `bind` method will not call our function, it returns a new function and sets `this` to the first arguemnt passed.

```JavaScript
const fn = playVideo.bind({name: 'Mosh'})() // immediately invoked;

```

```JavaScript
const video = {
    title:  'a',
    tags: ['a', 'b', 'c'],
    showTags() {
        this.tags.forEach(function(tag) {
            console.log(this.title, tag)
        }.bind(this))
    }
}

video.showTags()

```


## Arrow Functions

The arrow functions `inherit` the `this` value.

```JavaScript
const video = {
    title:  'a',
    tags: ['a', 'b', 'c'],
    showTags() {
        this.tags.forEach(tag =>  {
            console.log(this.title, tag)
        }
    }
}

video.showTags()

```

## Takeaway

So with `call, apply and bind` we can set the `this` argument for a given function.

ES6 -> arrow functions