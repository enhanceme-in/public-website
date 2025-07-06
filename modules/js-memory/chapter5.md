# Chapter 5: How JavaScript Handles Memory for Functions

## 5.1 What Is a Function, Really?

In JavaScript, a **function** is like a recipe card. It contains instructions you can follow as many times as you want.
But just like recipe cards take up space in your kitchen, functions take up space in your computer’s memory.

```js
function greet() {
  console.log("Hello, Subrata!");
}
```

---

## 5.2 How Are Functions Stored in Memory?

When you write a function, JavaScript:

1. Reads the instructions (the code inside your function).
2. Stores those instructions somewhere in memory, **just like it does with objects**.
3. Gives you a _reference_ to those instructions.

Think of it this way:

- You write your “greet” recipe and store it in a box (memory).
- The variable name `greet` points to where that recipe is kept.
- Whenever you call `greet()`, JavaScript goes to the box, reads the recipe, and follows the instructions.

**Diagram:**

```
| Variable Name | Memory Address | Value                        |
|:-------------:|:-------------:|:----------------------------:|
|   greet       |   0x1000      | Pointer to function code     |
|  (function)   |   0x2000      | The actual instructions      |
```

So, **functions are stored by reference—just like objects and arrays**!

---

## 5.3 Functions as First-Class Citizens

In JavaScript, functions are “first-class citizens.” That means:

- You can **store them in variables**
- You can **pass them as arguments to other functions**
- You can **return them from functions**
- You can **put them in arrays or objects**

Why is this possible?
Because all these variables are just **references to where the function’s code is stored in memory**.

**Example:**

```js
function sayHello() {
  console.log("Hello!");
}

let greetFunc = sayHello; // assign function reference

greetFunc(); // This works!
```

Here, both `sayHello` and `greetFunc` point to the same spot in memory!

---

## 5.4 What About Function Expressions and Arrow Functions?

```js
const add = function (x, y) {
  return x + y;
};

const multiply = (a, b) => a * b;
```

- Here, `add` and `multiply` are variables that _point to function objects_ in memory.
- The functions themselves are still stored in memory, and the variables contain references to them.

---

## 5.5 Memory and Scope: Where Are Functions Stored?

There are two main places in memory:

1. **Stack** – For quick, short-lived data (like local variables).
2. **Heap** – For long-lived, complex data (like objects, arrays, and functions).

**Functions are stored in the heap,** so they stay around as long as you have a reference to them.

When you call a function, JavaScript creates a **stack frame** (a workspace) for that call, but the function’s code and any variables you close over (see closures) live in the heap.

---

## 5.6 Closures: Functions Remember Their Surroundings

Here’s where JavaScript is magical:

When you create a function inside another function, the _inner function_ “remembers” the variables around it, even after the outer function has finished running.

```js
function makeCounter() {
  let count = 0;
  return function () {
    count++;
    console.log(count);
  };
}

const counter = makeCounter();
counter(); // 1
counter(); // 2
```

**What’s happening in memory?**

- `makeCounter` is called, and `count` is set to 0.
- The inner function is created and returned. It has a reference to the **environment** where `count` exists.
- Even after `makeCounter` finishes, the inner function keeps `count` alive in memory (this is a _closure_).

**Diagram:**

```
| Variable Name | Memory Address | Value                     |
|:-------------:|:-------------:|:-------------------------:|
| counter       |   0x3000      | Pointer to inner function |
| count         |   0x4000      | 0, then 1, then 2...      |
```

---

## 5.7 When Do Functions Get Removed from Memory?

- As long as you have a reference to a function (like a variable or inside an array), it stays in memory.
- When there are **no more references**, JavaScript’s garbage collector will clean it up, just like it does for objects and arrays.

---

## 5.8 Key Takeaways

- **Functions are objects** in JavaScript, stored in the heap.
- Variable names point to function objects by reference.
- You can pass, return, and store functions just like any other value.
- **Closures** let functions “remember” variables from where they were created.
- Unused functions are cleaned up by the garbage collector.

---

## 5.9 Practice Time!

Try these out:

```js
function sayHi(name) {
  return function () {
    console.log("Hi, " + name);
  };
}

let greet = sayHi("Subrata");
greet(); // What will this print?
```

- Where does the string `"Subrata"` live? (Hint: In the closure environment!)

---
