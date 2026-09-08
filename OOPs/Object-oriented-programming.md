# Object Oriented Programming in JavaScript

Source: [Object-oriented Programming](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Advanced_JavaScript_objects/Object-oriented_programming)

The core JavaScript features like [constructors](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Object_basics) and [prototypes](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Advanced_JavaScript_objects/Object_prototypes) certaily have some relation to some of the OOP concepts like **classes, instances, inheritance, encapsulation.**

- **constructors** in JavaScript provide us with something like a class defination, enabling us to define the "shape" of an object, including any method it contains in a single place. But prototypes can be used here, too. For example, if a method is defined on a constructor's `prototype` property, then all the objects created using that constructor get that method via their prototype, and we don't need to define it in the constructor.

- **the prototype chain** seems like a natural way to implement inheritance. For example, if we can have a `Student` object whose prototype is `Person`, then it can inherit `name` and override `introduceSelf()`.

**Difference compared to classical OOPs:**

1.First, in class-based OOP, class and objects are two separate constructs, and objects are always created as instance of classes. Also, there is a distinction between the feature used to define a class (the class syntax itself) and the feature used to instantiate an object(a construtor). In JavaScript, we can and often do create objects without any separate class defination, either using a function or an object literal. This can make working with the objects much more lightweight that it is in classical OOP.

2. Second, although a prototype chain looks like an inheritance hierarchy and behaves like in some ways, its different in others. when a subclass is instanciated, a single object is created which combines properties defined in teh subclass with properties defined further up the hierarchy. With prototyping, each level of the hierarchy is represented by a separate object, and they are linked together via the __proto__ property. The prototype chain is less like inheritance and more like *delegation**. Delegation is a programming pattern where an object, when asked to perform a task, can perform the task itself or ask another object (its delegate) ot perform the task on its behalf. In many ways, delegation is more flexible way of combining objects than inheritance (for one thing, it's possible ot change or completly replace the delegate at run time).

That said, contructor and prototypes can be used to implement class-based OOP pattern in JavaScript. But using them directly to implement features like inheritance is tricky, so JavaScript provides extra features, layerd on top of the prototype model, that map more directly to the concepts of class-based OOP.