## Chapter 2: How JavaScript Handles Data

Welcome to the second chapter of our journey into Data Structures and Algorithms (DSA)\! Before we dive into complex structures, we need to understand the **fundamental building blocks**: how **JavaScript** actually handles and stores the data we work with. This understanding is crucial for writing efficient and correct DSA solutions.

---

### 2.1 Data Types: The Kinds of Data

Every piece of information in JavaScript belongs to a specific **data type**. Think of data types as categories that tell the computer what kind of value a piece of data is and what operations can be performed on it.

JavaScript has two main categories of data types:

1.  **Primitive Data Types** (Simple, atomic values)
2.  **Non-Primitive (Reference) Data Types** (Collections of values or more complex entities)

#### 2.1.1 Primitive Data Types

Primitive values are **immutable** (cannot be changed) and represent a single, simple value.

| Type            | Description                                                                      | Example                      |
| :-------------- | :------------------------------------------------------------------------------- | :--------------------------- |
| **`string`**    | Textual data, enclosed in quotes.                                                | `"hello"`, `"DSA Chapter 2"` |
| **`number`**    | Numeric values, including integers and floating-point numbers.                   | `10`, `3.14`, `-50`          |
| **`boolean`**   | Logical entities representing one of two values: **`true`** or **`false`**.      | `true`, `false`              |
| **`undefined`** | A variable that has been declared but has not yet been assigned a value.         | `let x;` // x is `undefined` |
| **`null`**      | Represents the intentional absence of any object value or **no value**.          | `let y = null;`              |
| **`bigint`**    | A number that is too large to be represented by the standard `number` type.      | `12345678901234567890n`      |
| **`symbol`**    | A unique and immutable value, often used as an identifier for object properties. | `Symbol('id')`               |

---

### 2.2 The Key Difference: Primitives vs. References

The most critical concept to grasp about JavaScript data is **how** these two categories (Primitives and Non-Primitives) are stored and accessed in [memory](/lesson/kb/computer_memory). This directly impacts how variables behave when you copy or pass them around in your code.

#### 2.2.1 Primitives: Stored by Value

When you work with a primitive type:

- **Storage:** The **actual value** is stored directly in the variable's memory location.
- **Assignment (Copying):** When you copy a primitive variable to another, the entire **value is copied**. They are completely independent.

**Example:**

```javascript
let scoreA = 100;
let scoreB = scoreA; // The VALUE 100 is copied.

scoreA = 50; // Change scoreA

console.log(scoreB); // Output: 100 (It remains 100)
```

**Reasoning:** `scoreA` and `scoreB` point to two separate memory slots, each holding the value 100 (initially). Changing one does not affect the other.

#### 2.2.2 Non-Primitives (References): Stored by Reference

Non-primitive types, often called **Reference Types**, include:

- **`Object`**: A collection of key-value pairs, like a box that holds different labeled items.
- **`Array`**: An ordered list of values, like a row of boxes, each with a number.
- **`Function`**: A reusable block of code that can be called to perform a task, like a recipe you can use again and again.

![](/dsajs/lesson/images/js_obj_memory_copy.png)

When you work with a reference type:

- **Storage:** The variable **does not** store the actual data. Instead, it stores a **reference** (an address or pointer) to the location in memory where the data (the object/array) is actually stored.
- **Assignment (Copying):** When you copy a reference variable to another, the **reference (memory address) is copied**, not the underlying data. Both variables now point to the **same** data in memory.

**Example:**

```javascript
let userA = { name: "Alice", id: 1 };
let userB = userA; // The REFERENCE (memory address) is copied.

userA.name = "Alyssa"; // Change userA's data

console.log(userB.name); // Output: Alyssa (It also changes!)
```

**Reasoning:** Both `userA` and `userB` are pointing to the _exact same object_ in memory. Changing the object through one variable is visible through the other. This is a crucial concept in DSA, especially when passing objects/arrays to functions.

---

### 2.3 Memory Management: Stack vs. Heap

To truly understand the difference between Primitives and References, we need a basic idea of how JavaScript manages memory. It uses two main areas:

1.  **The Stack:** Used for **static** memory allocation.

    - It stores **Primitive Values** (the actual data).
    - It also stores the **References (addresses)** for Non-Primitive data.
    - Memory allocation/de-allocation is fast and follows a Last-In, First-Out (LIFO) order.

2.  **The Heap:** Used for **dynamic** memory allocation.

    - It stores the **actual data for Non-Primitive (Reference) Values** (the objects, arrays, and functions).
    - It's a larger, less organized space, optimized for storing complex and dynamically sized data.

| Memory Area | What is Stored Here                                   | Data Types                                                             |
| :---------- | :---------------------------------------------------- | :--------------------------------------------------------------------- |
| **Stack**   | Actual Primitive Values, Object References (Pointers) | `number`, `string`, `boolean`, `undefined`, `null`, `bigint`, `symbol` |
| **Heap**    | Actual Object Data, Array Data, Function Definitions  | `Object`, `Array`, `Function`                                          |

**The Flow:**
When you declare an object `let myObj = { val: 10 };`:

1.  The **variable `myObj`** is created on the **Stack**.
2.  The **object `{ val: 10 }`** is created on the **Heap**.
3.  The **Stack variable `myObj`** stores a **Reference** (address) pointing to the object on the Heap.

---

### 2.4 Mutability and Immutability

This final concept connects directly to how we use data structures.

#### 2.4.1 Immutability of Primitives

As mentioned, primitive types are **immutable**, meaning once a primitive value is created, it cannot be changed.

Wait, but we can do this: `let x = 5; x = 6;`

This isn't _changing_ the value $5$. It's a two-step process:

1.  A new value, $6$, is created in memory.
2.  The variable `x` is updated to hold a reference to this **new** value $6$.
    The original value $5$ is untouched.

#### 2.4.2 Mutability of References

Non-primitive types (Objects and Arrays) are generally **mutable** (can be changed).

We saw this in the reference example: we could change the internal property of the object (`userA.name = "Alyssa"`) without reassigning the variable. The object's data on the **Heap** was modified.

**Impact on DSA:**

- Operations on **primitive** variables always create **new** values.
- Operations on **reference** variables can **modify** the existing data structure in place (in the Heap), which is why we must be careful when passing them around or copying them. In DSA, this distinction is vital for understanding memory and side-effects.

By understanding the primitive-vs-reference split and the Stack-vs-Heap memory model, you now have the foundational knowledge to approach Data Structures and Algorithms with a much clearer view of how JavaScript actually manages the data we manipulate.
