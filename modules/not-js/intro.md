## ❌ Not Part of JavaScript (But Commonly Used With It)

### 🕒 **Timer APIs (Browser/Node)**

Provided by host environments for scheduling.

- `setTimeout(fn, delay)`
- `setInterval(fn, delay)`
- `clearTimeout(id)`
- `clearInterval(id)`
- `queueMicrotask()` → _now standardized, but host-specific handling_

---

### 🌐 **Network & HTTP APIs (Browser)**

- `fetch(url)`
- `XMLHttpRequest`
- `navigator.sendBeacon`
- `WebSocket` (the browser’s implementation)
- `AbortController` (JS spec, but fetch’s handling is browser-level)

---

### 🧭 **Browser Environment APIs**

- `window`, `document` → DOM access
- `location`, `history`, `navigator`
- `alert()`, `confirm()`, `prompt()`
- `localStorage`, `sessionStorage`, `IndexedDB`
- `addEventListener`, `removeEventListener`
- `requestAnimationFrame()`
- `cancelAnimationFrame()`

---

### 📦 **Node.js-Specific APIs**

- `require()` / `module.exports`
- `fs`, `path`, `http`, `crypto`, etc. (Node core modules)
- `process`, `__dirname`, `__filename`
- `Buffer`

---

### 🖼️ **Multimedia & Graphics**

- `<canvas>` API (`CanvasRenderingContext2D`, etc.)
- `WebGL`, `WebAudioAPI`
- `MediaDevices.getUserMedia`
- `Audio`, `Video`, `Image` constructors (browser)

---

### 🧵 **Multithreading & Async Tools**

- `Web Workers`, `SharedWorker`
- `BroadcastChannel`
- `MessageChannel`, `postMessage`
- `navigator.hardwareConcurrency`

---

### 📡 **Storage & Sync**

- `localStorage`, `sessionStorage`
- `IndexedDB`, `Cache`, `ServiceWorker`
- `Clipboard API`

---

### 🌍 **Others Worth Mentioning**

- `MutationObserver`, `IntersectionObserver`, `ResizeObserver`
- `File`, `FileReader`, `Blob`, `URL.createObjectURL()`
- `Geolocation API`
- `Notifications`
- `Vibration API`

---

## ✅ Actual JavaScript Features (from ECMAScript spec)

- `Promise`, `Map`, `Set`, `Symbol`, `BigInt`
- `Array.prototype.map`, `filter`, `reduce`, etc.
- `typeof`, `instanceof`, `Object.keys`, `Object.entries`
- `async/await`
- `Function`, `class`, `new`
- `JSON.parse`, `JSON.stringify`

---

### 📋 **JavaScript vs Host-Provided APIs**

| Feature/API                      | Is It in JavaScript? | Provided By              | Notes                                  |
| -------------------------------- | -------------------- | ------------------------ | -------------------------------------- |
| `let`, `const`, `function`       | ✅ Yes               | JavaScript (ECMAScript)  | Core language syntax                   |
| `setTimeout`, `setInterval`      | ❌ No                | Browser / Node.js        | Timer API from host                    |
| `fetch()`                        | ❌ No                | Browser / Node.js (v18+) | Not in the spec, added by environments |
| `window`, `document`             | ❌ No                | Browser                  | DOM & BOM APIs                         |
| `alert()`, `prompt()`            | ❌ No                | Browser                  | UI popups in browser only              |
| `console.log()`                  | ❌ No                | Host (Browser/Node)      | Not defined in ECMAScript spec         |
| `localStorage`, `sessionStorage` | ❌ No                | Browser                  | Web Storage API                        |
| `WebSocket`                      | ❌ No                | Browser / Node.js        | Each has its own implementation        |
| `require()` / `module.exports`   | ❌ No                | Node.js                  | Node's CommonJS module system          |
| `addEventListener()`             | ❌ No                | Browser                  | Event model tied to DOM                |
| `XMLHttpRequest`                 | ❌ No                | Browser                  | Predecessor of `fetch()`               |
| `requestAnimationFrame()`        | ❌ No                | Browser                  | For smooth UI updates                  |
| `File`, `Blob`, `FileReader`     | ❌ No                | Browser                  | Used for uploading/reading files       |
| `navigator.geolocation`          | ❌ No                | Browser                  | Location from browser environment      |
| `process`, `__dirname`           | ❌ No                | Node.js                  | Node-specific globals                  |
| `Promise`, `Map`, `Set`          | ✅ Yes               | JavaScript (ECMAScript)  | Built into the language                |
| `async/await`                    | ✅ Yes               | JavaScript (ES2017+)     | Syntactic sugar for Promises           |
| `class`, `Symbol`, `BigInt`      | ✅ Yes               | JavaScript (ES6+)        | Part of the modern language            |

---
