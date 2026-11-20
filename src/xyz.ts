// ==========================================
// Intro to JavaScript & TypeScript
// ==========================================

// JAVASCRIPT
// - A programming language that allows web pages to be dynamic.
// - Interpreted, not compiled: the interpreter (e.g. a browser) parses
//   the code and turns it into code the machine can run, so it works
//   on any browser on any computer.
// - Not just for the browser. Runtimes like Node.js and Deno let you
//   write, launch, and serve requests on webservers. Frameworks like
//   Electron use JS to write cross-platform apps for Windows, Linux,
//   macOS. Mobile dev is possible via React Native, Ionic, and Expo
//   (Android, iOS, and web at once).
// - ECMAScript is the standard that defines JavaScript.
// - Starting with the 6th edition (ES2015/ES6) in 2015, a new edition
//   is released each year. ES6 was a major update: template strings,
//   arrow functions, cleaner class syntax.
// - New syntax each year means support is often incomplete in current
//   browsers and the latest Node.js. Tools like Babel offer
//   transpilation for most features, letting you write as if it's
//   the future.

// TYPESCRIPT
// - A superset of JavaScript, created at Microsoft out of frustration
//   developing large-scale applications in JS.
// - In a large JS project it's hard to know what properties your own
//   objects have, what arguments functions take (and their types).
//   Since JS code can't be intelligently inspected, using an npm
//   package means keeping docs open to know its methods and args.
//   TS solves these issues.
// - Open-source, hosted on GitHub. Supports tools for any browser and
//   Node, on any host, any OS. Compiles to readable, standards-based
//   JavaScript.
// - Adds a flexible type system to JS, plus interfaces (custom types),
//   and modifies the syntax of some ECMAScript features like classes.
// - Types are optional and flexible (e.g. an argument can be a string
//   OR a number). Types enable editor tooling like code completion
//   and method detection, in your own code and in packages you use.
// - Supports many upcoming ECMAScript features (e.g. async/await).
//   Can be written in Object Oriented or Functional styles.
//   Compatible with all existing JS packages. Transpiles to clean,
//   readable JS.

// ==========================================
// Code Structure
// ==========================================
// Imports
// import { something } from 'module';

// Global variable
let globalvar: number = 0;

// Types/Interfaces
interface MyType {
  prop: string;
}

// Functions/Classes
function myFunction(arg: MyType): void {
  // logic
}

// Class
class MyClasses {
  method(): string {
    return "result";
  }
}

// Exports
export { myFunction, MyClasses };

// ==========================================
// Comments & Code Documentation
// ==========================================
// SYNTAX
// Comments
/*
Multi-line
comment 
*/
//  Documentation comment (JSDoc)
/**
 * Adds two numbers.
 * @param a First number
 * @param b Second number
 * @returns The sum.
 */
function docAdd(a: number, b: number): number {
  return a + b;
}
console.log(docAdd(5, 10));
// It provides documentation that editors like VS Code can show when you hover

// ==========================================
// Variables & constants
// ==========================================
// variables are always written in camelCase; constants are written in SCREAMING_SNAKE_CASE
/*
- JS/TS Variable Declarations & Scope Mechanics: 
Variables in JavaScript can be defined using the const, let or var keyword.
- `let`: Block-scoped. Subject to Temporal Dead Zone (TDZ). Reassignable.
- `const`: Block-scoped. Immutable binding (the variable identifier cannot be reassigned), but the contents of objects/arrays it points to ARE mutable.
- `var`: Function-scoped or globally scoped. Hoisted to the top of its execution context with `undefined`. Avoid using `var` in modern TS/JS to prevent scope leakage.
*/
let myLet: string = "Block scoped";
const MY_CONST: number = 100; // Cannot do MY_CONST = 101;
var legacyVar: boolean = false; // Hoisted, avoid.
// Const :-
// constant assignment / binding and constant value
const constant = "constants";

// ==========================================
// Data Types
// ==========================================

// Type inference
let inferred = 42; // Inferred as number
console.log(`typeof inferred is: ${typeof inferred}`);

// Type assertions (tell TypeScript what type it is)
let valueAny: any = "123";
let numType: number = parseInt(valueAny);

// Type assertion syntax:
// don't know type of strAny so to use it we need to later give it type
const strAny: any = "hello";
// as: tells typescript that strAny is a string or treat it as a string
let length1: number = (strAny as string).length;
// or using angle brackets - same thing as above just different syntax without using - as
let length2: number = (<string>strAny).length;

// Safely check types - better way
// we use unknown ts checks itself what it is before using it
function processValue(value: unknown): number {
  if (typeof value === "number") {
    return value;
  }
  if (typeof value === "string") {
    // parseInt(string, radix?) - optional number/base (2–36)
    return parseInt(value);
  }
  throw new Error("Invalid type");
}

// ==========================================
// Built-in primitives
// ==========================================
// Primitives are immutable, passed by value, and stored on the Stack (usually, depending on engine implementation like V8). JS/TS has 7 primitive types.

// 1. Number: IEEE 754 double-precision 64-bit floating point. (No separate int/float).
// Number (IEEE 754 64-bit float, no separate int/float)
// All numbers are double-precision 64-bit IEEE 754 floating-point values. No raw integer type exists at the base runtime.
let numInt: number = 42;
console.log(`number: ${numInt}`);
let numFloat: number = 3.14159;
console.log(`float: ${numFloat}`);
let numHex: number = 0xff; // Hexadecimal
console.log(`hex: ${numHex}`);
let numBinary: number = 0b1010; // Binary
console.log(`Binary: ${numBinary}`);

// 2. BigInt: Arbitrary precision integers (for numbers larger than Number.MAX_SAFE_INTEGER: 2^53 - 1).
// BigInt (arbitrary precision)
// Arbitrary-precision integers. Allocates dynamic heap space to process numbers beyond the Safe Integer Limit ($\pm(2^{53} - 1)$).
let bigIntVal: bigint = 9007199254740991n; // 'n' suffix
console.log(`bigint: ${bigIntVal}`);
// Rounding
// There is a built-in global object called Math that provides various rounding functions.
// For example, you can round down (floor) or round up (ceil) decimal numbers to nearest whole numbers
Math.floor(234.34); // => 234
Math.ceil(234.34); // => 235

// 3. String: UTF-16 code units.
// String (UTF-16) -> Immutable sequences of 16-bit UTF-16 code units, allocated and deduplicated via internal V8 string interning.
// Creating a string
("Hello, World!");
("Hello, World!");
// A string can be treated as index to acess string value.
"cat"[1];
// use .length to acess the length of string
"cat".length;
// to concate use
"I like" + " " + "cats.";
// some string methods
// - toUpperCase and toLowerCase - change the case of all characters
// - trim - remove whitespace at the beginning and end
// - includes, startsWith and endsWith - determine whether another string is part of the given string
// - slice - extract a section of the string
let strSingle: string = "A";
console.log(`String One char: ${strSingle}`);
let strDouble: string = "Hello";
console.log(`string: ${strDouble}`);
const str1 = "Hello, World!";
console.log(str1.length); // 13
console.log(str1[0]); // 'H'
console.log(str1.substring(0, 5)); // 'Hello'
console.log(str1.includes("World")); // true
console.log(str1.indexOf("World")); // 7
console.log(str1.replace("World", "JavaScript")); // 'Hello, JavaScript!'
console.log(str1.toUpperCase()); // 'HELLO, WORLD!'

// 3. Boolean: true or false (1 byte conceptually).
// Logical entities representing true or false.
let isTrue: boolean = true;
console.log(`boolean: ${isTrue}`);

// null / undefined
// Structural primitive singletons. undefined means a variable is uninitialized; null is an intentional empty object reference pointer.

// 4. Null: Intentional absence of any object value.
// Null (intentional absence)
let nullVar: null = null;
console.log(`null: ${nullVar}`);

// 5. Undefined: Uninitialized variable. The default value of declared but unassigned variables.
// Undefined (uninitialized)
let uninitVar: undefined = undefined;
console.log(`undefined: ${uninitVar}`);

// 6. Symbol: Unique, immutable identifier (often used for hidden object properties).
// Symbol (unique identifier)
// Unique, immutable tokens generated globally or via the runtime symbol registry. Primarily used as non-clashing object keys.
let sym: symbol = Symbol("uniqueKey");
console.log(`symbol: ${sym.toString()}\n`);

// ==========================================
// Compile-Time Types
// ==========================================
// TS-Specific Types (Conceptual Primitives in TS):

// 1. Any - The escape hatch. Turns off type checking completely, allowing any runtime operation.
let anyVar: any = "Can be anything"; // Bypasses type checking (Avoid).
console.log(`any: ${anyVar}`);

// 2. Unknown - The type-safe counterpart to any. Represents any value, but forces you to perform runtime type-narrowing (e.g., typeof) before usage.
let unknownVar: unknown = 42; // Type-safe counterpart to `any`. Requires type checking before use.
console.log(`unknown: ${unknownVar}`);

// 3. never - The bottom type. Represents the empty set of values—used for functions that never return (throw errors/infinite loops) or exhaustive switch matching.
// Represents values that never occur (e.g., mainly used for functions that never successfully retur)
// never is not normally declared as a standalone variable
function getNever(): never {
  throw new Error("Something went wrong");
}
try {
  console.log(getNever());
} catch (error) {
  console.log(`error: ${error}`);
  console.log(`typeof error: ${typeof error}`); // "object"
}

// 4. void - Represents the absence of a return value from a function. Resolves to undefined at runtime.
const logs = (): void => {};
console.log(logs()); // undefined
console.log(`void: `, typeof logs()); // "undefined"

// 5. Destructuring assignment ts perform type inference here
const [destructX, destructY] = [10, 20];
// type inferenced
// const { name, age } = { name: "Alice", age: 25 };
// if want to define type explicity
// const { MyName, MyAge }: { name: string; age: number } = { name: "Alice", age: 25 };

// 5. Union types
// allow multiple type & values - can be custom type
let id: string | number;
id = "ABC123"; // OK
id = 123; // OK

// 6. Literal Types
// Restricts a variable down to a specific exact string, number, or boolean value
type direction = "left" | "right";
let literalType: direction = "left"; // or "right"

// 7. Type Alias
// create reusable custom types
// gives a name to any type
type ID = string | number;
const aliasType1: ID = 123;
const aliasType2: ID = "ABCD";
console.log(typeof aliasType1);
console.log(typeof aliasType2);

// ==========================================
// TS Compile-Time (Advanced Types)
// ==========================================
// Enforces Structural Subtyping (Duck Typing). If two shapes match, their types are compatible, regardless of explicit inheritance.

// 8. Structural Interfaces
// Interface for type safety
// object | class structure / contract
// defines structure of object like type alias mainly for object shapes
interface User {
  name: string;
  age: number;
}
// const obj: { [key: string]: string } = {};
// const obj: Record<string, unknown> = {};

// 9. Tuples
// Fixed-length arrays with strictly assigned types at explicit index positions (e.g., [string, number]). Compiles down to a standard JS array.
// Tuples (TS specific): Fixed-length array with predefined types at each index.
let myTuple: [string, number, boolean] = ["Bob", 25, true];
console.log(`Tuple: ${JSON.stringify(myTuple)}`);
// Optional tuple elements + Variadic tuples (rest elements)
type StringNumberTuple = [string, number, boolean?, ...number[]];
// Readonly tuples
type ReadonlyTup = readonly [string, number];
const readonlyTuple: ReadonlyTup = ["frozen", 99];
// readonlyTuple[0] = "error"; // ❌ Cannot assign

// 10. Enums (enum / const enum)
// Standard enum generates a bi-directional lookup object at runtime. const enum is completely erased, and values are inlined directly into code.
// Enums (TS specific): Named constants. Compiles to JS objects (or IIFEs)
enum Color {
  Red = 0,
  Green = 1,
  Blue = 2,
}
const myColor: Color = Color.Red;
console.log(Color[0]); // "Red" (reverse lookup)
// Normal enum exists at runtime
// String enums
enum Direction {
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT",
}
const dir: Direction = Direction.Up;

// const enum is valid TypeScript, but it's not recommended in many projects because it's a TypeScript-only compile feature
// const enum is erased during compilation it causes build errors so mostly avoid it
// Const enum: completely erased at runtime, values inlined
/*
const enum Status {
  Active = "ACTIVE",
  Inactive = "INACTIVE"
}
// Inlined as "ACTIVE" in output
const status: Status = Status.Active; 
// compiles to 
const status = "ACTIVE";
*/
// Mixed enum (not recommended)
enum Mixed {
  No = 0,
  Yes = "YES",
}

// ==========================================
// Runtime (Structural) Types
// ==========================================
//1. object (Standard)
// Key-value hash maps. Keys are strings or symbols; values are pointers to other heap entities. V8 optimizes these using Hidden Classes (Shapes).
const objType: object = {
  name: "Pengu",
  age: 20,
};
console.log(objType);

// 2. Function
// Executable callable objects. First-class citizens that close over their lexical scopes (Closures).
const funType = (name: string): string => {
  return `Hello ${name}`;
};
console.log(funType("Pengu"));

// ==========================================
// Refrence Types
// ==========================================
/*
Reference Types (Objects) are dynamically allocated on the Heap.
The Stack holds the variable (the reference/pointer), which points to the memory address on the Heap.
*/
interface User {
  name: string;
  age: number;
  // add more properties
  email?: string;
}
// If want to add multiple keys at once:
// Object.assign(userObj, { email: "a@b.com", city: "Delhi" });
// For arbitrary extra keys, use an index signature:
// interface User {
//   name: string;
//   age: number;
//   [key: string]: unknown;
// }
// Then:
// userObj.email = "a@b.com";
// userObj.city = "Delhi";

// If you don't want to add the new keys to the interface:
// Add them with a type assertion
// (userObj as any).email = "alice@example.com";
// or multiple:
// Object.assign(userObj, { email: "a@b.com", city: "Delhi" });
// Object.assign() is particularly convenient because you don't need to modify the interface

// Better Way: create a new object
// If don't want to weaken the type with any:
// const newUser = { ...userObj, email: "a@b.com", city: "Delhi" };

// 1. Objects (Key-Value pairs)
// TS Interface defines the shape of an objects
const userObject: User = { name: "Alice", age: 30 };
// object operation
// 'userObject' reference is constant, but `userObject.age` is mutable.
console.log(`Object: ${JSON.stringify(userObject)}`);
// - in js only the type of the key is restricted: it has to be a string
// - but values can be primitive values can be array, object even function.
// - the also key entities for OOP in js
// Operations object:
// Retrieving a value
userObject["name"] = "Bob";
userObject.name = "Don";
// Check wheather value exists
userObject.hasOwnProperty("name");
// Looping over Object:
// when wants keys only
/**
 * this code below is valid in js but not in ts, why?
 * Object.keys() returns key as type string. But userObject is typed as User, which only allows keys "name" or "age". TypeScript doesn't know a plain string is one of those specific keys, so userObj[key] errors with something like:
 * Element implicitly has an 'any' type because expression of type 'string' can't be used to index type 'User'
 */
for (const key of Object.keys(userObject)) {
  // console.log(key, devObj [key]); // ❌ error
}
// fix tell TypeScript key is actually a key of User:
// what fixed - The second loop (Object.entries) has the same underlying issue, but TS is more lenient there since value just becomes any, so it usually won't error
for (const key of Object.keys(userObject) as (keyof User)[]) {
  console.log(key, userObject[key]);
}
// When need both key and value
for (const [key, value] of Object.entries(userObject)) {
  console.log(key, value);
}
// Even cleaner
// You can create a small helper:
function typedKeys<T extends object>(obj: T): (keyof T)[] {
  return Object.keys(obj) as (keyof T)[];
}
for (const key of typedKeys(userObject)) {
  console.log(key, userObject[key]);
}
// Object Destructuring:
// object destructuring syntax is a concise way to extract properties from an object and assign them to distinct variables.
const weather = {
  sun: "☀️",
  sun_behind_small_cloud: "🌤️",
  sun_behind_cloud: "⛅",
  sun_behind_large_cloud: "🌥️",
  sun_behind_rain_cloud: "🌦️",
  cloud: "☁️",
  cloud_with_rain: "🌧️",
  cloud_with_snow: "🌨️",
  cloud_with_lightning: "🌩️",
  cloud_with_lightning_and_rain: "⛈️",
};
const { sun, cloud, cloud_with_lightning } = weather;
sun;
// => '☀️'
cloud;
// => '☁️'
cloud_with_lightning;
// => '🌩️'

// 2. Arrays
// Standard Array ([] / Array): A dynamically resizing sequence.
// Under the hood, JS engines (like V8) optimize arrays
// if elements are dense and sequential, they use a contiguous memory array
// if elements are sparse, they automatically downgrade the layout to a slow,
// dictionary-style hash table
const arr = [1, 2, 3, 4, 5];
let arrNum: number[] = [10, 20, 30];
let arrStr: Array<string> = ["A", "B", "C"];
console.log(`Array<number>: ${arrNum}`);
console.log(`Array<string>: ${arrStr}`);

// Generic syntax
// Array Methods
let arr1 = [1, 2, 3, 4, 5];
console.log(`Original: ${arr1}`);
// Arrays
arr1.push(6); // Add to end -> [1,2,3,4,5,6] returns the new length of the array
arr1.pop(); // Remove last -> 6 changes the length of the array
arr1.shift(); // Remove first -> 1 changes the length of the array
arr1.unshift(0); // Add to beginning -> [0,2,3,4,5]  returns the new length of the array
// changes the contents of an array by removing or replacing existing elements and/or adding new elements in place
arr1.splice; // method returns an array containing the deleted elements
arr1.includes(3); // whether an array includes a certain value among its entries, returning true or false as appropriat
arr1.every((num) => num % 2 !== 0); //  whether all elements in the array pass the test implemented by the provided function. It returns a Boolean value
arr1.some((num) => num % 2 !== 0); //  whether at least one element in the array passes the test implemented by the provided function
arr1.find((num) => num < 5); //  returns the value of the first element in the provided array that satisfies the provided testing function. If no values satisfy the testing function, undefined is returned
arr1.findIndex((num) => num > 7); // returns the index of the first element in the array that satisfies the provided testing function. Otherwise, it returns -1, indicating that no element passed the test

// Array Transformation: Some methods are (pure), meaning that they do not modify the original array
  
// map (pure)
// Create a new array by transforming each element according to a function passed as an argument. These callback functions are often written as arrow functions
console.log(arr1.map((value) => value - 1));

// filter (pure)
// Creates an array by filtering the current one, given a filtering function (that returns true if the element should be kept and false if it should be removed)
console.log(arr1.filter((value) => value % 2 === 0));

// reduce(pure)
// Reduces the array to a single value using a function that takes an accumulator and the current element of the array as parameters
// This function instructs how the current element must be merged into the accumulator and returns the accumulator that will be used on the next iteration
// arr.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

// reverse
// Reverses the elements of an array.
console.log(arr1.reverse());

// slice(pure)
// Given a start and an end index, creates a sub-array from the array it is called on.
console.log(arr1.slice(1));

// Splice
// Removes or replaces and/or adds new elements of an array.
// it takes - start index , number of element to delete , element to insert in array(optional)
// Insert an element at index 2
arr1.splice(2, 0, 3); // 0 values removed

// Sort
// By default, sort sorts the elements of an array by first converting them to strings and then applying string comparison
// The sorting happens in-place which means the original array is modified.
// sort also returns that modified array which is convenient if you want to chain other methods to it.
arr1.sort();
// To customize the sorting behavior, you can pass a comparison function as an argument.
// The comparison function itself is called with two arguments which are two elements of the array. It then needs to return the following:
// - a negative number if the first argument should be sorted before the second
// - a positive number if the first argument should be sorted after the second
// - 0 if the order of the elements should stay the same
arr1.sort((a, b) => a - b);

// Array Loops:
// for loops
// for..of loop
// forEach - Array iteration
arr1.forEach((num) => {
  console.log(num);
});

// Map (transform each element)
const squared = arr1.map((x) => x ** 2);
// Filter
const evens = arr1.filter((x) => x % 2 === 0);
// Find
const first_even = arr1.find((x) => x % 2 === 0);
// Slice (get subset)
const subset = arr1.slice(1, 4); // [2, 3, 4]
// Spread operator
const arr2 = [...arr1, 6, 7]; // Combine arrays

// Typed strings and arrays
const str2: string = "Hello";
const numbers1: number[] = [1, 2, 3];

// Array methods return typed values
const doubledArr: number[] = numbers1.map((x) => x * 2);
const evens2: number[] = numbers1.filter((x) => x % 2 === 0);

// Type-safe find
const found: number | undefined = numbers1.find((x) => x > 2);

// Array Destructuring
// Array destructuring syntax is a concise way to extract values from an array and assign them to distinct variables
// each value in the numberOfMoons array is assigned to its corresponding planet:
const numberOfMoons = [0, 2, 14];
const [venus, mars, neptune] = numberOfMoons;
neptune;
// => 14

// An array is a list that holds multiple items in order
const fruits = ["apple", "banana", "orange"];
console.log(fruits[0]); // "apple"
// Array of numbers
let arrayNumbers: number[] = [1, 2, 3];
// Array of strings
let names: string[] = ["Alice", "Bob"];
// Mixed types (careful!)
let mixed: (string | number)[] = [1, "hello", 2];

// Way of creating Array in TypeScript
// 1. Literal syntax (most common):
let Array1: string[] = ["a", "b", "c"];
// 2. Generic wrapper (same thing, different style):
let Array2: Array<string> = ["a", "b", "c"];

// Dense Dense and Sequential Array
// Dense = no gaps
// Sequential = items in order
let arrDense = [10, 20, 30, 40];
//         [0] [1] [2] [3]
// All positions filled. JavaScript stores this fast in contiguous memory (side-by-side in RAM)

// Sparse = has Gaps
let arrSparse = [];
arrSparse[0] = "a";
arrSparse[5] = "b"; // positions 1,2,3,4 are empty
// Missing positions = sparse. JavaScript downgrades to slow storage

// ==========================================
// Typed Arrays
// ==========================================
// TypedArrays: Contiguous, fixed-size, raw binary buffers optimized for high-performance graphics and network manipulation.

// They consist of a backing raw memory allocation (ArrayBuffer) viewed through specific data lenses:
// Int8Array, Uint8Array, Uint8ClampedArray (clamps values between 0-255).
// Other Views:
// Int8Array -> Signed 8-bit integers -> -128 to 127
// Uint8Array -> Unsigned 8-bit integers -> 0 to 255
// Uint8ClampedArray -> 0-255 (clamps overflow) -> Values capped at 0-255 -> If value is outside the range, it returns the closest boundary:
// Int16Array -> Signed 16-bit integers -> -32,768 to 32,767
// Uint16Array -> Unsigned 16-bit integers -> 0 to 65,535
// Int32Array -> Signed 32-bit integers -> Large range
// Uint32Array -> Unsigned 32-bit integers, Large range
// Float32Array -> 32-bit decimals -> -3.4e38 to 3.4e38
// Float64Array -> 64-bit decimals -> More precision
// BigInt64Array -> 64-bit big integers -> Huge integers
// BigUint64Array -> Unsigned big integers -> Huge positive integers

// Normal arrays: can grow/shrink, hold any type
// TypedArrays = one specific type, raw bytes, fixed-size containers for raw binary data (optimized for speed).

// ArrayBuffer
let bufferArr = new ArrayBuffer(16); // 16 bytes of empty memory
// just raw bytes cant use it directly

// Data Lenses(Views)
let view = new Int32Array(bufferArr); // view as 32-bit integers
// now can work with it
view[0] = 42;
console.log(view[0]); // 42

// ==========================================
// Keyed Collections:-
// ==========================================
// A keyed collection stores data as key–value pairs, where each value is accessed using its unique key

// Map
// Map: A genuine key-value dictionary. Unlike standard JS objects,
//  keys can be of any type (including functions or object instances).
// It preserves insertion order natively and uses deterministic hashing for $O(1)$ lookups
// Methods and properties are:
// new Map() – creates the map.
// map.set(key, value) – stores the value by the key.
// map.get(key) – returns the value by the key, undefined if key doesn’t exist in map.
// map.has(key) – returns true if the key exists, false otherwise.
// map.delete(key) – removes the element (the key/value pair) by the key.
// map.clear() – removes everything from the map.
// map.size – returns the current element count.

let map = new Map();
// Key difference: Map keys can be any type. Objects only allow strings/symbols.
map.set("name", "John"); // string key
map.set(1, "one"); // number key
map.set(true, "yes"); // boolean key
map.set({}, "object key"); // object key!
map.set(() => {}, "function"); // function key!
console.log(map.get("name")); // "John"
console.log(map.get("age")); // 25

// Preserves Insertion Order
// Insertion order = the order you added items
let insertionOrder = new Map();
insertionOrder.set("first", 1);
insertionOrder.set("second", 2);
insertionOrder.set("third", 3);
// Iterating returns them in order added:
for (let [key, value] of insertionOrder) {
  console.log(key, value);
}

// Map Idea Explained: it follows same idea as dictionary/object find key → get value
// Dictionary/object: need to search through keys → potentially O(n)
// Map: hashes the key → calculates where it should be → jumps there → average O(1)
// key → hash → bucket → value
// Hash: converts a key into a number that helps choose where to store/find it
// A hash function takes data of any size and produces a fixed-size number

// Map remebers
// Hashing → finds WHERE the key is stored
// Ordering → remembers WHEN the key was inserted
// Even though the buckets may be scattered, Map separately remembers the insertion order
// Basic Map Methods
let mapMethods = new Map();
// Add
mapMethods.set("name", "John");
// Get
mapMethods.get("name"); // "John"
// Check if exists
mapMethods.has("name"); // true
mapMethods.has("age"); // false
// Delete
mapMethods.delete("name");
// Size
console.log(mapMethods.size); // number of items

// Object.entries
// use built-in method Object.entries(obj) that returns an array of key/value pairs for an object exactly in that format.

// WeakMap
// key in weakmap should always be iterable
// JavaScript engine keeps a value in memory while it is “reachable” and can potentially be used.
//  A specialized `Map` where keys must be object or symbol references and those references are held _weakly_.
// If a key object has no other references left, the entire entry is eligible for garbage collection, preventing memory leaks in caching or DOM tracking.
// WeakMap
// Keys must be objects or symbols.
// Keys are held weakly.
// If the key is no longer reachable, its entry can be garbage-collected.

let weakkey1 = { id: 1 };
const weakmap1 = new WeakMap<object, string>();
weakmap1.set(weakmap1, "Secret data");
console.log(weakmap1.get(weakmap1));
// "Secret data"
// Remove the only strong reference to the key
weakkey1 = null as any;
// The WeakMap no longer keeps the key alive.
// The entry becomes eligible for garbage collection.

// Map vs WeakMap
let user = { name: "John" };
const map1 = new Map();
map1.set(user, "John's data");
console.log(map1.get(user)); // "John's data"
// Remove our reference
user = null as any;
// Map STILL has the object as a key
console.log(map1.size); // 1
const weakMap = new WeakMap();
weakMap.set(user, "John's data");
console.log(weakMap.get(user)); // "John's data"
// Remove our reference
user = null as any;
// You cannot reliably demonstrate the exact return immediately, because JavaScript decides when garbage collection happens.
// Also you cannot do:
// weakMap.size       // ❌
// weakMap.keys()     // ❌
// weakMap.values()   // ❌
// weakMap.entries()  // ❌
// Because WeakMap does not let you inspect its entries
// it gives you things Like:
// weakMap.get(key);    // value or undefined
// weakMap.set(key, value);
// weakMap.has(key);    // true / false
// weakMap.delete(key); // true / false

// Set
// A Set is a special type collection – “set of values” (without keys), where each value may occur only once.
// A collection of unique values. Like `Map`
// it tracks insertion order and leverages internal hashing
// to evaluate item uniqueness in $O(1)$ time complexity, bypassing costly array traversals.
// a set is a list like structure containing unique values, which can be primitives and/or object references.
// Unlike an array, a set's elements cannot be accessed by index.
// A value cannot be added to a set if it is strictly equal to any of the set's elements
// Its main methods are:
// new Set([iterable]) – creates the set, and if an iterable object is provided (usually an array), copies values from it into the set.
// set.add(value) – adds a value, returns the set itself.
// set.delete(value) – removes the value, returns true if value existed at the moment of the call, otherwise false.
// set.has(value) – returns true if the value exists in the set, otherwise false.
// set.clear() – removes everything from the set.
// set.size – is the elements count.
const set = new Set<unknown>();
const object = { color: "lime green" };
const functionallyIdenticalObject = { color: "lime green" };
set.add(object);
set.add("wow");
set.add(77);
console.log(set.size); // 3
set.add(functionallyIdenticalObject); // added because functionallyIdenticalObject is not strictly equal to object
console.log(set.size); // 4
set.add(77); // not added because 77 is strictly equal to 77
console.log(set.size); // 4
// Iteration over Map and Set is always in the insertion order,
// so we can’t say that these collections are unordered,
// but we can’t reorder elements or directly get an element by its number

// Normal set
let setObj = { name: "A" };
const normalSet = new Set();
set.add(setObj);
// conceptually -> obj ───────► { name: "A" }  ◄────── set
// The Set keeps a reference to the object
// So even if you do:
setObj = null as any;
// the object is still reachable through set -> set ───────► { name: "A" }, therefore garbage collection cannot remove it

// WeakSet
// A collection of unique objects held weakly.
// Like `WeakMap`, objects inside a `WeakSet` are automatically garbage collected if no outside references point to them.
let weakObj = { name: "A" };
const ws = new WeakSet();
ws.add(weakObj);
// conceptually
// obj ───────► { name: "A" }
//              ▲
//              │
//           WeakSet
//        (weak reference)
// The WeakSet reference doesn't count as a strong reference for garbage collection
// so when:
weakObj = null as any; // elgible for garbage collection

// ==========================================
//  Type-Level Manipulations (Meta-Data Structures) / (Types as Data):
// ==========================================
// TypeScript handles types as data at compile time, Means TypeScript can take a type and create another type from it
// it provides unique type-level structures to transform code safely before compilation
// Just as you use functions to transform data at runtime, TypeScript allows you to treat types themselves as data at compile time.
// Runtime analogy: uppercase("hello") transforms the string value "hello" into "HELLO".
// Type-level equivalent: Uppercase<"hello"> transforms the literal type "hello" into the literal type "HELLO".
// You are passing types into type-level functions (called Generics) to compute brand-new type definitions automatically.

// ==========================================
// Utility Transformation Structures(Type Morphing):
// ==========================================
// TypeScript includes global generic structures to morph existing type interfaces into altered states
// Utility Types they are built-in generic types that modify existing types.
// Partial<User>    // all properties optional
// Required<User>   // all properties required
// Readonly<User>   // all properties readonly
// Pick<User, ...>  // choose some properties
// Omit<User, ...>  // remove some properties
// Instead of manually rewriting types when you need a variation of an existing interface, TypeScript gives you built-in functions (called Utility Types) to reshape them.

interface Morph {
  id: number;
  name: string;
  email?: string; // Optional property added to demonstrate Required<T>
}

// `Partial<T>` — Makes every property optional (?)
// Maps all properties of an interface to be optional (`?`)
type UpdateMorphInput = Partial<Morph>;
// Resulting shape: { id?: number; name?: string; email?: string; }

// `Required<T>` — Strips optional flags, forcing all properties to be explicitly defined
// Uses `-?` under the hood to remove the optional modifier from all properties
type StrictMorph = Required<Morph>;
// Resulting shape: { id: number; name: string; email: string; }

// `Readonly<T>` — Makes every property immutable
// Prefixes all properties with a compile-time `readonly` modifier, blocking data mutations
type LockedMorph = Readonly<Morph>;
// Resulting shape: { readonly id: number; readonly name: string; readonly email?: string; }

// `Record<K, T>` — Dictionary layout constructor
// Constructs an object type layout with a set of explicit keys `K` mapped to a uniform value type `T`
type UserRole = "admin" | "user" | "guest";
type RolePermissions = Record<UserRole, boolean>;
// Resulting shape: { admin: boolean; user: boolean; guest: boolean; }

// `Pick<T, K>` — Extracts only specific fields
// Extracts a chosen subset of keys `K` from a base type structure `T`
type MorphContact = Pick<Morph, "name" | "email">;
// Resulting shape: { name: string; email?: string; }

// `Omit<T, K>` — Removes specific fields
// Drops a chosen subset of keys `K` from a base type structure `T`
type MorphWithoutId = Omit<Morph, "id">;
// Resulting shape: { name: string; email?: string; }

// ==========================================
// Under The Hood (Mechanics & Custom Implementations):
// ==========================================
// These built-in structures use Mapped Types under the hood.
// A mapped type iterates over the keys of an existing type using the `in keyof` operator to build a new one.

// 1. CustomPartial<T>
// `keyof T` extracts keys as a union ("id" | "name" | "email")
// `[K in keyof T]` iterates over each key
// `?:` appends the optional modifier
// `T[K]` accesses the original property type
type CustomPartial<T> = {
  [K in keyof T]?: T[K];
};

// 2. CustomRequired<T>
// `-?` explicitly strips the optional modifier (`?`) from each property
type CustomRequired<T> = {
  [K in keyof T]-?: T[K];
};

// 3. CustomReadonly<T>
// Prefixes the property declaration with `readonly`
type CustomReadonly<T> = {
  readonly [K in keyof T]: T[K];
};

// 4. CustomRecord<K, T>
// `K extends keyof any` enforces that K must be legal object key types (string | number | symbol)
type CustomRecord<K extends keyof any, T> = {
  [P in K]: T;
};

// 5. CustomPick<T, K>
// `K extends keyof T` ensures you can only pick keys that actually exist on type `T`
type CustomPick<T, K extends keyof T> = {
  [P in K]: T[P];
};

// 6. CustomOmit<T, K>
// Combines `Pick` and `Exclude`. `Exclude<keyof T, K>` filters out the keys matching `K`
type CustomOmit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;

// ==========================================
// Mapped Type and Conditional Logic:
// ==========================================
// MAPPED TYPES
// Mapped Types act like a Array.prototype.map() over type keys, while Conditional Types act like type-level if/else branching (evaluating type relationships using the extends keyword).
// A Mapped Type constructs a new object type by iterating through a union of keys (typically derived via keyof T).
// Homomorphic Mapping: When mapped directly over a generic parameter [P in keyof T], TypeScript automatically preserves modifiers like readonly and ? from the target type unless explicitly altered using explicit modifier operations (+ or -).
// Key Remapping (as clause): Introduced in TS 4.1, you can alter key names during iteration using as. Returning never inside an as clause filters that key out entirely.
// Creates new type fields by iterating over keys using an `in keyof` syntax loop:
type Stringify<T> = {
  [P in keyof T]: string 
};
// Modifiers: Adding (+) or Removing (-) flags explicitly
// Remove Modifiers
type Mutable<T> = {
  -readonly [P in keyof T]: T[P] // Removes `readonly`
};
type Concrete<T> = {
  [P in keyof T]-?: T[P]; // Removes `?` (optional)
};
// -readonly → remove readonly
type Required<T> = {
  [P in keyof T]-?: T[P]
};
// -? → remove optional ?
// Rename keys with as
// Key Remapping via `as` (Template Literals & Key Manipulation)
type Getters<T> = {
  [P in keyof T as `get${Capitalize<string & P>}`]: () => T[P]
};
// Advanced: Key Filtering inside Mapped Type (Removes non-string properties)
type FilterStringProps<T> = {
  [P in keyof T as T[P] extends string ? P : never]: T[P]
};

// CONDITIONAL TYPES - type-level if/else
// Conditional types take the form: T extends U ? X : Y. If T matches or derives from U, the type resolves to X; otherwise Y.
// Distributivity over Naked Type Parameters: If T is a "naked" generic type parameter (i.e., not wrapped in a tuple, array, or Promise like [T]), the conditional type automatically distributes over union types. IsString < string | mid number> => IsString <string> | IsString<number> => true | false
// Preventing Distribution: Wrap both sides in a tuple: [T] extends [U] ? X : Y.
// Type Inference (infer keyword): Used inside the true branch of a conditional type to declare a temporary type variable that TypeScript extracts from a pattern match.
// Implements algorithmic branching paths directly inside type assignments using a ternary structural format:
// Basic Type Branching
type IsAString<T> = T extends string ? true : false;
type testIsAString1 = IsAString<string>;  // true
type testIsAString2 = IsAString<number>;  // false
// Distributive Behavior over Unions
// Union + Conditional = distributive
type X = IsAString<string | number>;
// Evaluates to: (string extends string ? true : false) | (number extends string ? true : false)
// Resolves to: true | false (boolean)
// Non-Distributive Conditional Type (Prevents splitting unions)
type IsUnionString<T> = [T] extends [string] ? true : false;
type NonDistributed = IsUnionString<string | number>; // false (because `string | number` as a whole does not extend `string`)
// Distributive Filtering Utility: Exclude<T, U>
type CustomExclude<T, U> = T extends U ? never : T;
type RemainingKeys = CustomExclude<"id" | "name" | "createdAt", "createdAt">; 
// Resolves to: "id" | "name"

// Inference Engine (`infer` Keyword)
// Unwraps return type of a function signature (built-in ReturnType<T>)
type CustomReturnType<T> = T extends (...args: any[]) => infer R ? R : never;
// Unwraps nested Promise types recursively
type AwaitedDeep<T> = T extends Promise<infer U> 
  ? AwaitedDeep<U> 
  : T;
// Extract Array element type
type ElementOf<T> = T extends (infer E)[] ? E : T;

// Practical Demonstration Code
interface UserProfile {
  id: number;
  username: string;
  bio: string;
  readonly isVerified: boolean;
  avatarUrl?: string;
}
// Transform UserProfile into getter methods:
// Output: { getId: () => number; getUsername: () => string; ... }
type UserProfileGetters = Getters<UserProfile>;
// Strip out non-string fields from UserProfile:
// Output: { username: string; bio: string; avatarUrl?: string }
type OnlyStringFields = FilterStringProps<UserProfile>;
// Extract Return type of async API call
async function fetchUser(): Promise<UserProfile> {
  return { id: 1, username: "dev", bio: "ts fan", isVerified: true };
}
type FetchedUser = AwaitedDeep<ReturnType<typeof fetchUser>>; 
// Resolves directly to: UserProfile


// ==========================================
// Parsing/Types Conversion
// ==========================================
let strNum: string = "42.5px";

//  some built-in helpers
// Boolean, Number, String
// Number(value)
// - if try to convert a non-primitive value or a string that does not represent a number, the result is NaN
// Boolean(value)
// know this - false, 0, empty string, null, undefined and NaN are Falsy
// String to Number (Explicit)
let parsedInt: number = parseInt(strNum, 10); // 42 (stops at non-numeric characters. '10' is the radix/base)
let parsedFloat: number = parseFloat(strNum); // 42.5
let castNumber: number = Number("42.5"); // 42.5 (Strict: Returns NaN if contains letters)
let unaryCast: number = +"42.5"; // 42.5 (Shorthand for Number())

// Number to String
let numToStr1: string = parsedInt.toString();
let numToStr2: string = String(parsedInt);
let numToStr3: string = `${parsedInt}`; // Template literal coercion

// Type assertions (compile-time only)
// TypeScript Type Assertions (Casting at compile time only, no runtime effect):
let unknownData: unknown = "Hello TS";
let lengthOfData: number = (unknownData as string).length;
let lengthAlt: number = (<string>unknownData).length; // Alternate syntax (clashes with React JSX)

// Type Coercion
// - JavaScript will automatically convert a value to another data type before it evaluates some statement.
// - This implicit conversion is called type coercion.
// In Boolean Context
// - When a non-boolean value is used in a boolean context
// In String Context
// - Addition operator + is used for primitive values and one operand is a string, the other one will be coerced into a string as well
// Numeric Context
// - Many operators coerce the operands into numbers if necessary - unary +, - makes a valid string number


// ==========================================
// Type Checking
// ==========================================
// check the type of a piece of data at runtime using typeof operator
// typeof: returns the type of its operand the output is string matching the name of one of the primtive data types except for null. it can also be function or object
console.log(typeof 42); // "number"
console.log(typeof 3.14); // "number"
console.log(typeof "Hello"); // "string"
console.log(typeof true); // "boolean"
console.log(typeof undefined); // "undefined"
console.log(typeof function () {}); // "function"
console.log(typeof (() => {})); // "function"

console.log(typeof { name: "Alice" }); // "object"
console.log(typeof [1, 2, 3]); // "object" ⚠️ arrays are objects!
console.log(typeof null); // "object" ⚠️ historical quirk!
// Historically, JavaScript’s first implementation classified null with the object type internally. 
// Fixing it would break old JavaScript code, so it stayed.

console.log(typeof 9007199254740991n); // "bigint"
console.log(typeof Symbol("id")); // "symbol"
// For [historical reason// Use typeof to validate input before processings][typeof null is "object"]

// typeof for Type Guards in Functions
// Use typeof to validate input before processing
function valuePorcess(value: unknown): void {
  if (typeof value === "number") {
    console.log("Processing number:", value * 2);
  } else if (typeof value === "string") {
    console.log("Processing string:", value.toUpperCase());
  } else if (typeof value === "boolean") {
    console.log("Processing boolean:", !value);
  } else if (typeof value === "object" && value !== null) {
    console.log("Processing object:", Object.keys(value));
// Returns: an array of strings containing the object's own enumerable property names
  } else {
    console.log("Unknown type");
  }
}
valuePorcess(42); // "Processing number: 84"
valuePorcess("hello"); // "Processing string: HELLO"
valuePorcess({ name: "Alice" }); // "Processing object: ['name']"


// instanceof Operator — Class & Inheritance Checking
// "instanceof operator" — checks if an object is an instance of a class (or if the class appears in the object's prototype chain). Returns boolean. Works ONLY with objects/classes
// for checking type of an object
// it evaluates into a boolean depending on whether the second operand is included in the first operands `prototype chain`.
// To clarify, instanceof will return whether the first operand is an instance of second operand or one of its child classes. instanceof only works on objects.
// In simpler words: it check Was this object created from this class, or from a class that inherits from it?
class Beverage {
  // ...
  temperature: string = "hot";
  drink() {
    console.log("Drinking beverage");
  }
}

// The Coffee class is a child of the Beverage class.
class Coffee extends Beverage {
  // ...
  roastLevel: string = "medium";
  brew() {
    console.log("Brewing coffee");
  }
}

class Tea extends Beverage {
  type: string = "green";
  steep() {
    console.log("Steeping tea");
  }
}

const myPourover = new Coffee();
const myGreenTea = new Tea();

// Check direct class
console.log(myPourover instanceof Coffee); // true
console.log(myGreenTea instanceof Coffee); // false

// Check parent class (prototype chain lookup)
console.log(myPourover instanceof Beverage); // true ✓ (Coffee extends Beverage)
console.log(myGreenTea instanceof Beverage); // true ✓ (Tea extends Beverage)

// All objects inherit from Object
console.log(myPourover instanceof Object); // true
console.log(myGreenTea instanceof Object); // true

// instanceof with Polymorphism
// Use instanceof to determine behavior at runtime
function serveBeverage(beverage: unknown): void {
  if (beverage instanceof Coffee) {
    console.log(`Serving coffee at ${beverage.temperature}`);
    beverage.brew(); // TypeScript knows it has brew()
  } else if (beverage instanceof Tea) {
    console.log(`Serving tea (${beverage.type})`);
    beverage.steep(); // TypeScript knows it has steep()
  } else if (beverage instanceof Beverage) {
    console.log("Serving generic beverage");
    beverage.drink();
  } else {
    console.log("Not a beverage!");
  }
}
serveBeverage(myPourover); // Serving coffee at hot
serveBeverage(myGreenTea); // Serving tea (green)
// passes an object without variable
serveBeverage(new Beverage()); // Serving generic beverage

// Advanced:
// Array class has a method called Array.isArray() that checks if its argument is an array.

// "Array.isArray()" — Safe Array Checking safer than typeof or instanceof for arrays. 
// Works correctly across different realms (e.g., iframes). 
// Avoids false positives where an object just has Array in prototype.

const isArray = [1, 2, 3];
const obj = { 0: "a", 1: "b", length: 2 }; // array-like but not array
const notArray = "not an array";

// typeof check is unreliable
console.log(typeof isArray); // "object" (arrays are objects)
console.log(typeof obj); // "object" (looks like array)
console.log(typeof notArray); // "string"

// Array.isArray() is reliable ✓
console.log(Array.isArray(isArray)); // true ✓
console.log(Array.isArray(obj)); // false ✓ (array-like, but not array)
console.log(Array.isArray(notArray)); // false ✓

// Why Array.isArray() is better than instanceof:
// In iframes or different realms, instanceof can fail
// because each realm has its own Array constructor
const potentialArray: unknown = [1, 2, 3];
if (Array.isArray(potentialArray)) {
  // Now TypeScript knows it's an array
  console.log(potentialArray.map((x) => x * 2)); // [2, 4, 6]
}
// The `in` Operator — Property Existence
// "in operator" — checks whether a property exists on an object. 
// Returns boolean. 
// INCLUDES inherited properties and methods from the prototype chain.
class Animals {
  name: string = "Unknown";
  constructor(name: string) {
    this.name = name;
  }
  speak() {
    console.log(`${this.name} makes a sound`);
  }
}
class Dogs extends Animals {
  breed: string = "Unknown";
  constructor(name: string, breed: string) {
    super(name);
    this.breed = breed;
  }
  bark() {
    console.log(`${this.name} barks!`);
  }
}
const myDog = new Dogs("Rex", "Labrador");

// Check own properties
console.log("name" in myDog); // true (own property from constructor)
console.log("breed" in myDog); // true (own property from constructor)

// Check inherited properties and methods
console.log("speak" in myDog); // true ✓ (inherited from Animals)
console.log("bark" in myDog); // true ✓ (defined on Dogs)
console.log("constructor" in myDog); // true ✓ (inherited from Object)

// Check non-existent property
console.log("color" in myDog); // false (doesn't exist)

// SECTION 7: Object.hasOwn() — Own Property Check (Recommended)
// "Object.hasOwn()" — checks if a property is owned by the object (NOT inherited). 
// Recommended over deprecated hasOwnProperty(). Does NOT check prototype chain.
// Same dog instance from above
console.log(Object.hasOwn(myDog, "name")); // true (own property)
console.log(Object.hasOwn(myDog, "breed")); // true (own property)
// These would be false with Object.hasOwn (unlike `in`)
console.log(Object.hasOwn(myDog, "speak")); // false (inherited method)
console.log(Object.hasOwn(myDog, "bark")); // false (class method, not own)
console.log(Object.hasOwn(myDog, "constructor")); // false (inherited)
console.log(Object.hasOwn(myDog, "color")); // false (doesn't exist)

// SECTION 8: `in` vs Object.hasOwn() Comparison
// Practical use case: filtering own properties from inherited ones
const user1 = {
  name: "Alice",
  age: 25
};
// Walk through all properties
for (const key in user1) {
  if (Object.hasOwn(user1, key)) {
    // keyof extracts the keys
    // typeof user gives object and than keyof pulls keys. and treats key as valid key for user
    console.log(`Own property: ${key} = ${user1[key as keyof typeof user1]}`);
  }
  // With just `in`, you'd also get inherited properties
}
// Better way: use Object.keys() or Object.entries()
Object.entries(user1).forEach(([key, value]) => {
  console.log(`${key}: ${value}`); // Only own properties
});

// SECTION 9: Type Narrowing with Type Guards
// Combine typeof, instanceof, Array.isArray() for type safety
type Input = string | number | boolean | object | null | undefined;
function analyzeInput(input: Input): void {
  // typeof guards
  if (typeof input === "string") {
    console.log(`String length: ${input.length}`);
  } else if (typeof input === "number") {
    console.log(`Number value: ${input * 2}`);
  } else if (typeof input === "boolean") {
    console.log(`Boolean: ${input ? "true" : "false"}`);
  } else if (typeof input === "undefined") {
    console.log("Input is undefined");
  } else if (input === null) {
    // typeof null is "object", so check explicitly
    console.log("Input is null");
  } else if (Array.isArray(input)) {
    // instanceof Array would also work, but Array.isArray() is safer
    console.log(`Array length: ${input.length}`);
  } else if (input instanceof Date) {
    console.log(`Date: ${input.toDateString()}`);
  } else {
    // Generic object
    console.log(`Object keys: ${Object.keys(input).join(", ")}`);
  }
}
analyzeInput("hello"); // String length: 5
analyzeInput(42); // Number value: 84
analyzeInput(true); // Boolean: true
analyzeInput([1, 2, 3]); // Array length: 3
analyzeInput(new Date()); // Date: [today's date]
analyzeInput({ name: "Alice" }); // Object keys: name

// SECTION 10: Real-World Example — Data Validator
interface ValidUser {
  name: string;
  age: number;
  email: string;
}
// Function that validates unknown data and ensures type safety
function validateUser(data: unknown): data is ValidUser {
  // Check if it's an object at all
  if (typeof data !== "object" || data === null || Array.isArray(data)) {
    return false;
  }

  // Check if it has the required properties
  if (
    !Object.hasOwn(data, "name") ||
    !Object.hasOwn(data, "age") ||
    !Object.hasOwn(data, "email")
  ) {
    return false;
  }
  // Type assertions after checks
  const obj = data as Record<string, unknown>;
  // Validate each property's type
  if (typeof obj.name !== "string" || obj.name.length === 0) {
    return false;
  }
  if (typeof obj.age !== "number" || obj.age < 0 || obj.age > 150) {
    return false;
  }
  if (typeof obj.email !== "string" || !obj.email.includes("@")) {
    return false;
  }
  return true;
}
// Using the type guard
const potentialUser: unknown = {
  name: "Alice",
  age: 28,
  email: "alice@example.com"
};
if (validateUser(potentialUser)) {
  // TypeScript now knows it's a ValidUser ✓
  console.log(`Valid user: ${potentialUser.name} (${potentialUser.age})`);
} else {
  console.log("Invalid user data");
}
// SECTION 11: Common Type Checking Mistakes
// Mistake 1: Trusting `in` for private properties
const obj4 = { public: "visible" };
console.log("public" in obj4); // true
console.log("private" in obj4); // false
// `in` checks the prototype chain, which can be unexpected

// Mistake 2: Assuming all objects have a property
const dynamicObj: Record<string, string> = { key: "value" };
if ("key" in dynamicObj) {
  console.log(dynamicObj.key); // ✓ safe to access
}


// ==========================================
// Operators
// ==========================================

// Arithmetic Operator: +, -, *, /, % (modulo), ** (exponentiation)
// Order of Operations:
// - When using multiple operations in a line. JavaScript follows an order of precedence
// - JavaScript uses the PEDMAS (Parentheses, Exponents, Division/Multiplication, Addition/Subtraction)

// Assignment Operator: =, +=, -=, *=, /=, %=, **=
// this simply means e.g (a+=1) -> a = a + 1

// Unary Operator: ++, --, +, -, ~, !
// - unary includes Increment/Decrement they modify a variable in place. ++ adds one to a number, -- subtracts one from a number

// Comparison Operator (Crucial JS/TS distinction):
// - Loose Equality (==, !=): Performs implicit type coercion. (e.g., 5 == "5" is true). AVOID
// - Strict Equality (===, !==): Compares VALUE and TYPE. (e.g., 5 === "5" is false). ALWAYS USE
// Comparison (use === and !==, not == and !=)
const a: number = 10,
  b: number = 5;
console.log(`\nComparison: ${a} > ${b} is ${a > b}`);
console.log(`Comparison: ${a} == ${b} is ${a == b}`);
console.log(`Strict: ${a} === ${b} is ${a === b}`);
// - Relational Operator: >, <, >=, <=

// Logical Operator:
// - && (AND), || (OR), ! (NOT)
console.log(`\nLogical: true && false = ${true && false}`);
console.log(`Logical: true || false = ${true || false}`);
console.log(`Logical: !true = ${!true}`);

// Rest & Spread Operators
// (...) operator that makes it easier to work with indefinite numbers of elements.
// Depending on the context, it's called either a rest operator or spread operator.
// When Appear at left side of assignment- called Rest operator  It collects zero or more values, and stores them into a single array. It must be the last element in a destructuring assignment
const [one, two, ...everythingElse]: number[] = [0, 1, 1, 2, 3, 5, 8];
// When Appear at Right side of assignment - called spread operator It expands an array into a list of elements and can appear more than once
const oneToFive: number[] = [1, 2, 3, 4, 5];
const oneToTen: number[] = [...oneToFive, 6, 7, 8, 9, 10]; // => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const woow: (string | number)[] = [
  "A",
  ...oneToFive,
  "B",
  "C",
  "D",
  "E",
  ...oneToFive,
  42,
];
// ==========================================
// Conditionals (if else family)
// ==========================================
/*
JS/TS evaluates conditions based on "Truthy" and "Falsy" values.
Falsy values (exactly 6): false, 0 (and -0, 0n), "", null, undefined, NaN.
Everything else is Truthy (including empty arrays [] and empty objects {}).
*/
let condVal: any = "Non-empty string is truthy";

if (condVal) {
  // Executes because string is truthy
} else if (condVal === "Specific") {
  // Nested if logic
  if (true) {
  }
} else {
  // Fallback
}

// ==========================================
// other Conditionals (Switch, Ternary)
// ==========================================
/*
Switch uses STRICT equality (===) under the hood.
Omitted `break` causes "fall-through" to the next case (often a bug, sometimes intentional).
*/
let switchVar: string = "B";
switch (switchVar) {
  case "A":
    // Logic for A
    break;
  case "B":
  case "C": // Fall-through: executes for B or C
    // Logic for B and C
    break;
  default:
  // Default logic
}

/*
Ternary Operator: condition ? exprIfTrue : exprIfFalse
Expression, so it evaluates to a value.
*/
let ternaryAge: number = 20;
let status1: string = ternaryAge >= 18 ? "Adult" : "Minor";
console.log(`Ternary status: ${status1}\n`);

// - ?? (Nullish Coalescing): Returns right-hand side ONLY if left is `null` or `undefined`.
// used in  situations where you want to apply a default value in case a variable is null or undefined (but only then)
let nullValue: string | null = null;
let result = nullValue ?? "Default";
console.log(`Nullish coalescing: null ?? "Default" = ${result}`);

interface User {
  name: string;
  age: number;
}
// - ?. (Optional Chaining):
// Safely accesses deeply nested properties
// With the optional chaining operator ?. you can ensure that JavaScript only tries to access the nested key if the parent was not null or undefined.
let devObj: { name: string } | undefined = { name: "Alice" };
let optChain1 = devObj?.name;
console.log(`Optional chaining: userObj?.name = ${optChain1}\n`);

let mathRes: number = 10 ** 2 % 3; // 100 % 3 = 1
let strictCheck: boolean = 10 === 10;
let nullVarr: string | null = null;
let nullishRes = nullVar ?? "Default Value"; // Evaluates to "Default Value"
let optChain = devObj?.name; // Evaluates to "Alice" without throwing if userObj is undefined.

// ==========================================
// Loops
// ==========================================

// for loop
/*
for (initialization; condition; step) {
  // code that is executed repeatedly as long as the condition is true
}
*/
const list: string[] = ["a", "b", "c"];
for (let i = 0; i < list.length; i++) {
  // code that should be executed for each item list[i]
}
let counter: number = 0;
// While loop
while (counter < 3) {
  counter++;
}

// Do-While loop (executes at least once)
do {
  counter--;
} while (counter > 0);

// Standard For loop
for (let i = 0; i < 10; i++) {
  if (i === 5) continue; // Skip to next iteration
  if (i === 9) break; // Exit loop entirely
  console.log(i);
}

// For-Of (iterates over values)
// (Iterates over iterables: Arrays, Strings, Maps, Sets. Yields VALUES)
for (const val of arrNum) {
  // val is 10, then 20, then 30
}
// For-In (iterates over keys/indexes)
// (Iterates over enumerable properties of objects. Yields KEYS/INDEXES)
// Note: Usually avoided for Arrays because it yields string indices ("0", "1").

for (const key in devObj) {
  // key is "name", then "age"
}

// ==========================================
// Import Export
// ==========================================
// Treat this file as an ES module
// export {};

// Common JS way
// declare const require: any;
// const readline = require('node:readline');
// const process = require('node:process');
// ESmodules way
// Namespace import: Imports the entire module as an object
// import { sayHi as Hello} from "./export/export";
// import { user } from "./export/export";
// import defaultFun from "./export/export";
// console.log(Hello("Pengu"));
// console.log(user("nthxdev"));
// import "./export/export";
// defaultFun();

/*
Entry point (Node.js)
if (require.main === module) { console.log(add(5, 3)); }
*/
// import * as readline from "node:readline";
// ==========================================
// Input Output
// ==========================================
/*
Standard Output (Node.js Environment)
*/
console.log("Prints message with a newline");
console.error("Prints to stderr");
// process.stdout.write("Prints WITHOUT a newline. ");
/*
Standard Input (Node.js Environment via 'readline')
(Requires importing the built-in 'node:readline' module)
*/
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// rl.question("Enter age: ", (answer) => {
//   console.log(answer);
//   rl.close();
// });
// ==========================================
// Formatting
// ==========================================
// 1. Template Literals (Backticks). Replaces printf. Supports multiline and interpolation.
let formattedStr: string = `Username is ${devObj.name}.`;

// 2. Number Formatting (Decimal places) -> Returns a string!
let price: number = 19.9934;
let formattedPrice: string = price.toFixed(2); // "19.99"
console.log(`toFixed(2): ${price.toFixed(2)}`);

// 3. Internationalization API (Commas, Currency)
let population: number = 1500000;
let localePop: string = new Intl.NumberFormat("en-US").format(population); // "1,500,000"
console.log(`Locale formatting: ${localePop}`);

// 4. String Padding
let padded: string = "5".padStart(3, "0"); // "005"
console.log(`Padded: ${padded}\n`);

// ==========================================
// Intl API (internationalization)
// ==========================================
const intlValue: number = 42;
const formatted = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
}).format(intlValue);
console.log(formatted); // "42.00"


// ==========================================
// Function basics (Definitions & Context)
// ==========================================

// 1. Function Declaration: Hoisted (can be called before defined in code).
function addExample(a: number, b: number): number {
  return a + b;
}
console.log(`add(5, 10) = ${addExample(5, 10)}`);

// 2. Function Expression: Assigned to a variable. Not hoisted.
const multiplyExample = function (a: number, b: number): number {
  return a * b;
};
console.log(`multiply(5, 10) = ${multiplyExample(5, 10)}`);

// Typed function
function addTyped2(a: number, b: number): number {
  return a + b;
}

// ==========================================
// Function Parameters & Arguments
// ==========================================
// Parameters:
// - placeholder for the value that functions accepts
// function someName(param1, param2, param3) {
// ...
// }
// Arguments:
// - actual value passed to that parameter
// someName(arg1, arg2, arg3);

// Arguments:
// Optional parameters
function greet(name: string, greeting?: string): string {
  return `${greeting || "Hello"}, ${name}!`;
}

console.log(`greet('Alice'): ${greet("Alice")}`);
console.log(`greet('Bob', 'Hi'): ${greet("Bob", "Hi")}`);

// Default parameters
function power(base: number, exponent: number = 2): number {
  return Math.pow(base, exponent);
}
console.log(`power(5): ${power(5)}`);
console.log(`power(5, 3): ${power(5, 3)}`);

// Rest parameters
function sumAll(...numbers: number[]): number {
  return numbers.reduce((a, b) => a + b, 0);
}
console.log(`sumAll(1,2,3,4,5) = ${sumAll(1, 2, 3, 4, 5)}\n`);

/*
Parameters:
- Optional Parameters (`?`): Must come after required parameters.
- Default Parameters (`= value`)
- Rest Parameters (`...args`): Collects remaining arguments into an array.
*/
function buildProfile(
  name: string,
  age?: number,
  role: string = "User",
  ...skills: string[]
): string {
  return `${name} (${role}) knows ${skills.join(", ")}`;
}
// buildProfile("Alice", undefined, "Admin", "JS", "TS", "Go");

// Optional and default parameters
function displayTyped(
  name: string,
  age?: number,
  city: string = "Unknown",
): void {
  console.log(`${name}, ${age}, ${city}`);
}

// Spread operator for calling
const nums = [1, 2, 3];
console.log(Math.max(...nums));

/*
Pass By "Call-by-Sharing" (A subset of Pass by Value):
- Primitives: Passed by exact value copy. Changing it inside does not affect the outside.
- Objects/Arrays: The *reference itself* is passed by value (a copy of the memory address).
  -> Mutating the object's properties inside the function mutates the original object on the Heap.
  -> Reassigning the parameter to a NEW object inside the function does NOT affect the outside variable.
*/
function modifyData(primVal: number, refObj: User): void {
  // void return type
  // Primitive: Local copy changed. Outside `primVal` is untouched.
  primVal = 999;

  // Reference: Mutating the shared heap object. Outside `devObj` IS affected.
  refObj.age = 99;

  // Reference: Reassigning the pointer. Outside `devObj` is NOT affected by this line.
  refObj = { name: "Bob", age: 10 };
}

// Primitives: pass by value
let primitiveVal = 10;
function modifyPrimitive(val: number): void {
  val = 999;
  console.log(`  Inside function: ${val}`);
}

console.log(`Before: ${primitiveVal}`);
modifyPrimitive(primitiveVal);
console.log(`After: ${primitiveVal} (unchanged)\n`);

// Objects: pass by call-by-sharing
interface DataObj {
  value: number;
}

let objVal: DataObj = { value: 10 };
function modifyObject(obj: DataObj): void {
  obj.value = 999;
  console.log(`  Inside function: ${obj.value}`);
}

console.log(`Before: ${objVal.value}`);
modifyObject(objVal);
console.log(`After: ${objVal.value} (changed!)\n`);

// let outsideNum = 1;
// const outsideObj: User = { name: "Eve", age: 20 };
// modifyData(outsideNum, outsideObj);
// outsideNum is still 1.
// outsideObj is now { name: "Eve", age: 99 }.

// Pass by value (primitives)
function modify_value(x: number) {
  x = 100; // Only changes local copy
}
let value = 5;
modify_value(value);
console.log(value); // Still 5

// Pass by reference (objects/arrays)
function modify_array(arr: number[]) {
  arr.push(4); // Modifies original
}
let numbers = [1, 2, 3];
modify_array(numbers);
console.log(numbers); // [1, 2, 3, 4]

// ==========================================
// Arrow Functions
// ==========================================
/*
Arrow Functions: ES6 shorthand. 
Crucial Engine Detail: Arrow functions do NOT have their own `this` binding. 
They lexically capture `this` from the surrounding outer scope.
*/
const subtract = (a: number, b: number): number => a - b; // Implicit return
console.log(`subtract(10, 3) = ${subtract(10, 3)}`);

// Destructuring parameters
function display({ name, age }: { name: string; age: number }) {
  console.log(`${name} is ${age}`);
}
display({ name: "Alice", age: 25 });

// Typed arrow function
const multiplyTyped2 = (a: number, b: number): number => a * b;

// ==========================================
// Callbacks Functions
// ==========================================
//  functions passed as arguments
// This programming pattern creates a sequence of function calls in both synchronous and asynchronous programming
// writing it is not different from normal function however,
// the callback function must match the signature defined by the calling function
const sideLength = 5;
// function applySideLength(callback: Function) { ... } // avoid this it's lazy way ts stops checking
// recommended to write the real shape of the function
function applySideLength(callback: (side: number) => number) {
  return callback(sideLength);
}
function areaOfSquare(side: number) {
  return side * side;
}
applySideLength(areaOfSquare); // => 25

// ==========================================
// Recursive Functions
// ==========================================
// Recursion occurs when a function calls itself, either directly or indirectly.
// It's similar to a loop, but it involves breaking a problem down into smaller, more manageable sub-problems.
// it includes :
// Base Case: The condition under which the recursion stops. every recursive function should have one or more base class that stops recursion
// Recursive Case: The part of the function that calls itself with modified arguments, moving towards the base case.
// Recursive function
function factorial(n: number): number {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}

// ==========================================
// Scope & Closures
// ==========================================
let globalVar: number = 23;

function scope() {
  let localscope: string = "i am local scope inside function";
}

if (true) {
  var functionScoped: number = 10; // Function-scoped
}
console.log(functionScoped); // 10 ✓ (var escapes block)
// Error ✗
// console.log(blockScoped);

// Block Scope
// let and const are block-scoped. Only accessible inside {} blocks.
if (true) {
  let message: string = "Hello";
  const count: number = 10;

  console.log(message); // ✓ Works
}
// ✗ Error - outside block
// console.log(message);

// 1. Handling Scope Access Errors (ReferenceError)
try {
  // @ts-ignore - Bypassing TypeScript compile-time check to simulate runtime execution
  console.log(localscope);
} catch (error) {
  if (error instanceof ReferenceError) {
    console.error("Scope Error caught:", error.message);
    // Output: localscope is not defined
  }
}

// Execution Context
// An invisible working environment where JavaScript code executes.
// When a function runs, it gets its own execution context with:
// Memory for variables
// Function references
// Scope information
// The actual code execution

// Closures
// A function that remembers and can access variables from its lexical outer scope, even after the outer function has finished executing
function createCounter() {
  let count: number = 0; // Outer variable

  return function () {
    count++; // Inner function uses outer variable
    return count;
  };
}
const counterFunc = createCounter();
console.log(counterFunc()); // 1
console.log(counterFunc()); // 2
console.log(counterFunc()); // 3

// Scope Chain Rule
// Inner scopes see outer scopes. Outer scopes don't see inner scopes.
const scopeGlobal = 1; // Global
function outer() {
  const scopeOuter = 2; // Outer function scope
  function inner() {
    const scopeInner = 3; // Inner function scope
    console.log(scopeGlobal); // ✓ Yes (global)
    console.log(scopeOuter); // ✓ Yes (outer function)
    console.log(scopeInner); // ✓ Yes (own scope)
  }
  inner();
  // ✗ Error (can't see inner)
  // console.log(c);
}

// Function Factory
function createMultiplier(multiplier: number) {
  return function (number: number) {
    return number * multiplier;
  };
}
const doublenum = createMultiplier(2);
const triplenum = createMultiplier(3);
console.log(doublenum(5)); // 10 (remembers 2)
console.log(triplenum(5)); // 15 (remembers 3)
// Each function remembers its own multiplier

// Encapsulation - Hide & Control
// Hide internal data and only expose controlled operations.
function createAccount() {
  let balance = 0; // Private - hidden from outside

  return {
    deposit(amount: number) {
      if (amount > 0) {
        balance += amount;
      }
    },

    withdraw(amount: number) {
      if (amount <= balance) {
        balance -= amount;
      }
    },

    getBalance() {
      return balance;
    },
  };
}
const account = createAccount();
account.deposit(100);
account.withdraw(30);
console.log(account.getBalance()); // 70
// Can't directly access balance:
// undefined as hidden from outside
// console.log(account.balance);

// Practical: Private Variables with Closure
// Closure with setTimeout
function setupTimers() {
  for (let i = 1; i <= 3; i++) {
    setTimeout(() => {
      console.log("Timer " + i);
    }, i * 1000);
  }
}
setupTimers();

// Function Overloading
// function processInput(value: number): number;
// function processInput(value: string | number): string | number {
//   if (typeof value === "string") {
//     return value.toUpperCase();
//   }
//   return value * 2;
// }


// ==========================================
// Error Handling
// ==========================================
/*
try/catch/finally — how it works:
When code throws an error, JS stops running that code right away and
looks UP the call stack for the nearest `try` block that can handle it.
- If it finds one: control jumps to that `catch` block.
- If it finds none: the program crashes (uncaught error).
try/catch/finally:
- `try` block runs code that might throw.
- `catch` block runs if an error is thrown. In TS 4.4+, the caught error
  is typed as `unknown` by default (not `any`), forcing type-narrowing before use.
- `finally` block ALWAYS runs, whether an error was thrown or not (cleanup logic).
`finally` always runs at the end, no matter what — even if `try` or
`catch` had a `return` or another `throw` inside. Good for cleanup
(closing files, closing connections, etc).
*/
try {
  // Code that might break goes here
} catch (error) {
  // This runs IF something breaks
  // error = information about what went wrong
}
// Error Object - gives you an error object with info about what went wrong
// error object has properties:
// message — the error description (human-readable)
// name — the error type (like "Error", "TypeError", "ReferenceError")
// stack — the full trace of where the error happened (for debugging)
try {
  throw new Error("Something failed");
} catch (error) {
  // In modern TS, `error` is typed as `unknown`, not `any`.
  // So you must check its type before touching .message by checking is error instanceof Error
  if (error instanceof Error) {
    console.log(`Caught: ${error.message}`);
  } else {
    console.log(`Caught something that isn't an Error: ${error}`);
  }
} finally {
  console.log("This runs no matter what happened above");
}
// You could throw literally anything:
// throw "A string";
// throw 42;
// throw { custom: "object" };

// Built-in error types
/*
JS already gives you several error types, all built on top of Error:
- ReferenceError -> using a variable that doesn't exist / isn't in scope
- TypeError       -> calling something that isn't a function, or reading a property on undefined/null
- SyntaxError     -> broken syntax (JSON.parse can throw this at runtime)
- RangeError      -> a number is outside the allowed range
*/
// Example: ReferenceError (accessing a variable that's out of scope)
try {
  // @ts-ignore - forcing TS to let this run so we can see the real error
  console.log(notDefinedAnywhere);
} catch (error) {
  if (error instanceof ReferenceError) {
    console.log(`ReferenceError caught: ${error.message}`);
  }
}
// Example: TypeError (reading a property on undefined)
interface UserProfile {
  // ? means optional - may or may not exists
  profile?: {
    name?: string;
  };
}
let maybeUser: UserProfile | undefined;

try {
  // @ts-ignore - this will throw because maybeUser is undefined
  console.log(maybeUser.profile.name);
} catch (error) {
  if (error instanceof TypeError) {
    console.log(`TypeError caught: ${error.message}`);
  }
}
// Safer way to avoid that TypeError in the first place:
// optional chaining (?.) + nullish coalescing (??)
// Safely returns undefined if anything is missing + Provide a fallback
console.log(maybeUser?.profile?.name ?? "Default Name"); // no crash

// Custom Error classes (extending built-in Error)
// Making your own error types
// Extending Error lets you throw specific, recognizable error types, and check for them later with `instanceof`.
// Useful for distinguishing error types via `instanceof` checks.
class ValidationError extends Error {
  field: string;

  constructor(message: string, field: string) {
    super(message); // send message up to Error base class
    this.name = "ValidationError"; // Overrides default "Error" name shows up instead of plain "Error"
    this.field = field;
    // Required for proper prototype chain when extending built-ins in TS
    Object.setPrototypeOf(this, ValidationError.prototype); // needed in TS
  }
}

function validateAge(age: number): void {
  if (age < 0) {
    throw new ValidationError("Age cannot be negative", "age");
  }
}

try {
  validateAge(-5);
} catch (error) {
  if (error instanceof ValidationError) {
    console.log(`ValidationError on '${error.field}': ${error.message}`);
  } else if (error instanceof Error) {
    console.log(`Some other error: ${error.message}`);
  }
}

// Re-throwing an error to an outer catch
// Nested try/catch: inner catch can re-throw to an outer handler
function parseJsonSafely(data: string): number {
  try {
    const parsed = JSON.parse(data); // may throw SyntaxError
    return parsed.value;
  } catch (error) {
    console.log("Couldn't parse, sending error upward...");
    throw error; // propagate to caller's try/catch let the caller deal with it
  }
}
try {
  parseJsonSafely("{ Invalid json");
} catch (error) {
  if (error instanceof SyntaxError) {
    console.log(`SyntaxError caught outside: ${error.message}`);
  }
}
// finally can override everything (be careful!)
// If finally has its own return/throw, it wins — it silences whatever
// happened in try or catch. Usually you want to AVOID doing this.
function overrideExample(): string {
  try {
    throw new Error("Original error");
  } catch (error) {
    return "Returned from catch";
  } finally {
    return "Returned from finally"; // this wins, error is hidden
  }
}
console.log(overrideExample()); // "Returned from finally"

// try/catch with async/await
/*
IMPORTANT: try/catch only works on SYNCHRONOUS code by default.
It can NOT catch errors thrown inside setTimeout or other async
callbacks unless you use async/await, because await makes the
async code behave like synchronous code for error-catching purposes.
*/

// This does NOT work as expected — catch never runs:
// try {
//     setTimeout(() => { throw new Error("Too late!"); }, 100);
// } catch (error) {
//     console.log("This will NEVER run");
// }

// This DOES work — await lets try/catch see the async error:
async function fetchDataSafely(shouldFail: boolean): Promise<string> {
  try {
    if (shouldFail) {
      throw new Error("Async operation failed");
    }
    return "Data fetched";
  } catch (error) {
    if (error instanceof Error) {
      console.log(`Async catch: ${error.message}`);
    }
    return "Fallback value";
  }
}

// A reusable "safe runner" pattern
// Wrap any function call so errors are handled in one place instead
// of repeating try/catch everywhere.
function executeSafely(fn: () => void): void {
  try {
    fn();
  } catch (error: any) {
    console.log(`[${error.name}]: ${error.message}`);
  }
}

executeSafely(() => {
  throw new TypeError("Example forced error");
});


// ==========================================
// DOM (Document Object Model)
// ==========================================

// TypeScript's built-in DOM library (lib.dom.d.ts) ships type definitions for the entire browser DOM API
// 1. EventTarget: built-in TypeScript interface/type from the DOM types
// -> anything that can have .addEventListener() called on it. window, document, XMLHttpRequest, and every DOM node all satisfy this
// -> vent handler properties like event.target and event.currentTarget are typed as EventTarget | null. bcoz ts doesn't know in advance what fired event
function handle(target: EventTarget) {
  // Accept Anything that has event
}
// 2. Element: Generic element offers stuff common to all elements like - ?.classList, ?.getAttribute("") | but not ?.click(), ?.value
// document.querySelector() returns Element | null by default if you don't specify a type.
// const button = document.querySelector<HTMLButtonElement>("#btn");  --> Now TypeScript sees HTMLButtonElement | null
// More DOM types - HTMLElement, HTMLDivElement, HTMLInputElement, HTMLButtonElement,  HTMLImageElement, HTMLAnchorElement..... and so on-> know that
const form = document.querySelector<HTMLFormElement>("#form");
const btnform = document.querySelector<HTMLButtonElement>("#btn-form");
const cursorX = document.querySelector<HTMLElement>("#clientX");
const cursorY = document.querySelector<HTMLElement>("#clientY");
const cursor = document.querySelector<HTMLDivElement>("#cursor");
const follower = document.querySelector<HTMLDivElement>("#follower");
const eye = document.querySelector<SVGSVGElement>("#eye");
const pupil = document.querySelector<SVGCircleElement>("#pupil");

// The browser exposes window (the global object)
// Window offers (DOM entry point) - Represent the entire page HTML tree

// DOM Selectors - Returns: Single HTML element, NodeList(static), HTMLCollection(live)
// querySelector()
// querySelectorAll()
// getElementById()
// getElementsByClass()
/*
Array-like structures: NodeList vs HTMLCollection
NodeList (static): querySelectorAll() | Snapshot at moment of query
— doesn't update if DOM changes | loop with for...of or forEach()
HTMLCollection (live): getElementsByClassName() | Updates automatically
— slower, rarely needed | has .length but limited method
*/
// NodeListOf<T> - Return type of querySelectorAll()
// A static snapshot (doesn't update if DOM changes later). Has .forEach() and is iterable with for...of, but lacks most Array methods (.map, .filter) directly.

// HTMLCollectionOf<T> - Return type of getElementsByClassName() / getElementsByTagName()
// A live collection — automatically updates if you add/remove matching elements from the DOM. Array-like (.length, indexable) but no .forEach().

form?.addEventListener("mouseenter", (e) => {
  // Styling with DOM - Affects rendering either Direct: style.color / via CSS: classList
  // element.style.property
  // element.classList.add()
  // element.classList.remove()
  // element.getAttribute()
  form?.classList.toggle("form-hover");
  // More:
  // contains('');
  // remove('');
  // toggle(''); -> Add if missing, remove if present
});

// Most DOM code in TypeScript is written just like JavaScript
// Usually don't manually write the type—let TS infer it.
// TypeScript infers:
// button → Element | null
// querySelectorAll() → NodeListOf<Element>
// getElementById() → HTMLElement | null

// ==========================================
// Events
// ==========================================

// Event - The Base type
// every event has these: .target, .currentTarget, .preventDefault(), .stopPropagation(), .type
// Event object - When an event happens, browser automatically passes an object with event details:
let clicked: boolean = false;
const eventFunc = (event: MouseEvent) => {
  console.log(event.target); // e is the event object
  const eventbutton = event.currentTarget as HTMLButtonElement;
  // or
  clicked = !clicked;

  eventbutton!.innerText = clicked ? "button clicked" : "Event button";
  // (event.target as HTMLElement).style.textDecoration ="line-through";
  eventbutton!.style.textDecoration = clicked ? "line-through" : "none"; // HTMLButtonElement already inherit HTMLElement Properties
  // e.target -> The element where event happened
  // e.type -> Event name (e.g., "click")
  // e.key -> Keyboard key pressed
  // e.clientX -> Mouse horizontal position
  // e.clientY -> Mouse vertical position
  event.preventDefault(); // preventDefault() = Stop browser's default behavior
  console.log(event.clientX, event.clientY); // Track mouse position
  // Note: Arrow functions don't have their own this. Use regular functions if you need this
  console.log(event.type);
  // Accessing Element Inside Listener using this:
  console.log(this); // this = the button element, this in arrow function will point to global object, not button
  // Event Bubbling
  // When you click a child element, the event travels UP to parent elements:
  event.stopPropagation(); // Event won't go to parent
  // Event Delegation (Smart Pattern)
  // Instead of adding listeners to many elements, add ONE listener to parent
};
// click -> Single click
// dblclick -> Double click
// input -> Text typed/deleted/pasted in input
// change -> Dropdown/checkbox/file input changed
// submit -> Form submitted
// keydown -> Key pressed -> key.up
// keyup -> Key released
// mouseover -> Mouse enters element
// mouseout -> Mouse leaves element
// mousemove -> Mouse moves
// focus -> element get focus
btnform?.addEventListener("click", eventFunc);

// MoUuseEvent
// Adds mouse-specific data: .clientX/Y, .button, .altKey, .ctrlKey, .shiftKey
document.addEventListener("mousemove", (e: MouseEvent) => {
  // coz of ts strict null checking add Conditional
  if (cursorX && cursorY) {
    cursorX.innerText = e.clientX.toString();
    cursorY.innerText = e.clientY.toString();
  }
});

document.addEventListener("mousemove", (event: MouseEvent) => {
  cursor!.style.left = `${event.clientX}px`;
  cursor!.style.top = `${event.clientY}px`;
});
btnform?.addEventListener("mouseenter", () => {
  cursor?.classList.add("button-cursor");
});

btnform?.addEventListener("mouseleave", () => {
  cursor?.classList.remove("button-cursor");
});

let followX: number = 0;
let followY: number = 0;
let followerX: number = 0;
let followerY: number = 0;
const speed: number = 0.099; // Adjust the speed of the follow
let followState: boolean = false;
const pupilMaxDistance: number = 100;
const pupilCenterX = 1086;
const pupilCenterY = 1026;

document.addEventListener("mousemove", (event: MouseEvent) => {
  if (followState) return;
  followX = event.clientX;
  followY = event.clientY;
});
function followCursor() {
  if (!followState) {
    follower!.classList.remove("btn-hover");
    followerX += (followX - followerX) * speed;
    followerY += (followY - followerY) * speed;
    follower!.style.left = `${followerX}px`;
    follower!.style.top = `${followerY}px`;
    // eye center
    const eyeRect = eye!.getBoundingClientRect();
    const eyeCenterX = eyeRect.left + eyeRect.width / 2;
    const eyeCenterY = eyeRect.top + eyeRect.height / 2;
    const dx = followX - eyeCenterX;
    const dy = followY - eyeCenterY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance > 0) {
      const directionX = dx / distance;
      const directionY = dy / distance;
      const pupilX = pupilCenterX + directionX * pupilMaxDistance;
      const pupilY = pupilCenterY + directionY * pupilMaxDistance;

      pupil!.setAttribute("cx", `${pupilX}`);
      pupil!.setAttribute("cy", `${pupilY}`);
    }
    // const angle = Math.atan2(dy, dx);
    // const pupilDistance = Math.min(distance, pupilMaxDistance);
    // const pupilX = pupilDistance * Math.cos(angle);
    // const pupilY = pupilDistance * Math.sin(angle);
    // pupil!.setAttribute("cx", `${eyeCenterX + pupilX}`);
    // pupil!.setAttribute("cy", `${eyeCenterY + pupilY}`);
  }
  // requestAnimationFrame() - Better for Animations
  // For smooth animations, use requestAnimationFrame() instead of setInterval()
  // Why it's better:
  // Syncs with browser refresh rate (60fps)
  // Better performance
  // Smoother animations
  requestAnimationFrame(followCursor); // Repeat smoothly
}
followCursor();

btnform?.addEventListener("mouseenter", () => {
  if (!form || !follower) return;

  followState = true;
  const rect = form.getBoundingClientRect();
  follower!.classList.add("btn-hover");

  follower.style.left = `${rect.left}px`;
  follower.style.top = `${rect.top}px`;

  follower.style.width = `${rect.width}px`;
  follower.style.height = `${rect.height}px`;

  follower.classList.add("form-hover");
  cursor?.classList.add("btn-cursor");
});

btnform?.addEventListener("mouseleave", () => {
  followState = false;
  follower!.classList.remove("btn-hover");
  follower!.style.width = "40px";
  follower!.style.height = "40px";

  follower!.classList.remove("form-hover");
  cursor?.classList.remove("btn-cursor");
});

// KeyboardEvent
// Adds .key, .code, .altKey, .ctrlKey, .shiftKey, .repeat. Used for keydown, keyup, keypress
// Input event
// e.data = only the character just typed
// e.target.value = entire input text (use this most often)

// InputEvent
// Fires on the input event (as you type). Adds .data (the character(s) inserted) and .inputType (e.g. "insertText", "deleteContentBackward").
// Careful: e.target in an input handler is typed as EventTarget | null, not HTMLInputElement — you still need to cast it

// SubmitEvent
// Fires on form submit. Adds .submitter — the button that triggered the submit (useful when a form has multiple submit buttons)

// FocusEvent
// Fires on focus / blur / focusin / focusout. Adds .relatedTarget — the element losing/gaining focus in the transition

// DragEvent
// Fires on dragstart, drag, dragover, drop, etc. Adds .dataTransfer — the object you use to read/write dragged data.

// TouchEvent
// Mobile/touchscreen events (touchstart, touchmove, touchend). Adds .touches, .changedTouches — lists of active touch points (for multi-touch gestures).

// PointerEvent
// A unified event covering mouse, touch, AND pen input in one API (pointerdown, pointermove, pointerup). Adds .pointerType ("mouse", "touch", "pen"), .pressure. Modern preferred way to handle mixed input devices instead of writing separate mouse and touch handlers.

// WheelEvent
// Fires on wheel (scroll wheel / trackpad scroll). Adds .deltaX/Y/Z — how much was scrolled, and .deltaMode — units (pixels, lines, or pages)

// CustomEvent<T>
// For events you define and dispatch yourself — not a browser-native trigger. The generic T types .detail, the payload you attach.
// type MyDetail = { userId: number };

// const evt = new CustomEvent<MyDetail>('user-login', {
//   detail: { userId: 42 }
// });

// el.addEventListener('user-login', (e: Event) => {
//   const custom = e as CustomEvent<MyDetail>;
//   console.log(custom.detail.userId); // 42, fully typed
// });

// el.dispatchEvent(event);

// About ChangeEvent — you were right to flag it
// ChangeEvent is not a native DOM type at all. It's from @types/react, specifically typed for React's synthetic event system:
// React only:
// import { ChangeEvent } from 'react';

// function handleChange(e: ChangeEvent<HTMLInputElement>) {
//   // React's synthetic event, wraps the native one
//   console.log(e.target.value);
// }

// ==========================================
// Form Validation
// ==========================================
// Form Validation?
// Checking if user data is correct before submitting the form
// Basic Flow:
// 1. Listen for form submit
// 2. Stop default submission
// 3. Read input values
// 4. Check each rule
// 5. Show errors or success

const username = document.querySelector<HTMLInputElement>("#username");
const password = document.querySelector<HTMLInputElement>("#password");
form?.addEventListener("submit", (event) => {
  event.preventDefault(); // Stop default form submission
  // if(username?.value.trim().length <=2){
  //  nameError.style.display = "block"; // Show Error
  // }else{
  // nameError.style.display = "none"; // Hide Error
  // }
});

// ==========================================
// Regex
// ==========================================
// Regular Expressions (Regex)
// Regex = a pattern to match text against rules.
// Basic syntax:
{
  const regex: RegExp = /pattern/;
  const isValid: boolean = regex.test("value");
}

// Test method returns:
// true = matches pattern
// false = doesn't match

// Simple examples:
{
  // Lowercase letters only, 3-8 characters
  const regex1: RegExp = /^[a-z]{3,8}$/;
  console.log(regex1.test("hello")); // true
  console.log(regex1.test("HELLO")); // false (uppercase)
  console.log(regex1.test("hi")); // false (too short)

  // Letters and numbers, 3-20 characters
  const regex2: RegExp = /^[A-Za-z0-9_]{3,20}$/;
  console.log(regex2.test("harsh_123")); // true
  console.log(regex2.test("ha")); // false (too short)
  console.log(regex2.test("harsh@123")); // false (@ not allowed)
}

// Email Validation
{
  const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
}

// HTML Built-in Validation Attributes
// Browser can validate without JavaScript:
// <!-- Required field -->
// <input type="text" required>

// <!-- Minimum length -->
// <input type="text" minlength="3">

// <!-- Maximum length -->
// <input type="text" maxlength="10">

// <!-- Email format -->
// <input type="email" required>

// <!-- Number range -->
// <input type="number" min="18" max="60">

// Problem: User can remove these attributes using DevTools.
// Solution: Use JavaScript validation on backend.

// Basic validation
// input/error are illustrative placeholders for real DOM elements
// querySelector() returns HTMLElement | null
const input = document.querySelector<HTMLInputElement>("#input");
const error = document.querySelector<HTMLElement>("#error");
if (input && error) {
  if (input.value.trim().length < 3) {
    error.textContent = "Too short";
  }
  // Regex validation
  const regex: RegExp = /pattern/;

  if (!regex.test(input.value)) {
    error.textContent = "Invalid format";
  }
}

// Regex Flags (Modifiers)
// "Regular Expression Flags" — optional modifiers that alter how the pattern matching works. Flags are added after the closing slash in literal notation, or as a second argument in the RegExp constructor

// Common Flags:
// /g  - Global: find ALL matches, not just the first
// /i  - Case Insensitive: ignore uppercase/lowercase differences
// /m  - Multiline: ^ and $ match line starts/ends, not just string start/end

// Example with flags:
{
  const text = "Home sweet home in Home, Kentucky";

  // Without /g: only first match
  const match1 = text.match(/home/i);
  console.log(match1); // ["Home"] — only first match

  // With /g: all matches
  const match2 = text.match(/home/gi);
  console.log(match2); // ["Home", "home", "Home"] — all matches
}

// RegExp Constructor vs Literal Notation
// "Regular Expression Creation Methods" — two syntaxes for creating regex objects. Literal is preferred for static patterns; Constructor is used when the pattern is dynamic or unknown upfront

// Literal notation (preferred, immutable):
const literal1: RegExp = /[a-z]/gi;

// Constructor notation (when pattern is dynamic):
const pattern: string = "[a-z]";
const constructor1: RegExp = new RegExp(pattern, "gi");

// Constructor with regex literal (ES6+):
const constructor2: RegExp = new RegExp(/[a-z]/, "gi");

// Use constructor when pattern comes from user input or is computed:
{
  const userPattern = prompt("Enter a search pattern:") || "test";
  const dynamicRegex: RegExp = new RegExp(userPattern, "gi");
  console.log("hello test world".match(dynamicRegex));
}

// match() Method (Search & Extract)
// "String.match()" — searches a string for regex matches. Returns an array of matches with metadata (without /g flag) or just the matches (with /g flag). Returns null if no matches found

{
  const quote = "The quick brown fox jumps over the lazy dog";

  // Without /g: returns match array with index, input, groups
  const match1: RegExpMatchArray | null = quote.match(/quick/);
  console.log(match1);
  // => ["quick", index: 4, input: "The quick brown...", groups: undefined]

  // With /g: returns array of all matches (no metadata)
  const match2: RegExpMatchArray | null = quote.match(/[aeiou]/g);
  console.log(match2);
  // => ["u", "i", "o", "o", "u", "o", "e", "a", "o"]

  // No match: returns null
  const match3: RegExpMatchArray | null = quote.match(/xyz/);
  console.log(match3); // null
}

// replace() Method (Search & Substitute)
// "String.replace()" — finds matches and replaces them with a new value. With /g flag, replaces ALL matches; without it, only replaces the FIRST match. The replacement can be a string or a function that returns the replacement
{
  const text = "cats and dogs and cats";

  // Replace first occurrence only:
  const replace1: string = text.replace(/cats/, "birds");
  console.log(replace1); // "birds and dogs and cats"

  // Replace all occurrences (need /g):
  const replace2: string = text.replace(/cats/g, "birds");
  console.log(replace2); // "birds and dogs and birds"

  // Case-insensitive replace all:
  const text2 = "Hello hello HELLO";
  const replace3: string = text2.replace(/hello/gi, "hi");
  console.log(replace3); // "hi hi hi"

  // Replace with a function (advanced):
  const text3 = "I have 3 apples and 5 oranges";
  const replace4: string = text3.replace(/\d+/g, (match: string) => {
    return `[${match}]`; // Wrap numbers in brackets
  });
  console.log(replace4); // "I have [3] apples and [5] oranges"
}

// split() Method (Pattern-based String Division)
// "String.split()" — divides a string into an array by splitting at matches of the regex pattern. The pattern itself is NOT included in the result (unlike many other languages)

{
  const csv = "apple,banana;orange,grape;kiwi";

  // Split by comma or semicolon:
  const split1: string[] = csv.split(/[,;]/);
  console.log(split1);
  // => ["apple", "banana", "orange", "grape", "kiwi"]

  // Split by whitespace (including tabs, newlines):
  const sentence = "hello   world\t\tthere";
  const split2: string[] = sentence.split(/\s+/);
  console.log(split2); // ["hello", "world", "there"]

  // Split by multiple patterns:
  const mixed = "one-two,three.four;five";
  const split3: string[] = mixed.split(/[-,.;]/);
  console.log(split3); // ["one", "two", "three", "four", "five"]
}

// Practical: Real-World Email Validation with All Methods
{
  const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  const email1 = "user@example.com";
  const email2 = "ADMIN@COMPANY.CO.UK";
  const email3 = "invalid.email@";

  // Using test() — just check if valid:
  console.log(emailRegex.test(email1)); // true
  console.log(emailRegex.test(email3)); // false

  // Using match() — extract the match:
  console.log(email1.match(emailRegex)); // full match details

  // Using split() — extract parts (domain, local):
  const parts: string[] = email1.split(/@/);
  console.log(parts); // ["user", "example.com"]
}

// Practical: Search, Extract, and Manipulate URLs
{
  const url = "Visit https://www.example.com/path and https://example.org";

  // Extract all URLs:
  const urlRegex: RegExp = /https?:\/\/[^\s]+/g;
  const urls: RegExpMatchArray | null = url.match(urlRegex);
  console.log(urls); // ["https://www.example.com/path", "https://example.org"]

  // Replace domains:
  const replaced: string = url.replace(
    /https?:\/\/([^\s/]+)/g,
    (match: string, domain: string) => {
      return `[${domain}]`; // Wrap domain in brackets
    },
  );
  console.log(replaced);
  // "Visit [www.example.com]/path and [example.org]"
}

// Email regex
// /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

// Strong password regex
// /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/

// COMPLETE FORM VALIDATOR
{
  const form = document.querySelector("form") as HTMLFormElement | null;
  const nameInput = document.querySelector("#name") as HTMLInputElement | null;
  const emailInput = document.querySelector(
    "#email",
  ) as HTMLInputElement | null;
  const passwordInput = document.querySelector(
    "#password",
  ) as HTMLInputElement | null;

  const nameError = document.querySelector("#nameError") as HTMLElement | null;
  const emailError = document.querySelector(
    "#emailError",
  ) as HTMLElement | null;
  const passwordError = document.querySelector(
    "#passwordError",
  ) as HTMLElement | null;
  const result = document.querySelector("#result") as HTMLElement | null;

  // Regex patterns
  const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const passwordRegex: RegExp =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

  if (
    form &&
    nameInput &&
    emailInput &&
    passwordInput &&
    nameError &&
    emailError &&
    passwordError &&
    result
  ) {
    form.addEventListener("submit", (event: SubmitEvent) => {
      event.preventDefault();

      // Step 1: Clear old errors
      nameError.textContent = "";
      emailError.textContent = "";
      passwordError.textContent = "";
      result.textContent = "";
      nameInput.classList.remove("error");
      emailInput.classList.remove("error");
      passwordInput.classList.remove("error");
      // Step 2: Read values
      const nameIsValid: boolean = nameInput.value.trim().length >= 3;
      const emailIsValid: boolean = emailRegex.test(emailInput.value);
      const passwordIsValid: boolean = passwordRegex.test(passwordInput.value);

      // Step 3: Start with assuming valid
      let isValid: boolean = true;

      // Step 4: Show errors if invalid
      if (!nameIsValid) {
        nameError.textContent = "Name must be 3+ characters";
        isValid = false;
      }

      if (!emailIsValid) {
        emailError.textContent = "Enter a valid email";
        isValid = false;
      }

      if (!passwordIsValid) {
        passwordError.textContent =
          "Password needs 8+ chars, uppercase, lowercase, number, special char";
        isValid = false;
      }

      // Step 5: Show success if all valid
      if (isValid) {
        result.textContent = "✓ Form submitted successfully!";
      }
    });
  } else {
    console.error("One or more form elements were not found in the DOM.");
  }
}

// ==========================================
// Timers
// ==========================================
// Timers let you run code after a delay or repeatedly at intervals. JavaScript has two main timer functions
// setTimeout() - Run Code Once After Delay
// Runs a function ONE TIME after specified milliseconds
// setTimeout(function, delayInMilliseconds);
setTimeout(function () {
  console.log("This runs after 2 seconds");
}, 2000);
// setTimeout() with Named Functions
// Remember: No parentheses after function name!

// Passing Arguments to setTimeout()
// setTimeout(function, delay, arg1, arg2, arg3, ...);
// Pass extra parameters after the delay:

function timerGreet(name: string, age: number) {
  console.log(`Hello ${name}, you are ${age} years old`);
}
// After 2 seconds: "Hello Ali, you are 25 years old"
setTimeout(timerGreet, 2000, "Ali", 25);
// Storing setTimeout ID (Canceling Timer)
// Every setTimeout() returns a unique ID. You can use it to cancel the timer:
const timerId = setTimeout(() => {
  console.log("This might not run");
}, 5000);
// Cancel the timer before 5 seconds pass
clearTimeout(timerId);
console.log("Timer cancelled!");

// Without canceling, message prints after 5 seconds.
// With clearTimeout(), message never prints.

// setInterval() - Run Code Repeatedly
// Runs a function repeatedly at fixed time intervals
setInterval(function () {
  console.log("This runs every 2 seconds");
}, 2000);
// Will keep running forever (until you stop it)
// Example:
function updateClock() {
  const time = new Date().toLocaleTimeString();
  console.log(time);
}
setInterval(updateClock, 1000); // Update every 1 second

// Stopping setInterval() with clearInterval()
// Store the interval ID and use clearInterval() to stop it
let count = 0;
const intervalIds = setInterval(() => {
  count++;
  console.log(count);

  if (count === 5) {
    clearInterval(intervalIds); // Stop the interval
    console.log("Stopped!");
  }
}, 1000);

const search = document.querySelector<HTMLInputElement>("#search");
const mouseBox = document.querySelector<HTMLDivElement>("#mouse-box");
const debounceCount =
  document.querySelector<HTMLSpanElement>("#debounce-count");
const throttleCount =
  document.querySelector<HTMLSpanElement>("#throttle-count");
let debounceRuns = 0;
let throttleRuns = 0;
// Debounce
// Wait until the user stops typing for 1 second.
let timeout: number | undefined;

search?.addEventListener("input", () => {
  clearTimeout(timeout);

  timeout = window.setTimeout(() => {
    debounceRuns++;
    debounceCount!.innerText = debounceRuns.toString();

    console.log("Debounce action");
  }, 1000);
});
// Throttle
// Run at most once every 1 second.
let lastRun = 0;
mouseBox?.addEventListener("mousemove", () => {
  const now = Date.now();

  if (now - lastRun >= 1000) {
    throttleRuns++;
    throttleCount!.innerText = throttleRuns.toString();

    console.log("Throttle action");

    lastRun = now;
  }
});
