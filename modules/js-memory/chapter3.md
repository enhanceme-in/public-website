# Chapter 3: Understanding Memory Addresses, References, and Copying in JavaScript

## 3.1 Hexadecimal Addresses: The Computer’s GPS System

Computers love numbers—but humans find really long numbers hard to read.
That’s why, inside a computer, **memory addresses** are often written in **hexadecimal** (base 16), which is a shorter way to represent big numbers.

For example:

- Decimal: `1024`
- Hexadecimal: `0x400`

So, every “locker” in our warehouse analogy actually has a **hex address** like `0x7ffeaf20`.

**In JavaScript, you never see these addresses directly,** but under the hood, every variable’s value (especially for objects) lives at a certain memory address.

---

## 3.2 How Reference Variables Are Stored in Memory

Let’s use a story.

### 3.2.1 Imagine a Reference

You have a box labeled **user**:

```js
let user = { name: "Subrata", city: "Bengaluru" };
```

#### What really happens in memory?

1. JavaScript tells the computer:
   “Please create a big crate in the warehouse for my object `{ name: "Subrata", city: "Bengaluru" }`.”
2. The crate gets stored somewhere in memory, say at address `0x1A2B3C`.
3. The variable `user` **does not** directly contain the object.
   Instead, it contains the address—a little slip of paper that says:

   > “To find the data, go to locker at `0x1A2B3C`.”

So in memory:

| Variable Name | Memory Locker | Value Inside             |
| ------------- | ------------- | ------------------------ |
| `user`        | 0x7ffeaf20    | pointer to `0x1A2B3C`    |
| object data   | 0x1A2B3C      | { name: "Subrata", ... } |

---

### 3.2.2 How the Reference is Mapped to the Name

- The **variable name** you use in your code (like `user`) is recorded in JavaScript’s _symbol table_—a kind of internal phonebook.
- The _phonebook_ entry for `user` says:

  > “When the code says ‘user’, look in locker `0x7ffeaf20`.”

- Inside that locker is the address (`0x1A2B3C`) where the _real object_ is stored.

So:

- The name `user` → locker address `0x7ffeaf20` → pointer value `0x1A2B3C` → object.

**This pointer is what we mean by a “reference.”**
It’s a little piece of data in memory that tells the system where the real object is.

---

## 3.3 What Happens When You Copy a Reference Variable?

Let’s say you do:

```js
let user2 = user;
```

What happens?

- JavaScript creates a new variable, `user2`.
- Instead of making a _new_ object, it puts **the same reference** inside `user2`.

Now:

| Variable Name | Memory Locker | Value Inside             |
| ------------- | ------------- | ------------------------ |
| `user`        | 0x7ffeaf20    | pointer to `0x1A2B3C`    |
| `user2`       | 0x7ffeaf30    | pointer to `0x1A2B3C`    |
| object data   | 0x1A2B3C      | { name: "Subrata", ... } |

Both `user` and `user2` **point to the same object in memory**.

#### Why does this matter?

If you change the object through _either_ variable…

```js
user2.city = "Mumbai";
```

…the change is visible through **both** variables, because both are “maps” to the same treasure chest.

---

## 3.4 Shallow Copy vs Deep Copy: A Memory Story

### 3.4.1 Shallow Copy

A **shallow copy** means:

> “Give me a new box, but inside, put references to the _same_ stuff as before.”

For example:

```js
let user = { name: "Subrata", address: { city: "Bengaluru" } };
let userCopy = { ...user }; // shallow copy using spread
```

In memory:

- `userCopy` is a new object, but the property `address` **still points to the same inner object** as `user.address`.

| Variable Name      | Points to Address | Contents                       |
| ------------------ | ----------------- | ------------------------------ |
| user               | 0x1000            | { name: ..., address: 0x2000 } |
| userCopy           | 0x1001            | { name: ..., address: 0x2000 } |
| address (the city) | 0x2000            | { city: "Bengaluru" }          |

So, if you do:

```js
userCopy.address.city = "Mumbai";
console.log(user.address.city); // Output: Mumbai
```

**Both are changed!** Because the “address” is the _same pointer_ in both outer objects.

---

### 3.4.2 Deep Copy

A **deep copy** means:

> “Give me a brand new box, and also brand new boxes for everything inside, so nothing is shared!”

You can do a deep copy in JavaScript with:

```js
let userDeepCopy = JSON.parse(JSON.stringify(user));
```

Now, every level is a **new object at a new memory address**. If you change the nested data in `userDeepCopy`, it does _not_ affect `user`.

In memory:

| Variable Name      | Points to Address | Contents                       |
| ------------------ | ----------------- | ------------------------------ |
| user               | 0x1000            | { name: ..., address: 0x2000 } |
| userDeepCopy       | 0x1010            | { name: ..., address: 0x2010 } |
| address (user)     | 0x2000            | { city: "Bengaluru" }          |
| address (deepCopy) | 0x2010            | { city: "Bengaluru" }          |

So, changing:

```js
userDeepCopy.address.city = "Delhi";
console.log(user.address.city); // Output: "Bengaluru" (unchanged)
```

---

## 3.5 Visual Diagram (ASCII Art)

Here’s a simplified picture:

### Shallow Copy

```
user  ──►  { name, address ──► { city } }
               ▲
userCopy ──────┘
```

### Deep Copy

```
user       ──► { name, address ──► { city } }
userDeepCopy ─► { name, address ──► { city } }
```

Now, `user.address` and `userDeepCopy.address` are _completely separate objects_.

---

## 3.6 Summary Table

| Operation                    | New Outer Object? | Inner Objects Shared? | Memory Effect               |
| ---------------------------- | ----------------- | --------------------- | --------------------------- |
| Reference assignment (`=`)   | No                | All shared            | Same pointer, same address  |
| Shallow copy (`{...obj}`)    | Yes               | Nested shared         | New outer, inner pointers   |
| Deep copy (via JSON, lodash) | Yes               | All unique            | All addresses are different |

---

## 3.7 Why Does This Matter in Real Life?

- If you use a **reference** (or a shallow copy), changing one variable may change another in ways you _don’t expect_. This can cause bugs.
- If you want totally independent copies, use a **deep copy**.
- Understanding **pointers** and **memory addresses** helps you reason about how data moves and changes in your program.

---

## 3.8 Key Takeaways

- All objects and arrays in JavaScript are _stored by reference_—the variable contains a pointer to the real data.
- Memory addresses (hexadecimals) are used under the hood, though you don’t see them directly.
- When you “copy” objects, you may just be copying the pointer, not the object!
- **Shallow copy:** new outer object, shared inner objects.
- **Deep copy:** everything is new, nothing shared.
- Knowing this helps you avoid accidental bugs and write safer, clearer code.

---

## 3.9 Practice Time!

Try this at home:

```js
let a = { msg: "hello" };
let b = a; // reference
let c = { ...a }; // shallow copy
let d = JSON.parse(JSON.stringify(a)); // deep copy

b.msg = "changed";
console.log(a.msg); // ?

c.msg = "shallow";
console.log(a.msg); // ?

d.msg = "deep";
console.log(a.msg); // ?
```

Guess what you’ll see, and then run the code to check your understanding!

---
