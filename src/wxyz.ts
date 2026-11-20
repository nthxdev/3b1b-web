// ==========================================
// Advanced TypeScript Type System — Complete Guide
// ==========================================

// ==========================================
// 1. Generics — Reusable Type-Safe Code
// ==========================================
// [FORMAL NAME: "Generics" — write code that works with ANY type while
//  preserving type safety, instead of duplicating code per type or
//  using `any` (which loses type checking).]

// Generic function — <T> is a placeholder type, inferred or explicit
function identity<T>(value: T): T {
  return value;
}
const num = identity<number>(42); // explicit
const str = identity("hello"); // inferred as string

// Generic with multiple type parameters
function pair<T, U>(first: T, second: U): [T, U] {
  return [first, second];
}
const p = pair<string, number>("age", 25); // ["age", 25]

// Generic interface
interface Box<T> {
  value: T;
}
const numberBox: Box<number> = { value: 42 };
const stringBox: Box<string> = { value: "hello" };

// Generic class
class Container<T> {
  private item: T;
  constructor(item: T) {
    this.item = item;
  }
  getItem(): T {
    return this.item;
  }
}
const container = new Container<string>("data");

// ==========================================
// 2. Generic Constraints — `<T extends U>`
// ==========================================
// [FORMAL NAME: "Generic Constraint" — restricts what types T can be,
//  ensuring T has certain properties/methods before use.]

interface HasLength {
  length: number;
}
function logLength<T extends HasLength>(item: T): void {
  console.log(item.length); // safe — T guaranteed to have .length
}
logLength("hello"); // ✓ strings have length
logLength([1, 2, 3]); // ✓ arrays have length
// logLength(42); // ❌ Error: number doesn't have .length

// Constraint using keyof — T's key must exist on object
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}
const userObj = { name: "Harsh", age: 26 };
const userName = getProperty(userObj, "name"); // type-safe access

// ==========================================
// 3. Utility Types — Built-in Type Transformations
// ==========================================
// [FORMAL NAME: "Utility Types" — global generic types that transform
//  existing type shapes without rewriting them manually.]

interface UserProfile {
  id: number;
  name: string;
  email: string;
  age: number;
}

// Partial<T> — makes ALL properties optional
type PartialUser = Partial<UserProfile>;
const partialUpdate: PartialUser = { name: "New Name" }; // rest optional

// Required<T> — makes ALL properties required (opposite of Partial)
interface OptionalFields {
  name?: string;
  age?: number;
}
type RequiredFields = Required<OptionalFields>; // both now required

// Readonly<T> — makes ALL properties immutable
type ReadonlyUser = Readonly<UserProfile>;
const lockedUser: ReadonlyUser = { id: 1, name: "Harsh", email: "h@x.com", age: 26 };
// lockedUser.name = "New"; // ❌ Error: readonly

// Pick<T, K> — select SPECIFIC properties to keep
type UserPreview = Pick<UserProfile, "id" | "name">; // { id, name } only

// Omit<T, K> — select SPECIFIC properties to REMOVE
type UserWithoutEmail = Omit<UserProfile, "email">; // everything except email

// Record<K, T> — construct object type with specific keys and value type
type UserRoles = Record<"admin" | "editor" | "viewer", boolean>;
const roles: UserRoles = { admin: true, editor: false, viewer: true };

// Exclude<T, U> — remove types from a union
type Status = "active" | "inactive" | "banned";
type ActiveOnly = Exclude<Status, "banned">; // "active" | "inactive"

// Extract<T, U> — keep only matching types from a union
type BannedOnly = Extract<Status, "banned">; // "banned"

// ReturnType<T> — extract the return type of a function
function createUser(): UserProfile {
  return { id: 1, name: "Harsh", email: "h@x.com", age: 26 };
}
type CreatedUser = ReturnType<typeof createUser>; // UserProfile

// Parameters<T> — extract parameter types of a function as a tuple
function updateUser(id: number, name: string): void {}
type UpdateUserParams = Parameters<typeof updateUser>; // [number, string]

// ==========================================
// 4. Type Guards — Type Predicates for Narrowing
// ==========================================
// [FORMAL NAME: "Type Predicate" — a function whose return type is
//  `param is Type`, telling TypeScript to narrow the type after the
//  check succeeds. Enables custom, reusable type-safety checks.]

interface Cat {
  type: "cat";
  meow(): void;
}
interface Dog {
  type: "dog";
  bark(): void;
}
type Pet = Cat | Dog;

// Custom type guard function
function isCat(pet: Pet): pet is Cat {
  return pet.type === "cat";
}

function handlePet(pet: Pet): void {
  if (isCat(pet)) {
    pet.meow(); // TypeScript knows pet is Cat here
  } else {
    pet.bark(); // TypeScript knows pet is Dog here
  }
}

// Built-in type guards: typeof, instanceof, in
function processInput(value: string | number): void {
  if (typeof value === "string") {
    console.log(value.toUpperCase()); // narrowed to string
  } else {
    console.log(value.toFixed(2)); // narrowed to number
  }
}

// ==========================================
// 5. Discriminated Unions (Tagged Unions)
// ==========================================
// [FORMAL NAME: "Discriminated Union" — a union of types that share a
//  common literal property (the "discriminant" or "tag"), letting
//  TypeScript narrow the exact type based on that property's value.]

interface LoadingState {
  status: "loading"; // discriminant/tag
}
interface SuccessState {
  status: "success"; // discriminant/tag
  data: string;
}
interface ErrorState {
  status: "error"; // discriminant/tag
  message: string;
}
type FetchState = LoadingState | SuccessState | ErrorState;

function renderState(state: FetchState): string {
  switch (state.status) {
    case "loading":
      return "Loading...";
    case "success":
      return state.data; // TypeScript knows .data exists here ✓
    case "error":
      return state.message; // TypeScript knows .message exists here ✓
  }
}

// ==========================================
// 6. Conditional Types — `T extends U ? X : Y`
// ==========================================
// [FORMAL NAME: "Conditional Type" — type-level ternary. Chooses
//  between two types based on whether T is assignable to U.]

type IsString<T> = T extends string ? "yes" : "no";
type Test1 = IsString<string>; // "yes"
type Test2 = IsString<number>; // "no"

// Practical: extract array element type
type ElementType<T> = T extends (infer U)[] ? U : never;
type NumArray = ElementType<number[]>; // number
type StrArray = ElementType<string[]>; // string

// Conditional types with union distribution
type NonNullableCustom<T> = T extends null | undefined ? never : T;
type CleanType = NonNullableCustom<string | null | undefined>; // string

// ==========================================
// 7. Type Narrowing — Type Refinement Techniques
// ==========================================
// [FORMAL NAME: "Type Narrowing" — TypeScript refines a broader type
//  to a more specific one based on runtime checks in the code flow.]

// Narrowing with typeof
function narrowTypeof(value: string | number): void {
  if (typeof value === "string") {
    console.log(value.length); // narrowed to string
  }
}

// Narrowing with truthiness check
function narrowTruthy(value: string | null): void {
  if (value) {
    console.log(value.toUpperCase()); // narrowed: value is string (not null)
  }
}

// Narrowing with equality checks
function narrowEquality(value: string | number | boolean): void {
  if (value === "specific") {
    console.log(value.length); // narrowed to string literal "specific"
  }
}

// Narrowing with instanceof
class ApiError extends Error {
  statusCode: number = 500;
}
function narrowInstanceof(error: Error): void {
  if (error instanceof ApiError) {
    console.log(error.statusCode); // narrowed to ApiError
  }
}

// Narrowing with `in` operator
interface Bird { fly(): void }
interface Fish { swim(): void }
function narrowIn(animal: Bird | Fish): void {
  if ("fly" in animal) {
    animal.fly(); // narrowed to Bird
  } else {
    animal.swim(); // narrowed to Fish
  }
}

// Narrowing with Array.isArray()
function narrowArray(value: string | string[]): void {
  if (Array.isArray(value)) {
    console.log(value.join(", ")); // narrowed to string[]
  } else {
    console.log(value.toUpperCase()); // narrowed to string
  }
}

// ==========================================
// 8. Quick Reference & Key Takeaways
// ==========================================

/*
✓ Generics <T> = reusable type-safe code for any type
✓ <T extends U> = constrain generic to types with certain shape
✓ Partial<T> = all properties optional
✓ Required<T> = all properties required
✓ Readonly<T> = all properties immutable
✓ Pick<T, K> = select specific properties to KEEP
✓ Omit<T, K> = select specific properties to REMOVE
✓ Record<K, T> = build object type with specific keys/values
✓ Exclude<T, U> = remove types from union
✓ Extract<T, U> = keep only matching types from union
✓ ReturnType<T> = extract function's return type
✓ Parameters<T> = extract function's parameter types
✓ Type Guard (x is Type) = custom reusable type-narrowing function
✓ Discriminated Union = union with shared literal "tag" property
✓ Conditional Type (T extends U ? X : Y) = type-level ternary
✓ Type Narrowing = refining types via typeof/instanceof/in/truthiness
*/

// ==========================================
// Scope & Execution Context — Complete Guide
// ==========================================

// ==========================================
// 1. Lexical Scoping — Deep Dive
// ==========================================
// [FORMAL NAME: "Lexical Scoping" — scope is determined by WHERE code
//  is physically written (nesting), not by how/where it's called.
//  Inner functions can access outer variables (closures), but not
//  vice versa.]

const globalScope = "I'm global";

function outerFunction() {
  const outerScope = "I'm in outer";

  function innerFunction() {
    const innerScope = "I'm in inner";
    console.log(globalScope); // ✓ accessible (lexical parent)
    console.log(outerScope); // ✓ accessible (lexical parent)
    console.log(innerScope); // ✓ own scope
  }

  innerFunction();
  // console.log(innerScope); // ❌ Error: not accessible from outer
}
outerFunction();

// Lexical scope is fixed at WRITE time, not call time
function createGreeter(name: string) {
  return function () {
    console.log(`Hello, ${name}`); // "remembers" name via closure
  };
}
const greetHarsh = createGreeter("Harsh");
greetHarsh(); // "Hello, Harsh" — works even after createGreeter finished

// ==========================================
// 2. Hoisting Mechanics — Detailed TDZ
// ==========================================
// [FORMAL NAME: "Hoisting" — declarations are processed before code
//  execution. var/function declarations are hoisted with different
//  behavior than let/const.]

// var — hoisted AND initialized with undefined
console.log(hoistedVar); // undefined (not error)
var hoistedVar: string = "value";

// function declarations — FULLY hoisted (can call before definition)
hoistedFunc(); // works!
function hoistedFunc(): void {
  console.log("I'm hoisted");
}

// let/const — hoisted but NOT initialized (Temporal Dead Zone)
// console.log(tdzExample); // ❌ ReferenceError: Cannot access before initialization
let tdzExample: string = "value";

// TDZ explained step by step:
{
  // TDZ starts here for `blockVar`
  // console.log(blockVar); // ❌ Error — in TDZ
  let blockVar = "now initialized"; // TDZ ends here
  console.log(blockVar); // ✓ works now
}

// Function expressions with let/const — also subject to TDZ
// myFuncExpr(); // ❌ Error — TDZ (even though it's a function)
const myFuncExpr = () => console.log("Function expression");
myFuncExpr(); // ✓ works after declaration

// ==========================================
// 3. Call Stack — Visualization & Mechanics
// ==========================================
// [FORMAL NAME: "Call Stack" — LIFO (Last In, First Out) structure
//  tracking function calls. Each function call pushes a new "stack
//  frame"; when it returns, the frame is popped.]

function first(): void {
  console.log("first: start");
  second();
  console.log("first: end");
}
function second(): void {
  console.log("second: start");
  third();
  console.log("second: end");
}
function third(): void {
  console.log("third: executing");
}

first();
/*
Call Stack visualization:
1. first() pushed       → [first]
2. second() pushed      → [first, second]
3. third() pushed       → [first, second, third]
4. third() returns/pops → [first, second]
5. second() returns/pops→ [first]
6. first() returns/pops → []

Output order:
"first: start"
"second: start"
"third: executing"
"second: end"
"first: end"
*/

// Stack overflow — infinite recursion exceeds call stack limit
function infiniteRecursion(): void {
  // infiniteRecursion(); // would cause "Maximum call stack size exceeded"
}

// ==========================================
// 4. Execution Context — Global, Function, Block
// ==========================================
// [FORMAL NAME: "Execution Context" — environment in which code runs,
//  containing variable bindings, scope chain, and `this` value. Three
//  types: Global, Function, and Block (ES6+ with let/const).]

// GLOBAL EXECUTION CONTEXT — created once, wraps entire script
console.log(this); // in browser: often undefined or Window depending on module type

// FUNCTION EXECUTION CONTEXT — created every time a function is called
function functionContext(): void {
  // new execution context created here:
  // - own `this` binding
  // - own arguments object
  // - own variable environment
  const localVar = "function-scoped";
}

// BLOCK EXECUTION CONTEXT — created for {} blocks with let/const (ES6+)
if (true) {
  // new block-level context
  let blockScoped = "only visible inside this block";
  const alsoBlockScoped = "same here";
}
// console.log(blockScoped); // ❌ Error: not accessible outside block

// var does NOT create block context — leaks to function/global scope
if (true) {
  var functionScopedVar = "leaks out of block";
}
console.log(functionScopedVar); // ✓ accessible (var ignores block scope)

// Execution context creation phases:
// 1. Creation Phase: hoist declarations, set up scope chain, determine `this`
// 2. Execution Phase: run code line by line, assign values

// ==========================================
// 5. `this` Binding Strategies — bind, call, apply
// ==========================================
// [FORMAL NAME: "Explicit Binding" — manually controlling `this` using
//  call(), apply(), or bind(), overriding default binding rules.]

function announce(this: { name: string }, greeting: string): void {
  console.log(`${greeting}, I'm ${this.name}`);
}

const speaker1 = { name: "Harsh" };
const speaker2 = { name: "Maya" };

// call() — invoke immediately, arguments passed separately
announce.call(speaker1, "Hello"); // "Hello, I'm Harsh"

// apply() — invoke immediately, arguments as array
announce.apply(speaker2, ["Hi"]); // "Hi, I'm Maya"

// bind() — returns NEW function with permanently fixed this (call later)
const boundAnnounce = announce.bind(speaker1);
boundAnnounce("Hey"); // "Hey, I'm Harsh" (called whenever you want)

// bind() with partial arguments (partial application)
function multiply(this: void, a: number, b: number): number {
  return a * b;
}
const double = multiply.bind(null, 2); // pre-fill first argument
console.log(double(5)); // 10 (2 * 5)

// Default binding rules summary:
const bindingExamples = {
  name: "Object Method",
  show() {
    console.log(this.name); // this = object (implicit binding)
  }
};
bindingExamples.show(); // "Object Method"

const extractedShow = bindingExamples.show;
// extractedShow(); // this = undefined (strict mode) — lost binding

// Arrow functions — NO own this, inherits from lexical (surrounding) scope
const arrowBindingExample = {
  name: "Arrow Test",
  show: () => {
    console.log(this); // NOT arrowBindingExample — inherits outer this
  }
};

// ==========================================
// 6. Scope Chain — How Variable Lookup Works
// ==========================================
// [FORMAL NAME: "Scope Chain" — when a variable is referenced, JS
//  looks in the CURRENT scope first, then walks OUTWARD through each
//  enclosing scope until found or reaches global scope.]

const chainGlobal = "global level";

function chainOuter() {
  const chainMiddle = "middle level";

  function chainInner() {
    const chainLocal = "local level";
    // Lookup order: chainInner scope → chainOuter scope → global scope
    console.log(chainLocal); // found immediately (local)
    console.log(chainMiddle); // found in chainOuter (parent)
    console.log(chainGlobal); // found in global (grandparent)
  }
  chainInner();
}
chainOuter();

// ==========================================
// 7. Quick Reference & Key Takeaways
// ==========================================

/*
✓ Lexical Scoping = scope determined by WHERE code is written
✓ Closures = inner functions remember outer variables even after outer returns
✓ Hoisting = declarations processed before execution
✓ var = hoisted + initialized as undefined
✓ let/const = hoisted but NOT initialized (Temporal Dead Zone)
✓ TDZ = period between hoisting and actual declaration line
✓ Call Stack = LIFO structure tracking function calls
✓ Stack Overflow = infinite recursion exceeds stack limit
✓ Execution Context = environment with variables, scope, this
✓ Global Context = created once for entire script
✓ Function Context = created per function call
✓ Block Context = created for {} with let/const (not var)
✓ call() = invoke now, args separate
✓ apply() = invoke now, args as array
✓ bind() = returns new function, call later
✓ Arrow functions = no own `this`, inherits lexical scope
✓ Scope Chain = lookup walks outward until variable found
*/


// ==========================================
// Method Overloading vs Overriding (NEW — not yet covered)
// ==========================================
// BLOCK 4: Advanced OOP Features (Gap-Filling — New Content Only)
// Since your OOP block already covers most of this, here's only what's missing:
// Looking at your existing OOP block — Access modifiers, Getters/Setters, Static members, Readonly, and Method Overriding are ALL already covered comprehensively. The only genuinely new topic is Method Overloading, which is different from overriding:
// [FORMAL NAME: "Method Overloading" — SAME method name, MULTIPLE
//  signatures (different parameter types/counts) within the SAME
//  class. Different from OVERRIDING, which happens across parent/
//  child classes with the SAME signature but different behavior.]

class Calculator {
  // Overload signatures — declare all possible ways this method can be called
  add(a: number, b: number): number;
  add(a: string, b: string): string;
  add(a: number[], b: number[]): number[];

  // Single implementation handles ALL overload signatures
  add(a: number | string | number[], b: number | string | number[]): number | string | number[] {
    if (typeof a === "number" && typeof b === "number") {
      return a + b; // number addition
    }
    if (typeof a === "string" && typeof b === "string") {
      return a + b; // string concatenation
    }
    if (Array.isArray(a) && Array.isArray(b)) {
      return [...a, ...b]; // array concatenation
    }
    throw new Error("Invalid arguments");
  }
}

const calc = new Calculator();
console.log(calc.add(5, 10)); // 15 (number overload)
console.log(calc.add("Hello, ", "World")); // "Hello, World" (string overload)
console.log(calc.add([1, 2], [3, 4])); // [1, 2, 3, 4] (array overload)

/*
KEY DIFFERENCE:
- Overloading: SAME class, SAME method name, DIFFERENT parameter signatures
  (compile-time — TypeScript picks the right signature based on arguments)
  
- Overriding: PARENT/CHILD classes, SAME method signature, DIFFERENT behavior
  (runtime — JavaScript picks the version based on the actual object type)
*/

// Overriding example (already covered in your OOP notes, shown for contrast)
class Shape {
  area(): number {
    return 0;
  }
}
class Circle extends Shape {
  constructor(private radius: number) {
    super();
  }
  override area(): number {
    // OVERRIDING: redefines parent's method
    return Math.PI * this.radius ** 2;
  }
}

// ==========================================
// Functional Programming Paradigms — Complete Guide
// ==========================================

// ==========================================
// 1. Pure Functions & Side Effects
// ==========================================
// [FORMAL NAME: "Pure Function" — same input ALWAYS produces same
//  output, and causes NO side effects (no mutating external state,
//  no I/O, no random values). Predictable and testable.]

// ✓ Pure function — no side effects, deterministic
function addPure(a: number, b: number): number {
  return a + b; // only depends on inputs, doesn't touch outside state
}

// ❌ Impure function — has side effect (mutates external variable)
let total = 0;
function addImpure(a: number): number {
  total += a; // mutates external state — side effect!
  return total;
}

// ❌ Impure function — non-deterministic (different output for same input)
function getRandomImpure(): number {
  return Math.random(); // same call, different result each time
}

// ❌ Impure function — I/O side effect
function impureWithLog(a: number, b: number): number {
  console.log("Adding..."); // side effect: I/O operation
  return a + b;
}

// Benefits of pure functions: predictable, testable, cacheable, parallelizable

// ==========================================
// 2. Higher-Order Functions (Beyond Basics)
// ==========================================
// [FORMAL NAME: "Higher-Order Function" (HOF) — a function that EITHER
//  takes a function as an argument OR returns a function (or both).]

// HOF that takes a function as argument
function applyOperation(arr: number[], operation: (n: number) => number): number[] {
  return arr.map(operation);
}
const doubled = applyOperation([1, 2, 3], (n) => n * 2); // [2, 4, 6]

// HOF that returns a function (function factory)
function multiplyBy(factor: number): (n: number) => number {
  return (n: number) => n * factor;
}
const triple = multiplyBy(3);
console.log(triple(5)); // 15

// HOF that both takes AND returns a function
function logWrapper<T extends (...args: any[]) => any>(fn: T): T {
  return ((...args: Parameters<T>) => {
    console.log(`Calling with args: ${args}`);
    return fn(...args);
  }) as T;
}
const loggedAdd = logWrapper((a: number, b: number) => a + b);
loggedAdd(2, 3); // logs "Calling with args: 2,3", returns 5

// Common built-in HOFs: map, filter, reduce, forEach, sort
const numbersHOF = [1, 2, 3, 4, 5];
const evenSquares = numbersHOF
  .filter((n) => n % 2 === 0) // HOF: takes predicate function
  .map((n) => n ** 2); // HOF: takes transform function

// ==========================================
// 3. Function Composition Patterns
// ==========================================
// [FORMAL NAME: "Function Composition" — combining multiple simple
//  functions into one, where the output of one becomes the input of
//  the next. Mathematical notation: (f ∘ g)(x) = f(g(x))]

// Manual composition (2 functions)
const addOne = (n: number): number => n + 1;
const double2 = (n: number): number => n * 2;

function composeManual(f: (n: number) => number, g: (n: number) => number) {
  return (x: number): number => f(g(x));
}
const addThenDouble = composeManual(double2, addOne);
console.log(addThenDouble(5)); // double(addOne(5)) = double(6) = 12

// Generic compose — right to left (mathematical convention)
function compose<T>(...fns: Array<(arg: T) => T>): (arg: T) => T {
  return (x: T) => fns.reduceRight((acc, fn) => fn(acc), x);
}
const composed = compose(double2, addOne);
console.log(composed(5)); // addOne first, then double: (5+1)*2 = 12

// Generic pipe — left to right (more intuitive reading order)
function pipe<T>(...fns: Array<(arg: T) => T>): (arg: T) => T {
  return (x: T) => fns.reduce((acc, fn) => fn(acc), x);
}
const piped = pipe(addOne, double2);
console.log(piped(5)); // addOne first, then double: (5+1)*2 = 12

// Practical example: data transformation pipeline
const trim = (s: string): string => s.trim();
const toLowerCase = (s: string): string => s.toLowerCase();
const removeSpaces = (s: string): string => s.replace(/\s+/g, "-");

const slugify = pipe(trim, toLowerCase, removeSpaces);
console.log(slugify("  Hello World  ")); // "hello-world"

// ==========================================
// 4. Currying
// ==========================================
// [FORMAL NAME: "Currying" — transforming a function that takes
//  MULTIPLE arguments into a sequence of functions that each take
//  ONE argument. f(a, b, c) becomes f(a)(b)(c).]

// Regular function — all args at once
function addRegular(a: number, b: number, c: number): number {
  return a + b + c;
}

// Curried version — one argument at a time
function addCurried(a: number): (b: number) => (c: number) => number {
  return (b: number) => (c: number) => a + b + c;
}
console.log(addCurried(1)(2)(3)); // 6

// Curried with arrow functions (more concise)
const addCurriedArrow = (a: number) => (b: number) => (c: number) => a + b + c;

// Practical use: partial application via currying
const add5 = addCurried(5); // fixes first argument
const add5and10 = add5(10); // fixes second argument
console.log(add5and10(2)); // 5 + 10 + 2 = 17

// Generic curry utility (simplified 2-arg version)
function curry<A, B, C>(fn: (a: A, b: B) => C) {
  return (a: A) => (b: B): C => fn(a, b);
}
const multiplyCurried = curry((a: number, b: number) => a * b);
const multiplyBy10 = multiplyCurried(10);
console.log(multiplyBy10(5)); // 50

// ==========================================
// 5. Partial Application
// ==========================================
// [FORMAL NAME: "Partial Application" — fixing SOME arguments of a
//  function, producing a new function with FEWER remaining parameters.
//  Different from currying: partial application can fix MULTIPLE args
//  at once, not necessarily one at a time.]

function volumeCalculator(length: number, width: number, height: number): number {
  return length * width * height;
}

// Using bind() for partial application
const fixedLengthWidth = volumeCalculator.bind(null, 10, 5); // fix length & width
console.log(fixedLengthWidth(2)); // 10 * 5 * 2 = 100

// Manual partial application utility
function partial<T extends unknown[], R>(
  fn: (...args: T) => R,
  ...presetArgs: Partial<T>
) {
  return (...remainingArgs: unknown[]): R =>
    fn(...(presetArgs as T), ...(remainingArgs as any));
}
const partialVolume = partial(volumeCalculator, 10, 5); // preset 2 args
console.log(partialVolume(2)); // 100

// Currying vs Partial Application:
// Currying: ALWAYS one arg at a time, returns nested single-arg functions
// Partial Application: fix ANY number of args at once, returns a function
//                       taking the REMAINING args (can be multiple)

// ==========================================
// 6. Memoization
// ==========================================
// [FORMAL NAME: "Memoization" — caching the results of expensive
//  function calls, returning the cached result when the SAME inputs
//  occur again, avoiding redundant computation.]

// Basic memoization with a Map cache
function memoize<Args extends unknown[], Result>(
  fn: (...args: Args) => Result
): (...args: Args) => Result {
  const cache = new Map<string, Result>();

  return (...args: Args): Result => {
    const key = JSON.stringify(args); // simple cache key from arguments
    if (cache.has(key)) {
      console.log("Cache hit!");
      return cache.get(key)!;
    }
    console.log("Computing...");
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}

// Expensive function example (simulated)
function expensiveCalculation(n: number): number {
  console.log(`Calculating for ${n}...`);
  let result = 0;
  for (let i = 0; i < 1_000_000; i++) result += i; // simulate heavy work
  return result + n;
}

const memoizedCalc = memoize(expensiveCalculation);
memoizedCalc(5); // "Computing..." — runs full calculation
memoizedCalc(5); // "Cache hit!" — instant, returns cached result
memoizedCalc(10); // "Computing..." — different input, computes again

// Practical example: memoized Fibonacci (huge performance gain)
function fibonacci(n: number): number {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}
const memoizedFib = memoize(fibonacci);
console.log(memoizedFib(30)); // fast after first call for that n

// ==========================================
// 7. Quick Reference & Key Takeaways
// ==========================================

/*
✓ Pure Function = same input → same output, NO side effects
✓ Side Effect = mutating outside state, I/O, randomness
✓ Higher-Order Function = takes function as arg AND/OR returns function
✓ Function Composition = combine functions: output of one → input of next
✓ compose() = right-to-left execution
✓ pipe() = left-to-right execution (more readable)
✓ Currying = f(a,b,c) → f(a)(b)(c), ONE argument at a time
✓ Partial Application = fix SOME args, return function for the rest
✓ Currying vs Partial: currying is strictly one-at-a-time; partial can be multiple
✓ Memoization = cache function results by input, avoid recomputation
✓ Use memoization for expensive, pure, frequently-repeated calculations
*/
// ==========================================
// Advanced Destructuring — Complete Guide
// ==========================================

// ==========================================
// 1. Nested Destructuring Patterns
// ==========================================
// [FORMAL NAME: "Nested Destructuring" — extracting values from
//  objects/arrays that are THEMSELVES nested inside other objects/arrays,
//  in a single destructuring statement.]

// Nested object destructuring
interface ApiResponse {
  data: {
    user: {
      profile: {
        name: string;
        avatar: string;
      };
    };
  };
}
const response: ApiResponse = {
  data: { user: { profile: { name: "Harsh", avatar: "url" } } }
};

// Extract deeply nested value directly
const {
  data: {
    user: {
      profile: { name: userName, avatar: userAvatar }
    }
  }
} = response;
console.log(userName, userAvatar); // "Harsh" "url"

// Nested array destructuring
const nestedArray: [string, [number, number]] = ["point", [10, 20]];
const [label, [x, y]] = nestedArray;
console.log(label, x, y); // "point" 10 20

// Mixed nested (object containing array, array containing object)
interface MixedData {
  items: Array<{ id: number; tags: string[] }>;
}
const mixedData: MixedData = {
  items: [{ id: 1, tags: ["a", "b"] }]
};
const {
  items: [{ id: firstId, tags: [firstTag] }]
} = mixedData;
console.log(firstId, firstTag); // 1 "a"

// ==========================================
// 2. Rest in Destructuring
// ==========================================
// [FORMAL NAME: "Rest Pattern in Destructuring" — collects REMAINING
//  properties/elements into a new object/array after extracting
//  specific ones. Must be LAST in the pattern.]

// Rest with objects — collect remaining properties
const fullUser = { id: 1, name: "Harsh", age: 26, city: "Bhopal" };
const { id: userId, ...restOfUser } = fullUser;
console.log(userId); // 1
console.log(restOfUser); // { name: "Harsh", age: 26, city: "Bhopal" }

// Rest with arrays — collect remaining elements
const numbersArr = [1, 2, 3, 4, 5];
const [firstNum, secondNum, ...remainingNums] = numbersArr;
console.log(firstNum, secondNum); // 1 2
console.log(remainingNums); // [3, 4, 5]

// Practical use: excluding a property before sending to API
function updateUserExcludingId(user: typeof fullUser) {
  const { id, ...updateData } = user; // strip id before update request
  return updateData; // { name, age, city } — no id sent
}

// Rest in function parameters (related concept)
function sumAllRest(...nums: number[]): number {
  return nums.reduce((acc, n) => acc + n, 0);
}
console.log(sumAllRest(1, 2, 3, 4)); // 10

// ==========================================
// 3. Default Values in Destructuring
// ==========================================
// [FORMAL NAME: "Default Value in Destructuring" — provides a fallback
//  value used ONLY when the destructured property/element is
//  `undefined` (not null, not falsy — specifically undefined).]

// Object destructuring with defaults
interface Settings {
  theme?: string;
  fontSize?: number;
}
const userSettings: Settings = { theme: "dark" };
const { theme = "light", fontSize = 16 } = userSettings;
console.log(theme, fontSize); // "dark" 16 (fontSize used default)

// Array destructuring with defaults
const partialCoords: [number, number?] = [10];
const [xCoord = 0, yCoord = 0] = partialCoords;
console.log(xCoord, yCoord); // 10 0

// Defaults combined with renaming
const { theme: colorTheme = "light" } = userSettings;
console.log(colorTheme); // "dark"

// Default only triggers on undefined, NOT on null or other falsy values
const withNull: { value: number | null } = { value: null };
const { value: valWithDefault = 100 } = withNull;
console.log(valWithDefault); // null (default does NOT trigger for null!)

const withUndefined: { value?: number } = {};
const { value: valUndefined = 100 } = withUndefined;
console.log(valUndefined); // 100 (default DOES trigger for undefined)

// Defaults in function parameters (related, common pattern)
function createConfig({ theme = "light", fontSize = 16 }: Settings = {}): void {
  console.log(theme, fontSize);
}
createConfig(); // "light" 16 (entire object defaulted too)
createConfig({ theme: "dark" }); // "dark" 16

// ==========================================
// 4. Computed Property Names
// ==========================================
// [FORMAL NAME: "Computed Property Name" — using an EXPRESSION
//  (in square brackets) as an object's property key, evaluated at
//  runtime, instead of a fixed literal name.]

// Computed key in object literal creation
const dynamicKey = "score";
const computedObj = {
  [dynamicKey]: 100, // key becomes "score"
  [`${dynamicKey}_max`]: 200 // key becomes "score_max"
};
console.log(computedObj); // { score: 100, score_max: 200 }

// Computed keys with template literals (dynamic key building)
function createFieldError(fieldName: string, message: string) {
  return {
    [`${fieldName}Error`]: message // e.g., "emailError": "Invalid format"
  };
}
console.log(createFieldError("email", "Invalid format"));
// { emailError: "Invalid format" }

// Computed property in destructuring (extracting with dynamic key)
const dataObj = { userId123: "Harsh" };
const keyToExtract = "userId123";
const { [keyToExtract]: extractedName } = dataObj;
console.log(extractedName); // "Harsh"

// Practical use: building lookup tables dynamically
function buildLookup<T extends { id: string }>(items: T[]): Record<string, T> {
  return items.reduce((lookup, item) => {
    return { ...lookup, [item.id]: item }; // computed key from item.id
  }, {} as Record<string, T>);
}
const usersLookup = buildLookup([
  { id: "u1", name: "Harsh" },
  { id: "u2", name: "Amit" }
]);
console.log(usersLookup.u1); // { id: "u1", name: "Harsh" }

// ==========================================
// 5. Combining All Techniques (Real-World Example)
// ==========================================

interface ComplexApiResponse {
  status: "success" | "error";
  payload: {
    users: Array<{ id: string; name: string; roles?: string[] }>;
  };
  meta?: { page: number; total?: number };
}

function processResponse(response: ComplexApiResponse) {
  const {
    status,
    payload: {
      users: [{ id: firstUserId, name: firstUserName, roles: firstUserRoles = [] }, ...restUsers]
    },
    meta: { page = 1, total = 0 } = {} // default entire meta object too
  } = response;

  console.log(status, firstUserId, firstUserName, firstUserRoles, restUsers, page, total);
}

// ==========================================
// 6. Quick Reference & Key Takeaways
// ==========================================

/*
✓ Nested Destructuring = extract deeply nested values in one statement
✓ Rest Pattern (...) = collect REMAINING properties/elements
✓ Rest MUST be last in the destructuring pattern
✓ Default Values = fallback ONLY when value is undefined (not null!)
✓ Defaults work in both object AND array destructuring
✓ Defaults can combine with renaming: { key: newName = default }
✓ Computed Property Names = [expression] as dynamic object key
✓ Computed keys evaluated at RUNTIME, not fixed at write-time
✓ Combine techniques for powerful, concise data extraction
*/

// ==========================================
// Asynchronous Programming — Complete Guide
// ==========================================

// ==========================================
// Async — Promise<T>
// ==========================================

// Promises:
// Promise object represents the eventual completion (or failure) of an asynchronous operation and its resulting value.
// Lifecycle of a promise
// A Promise has three states:
// 1. pending
// 2. fulfilled
// 3. rejected
// When it is created, a promise is pending. At some point in the future it may resolve or reject.
// Once a promise is resolved or rejected once, it can never be resolved or rejected again, nor can its state change.

// Chaining promises:
// Calling a chaining method on a promise returns another promise
// Concurrency &  Parallelism


// "Synchronous vs Asynchronous Execution" — sync code runs line-by-line, blocking. Async code lets other code run while waiting (e.g., for network, timers), avoiding blocking the main thread.]

// ==========================================
// 1. Callbacks — The Original Async Pattern
// ==========================================
// [FORMAL NAME: "Callback Function" — a function passed as an argument
//  to be executed later, usually after an async operation completes.]

function fetchDataCallback(callback: (data: string) => void): void {
  setTimeout(() => {
    callback("Data loaded");
  }, 1000);
}
fetchDataCallback((data) => console.log(data)); // "Data loaded" after 1s

// ==========================================
// 2. Callback Hell — The Problem
// ==========================================
// [FORMAL NAME: "Callback Hell" / "Pyramid of Doom" — deeply nested
//  callbacks that become unreadable and hard to maintain/debug.]

function step1(cb: (result: string) => void): void {
  setTimeout(() => cb("step1 done"), 100);
}
function step2(input: string, cb: (result: string) => void): void {
  setTimeout(() => cb(`${input} → step2 done`), 100);
}
function step3(input: string, cb: (result: string) => void): void {
  setTimeout(() => cb(`${input} → step3 done`), 100);
}

// The pyramid problem:
step1((r1) => {
  step2(r1, (r2) => {
    step3(r2, (r3) => {
      console.log(r3); // deeply nested, hard to read/handle errors
    });
  });
});

// ==========================================
// 3. Promises — Solving Callback Hell
// ==========================================
// [FORMAL NAME: "Promise" — object representing eventual completion
//  (or failure) of an async operation. Three states: pending, fulfilled,
//  rejected. Once settled, state is permanent.]

const myPromise = new Promise<string>((resolve, reject) => {
  const success = true;
  setTimeout(() => {
    if (success) resolve("Operation succeeded");
    else reject(new Error("Operation failed"));
  }, 1000);
});

// .then() — runs on fulfillment
// .catch() — runs on rejection
// .finally() — always runs (cleanup)
myPromise
  .then((result) => console.log(result))
  .catch((error) => console.error(error))
  .finally(() => console.log("Cleanup: always runs"));

// Chaining — solves callback hell (flat, not nested)
function promiseStep1(): Promise<string> {
  return new Promise((resolve) => setTimeout(() => resolve("step1"), 100));
}
function promiseStep2(input: string): Promise<string> {
  return new Promise((resolve) => setTimeout(() => resolve(`${input} → step2`), 100));
}
promiseStep1()
  .then((r1) => promiseStep2(r1))
  .then((r2) => console.log(r2)) // flat chain, easy to follow
  .catch((err) => console.error(err));

// ==========================================
// 4. Async/Await — Syntactic Sugar Over Promises
// ==========================================
// [FORMAL NAME: "async/await" — makes async code LOOK synchronous.
//  `async` marks a function as always returning a Promise. `await`
//  pauses execution until the Promise settles, without blocking the
//  thread (yields to event loop).]

async function asyncFlow(): Promise<void> {
  try {
    const r1 = await promiseStep1();
    const r2 = await promiseStep2(r1);
    console.log(r2); // "step1 → step2"
  } catch (error) {
    console.error("Error:", error);
  } finally {
    console.log("Done");
  }
}
asyncFlow();

// Async functions ALWAYS return a Promise (even without explicit Promise)
async function alwaysReturnsPromise(): Promise<number> {
  return 42; // automatically wrapped in Promise.resolve(42)
}
alwaysReturnsPromise().then((val) => console.log(val)); // 42

// ==========================================
// 5. Event Loop & Microtask Queue — How Async Actually Runs
// ==========================================
// [FORMAL NAME: "Event Loop" — the mechanism that lets JS (single-
//  threaded) handle async operations. Checks Call Stack; if empty,
//  moves tasks from queues to the stack. Microtasks (Promises) run
//  BEFORE Macrotasks (setTimeout) after each synchronous block.]

console.log("1. Sync start");

setTimeout(() => console.log("4. Macrotask (setTimeout)"), 0);

Promise.resolve().then(() => console.log("3. Microtask (Promise)"));

console.log("2. Sync end");

// Actual output order: 1, 2, 3, 4
// Why: sync code runs first, THEN all microtasks, THEN macrotasks

// ==========================================
// 6. setTimeout / setInterval Mechanics
// ==========================================

// setTimeout — runs ONCE after delay (delay is MINIMUM, not guaranteed)
const timeoutId: number = window.setTimeout(() => {
  console.log("Runs once after 1 second");
}, 1000);
clearTimeout(timeoutId); // cancel before it fires

// setInterval — runs REPEATEDLY at fixed intervals
let intervalCount = 0;
const intervalId: number = window.setInterval(() => {
  intervalCount++;
  console.log(`Tick ${intervalCount}`);
  if (intervalCount >= 3) clearInterval(intervalId); // stop after 3 ticks
}, 1000);

// setTimeout(fn, 0) — still async! Goes to macrotask queue, runs AFTER
// current sync code AND all pending microtasks
console.log("A");
setTimeout(() => console.log("C"), 0);
console.log("B");
// Output: A, B, C (not A, C, B)

// ==========================================
// 7. Race Conditions & Concurrency Patterns
// ==========================================
// [FORMAL NAME: "Race Condition" — bug where outcome depends on
//  unpredictable timing of async operations, e.g., an OLD slow request
//  overwriting a NEWER fast request's result.]

// Problem: race condition in search
let latestQuery = "";
async function searchWithRaceCondition(query: string): Promise<void> {
  latestQuery = query;
  const response = await fetch(`/api/search?q=${query}`);
  const data = await response.json();
  // BUG: if an older, slower request resolves AFTER a newer one,
  // it overwrites the correct newer result
  console.log(data);
}

// Solution 1: Check if this is still the latest query
async function searchFixed(query: string): Promise<void> {
  latestQuery = query;
  const response = await fetch(`/api/search?q=${query}`);
  const data = await response.json();
  if (query === latestQuery) {
    // only update UI if this is still the most recent request
    console.log(data);
  }
}

// Solution 2: AbortController — cancel outdated requests
let searchController: AbortController | undefined;
async function searchWithAbort(query: string): Promise<void> {
  searchController?.abort(); // cancel previous request
  searchController = new AbortController();
  try {
    const response = await fetch(`/api/search?q=${query}`, {
      signal: searchController.signal
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    if ((error as Error).name !== "AbortError") console.error(error);
  }
}

// Concurrency: run multiple async ops in PARALLEL (not sequential)
async function sequential(): Promise<void> {
  // ❌ Slow — waits for each one before starting next
  const a = await fetch("/a").then((r) => r.json());
  const b = await fetch("/b").then((r) => r.json());
}

async function parallel(): Promise<void> {
  // ✓ Fast — all requests start at the same time
  const [a, b] = await Promise.all([
    fetch("/a").then((r) => r.json()),
    fetch("/b").then((r) => r.json())
  ]);
}

// ==========================================
// 8. Promise Combinators (Concurrency Strategies)
// ==========================================

async function promiseCombinators(): Promise<void> {
  // all() — waits for all, FAILS if any one fails
  const allResults = await Promise.all([
    Promise.resolve(1),
    Promise.resolve(2)
  ]);

  // allSettled() — waits for all, NEVER fails (reports each outcome)
  const settledResults = await Promise.allSettled([
    Promise.resolve(1),
    Promise.reject("error")
  ]);
  // [{status: "fulfilled", value: 1}, {status: "rejected", reason: "error"}]

  // race() — resolves/rejects as soon as FIRST settles (win or lose)
  const raceResult = await Promise.race([
    new Promise((r) => setTimeout(() => r("slow"), 200)),
    new Promise((r) => setTimeout(() => r("fast"), 100))
  ]); // "fast"

  // any() — resolves with FIRST success; only rejects if ALL fail
  const anyResult = await Promise.any([
    Promise.reject("fail1"),
    Promise.resolve("success")
  ]); // "success"
}

// ==========================================
// 9. Error Handling Patterns in Async Code
// ==========================================

// try/catch with async/await (only catches sync-thrown or awaited errors)
async function robustFetch(url: string): Promise<unknown> {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Fetch failed:", error);
    throw error; // re-throw to let caller handle it too
  }
}

// Multiple awaits in one try block — first error stops execution
async function multipleAwaits(): Promise<void> {
  try {
    const a = await fetch("/a");
    const b = await fetch("/b"); // skipped if /a throws
  } catch (error) {
    console.error(error);
  }
}

// ==========================================
// 10. Quick Reference & Key Takeaways
// ==========================================

/*
✓ Callback = function passed to run later (async operations)
✓ Callback Hell = deeply nested callbacks (hard to read/maintain)
✓ Promise = object representing future value (pending/fulfilled/rejected)
✓ .then()/.catch()/.finally() = handle Promise outcomes
✓ async/await = cleaner syntax over Promises (looks synchronous)
✓ Event Loop = manages async execution order
✓ Microtasks (Promises) run BEFORE Macrotasks (setTimeout)
✓ setTimeout(fn, 0) is still ASYNC (goes to macrotask queue)
✓ Race Condition = unpredictable timing causes bugs
✓ AbortController = cancel outdated/unnecessary requests
✓ Promise.all() = all or nothing (parallel, fails fast)
✓ Promise.allSettled() = wait for all, never fails
✓ Promise.race() = first to settle wins
✓ Promise.any() = first SUCCESS wins
✓ Use Promise.all() for parallel independent requests (faster)
✓ Sequential awaits = slower (one after another)
*/


// ==========================================
// OOPS
// ==========================================
// Object-Oriented Programming (OOP): a programming paradigm built
// around "objects" — bundles of data (properties) and behavior
// (methods) — instead of just a sequence of function calls.
// THE FOUR PILLARS OF OOP
// 1. ENCAPSULATION  — bundling data + the methods that operate on
//    it into one unit (a class/object), and controlling/hiding
//    direct access to that data from outside code.
// 2. ABSTRACTION     — exposing only what's necessary to use
//    something, hiding the complex implementation details behind
//    a simpler interface.
// 3. INHERITANCE     — a class can acquire (inherit) properties
//    and methods from another class, so you don't repeat code.
// 4. POLYMORPHISM     — ("many forms") the same method name behaves
// Comments in [BRACKETS] tell you which pillar / formal term applies.

// Object literal
// Not OOP by itself — just a plain object. OOP starts once you use a repeatable TEMPLATE (constructor function / class) to stamp out many objects with the same shape.
const person = {
  name: "Alice",
  age: 25,
  greet: function () {
    return `Hello, I'm ${this.name}`;
  },
};

// Constructor function (old way)
// "Constructor Function Pattern" — the pre-ES6 way to simulate classes in JavaScript. Classes (below) are syntactic sugar built directly on top of this pattern.
// function PersonOld(name:number, age:number) {
//     this.name = name;
//     this.age = age;
// }

// Class (modern)
// "Class Declaration" — ES6 (2015) syntax.
// Still compiles down to a constructor function + prototype under the hood, but with cleaner, more familiar (Java/C#-like) syntax.
class Student {
  name: string;
  age: number;
  studentId: string;
  // A function that creates objects using the `new` keyword.
  // "Constructor Method" — runs automatically every time you instantiate the class with `new`.
  constructor(name: string, age: number, studentId: string) {
    this.name = name;
    this.age = age;
    this.studentId = studentId;
  }
  // "Instance Method" — lives on the prototype, shared  by every instance, but operates on `this` (the specific instance calling it).
  study() {
    return `${this.name} is studying`;
  }

  getInfo() {
    return `${this.name} (${this.age})`;
  }
}
// "Instantiation" — creating an object (an "instance") from a class using the `new` keyword.
const student = new Student("Bob", 20, "S123");
console.log(student.study()); // Bob is studying
console.log(student.getInfo()); // Bob (20)
// new keyword
// this 4-step process is what "instantiation" or "the `new` binding" refers to.
// 1. Creates empty object: {}
// 2. Connects this to that object
// 3. Connects object to constructor's prototype
// 4. Returns the object automatically

// Instance Methods in Constructor
class CreatePencil {
  name: string;
  price: number;
  color: string;
  company: string;

  constructor(name: string, price: number, color: string, company: string) {
    this.name = name;
    this.price = price;
    this.color = color;
    this.company = company;
  }

  write(text: string): void {
    const heading = document.createElement("h1");
    heading.textContent = text;
    //  Each instance gets its own copy of the method
    heading.style.color = this.color; // Uses instance color
    document.body.appendChild(heading);
  }
}
// Tell TypeScript these members will exist on CreatePencil
// "Declaration Merging" — TypeScript-specific. An interface and a class sharing the same name get merged into one type. Used here so TS knows about members added later via the prototype, below
interface CreatePencil {
  profession: string;
  introduce(): string;
}
// Add them through the prototype
// "Prototype Augmentation" — manually attaching properties/methods onto a constructor's `.prototype` object after the class is defined, instead of inside the class body
CreatePencil.prototype.profession = "developer";

CreatePencil.prototype.introduce = function (): string {
  return `${this.name} is a ${this.profession}`;
};
const p1 = new CreatePencil("Nataraj", 10, "black", "Nataraj");
const p2 = new CreatePencil("Doms", 15, "red", "Doms");
// Prototype Shared Space
// Every constructor function has a `prototype` object
// CreatePencil.prototype
// Instances can access properties and methods from it
console.log(CreatePencil.prototype.company); // undefined
// object = CreatePencil.prototype
console.log(p1.company);
// Check own property
console.log(p1.hasOwnProperty("name"));
console.log(p1.profession); // developer
console.log(p1.introduce()); // Nataraj is a developer
console.log(p2.introduce()); // Doms is a developer
// Same way Shared Methods on Prototype

// The Prototype Chain (formal mechanics)
// "Prototypal Inheritance" — the actual mechanism JavaScript uses under the hood. Every object has an internal link (accessible via Object.getPrototypeOf(obj), historically __proto__) to another object — its prototype.
// When you access a property, JS looks on the object itself first;
// if not found, it walks UP the chain to the prototype, then that prototype's prototype, and so on, until it hits `null`.
// This walk is called the "Prototype Chain Lookup".
console.log(Object.getPrototypeOf(p1) === CreatePencil.prototype); // true
// "Object.create()" — creates a brand-new object whose prototype is explicitly set to the object you pass in. This is prototypal inheritance WITHOUT using classes/constructor functions at all — the "purest" form of it.
const vehiclePrototype = {
  start() {
    return "Engine started";
  },
};
const car = Object.create(vehiclePrototype); // car's prototype = vehiclePrototype
car.wheels = 4;
console.log(car.start()); // "Engine started" — found via the prototype chain
console.log(car.hasOwnProperty("start")); // false — it's inherited, not own
// "Property Shadowing" — when an object has its OWN property with the same name as one on its prototype, the own property "shadows" (hides) the prototype's version. Lookup stops at the first match, which is always the closer one.
car.start = function () {
  return "Turbo engine started"; // shadows vehiclePrototype.start
};
console.log(car.start()); // "Turbo engine started" (own property wins)
delete car.start;
console.log(car.start()); // "Engine started" (falls back to prototype)

// Inheritance
// INHERITANCE. "Classical-style Inheritance" via `extends`/`super` — JS's class syntax for prototypal inheritance that reads like Java/C#'s class-based inheritance.]
class GraduateStudent extends Student {
  major: string;

  constructor(name: string, age: number, studentId: string, major: string) {
    super(name, age, studentId); // Child constructor MUST call `super()`
    this.major = major;
  }
  // POLYMORPHISM -> "Method Overriding" — a subclass redefines a method it inherited from its parent, giving it new/extended behavior. This is "Runtime Polymorphism": which version runs is decided at runtime based on the actual object type, not the declared type.
  study() {
    // "super.method()" call — invokes the PARENT class's version of the method explicitly, instead of fully replacing it. Common pattern: "extend, don't replace" the parent's behavior.
    return super.study() + " at graduate level";
  }
  show() {
    super.study(); // Use `super.method()` to call parent's method
  }
  research() {
    return `${this.name} researches ${this.major}`;
  }
}
const grad = new GraduateStudent("Cara", 24, "G1", "AI");
console.log(grad.study()); // overridden version runs
console.log(grad instanceof Student); // true
console.log(grad instanceof GraduateStudent); // true

// "instanceof operator" — checks whether an object's prototype chain includes the given constructor's prototype. Used for runtime type-checking of class instances.
console.log(student instanceof GraduateStudent); // false — Bob isn't a grad student
// Interface
// ABSTRACTION -> "Interface" — defines a CONTRACT (a required shape) without any implementation. TypeScript-only construct; erased completely at compile time, it has zero runtime footprint.
interface PersonInterface {
  name: string;
  age: number;
  greet(): string;
}

// Implementing interface
// "implements clause" — a class promises to satisfy an interface's contract. TypeScript checks this via STRUCTURAL TYPING (a.k.a. "duck typing"): if the shape matches, it's compatible — no explicit inheritance relationship required, unlike class extension.
class Person implements PersonInterface {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  greet(): string {
    return `Hello, I'm ${this.name}`;
  }
}

// Abstract class
// ABSTRACTION -> "Abstract Class" — a class that CANNOT be instantiated directly (no `new Animal()` allowed). It exists only to be extended. "Abstract Method" (makeSound) declares a method signature with NO body — every concrete subclass is FORCED to implement it. Regular methods (move) can still have shared, ready-to-use implementations.
abstract class Animal {
  abstract makeSound(): void;

  move(): void {
    console.log("Moving");
  }
}
class Dog extends Animal {
  makeSound(): void {
    console.log("Woof!");
  }
}
// const a = new Animal(); // ❌ Error: cannot instantiate an abstract class
const dog = new Dog();
dog.makeSound(); // "Woof!" — forced implementation
dog.move(); // "Moving" — inherited, shared implementation

// method overriding  - Child can override parent's method
// `instanceof` - Check Instance Type
// Prototypal Inheritance with Object.create() - Create objects that inherit from other objects
// use spred to Copy properties
// poperty shadowing
// prototype chain lookup
// constructor connection
// Prototypal inheritance

// Access Modifiers (Encapsulation, TypeScript-only)
// ENCAPSULATION -> "Access Modifiers" — public / private / protected. IMPORTANT: these are a TypeScript COMPILE-TIME check only. They're erased when compiled to JS — at runtime, everything is still accessible. For REAL runtime privacy, see "Hard Private Fields" (#field) below.
class BankAccount {
  public accountHolder: string; // default if omitted — accessible from anywhere
  private balance: number; // accessible only INSIDE this class
  protected accountType: string; // accessible inside this class AND subclasses

  constructor(accountHolder: string, balance: number) {
    this.accountHolder = accountHolder;
    this.balance = balance;
    this.accountType = "standard";
  }
  // "Parameter Properties" — TS shorthand that declares AND assigns a class property directly in the constructor's parameter list. The verbose version above and this shorthand do the exact same thing.
  // constructor(public accountHolder: string, private balance: number) {}
  deposit(amount: number): void {
    this.balance += amount; // ✓ allowed — inside the class
  }
  getBalance(): number {
    return this.balance;
  }
}
const acc = new BankAccount("Alice", 100);
acc.deposit(50);
console.log(acc.getBalance()); // 150
// console.log(acc.balance); // ❌ TS compile error: 'balance' is private

// Hard Private Fields (true runtime Encapsulation)
// "ECMAScript Private Class Fields" (the `#` syntax). Unlike TS's `private` keyword, this is enforced by the JS RUNTIME itself, not just the compiler. Truly inaccessible from outside the class, even via bracket notation or console.
class SecureVault {
  #pin: number; // hard-private — invisible outside this class, always

  constructor(pin: number) {
    this.#pin = pin;
  }

  checkPin(attempt: number): boolean {
    return attempt === this.#pin;
  }
}
const vault = new SecureVault(1234);
console.log(vault.checkPin(1234)); // true
// console.log(vault.#pin); // ❌ SyntaxError at compile time, not just a TS warning

// Getters & Setters (Accessor Properties)
// ENCAPSULATION -> "Accessor Properties" — `get`/`set`. Let you run logic when a property is READ or WRITTEN, while callers still use plain property syntax (obj.prop) instead of calling a method (obj.getProp()). Classic use: validate data before storing it, or compute a derived value on the fly.
class Temperature {
  #celsius: number = 0;

  get celsius(): number {
    return this.#celsius;
  }

  set celsius(value: number) {
    if (value < -273.15) {
      throw new Error("Below absolute zero!");
    }
    this.#celsius = value;
  }

  // computed/derived accessor — no backing field needed
  get fahrenheit(): number {
    return (this.#celsius * 9) / 5 + 32;
  }
}
const temp = new Temperature();
temp.celsius = 25; // calls the setter (looks like plain assignment)
console.log(temp.celsius); // 25 — calls the getter
console.log(temp.fahrenheit); // 77 — computed on read

// Static Members
// "Static Properties / Static Methods" — belong to the CLASS itself, not to any instance. Called as ClassName.member, never instance.member. Used for utility functions, shared counters, or factory methods related to the class as a whole.
class IdGenerator {
  static #count = 0; // static + private: shared counter, hidden from outside

  static nextId(): number {
    IdGenerator.#count += 1;
    return IdGenerator.#count;
  }
}
console.log(IdGenerator.nextId()); // 1
console.log(IdGenerator.nextId()); // 2
// const gen = new IdGenerator(); gen.nextId(); // ❌ not available on instances

// readonly Properties (TypeScript-only, compile-time immutability)
// "readonly modifier" — property can be set once, either at declaration or inside the constructor, and never reassigned after. Compile-time only, like access modifiers.
class Config {
  readonly apiKey: string;
  constructor(apiKey: string) {
    this.apiKey = apiKey; // ✓ allowed, still inside constructor
  }
}
const cfg = new Config("abc123");
// cfg.apiKey = "xyz"; // ❌ TS compile error: cannot assign to readonly property

// Polymorphism in practice (PILLAR 4, tied together)
// "Runtime Polymorphism" — a single function/array can call the SAME method name on different object types, and each runs its own overridden version. This is the payoff of combining Inheritance + Method Overriding.
class Shape {
  area(): number {
    return 0;
  }
}
class Circle extends Shape {
  constructor(private radius: number) {
    super();
  } // parameter property shorthand
  override area(): number {
    // `override` keyword: documents intent, TS checks it's real
    return Math.PI * this.radius ** 2;
  }
}
class Square extends Shape {
  constructor(private side: number) {
    super();
  }
  override area(): number {
    return this.side ** 2;
  }
}
const shapes: Shape[] = [new Circle(3), new Square(4)];
shapes.forEach((s) => console.log(s.area())); // each calls ITS OWN area() — polymorphism

// Composition over Inheritance (Mixins)
//  "Composition" and "Mixins" — a well-known alternative/complement to inheritance. Instead of building deep class hierarchies (which get rigid and fragile — the "fragile base class problem"), you build small, focused pieces of behavior and COMBINE ("compose") them onto a class as needed. Common wisdom: "favor composition over inheritance".
type Constructor = new (...args: any[]) => {};

function Flyable<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    fly() {
      return "Flying!";
    }
  };
}
function Swimmable<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    swim() {
      return "Swimming!";
    }
  };
}
class Animal2 {}
class Duck extends Swimmable(Flyable(Animal2)) {} // composed from two mixins
const duck = new Duck();
console.log(duck.fly()); // "Flying!"
console.log(duck.swim()); // "Swimming!"

// Generic Classes
// "Generics" applied to a class — lets a class work with ANY type while still being fully type-checked, instead of writing a separate class per type or falling back to `any`.
class Box<T> {
  #contents: T;
  constructor(contents: T) {
    this.#contents = contents;
  }
  get(): T {
    return this.#contents;
  }
}
const numberBox = new Box<number>(42);
const stringBox = new Box<string>("hello");
console.log(numberBox.get(), stringBox.get());

// Prototypes & Classes
// js supports OOP you create objects(instances) from templates (classes) so that they include certain data and functionality
// Additional notes: Prototype Chain nuances & Inheritance vocabulary
// (everything else from the reference text was already covered above —
// these are only the NEW parts)

// 1. "Soft" Private Fields — underscore convention
// "Convention-based Privacy" — before # hard-private fields existed (and still common in real-world codebases today), teams agreed any field/method STARTING WITH AN UNDERSCORE (_) should be treated as private BY CONVENTION ONLY. Nothing in the language actually blocks outside access — it's purely a signal to other developers: "don't touch this directly." Contrast with the two REAL privacy mechanisms already covered above: TS's `private` (compile-time only) and `#field` (true runtime privacy).
class Odometer {
  _mileage: number; // "private by convention" — NOT actually enforced

  constructor() {
    this._mileage = 0;
  }

  get mileage(): number {
    return this._mileage;
  }

  set mileage(value: number) {
    // A setter can guard a field by refusing the write entirely.
    throw new Error(`Mileage cannot be manipulated, ${value} is ignored.`);
  }
}
const odo = new Odometer();
console.log(odo.mileage); // 0 — calls the getter
odo._mileage = 999; // ⚠️ still works! convention doesn't stop this
console.log(odo.mileage); // 999 — "private" field was bypassed directly

// 2. Prototype Chain: READ vs WRITE (important gotcha)
// The chain is only walked when READING a property. Assigning (`obj.prop = x`) or deleting (`delete obj.prop`) NEVER walks up the chain — it only ever affects the object called on directly, creating/removing an OWN property, even if a same-named property exists further up the chain.
class Base {
  shared: string = "from Base";
}
const baseInstance = new Base();
const child: Base = Object.create(baseInstance); // child's prototype = baseInstance

console.log(child.shared); // "from Base" — found via the chain (READ walks up)

child.shared = "own value"; // WRITE never walks up — creates an OWN property on child
console.log(child.shared); // "own value" — own property shadows the prototype's
console.log(baseInstance.shared); // "from Base" — untouched, proving the write was local

// 3. Object.prototype — the top of every chain
// "Object.prototype" — the final link in every prototype chain (unless deliberately broken with Object.create(null)). Supplies methods every plain object gets for free, like .toString() and .hasOwnProperty(), which is why you can call myCar.toString() even though Car never defined it.
console.log(student.toString()); // "[object Object]" — inherited from Object.prototype
console.log(Object.getPrototypeOf(Student.prototype) === Object.prototype); // true

// 4. Subclass / Superclass vocabulary + verifying the chain
// "Superclass" (parent/base class) — the class being extended. "Subclass" (child/derived class) — the class using `extends`. Same relationship as Student → GraduateStudent above; these are just the exact terms for it.

// "isPrototypeOf()" — checks whether an object exists ANYWHERE in another object's prototype chain. Same goal as `instanceof`, called the opposite way round: prototype.isPrototypeOf(instance) vs instance instanceof Constructor.
console.log(GraduateStudent.prototype.isPrototypeOf(grad)); // true
console.log(Student.prototype.isPrototypeOf(grad)); // true — inherited link
console.log(Student.prototype.isPrototypeOf(GraduateStudent.prototype)); // true

// Confirms WHERE an inherited method actually lives:
console.log(Student.prototype.hasOwnProperty("study")); // true — defined here
console.log(GraduateStudent.prototype.hasOwnProperty("study")); // true — because it's overridden here too
console.log(GraduateStudent.prototype.hasOwnProperty("getInfo")); // false — purely inherited, not redefined
console.log(grad.hasOwnProperty("study")); // false — methods live on the prototype, never on the instance

// Private Field Conventions (JavaScript Standard)
// ENCAPSULATION -> "Underscore Convention" — an established JavaScript convention (not enforced by runtime) that fields starting with underscore should be treated as private. This was the ONLY way to signal privacy before TypeScript's `private` keyword and JS's `#field` syntax existed. Still widely used in real-world code for backward compatibility or simplicity. The underscore is just a naming signal — not actually enforced.
class Logger {
  _logLevel: string; // Convention: treat as private, but NOT actually enforced

  constructor(logLevel: string) {
    this._logLevel = logLevel;
  }

  log(message: string): void {
    console.log(`[${this._logLevel}] ${message}`);
  }
}
const logger = new Logger("INFO");
logger.log("Something happened");
console.log(logger._logLevel); // ✓ Allowed at runtime — it's just a convention!
// The underscore is purely a signal to OTHER DEVELOPERS, not enforced by JS/TS

// Convention-based Soft Privacy (Underscore Convention)
// ENCAPSULATION. FORMAL NAME: "Underscore Convention" — an established JavaScript convention (NOT enforced by runtime) that fields starting with underscore should be treated as private. This was the ONLY way to signal privacy before TypeScript's `private` and JS's `#field` syntax existed. Still widely used for backward compatibility or team preference. It's purely a naming signal to other developers — the language does NOT prevent access.
class OldStyleLogger {
  _logLevel: string; // Convention: treat as private, but NOT enforced!

  constructor(logLevel: string) {
    this._logLevel = logLevel;
  }

  log(message: string): void {
    console.log(`[${this._logLevel}] ${message}`);
  }
}
const oldLogger = new OldStyleLogger("INFO");
oldLogger.log("Something");
console.log(oldLogger._logLevel); // ✓ Allowed — just a convention, not enforced
// Contrast: `private` keyword prevents it (compile error)
// Contrast: `#field` prevents it (runtime error)

// The Read-vs-Write Gotcha (Prototype Chain Direction)
// "Prototype Chain is Asymmetric" — the chain is ONLY traversed when READING a property. When you WRITE (assign) or DELETE a property, the operation ALWAYS targets the object itself, never climbing the prototype chain. This surprises developers from class-based languages.
interface Config1 {
  debug: boolean;
  timeout?: number;
}
class Config1 {
  debug: boolean = false;
}
Config1.prototype.timeout = 5000; // Add to prototype

const cfg1 = new Config1();
console.log(cfg1.timeout); // 5000 — READ: found via prototype chain ✓

cfg1.timeout = 3000; // WRITE: creates OWN property on cfg1
console.log(cfg1.timeout); // 3000 — own property
console.log(Config1.prototype.timeout); // 5000 — prototype unchanged!

// The prototype's timeout is still 5000. Assignment created an own
// property on cfg1, it did NOT mutate the prototype. This asymmetry
// is a common source of bugs when developers expect class-based behavior.

// delete cfg1.timeout;  DELETE: removes OWN property only but in TS its wrong
// coz delete operator requires the property to be optional (?) — you can't delete a required property, since deleting it would violate the type contract (timeout must always be number, but after delete it'd be undefined)
console.log(cfg1.timeout); // 5000 — falls back to prototype again

// Object.prototype as the Chain Terminus
// "Prototype Chain Terminus" — every object's chain eventually ends at Object.prototype (the prototype property of the built-in Object constructor). This is where universal methods like .toString(), .hasOwnProperty(), .valueOf() live. After Object.prototype comes null, and the chain stops.
class Widget {}
const widget = new Widget();

// Walk the chain backwards to see what's there:
console.log(Object.getPrototypeOf(widget) === Widget.prototype); // true
console.log(Object.getPrototypeOf(Widget.prototype) === Object.prototype); // true
console.log(Object.getPrototypeOf(Object.prototype) === null); // true — chain ends

// That's why every object can use .toString():
console.log(widget.toString()); // [object Object] — found on Object.prototype
console.log(widget.hasOwnProperty("constructor")); // false — own property check

// isPrototypeOf() & Formal Proof of Inheritance Chain
// "isPrototypeOf() method" — check whether a prototype object appears anywhere in an object's prototype chain. Combined with hasOwnProperty(), it proves EXACTLY where inherited methods actually live. Formal terms: "Superclass" (parent), "Subclass" (child).
interface Vehicle {
  drive(): string;
} // TypeScript interface for type-checking
class Vehicle {} // Superclass
Vehicle.prototype.drive = function () {
  return "Driving";
};

class Truck extends Vehicle {} // Subclass
const truck = new Truck();

// Proof: Where does the drive() method actually live?
console.log(truck.hasOwnProperty("drive")); // false — not on truck itself
console.log(Truck.prototype.hasOwnProperty("drive")); // false — not on Truck.prototype
console.log(Vehicle.prototype.hasOwnProperty("drive")); // true — found on SUPERCLASS!

// Proof: isPrototypeOf() shows the chain:
console.log(Vehicle.prototype.isPrototypeOf(truck)); // true
console.log(Truck.prototype.isPrototypeOf(truck)); // true
console.log(Object.prototype.isPrototypeOf(truck)); // true (chain includes it)

// This formally proves:
// truck → (its [[prototype]])
//   → Truck.prototype → (its [[prototype]])
//   → Vehicle.prototype → (its [[prototype]])
//   → Object.prototype → null (chain ends)

// ==========================================
// The `this` Keyword
// ==========================================
// ✓ this depends on CALL STYLE, not definition location
// "Execution Context" — the value of `this` depends on HOW a function is called, not WHERE it's defined. This is the fundamental rule of `this` in JavaScript/TypeScript.
// 1. Global Scope
console.log(this); // window (browser) or globalThis (Node)
// 2. Normal Function Call
/*function showThis() {
  console.log(this); // undefined (strict mode) or window (non-strict)
}
showThis();*/
// 3. Object Method — this = the object
const user = {
  name: "Harsh",
  introduce() {
    console.log(this.name); // Harsh ✓
    // Rule: object.method() → this = object (dot's left side)
  }
};
user.introduce();
// 4. Method Extracted to Variable — Problem
// Plain function → this = undefined (strict) or window
const method = user.introduce;
method(); // undefined ❌ Lost connection to user
// Why? Now it's a plain function call, not object.method()
// 5. Event Handler — this = listener element
const button = document.querySelector<HTMLButtonElement>("button");
button?.addEventListener("click", function (this: HTMLButtonElement) {
  console.log(this); // the button element ✓
  this.style.color = "red";
});
// 6. Event Handler with Arrow — Problem
// Arrow function → inherits parent's this (no own this)
button?.addEventListener("click", () => {
  console.log(this); // NOT the button ❌
  // Arrow functions inherit this from parent scope
  // Solution: use event.currentTarget instead
});

button?.addEventListener("click", (event) => {
  (event.currentTarget as HTMLButtonElement).style.color = "blue"; // ✓
});
// 7. Class Constructor — this = new instance
class User {
  name: string;
  constructor(name: string) {
    this.name = name; // this = new instance ✓
  }
  greet() {
    console.log(this.name);
  }
}
const human = new User("Ali");
human.greet(); // Ali ✓
// 8. Arrow Function as Object Method — Wrong
const obj1 = {
  title: "Wrong",
  show: () => {
    // ❌ this is NOT obj1
    // console.log(this.title); 
    // Arrow inherits this from surrounding scope, not obj1
  }
};
// 9. Nested Normal Function — Problem
const obj2 = {
  name: "Outer",
  method() {
    function inner() {
      // ❌ undefined (plain call)
      // console.log(this.name); 
    }
    inner();
  }
};
obj2.method();
// 10. Nested Arrow Function — Solution
const obj3 = {
  name: "Outer",
  method() {
    const inner = () => {
      console.log(this.name); // Outer ✓ (inherits from method)
    };
    inner();
  }
};
obj3.method();
// 11. Practical: forEach with callback
const team = {
  name: "Dev Team",
  members: ["Alice", "Bob"],
  listMembers() {
    // ❌ Wrong: this lost in normal callback
    // this.members.forEach(function(member) {
    //   console.log(this.name, member); // undefined
    // });

    // ✓ Correct: arrow inherits this
    this.members.forEach((member) => {
      console.log(this.name, member); // Dev Team, Alice; Dev Team, Bob
    });
  }
};
team.listMembers();
// 12. call() — Set this & Call Immediately
//  call(obj, args) → runs immediately, args separate
// [FORMAL NAME: "Function.prototype.call()" — explicitly set `this`
//  and invoke the function right away. Arguments passed separately.]
function introduce(this: { name: string }, greeting: string) {
  console.log(`${greeting}, ${this.name}`);
}
const person1 = { name: "Harsh" };
const person2 = { name: "Ali" };

introduce.call(person1, "Hello"); // Hello, Harsh ✓
introduce.call(person2, "Hi"); // Hi, Ali ✓

// 13. apply() — Set this & Call (Array Args)
// apply(obj, [args]) → runs immediately, args as array
// "Function.prototype.apply()" — same as call() but arguments passed as an array instead of separate parameters
function applyGreet(
  this: { name: string },
  greeting: string,
  emoji: string
) {
  console.log(`${greeting} ${this.name} ${emoji}`);
}
const user3 = { name: "Maya" };

applyGreet.apply(user3, ["Hey", "🎉"]); // Hey Maya 🎉 ✓
// vs call: applyGreet.call(user3, "Hey", "🎉");

// 14. bind() — Return New Function (Don't Call Yet)
// bind(obj, args) → returns new function, call later
// "Function.prototype.bind()" — creates a NEW function with permanently fixed `this`. Does NOT call immediately. Can also pre-fill (partially apply) arguments
function sayName(this: { name: string }) {
  console.log(this.name);
}
const person3 = { name: "Sophia" };

const boundSay = sayName.bind(person3);
boundSay(); // Sophia ✓ (call later)

// With partial argument binding:
function introduce2(this: { name: string }, greeting: string) {
  console.log(`${greeting}, ${this.name}`);
}
const boundIntro = introduce2.bind(person3, "Namaste");
boundIntro(); // Namaste, Sophia ✓

// 15. bind() with Event Listeners — Common Pattern
const handler = {
  name: "Handler",
  click() {
    console.log(this.name); // Should be "Handler"
  }
};

// ❌ Wrong: loses this
// button?.addEventListener("click", handler.click);
// ✓ Event handlers: use bind() or arrow with event.currentTarget

// ✓ Correct: bind fixes this
button?.addEventListener("click", handler.click.bind(handler));
// ✓ Object methods: use normal function, not arrow

// ✓ Alternative: arrow callback
button?.addEventListener("click", () => handler.click());
// ✓ Nested callbacks: use arrow to inherit outer this


// 16. Practical: Manager with bind()
const manager = {
  items: [] as string[],
  form: document.querySelector<HTMLFormElement>("#form"),
  input: document.querySelector<HTMLInputElement>("#input"),
  list: document.querySelector<HTMLUListElement>("#list"),

  init() {
    // Bind this so submit event handler has correct this
    this.form?.addEventListener("submit", this.handleSubmit.bind(this));
  },

  handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    const value = this.input?.value.trim();
    if (value) {
      this.addItem(value);
      if (this.input) this.input.value = "";
    }
  },

  addItem(item: string) {
    this.items.push(item);
    this.render();
  },

  render() {
    if (!this.list) return;
    this.list.innerHTML = "";
    this.items.forEach((item, i) => {
      const li = document.createElement("li");
      li.textContent = item;
      const btn = document.createElement("button");
      btn.textContent = "Delete";
      // Arrow keeps this = manager
      btn.addEventListener("click", () => {
        this.items.splice(i, 1);
        this.render();
      });
      li.appendChild(btn);
      this.list!.appendChild(li);
    });
  }
};
manager.init();

// SECTION 10: Common Mistakes and Corrections
// Mistake 1: Arrow function as object method
// const mistake1 = {
//   value: 42,
//   getValue: () => {
//     return this.value; // ❌ this ≠ mistake1
//   }
// };

// Correct:
const correct1 = {
  value: 42,
  getValue() {
    return this.value; // ✓ this = correct1
  }
};

// Mistake 2: Forgetting to bind in event listener
// const handler2 = {
//   name: "Handler",
//   handle() {
//     console.log(this.name); // ❌ loses this
//   }
// };
// button?.addEventListener("click", handler2.handle);

// Correct (already shown above with bind())

// Mistake 3: Calling call() on wrong object
// const obj = {};
// function fn() {}
// obj.call(fn); // ❌ objects don't have call (it's on functions)
// fn.call(obj); // ✓ correct

// ==========================================
// Fetch / HTTP
// ==========================================
// "Fetch API" — browser API for making HTTP requests and handling responses. Returns a Promise. Used to communicate with APIs (endpoints that return data instead of HTML)
// API Concept & JSON Format
// API (Application Programming Interface) = URL that returns structured
// data (JSON) instead of HTML webpage
// Example: https://api.example.com/users

// JSON (JavaScript Object Notation) = Data format similar to JS objects
// BUT: property names in quotes, no functions, no undefined
const jsonString: string = '{"name":"Harsh","age":26,"isDeveloper":true}';

// Key difference: JSON is a string format, not live JavaScript objects
// ✗ Invalid JSON:
// { name: "Harsh" }  → unquoted property names
// { name: "Harsh", func: function() {} }  → functions not allowed

// ✓ Valid JSON:
// { "name": "Harsh", "age": 26, "isDeveloper": true }

// JSON Conversion — String ↔ Object
// JSON String → JavaScript Object (parsing)
const userJsonString: string =
  '{"name":"Harsh","age":26,"email":"harsh@example.com"}';
const userObject = JSON.parse(userJsonString);
console.log(userObject.name); // Harsh ✓

// JavaScript Object → JSON String (stringify)
const fetchuser: { name: string; age: number } = {
  name: "Harsh",
  age: 26
};
const convertedToJson: string = JSON.stringify(fetchuser);
console.log(convertedToJson); // {"name":"Harsh","age":26}

// Basic Fetch — GET Request (Default)
// "Fetch Request" — initiates HTTP request. Returns Promise that resolves to Response object (metadata), NOT the data

// Simple GET request (default method)
async function basicFetch(): Promise<void> {
  // fetch() returns Promise<Response>
  const response = await fetch("https://api.example.com/users");

  // Response object contains: status, ok, headers, body, etc.
  console.log(response.status); // 200, 404, 500, etc.
  console.log(response.ok); // true if 200-299, false otherwise

  // response.json() = parses body as JSON (also async!)
  // This is why we need TWO awaits
  const data = await response.json();
  console.log(data); // Actual data now
}
// Response Object Structure
// Important: First .then() or await gives Response (metadata), not actual data. Must call response.json() separately.

async function understandResponse(): Promise<void> {
  const response = await fetch("https://api.example.com/users");

  // Response object properties
  console.log(response.status); // HTTP status code (200, 404, 500, etc.)
  console.log(response.statusText); // "OK", "Not Found", "Internal Server Error"
  console.log(response.ok); // boolean: true if 200-299
  console.log(response.headers); // Headers object (metadata)
  console.log(response.url); // The URL that was requested

  // Response body is not automatically parsed
  // Must call .json(), .text(), .blob(), etc.
  const jsonData = await response.json(); // Parse as JSON
  // OR
  // const textData = await response.text(); // Parse as plain text
  // OR
  // const blobData = await response.blob(); // Parse as binary
}
// Simple Fetch Pattern with Error Handling
async function simpleFetchPattern(): Promise<void> {
  try {
    // Step 1: Make request
    const response = await fetch("https://api.example.com/users");

    // Step 2: Check if status is OK (crucial!)
    if (!response.ok) {
      // ⚠️ Fetch does NOT auto-reject on 404 or 500!
      // Must check manually
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    // Step 3: Parse response body
    const data = await response.json();

    // Step 4: Use data
    console.log(data);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Fetch error:", error.message);
    }
  }
}

// Reading Nested API Response Data
// Common API structure example (Random User API):
interface UserData {
  results: Array<{
    name: { first: string; last: string };
    email: string;
    picture: { large: string };
  }>;
}

async function readNestedData(): Promise<void> {
  const response = await fetch("https://randomuser.me/api/?results=1");
  if (!response.ok) throw new Error(`HTTP ${response.status}`);

  const data: UserData = await response.json();

  // Accessing nested properties
  const firstName: string = data.results[0].name.first;
  const lastName: string = data.results[0].name.last;
  const email: string = data.results[0].email;
  const profilePicture: string = data.results[0].picture.large;

  console.log(`${firstName} ${lastName} (${email})`);
  console.log(`Avatar: ${profilePicture}`);
}

// Fetch & Render Cards (Practical Example)
async function fetchAndRenderCards(): Promise<void> {
  try {
    // Fetch data
    const response = await fetch("https://randomuser.me/api/?results=5");
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const data: UserData = await response.json();

    // Get container
    const container = document.querySelector<HTMLDivElement>(".users");
    if (!container) return;

    // Clear old content
    container.innerHTML = "";

    // Render each user as a card
    data.results.forEach((user) => {
      const card = document.createElement("article");
      card.className = "user-card";

      const img = document.createElement("img");
      img.src = user.picture.large;
      img.alt = `${user.name.first} ${user.name.last}`;

      const name = document.createElement("h3");
      name.textContent = `${user.name.first} ${user.name.last}`;

      const emailEl = document.createElement("p");
      emailEl.textContent = user.email;

      card.append(img, name, emailEl);
      container.appendChild(card);
    });
  } catch (error) {
    console.error("Failed to render cards:", error);
  }
}

// Query Parameters
// Query parameters = URL parameters that filter/customize API response
// Syntax: ?key=value&key2=value2

async function queryParameters(): Promise<void> {
  const results: number = 5;
  const page: number = 2;
  const seed: string = "abc"; // For consistent random data

  // Build URL with query parameters
  const url: string = `https://randomuser.me/api/?results=${results}&page=${page}&seed=${seed}`;

  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);

  const data = await response.json();
  console.log(data);
}
// Refresh Button & Reusable Fetch
async function setupRefreshButton(): Promise<void> {
  const refreshBtn = document.querySelector<HTMLButtonElement>(
    "#refreshUsers"
  );
  const container = document.querySelector<HTMLDivElement>(".users");

  if (!refreshBtn || !container) return;

  // Reusable fetch function
  async function loadUsers(): Promise<void> {
    container.textContent = "Loading...";

    try {
      const response = await fetch("https://randomuser.me/api/?results=5");
      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const data: UserData = await response.json();

      // Render
      container.innerHTML = "";
      data.results.forEach((user) => {
        const card = document.createElement("article");
        card.innerHTML = `
          <img src="${user.picture.large}" alt="${user.name.first}">
          <h3>${user.name.first} ${user.name.last}</h3>
          <p>${user.email}</p>
        `;
        container.appendChild(card);
      });
    } catch (error) {
      container.textContent = "Error loading users";
      console.error(error);
    }
  }

  // Initial load
  loadUsers();

  // Refresh on button click
  refreshBtn.addEventListener("click", loadUsers);
}

// GET Request (Explicit)
// GET = retrieve data from server (default)
// Used for: loading data, searching, fetching posts, etc.

async function getRequest(): Promise<void> {
  // Method 1: Implicit GET (default)
  const response1 = await fetch("https://api.example.com/users");

  // Method 2: Explicit GET
  const response2 = await fetch("https://api.example.com/users", {
    method: "GET"
  });

  // Both are equivalent
}

// POST Request — Send Data
// POST = send data to server to create resource
// Used for: create user, submit form, create post, etc.

interface CreateUserPayload {
  name: string;
  email: string;
  password: string;
}

async function postRequest(): Promise<void> {
  const newUser: CreateUserPayload = {
    name: "Harsh",
    email: "harsh@example.com",
    password: "securePassword123"
  };

  try {
    const response = await fetch("https://api.example.com/users", {
      method: "POST", // ← Specify POST
      headers: {
        "Content-Type": "application/json" // ← Tell server we're sending JSON
      },
      body: JSON.stringify(newUser) // ← Convert object to JSON string
    });

    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const result = await response.json();
    console.log("User created:", result);
  } catch (error) {
    console.error("Failed to create user:", error);
  }
}
// Form Submission with Fetch
function setupFormSubmission(): void {
  const form = document.querySelector<HTMLFormElement>("#signupForm");
  const nameInput = document.querySelector<HTMLInputElement>("#name");
  const emailInput = document.querySelector<HTMLInputElement>("#email");
  const passwordInput = document.querySelector<HTMLInputElement>("#password");
  const resultDiv = document.querySelector<HTMLDivElement>("#result");

  if (!form || !nameInput || !emailInput || !passwordInput) return;

  form.addEventListener("submit", async (e: SubmitEvent) => {
    e.preventDefault();

    // Step 1: Read form values
    const userData: CreateUserPayload = {
      name: nameInput.value.trim(),
      email: emailInput.value.trim(),
      password: passwordInput.value
    };

    // Validate
    if (!userData.name || !userData.email || !userData.password) {
      if (resultDiv) resultDiv.textContent = "All fields required";
      return;
    }

    try {
      // Step 2: Send data via POST
      const response = await fetch("https://api.example.com/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData)
      });

      // Step 3: Check status
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      // Step 4: Parse response
      const result = await response.json();
      console.log("Success:", result);

      // Step 5: Provide feedback
      if (resultDiv) {
        resultDiv.textContent = "✓ Sign up successful!";
        resultDiv.style.color = "green";
      }

      // Step 6: Reset form
      form.reset();
    } catch (error) {
      if (resultDiv) {
        resultDiv.textContent = `Error: ${error instanceof Error ? error.message : "Unknown error"}`;
        resultDiv.style.color = "red";
      }
      console.error("Submission error:", error);
    }
  });
}

// HTTP Status Codes & Ranges
// "HTTP Status Codes" — indicate result of request. 2xx = success, 4xx = client error, 5xx = server error

const HTTP_STATUS_CODES = {
  // Success (2xx)
  200: "OK — Request successful",
  201: "Created — Resource created",
  204: "No Content — Success but no data to return",

  // Client Error (4xx)
  400: "Bad Request — Invalid request data",
  401: "Unauthorized — Authentication required",
  403: "Forbidden — Permission denied",
  404: "Not Found — Resource doesn't exist",

  // Server Error (5xx)
  500: "Internal Server Error",
  502: "Bad Gateway",
  503: "Service Unavailable"
};

// Check Response Status — response.ok
async function checkResponseStatus(): Promise<void> {
  const response = await fetch("https://api.example.com/users");

  // Check individual status
  console.log(response.status); // number: 200, 404, 500, etc.
  console.log(response.statusText); // string: "OK", "Not Found", etc.

  // Check if successful (recommended)
  console.log(response.ok); // boolean: true if 200-299, false otherwise

  // Manual status check
  if (response.status === 200) {
    console.log("Success!");
  } else if (response.status === 404) {
    console.log("Not found!");
  } else if (response.status >= 500) {
    console.log("Server error!");
  }

  // Better: use response.ok
  if (response.ok) {
    console.log("Status is 200-299 range ✓");
  } else {
    console.log(`Request failed with status ${response.status}`);
  }
}

// Critical Trap — Fetch Doesn't Auto-Reject
// ⚠️ Important: Fetch does NOT reject Promise on HTTP error status!
// 404 and 500 responses still "succeed" (Promise resolves).

async function demonstrateTrap(): Promise<void> {
  // ❌ WRONG — treats 404 as success
  try {
    const response = await fetch("https://api.example.com/notfound"); // Returns 404
    // fetch resolves successfully, even though status is 404!
    const data = await response.json(); // Might parse error HTML as JSON!
    console.log(data); // Success (but contains error)
  } catch (error) {
    // This catch won't run for 404!
    console.error(error);
  }

  // ✓ CORRECT — manually check status
  try {
    const response = await fetch("https://api.example.com/notfound");

    if (!response.ok) {
      // Explicitly throw error for non-2xx status
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error); // Now catches 404 properly
  }
}

// Robust Fetch Helper Function
// "Fetch Wrapper" — reusable helper that handles common patterns: status checking, error handling, JSON parsing

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url);

  // Always check response.ok first
  if (!response.ok) {
    throw new Error(
      `HTTP ${response.status}: ${response.statusText} (${url})`
    );
  }

  // Parse JSON
  return response.json() as Promise<T>;
}

// Usage with type safety
async function useHelper(): Promise<void> {
  try {
    const users: UserData = await fetchJson(
      "https://randomuser.me/api/?results=5"
    );
    console.log(users.results.length);
  } catch (error) {
    console.error("Failed to fetch:", error instanceof Error ? error.message : error);
  }
}

// Common Mistakes & Corrections
// Mistake 1: Forgetting second await on response.json()
async function mistake1(): Promise<void> {
  // ❌ Wrong
  // const response = await fetch(url);
  // const data = response.json();  // Still a Promise!
  // console.log(data.name);  // undefined or error

  // ✓ Correct
  const response = await fetch("https://api.example.com/users");
  const data = await response.json(); // Need await here too!
  console.log(data);
}

// Mistake 2: Not checking response.ok
async function mistake2(): Promise<void> {
  // ❌ Wrong — treats 404 as success
  // const data = await fetch(url).then((r) => r.json());

  // ✓ Correct
  const response = await fetch("https://api.example.com/users");
  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }
  const data = await response.json();
}

// Mistake 3: Sending object instead of JSON string in body
async function mistake3(): Promise<void> {
  // ❌ Wrong
  // body: { name: "Harsh" }  // Object, not JSON string

  // ✓ Correct
  const response = await fetch("https://api.example.com/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: "Harsh" }) // JSON string
  });
}

// Mistake 4: No error handling (unhandled Promise rejection)
async function mistake4(): Promise<void> {
  // ❌ Wrong — errors go uncaught
  // const data = await fetch(url).then((r) => r.json());

  // ✓ Correct
  try {
    const response = await fetch("https://api.example.com/users");
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Fetch failed:", error);
  }
}

// Mistake 5: Assuming all API responses have same structure
async function mistake5(): Promise<void> {
  // ❌ Wrong — might crash if structure differs
  // const firstName = data.results[0].name.first;

  // ✓ Correct — validate or provide defaults
  try {
    const data: unknown = await fetchJson("https://api.example.com/users");

    if (
      typeof data === "object" &&
      data !== null &&
      "results" in data &&
      Array.isArray(data.results)
    ) {
      const firstUser = data.results[0];
      console.log(firstUser);
    }
  } catch (error) {
    console.error(error);
  }
}

// Complete Practical Example
interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
}

class ContactManager {
  private apiUrl: string = "https://api.example.com/contacts";
  private container: HTMLDivElement | null;
  private form: HTMLFormElement | null;
  private nameInput: HTMLInputElement | null;
  private emailInput: HTMLInputElement | null;
  private phoneInput: HTMLInputElement | null;

  constructor() {
    this.container = document.querySelector(".contacts");
    this.form = document.querySelector("#contactForm");
    this.nameInput = document.querySelector("#contactName");
    this.emailInput = document.querySelector("#contactEmail");
    this.phoneInput = document.querySelector("#contactPhone");
  }

  async init(): Promise<void> {
    // Setup form listener
    this.form?.addEventListener("submit", (e) => this.handleSubmit(e));

    // Load initial contacts
    await this.loadContacts();
  }

  async loadContacts(): Promise<void> {
    if (!this.container) return;

    this.container.innerHTML = "Loading...";

    try {
      const contacts: Contact[] = await fetchJson(this.apiUrl);

      this.container.innerHTML = "";
      contacts.forEach((contact) => {
        const card = document.createElement("article");
        card.innerHTML = `
          <h3>${contact.name}</h3>
          <p>Email: ${contact.email}</p>
          <p>Phone: ${contact.phone}</p>
          <button data-id="${contact.id}">Delete</button>
        `;

        const deleteBtn = card.querySelector("button");
        deleteBtn?.addEventListener("click", () => this.deleteContact(contact.id));

        this.container!.appendChild(card);
      });
    } catch (error) {
      if (this.container) {
        this.container.innerHTML = `<p style="color:red;">Error: ${error instanceof Error ? error.message : "Unknown error"}</p>`;
      }
    }
  }

  async handleSubmit(e: SubmitEvent): Promise<void> {
    e.preventDefault();

    if (!this.nameInput || !this.emailInput || !this.phoneInput) return;

    const newContact: Omit<Contact, "id"> = {
      name: this.nameInput.value.trim(),
      email: this.emailInput.value.trim(),
      phone: this.phoneInput.value.trim()
    };

    if (!newContact.name || !newContact.email || !newContact.phone) {
      alert("All fields required");
      return;
    }

    try {
      const response = await fetch(this.apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newContact)
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      this.form?.reset();
      await this.loadContacts(); // Refresh list
    } catch (error) {
      console.error("Failed to create contact:", error);
    }
  }

  async deleteContact(id: number): Promise<void> {
    try {
      const response = await fetch(`${this.apiUrl}/${id}`, {
        method: "DELETE"
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      await this.loadContacts(); // Refresh list
    } catch (error) {
      console.error("Failed to delete contact:", error);
    }
  }
}

// Initialize
const manager = new ContactManager();
manager.init();

// Quick Reference Summary
/*
// GET request (retrieve data)
const response = await fetch(url);
const data = await response.json();

// POST request (send data)
const response = await fetch(url, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ name: "Harsh" })
});

// DELETE request (remove resource)
const response = await fetch(`${url}/${id}`, {
  method: "DELETE"
});

// Check status
if (!response.ok) {
  throw new Error(`HTTP ${response.status}`);
}

// Query parameters
const url = `https://api.example.com/users?results=5&page=2`;

// JSON conversion
JSON.parse(jsonString);     // String → Object
JSON.stringify(object);     // Object → String

// Error handling
try {
  const data = await fetchJson(url);
} catch (error) {
  console.error(error);
}

// Render to DOM
container.innerHTML = "";
container.appendChild(card);
*/
// Key Takeaways

/*
✓ API = URL returning data (JSON format)
✓ JSON = data format with quoted properties
✓ Fetch = browser API for HTTP requests (returns Promise)
✓ Response object = metadata (status, headers, body)
✓ response.json() = async function to parse body
✓ ALWAYS use TWO awaits: await fetch(), then await response.json()
✓ GET = retrieve data (default method)
✓ POST = send data to create resource
✓ DELETE = remove resource
✓ body = data sent with request (must be JSON string)
✓ headers = metadata about request ("Content-Type": "application/json")
✓ HTTP 2xx = success, 4xx = client error, 5xx = server error
✓ response.ok = true if status 200-299
✓ CRITICAL: Fetch does NOT auto-reject on 404/500
✓ ALWAYS check if (!response.ok) before using data
✓ ALWAYS use try/catch for error handling
✓ Query params = ?key=value&key2=value2
✓ Create reusable fetch helpers to avoid repetition
✓ Validate data structure before using nested properties
*/
// Complete coverage of all topics in ONE continuous code block:

// ✅ API concept & JSON format
// ✅ JSON.parse() and JSON.stringify()
// ✅ Basic Fetch (GET request)
// ✅ Response object vs Data
// ✅ Simple Fetch Pattern with error handling
// ✅ Reading nested API responses
// ✅ Fetch & Render Cards
// ✅ Query Parameters
// ✅ Refresh Button pattern
// ✅ GET Request (explicit)
// ✅ POST Request (send data)
// ✅ Request Body
// ✅ Form Submission with Fetch
// ✅ HTTP Status Codes & ranges
// ✅ Check Response Status (response.ok)
// ✅ Critical trap: Fetch doesn't auto-reject
// ✅ Robust Fetch Helper function
// ✅ All 5 common mistakes with corrections
// ✅ Complete practical ContactManager class
// ✅ Quick reference
// ✅ Key takeaways

// ==========================================
// Browser Storage: localStorage, sessionStorage, Cookies
// ==========================================

// localStorage — permanent (survives refresh, tab close, browser close)
localStorage.setItem("name", "Harsh"); // Create/Update
const name: string | null = localStorage.getItem("name"); // Read (null if missing)
localStorage.removeItem("name"); // Delete one
localStorage.clear(); // Delete all

// sessionStorage — same API, but cleared when TAB closes (survives refresh only)
sessionStorage.setItem("step", "3");
const step: string | null = sessionStorage.getItem("step");
sessionStorage.removeItem("step");
sessionStorage.clear();

// Storage only stores STRINGS — arrays/objects need conversion
const friends: string[] = ["Ali", "Harsh", "Amit"];
localStorage.setItem("friends", JSON.stringify(friends)); // Object/Array → String
const savedFriends: string[] = JSON.parse(localStorage.getItem("friends") || "[]"); // String → Object/Array

const user: { name: string; age: number } = { name: "Harsh", age: 26 };
localStorage.setItem("user", JSON.stringify(user));
const savedUser: typeof user = JSON.parse(localStorage.getItem("user") || "{}");

// Safe JSON reading with try/catch (handles malformed data)
function safeGetJSON<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}
const safeFriends = safeGetJSON<string[]>("friends", []);

// Cookies — small (~4KB), sent to server automatically with requests
document.cookie = "email=harsh@test.com"; // Set
document.cookie = "age=26"; // Add another
console.log(document.cookie); // "email=harsh@test.com; age=26"
document.cookie = "theme=dark; expires=Fri, 31 Dec 2027 23:59:59 GMT; path=/"; // With expiry
document.cookie = "theme=dark; max-age=3600; path=/"; // Expires in 1hr (seconds)
document.cookie = "theme=; max-age=0; path=/"; // Delete (immediate expiry)

/*
localStorage vs sessionStorage vs Cookies:
- localStorage: long-term, ~5MB, never sent to server, use for preferences
- sessionStorage: current tab only, ~5MB, never sent to server, use for temp state
- Cookies: ~4KB, AUTO-sent to server on every request, use for auth/session tokens
*/

// ==========================================
// Dark/Light Theme Persistence System
// ==========================================

type Theme = "dark" | "light";

const themeBtn = document.querySelector<HTMLButtonElement>("#themeToggle");
const systemThemeQuery: MediaQueryList = window.matchMedia("(prefers-color-scheme: dark)");

// Detect OS-level preference
function getSystemTheme(): Theme {
  return systemThemeQuery.matches ? "dark" : "light";
}

// Apply theme — remove BOTH classes first to avoid "dark light" conflict
function applyTheme(theme: Theme): void {
  document.body.classList.remove("dark", "light");
  document.body.classList.add(theme);
}

// Priority: user's saved choice > system preference
function setInitialTheme(): void {
  const saved = localStorage.getItem("theme") as Theme | null;
  applyTheme(saved || getSystemTheme());
}

// Toggle button — flips theme and saves choice
themeBtn?.addEventListener("click", () => {
  const isDark: boolean = document.body.classList.contains("dark");
  const newTheme: Theme = isDark ? "light" : "dark";
  applyTheme(newTheme);
  localStorage.setItem("theme", newTheme);
});

// Live OS theme change — only follow if user hasn't manually chosen
systemThemeQuery.addEventListener("change", () => {
  if (!localStorage.getItem("theme")) {
    applyTheme(getSystemTheme());
  }
});

// Optional: reset to system default
function resetToSystemTheme(): void {
  localStorage.removeItem("theme");
  applyTheme(getSystemTheme());
}

setInitialTheme(); // Run on page load

// ==========================================
// Real-time User Search & Filter (Dynamic Rendering)
// ==========================================

interface UserCard {
  name: string;
  role: string;
  image: string;
  background: string;
}

const users: UserCard[] = [
  { name: "Harsh Sharma", role: "Frontend Developer", image: "url1", background: "bg1" },
  { name: "Amit Verma", role: "Backend Developer", image: "url2", background: "bg2" },
  { name: "Akash Singh", role: "Designer", image: "url3", background: "bg3" }
];

const searchInput = document.querySelector<HTMLInputElement>("#search");
const container = document.querySelector<HTMLDivElement>(".cards");

// Function accepts ANY array (not hardcoded to global users) — reusable design
function createUserCard(user: UserCard): HTMLElement {
  const card = document.createElement("article");
  card.classList.add("card");

  const blur = document.createElement("div");
  blur.classList.add("blur-layer");
  blur.style.backgroundImage = `url("${user.background}")`; // NOT backgroundColor

  const img = document.createElement("img");
  img.src = user.image;
  img.alt = user.name;

  const name = document.createElement("h3");
  name.textContent = user.name;

  const role = document.createElement("p");
  role.textContent = user.role;

  card.append(blur, img, name, role);
  return card;
}

function showUsers(userArray: UserCard[]): void {
  if (!container) return;
  container.innerHTML = ""; // Clear old cards — prevents duplicate stacking

  if (userArray.length === 0) {
    container.textContent = "No users found.";
    return;
  }

  userArray.forEach((user) => {
    container.appendChild(createUserCard(user));
  });
}

// Real-time filtering on every keystroke
searchInput?.addEventListener("input", (e: Event) => {
  const query: string = (e.target as HTMLInputElement).value.trim().toLowerCase();

  // filter() returns NEW array, doesn't mutate original
  const filtered: UserCard[] = users.filter((user) => {
    return (
      user.name.toLowerCase().includes(query) ||
      user.role.toLowerCase().includes(query)
    );
  });

  showUsers(filtered);
});

showUsers(users); // Initial render (all users)

// ==========================================
// JavaScript Internals: Objects, Realms, Classes, Promises
// ==========================================

// [[Get]] internal method: own property → prototype chain → undefined
const objInternal: Record<string, unknown> = { a: 1 };
console.log("a" in objInternal); // true (checks prototype chain too)
console.log(objInternal.hasOwnProperty("a")); // true (own only)

// Property keys always convert to strings (except Symbols)
const arrKey: Record<string, string> = {};
arrKey[10 as unknown as string] = "ten";
console.log(arrKey["10"]); // "ten" — same key after coercion

// Custom primitive conversion via Symbol.toPrimitive
class Product {
  constructor(public name: string, public price: number) {}
  [Symbol.toPrimitive](hint: string): string | number {
    if (hint === "number") return this.price;
    if (hint === "string") return this.name;
    return `${this.name}: $${this.price}`;
  }
}
const product = new Product("Laptop", 1000);
console.log(+product); // 1000
console.log(`${product}`); // "Laptop"

// Inherited setters: this = receiver (the object accessing it), not the prototype
const parentObj = {
  set label(v: string) {
    (this as any)._label = v;
  }
};
const childObj = Object.create(parentObj);
childObj.label = "Harsh";
console.log(childObj._label); // "Harsh" — this = childObj, not parentObj

// Array holes vs actual undefined — sparse arrays are unpredictable
const denseArr: (number | undefined)[] = [undefined, undefined];
const sparseArr: number[] = new Array(2); // holes, not values
console.log(0 in denseArr); // true
console.log(0 in sparseArr); // false (hole)

// length is a REAL property — setting it truncates or creates holes
const arrLen: string[] = ["a", "b", "c"];
arrLen.length = 2;
console.log(arrLen); // ["a", "b"]

// Cross-realm objects — instanceof unreliable, Array.isArray() is safe
// (e.g., array from an iframe won't satisfy `instanceof Array` in parent window)

// Callable vs Constructable
function NormalFn() {} // callable ✓, constructable ✓
const ArrowFn = () => {}; // callable ✓, constructable ✗
class MyClass {} // callable ✗, constructable ✓

// new.target — detect if called with `new`
function UserCtor(this: any, name: string) {
  if (!new.target) {
    return new (UserCtor as any)(name); // Force `new`
  }
  this.name = name;
}

// Default parameters have their OWN scope (separate from function body)
let outerX = 10;
function testDefaultScope(a: number = outerX): number {
  let outerX = 50; // does NOT affect default value above
  return a;
}
console.log(testDefaultScope()); // 10

// super remembers "home object" — NOT dynamic like `this`
const baseObj = { greet: () => "Hi" };
const derivedObj = {
  __proto__: baseObj,
  greet(): string {
    return "Hi child"; // conceptually uses super.greet()
  }
};

// Private fields — brand check (not duck typing)
class SecureUser {
  #id: number;
  constructor(id: number) {
    this.#id = id;
  }
  static isSecureUser(obj: unknown): boolean {
    return obj !== null && typeof obj === "object" && "#id" in obj === false
      ? false
      : true; // Simplified concept — real check uses `#id in obj`
  }
}

// Static initialization blocks — complex static setup at class definition time
class Config {
  static isDev: boolean;
  static apiUrl: string;
  static {
    Config.isDev = window.location.hostname === "localhost";
    Config.apiUrl = Config.isDev ? "http://localhost:3000" : "https://api.example.com";
  }
}

// Promise adopts inner Promise's state (doesn't nest)
const innerPromise = Promise.resolve("Done");
const outerPromise = new Promise((resolve) => resolve(innerPromise));
outerPromise.then(console.log); // "Done" — flattened, not nested

// Thenable objects are treated as Promises automatically
const thenable = {
  then(resolve: (val: string) => void) {
    resolve("Result");
  }
};
Promise.resolve(thenable).then(console.log); // "Result"

// Error propagation through chains — skips .then() until first .catch()
Promise.resolve(10)
  .then((v) => v * 2)
  .then(() => { throw new Error("Fail"); })
  .then(() => {}) // skipped
  .catch((err) => console.error(err))
  .then(() => "Recovered"); // chain continues after catch

// finally() passes value through unless it throws
Promise.resolve("Success")
  .finally(() => "Ignored") // does NOT change resolved value
  .then(console.log); // "Success"

// await creates execution boundary even for non-Promise values
async function awaitBoundary(): Promise<void> {
  console.log("1");
  await 42; // still yields to event loop
  console.log("2");
}

// Unhandled rejection monitoring (debugging, not error handling)
window.addEventListener("unhandledrejection", (event) => {
  console.error("Uncaught:", event.reason);
});

// Structured concurrency: parent owns child tasks, cancellation, cleanup
async function loadPage(signal: AbortSignal): Promise<void> {
  const [userData, posts] = await Promise.all([
    fetch("/user", { signal }).then((r) => r.json()),
    fetch("/posts", { signal }).then((r) => r.json())
  ]);
}

// AbortController — single failure cancels all in-flight requests
async function fetchAllOrCancel(): Promise<void> {
  const controller = new AbortController();
  try {
    await Promise.all([
      fetch("/user", { signal: controller.signal }),
      fetch("/posts", { signal: controller.signal })
    ]);
  } catch (error) {
    controller.abort();
    throw error;
  }
}

// Binary data: ArrayBuffer + typed array views (multiple interpretations, same memory)
const buffer = new ArrayBuffer(8);
const bytesView = new Uint8Array(buffer);
bytesView[0] = 255;
const intView = new Uint32Array(buffer); // same memory, different lens

// DataView — explicit endianness control (binary protocols, file formats)
const dvBuffer = new ArrayBuffer(4);
const dv = new DataView(dvBuffer);
dv.setUint16(0, 500, true); // little-endian
const dvValue = dv.getUint16(0, true);

// Text encoding — string ↔ bytes (network, file I/O)
const encoder = new TextEncoder();
const encoded: Uint8Array = encoder.encode("Hello");
const decoder = new TextDecoder();
console.log(decoder.decode(encoded)); // "Hello"

// Transferable objects — memory ownership TRANSFER (not copy) to workers
declare const worker: Worker;
const transferBuffer = new ArrayBuffer(10_000_000);
worker.postMessage({ buffer: transferBuffer }, [transferBuffer]);
console.log(transferBuffer.byteLength); // 0 — detached after transfer

// MessageChannel — isolated point-to-point communication
const channel = new MessageChannel();
channel.port1.onmessage = (event) => console.log(event.data);
channel.port2.postMessage("Hello");

// BroadcastChannel — same-origin cross-tab communication
const broadcast = new BroadcastChannel("app");
broadcast.postMessage({ type: "logout" });
broadcast.addEventListener("message", (event) => {
  if (event.data.type === "logout") console.log("Logging out locally");
});

// ==========================================
// Advanced JS: Hoisting, TDZ, Coercion, Collections, Generators
// ==========================================

// Hoisting — var initialized as undefined, function declarations fully hoisted
console.log(typeof hoistedVar); // "undefined" (not error)
var hoistedVar: number = 26;

greetFn(); // Works — fully hoisted
function greetFn(): void {
  console.log("Hello");
}

// Temporal Dead Zone (TDZ) — let/const hoisted but NOT initialized
// console.log(tdzVar); // ReferenceError if uncommented
let tdzVar: number = 26;

// Primitive vs Reference — primitives copy, objects share reference
let primA: number = 10;
let primB: number = primA;
primB = 50;
console.log(primA); // 10 (independent)

const refA = { name: "Harsh" };
const refB = refA; // same reference
refB.name = "Amit";
console.log(refA.name); // "Amit" (shared!)

// Shallow vs Deep Copy
const original = { name: "Harsh", address: { city: "Bhopal" } };
const shallowCopy = { ...original };
shallowCopy.address.city = "Delhi";
console.log(original.address.city); // "Delhi" — nested object still shared!

const deepCopy = structuredClone(original); // true independent copy
deepCopy.address.city = "Mumbai";
console.log(original.address.city); // unaffected

// Type Coercion
console.log("5" + 2); // "52" (string concat)
console.log("5" as unknown as number - 2); // 3 (number conversion)

// Equality: == vs === vs Object.is()
console.log(5 == ("5" as unknown as number)); // true (coercion)
console.log((5 as unknown) === ("5" as unknown)); // false (strict)
console.log(Object.is(NaN, NaN)); // true (unlike === which is false)
console.log(Object.is(0, -0)); // false (unlike === which is true)

// Truthy vs Falsy — falsy: false, 0, -0, 0n, "", null, undefined, NaN
if ([] as unknown) console.log("empty array is truthy!");
if ({} as unknown) console.log("empty object is truthy!");

// Optional Chaining & Nullish Coalescing
interface Profile { address?: { city: string } }
const profileUser: { profile?: Profile } = {};
console.log(profileUser.profile?.address?.city); // undefined, no crash

const suppliedCount = 0;
console.log(suppliedCount ?? 10); // 0 (only null/undefined trigger fallback)
console.log(suppliedCount || 10); // 10 (falsy also triggers — often wrong!)

// Logical Assignment Operators
const settingsObj: { volume?: number } = {};
settingsObj.volume ??= 50; // assign only if null/undefined

// Destructuring & Spread
const { name: userName, age: userAge = 18 } = { name: "Harsh" }; // default value
const [first, , ...restArr] = [1, 2, 3, 4]; // skip index, rest
const { name: n2, ...remainingProps } = { name: "A", age: 1, city: "X" };
const mergedObj = { ...{ a: 1 }, ...{ b: 2 } }; // later wins on conflict

// Property Descriptors
const descTarget: Record<string, number> = {};
Object.defineProperty(descTarget, "id", {
  value: 101,
  writable: false,
  enumerable: false,
  configurable: false
});

// Getters & Setters
const nameObj = {
  firstName: "Harsh",
  lastName: "Sharma",
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  },
  set fullName(value: string) {
    [this.firstName, this.lastName] = value.split(" ");
  }
};
console.log(nameObj.fullName); // "Harsh Sharma"

// Symbols — unique, collision-free keys
const idSymbol = Symbol("id");
const symUser: Record<string | symbol, unknown> = { name: "Harsh", [idSymbol]: 101 };
console.log(Object.keys(symUser)); // ["name"] — symbols hidden

// Set — unique values only
const uniqueSet = new Set<number>([10, 20, 10]); // duplicate ignored
console.log(uniqueSet.size); // 2
const uniqueArr: number[] = [...new Set([1, 2, 2, 3])]; // dedupe array

// Map — any type as key
const mapUser = { name: "Harsh" };
const permissionsMap = new Map<object, string[]>();
permissionsMap.set(mapUser, ["read", "write"]);
console.log(permissionsMap.get(mapUser));

// WeakMap/WeakSet — GC-friendly, object keys only, not iterable
const privateData = new WeakMap<object, { token: string }>();
const weakUser = {};
privateData.set(weakUser, { token: "secret" });

// Iterables & Custom Iterator
const customRange = {
  start: 1,
  end: 5,
  [Symbol.iterator]() {
    let current = this.start;
    return {
      next: (): IteratorResult<number> => {
        if (current <= this.end) return { value: current++, done: false };
        return { value: undefined, done: true };
      }
    };
  }
};
for (const num of customRange) console.log(num); // 1,2,3,4,5

// Generators — pause/resume, lazy evaluation
function* numberGen(): Generator<number> {
  yield 1;
  yield 2;
  yield 3;
}
for (const n of numberGen()) console.log(n);

function* idGenerator(): Generator<number> {
  let id = 1;
  while (true) yield id++; // infinite, lazy
}
const idGen = idGenerator();
console.log(idGen.next().value); // 1 (only computed when requested)

// Event Loop: sync → microtasks → macrotasks
console.log("A");
setTimeout(() => console.log("B"), 0); // macrotask
Promise.resolve().then(() => console.log("C")); // microtask
queueMicrotask(() => console.log("D")); // microtask
console.log("E");
// Output order: A, E, C, D, B

// Promise Combinators
async function combinators(): Promise<void> {
  // all() — fails if ANY fails
  const [a, b] = await Promise.all([Promise.resolve(1), Promise.resolve(2)]);

  // allSettled() — waits for all, regardless of failure
  const results = await Promise.allSettled([Promise.resolve(1), Promise.reject("err")]);

  // race() — first to settle (resolve OR reject) wins
  const winner = await Promise.race([Promise.resolve("fast"), Promise.resolve("slow")]);

  // any() — first to SUCCEED wins (ignores rejections unless all fail)
  const firstSuccess = await Promise.any([Promise.reject("e1"), Promise.resolve("ok")]);
}

// AbortController with timeout pattern
async function fetchWithTimeout(url: string, ms = 5000): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), ms);
  try {
    return await fetch(url, { signal: controller.signal });
  } finally {
    clearTimeout(timeoutId);
  }
}

// Search cancellation — cancel old request when new one starts
let currentSearchController: AbortController | undefined;
async function liveSearch(query: string): Promise<void> {
  currentSearchController?.abort();
  currentSearchController = new AbortController();
  try {
    const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`, {
      signal: currentSearchController.signal
    });
    const data = await res.json();
  } catch (error) {
    if ((error as Error).name !== "AbortError") console.error(error);
  }
}

// Retry with exponential backoff
async function fetchWithRetry(url: string, retries = 3): Promise<Response> {
  let lastError: unknown;
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return response;
    } catch (error) {
      lastError = error;
      if (attempt < retries) {
        await new Promise((resolve) => setTimeout(resolve, attempt * 1000));
      }
    }
  }
  throw lastError;
}

// URL & URLSearchParams
const urlObj = new URL("https://example.com/search");
urlObj.searchParams.set("query", "JavaScript");
urlObj.searchParams.set("page", "2");
console.log(urlObj.toString()); // safely encoded

const parsedParams = new URLSearchParams(window.location.search);
const pageParam: string | null = parsedParams.get("page");

// CORS — server must send Access-Control-Allow-Origin; can't fix from frontend alone
// Credentials/Cookies in cross-origin requests
fetch("https://api.example.com/data", { credentials: "include" });

// ✅ Block 1: localStorage, sessionStorage, cookies, JSON.stringify/parse
// ✅ Block 2: Complete theme persistence system with priority logic
// ✅ Block 3: Real-time search/filter with reusable render function
// ✅ Block 4: JS internals (prototypes, realms, private fields, Promises, binary data, worker communication)
// ✅ Block 5: Advanced fundamentals (hoisting, TDZ, coercion, collections, generators, event loop, retry patterns, CORS)


// ==========================================
// Secondary Gaps: Object Methods, Memory/GC, Modules
// ==========================================

// ==========================================
// 1. Object.freeze() — Prevent ALL Modifications
// ==========================================
// [FORMAL NAME: "Object.freeze()" — makes an object COMPLETELY
//  immutable: can't add, remove, or modify properties. Shallow freeze
//  only (nested objects remain mutable).]

const frozenUser = Object.freeze({ name: "Harsh", age: 26 });
// frozenUser.age = 30; // ❌ silently fails (or throws in strict mode)
// frozenUser.city = "Delhi"; // ❌ can't add new properties
// delete frozenUser.name; // ❌ can't delete properties

console.log(Object.isFrozen(frozenUser)); // true

// Shallow freeze — nested objects are STILL mutable
const shallowFrozen = Object.freeze({ address: { city: "Bhopal" } });
shallowFrozen.address.city = "Delhi"; // ✓ this WORKS (nested not frozen)
console.log(shallowFrozen.address.city); // "Delhi"

// Deep freeze utility (recursive)
function deepFreeze<T extends object>(obj: T): Readonly<T> {
  Object.values(obj).forEach((value) => {
    if (typeof value === "object" && value !== null) {
      deepFreeze(value);
    }
  });
  return Object.freeze(obj);
}

// ==========================================
// 2. Object.seal() — Prevent Add/Remove (Allow Modify)
// ==========================================
// [FORMAL NAME: "Object.seal()" — prevents ADDING or REMOVING
//  properties, but EXISTING properties can still be modified.
//  Less restrictive than freeze().]

const sealedUser = Object.seal({ name: "Harsh", age: 26 });
sealedUser.age = 30; // ✓ allowed — modifying existing property
// sealedUser.city = "Delhi"; // ❌ can't add new properties
// delete sealedUser.name; // ❌ can't delete properties

console.log(Object.isSealed(sealedUser)); // true
console.log(sealedUser); // { name: "Harsh", age: 30 }

// Freeze vs Seal comparison:
// freeze(): NO add, NO remove, NO modify
// seal():   NO add, NO remove, YES modify

// ==========================================
// 3. Object.defineProperty() — Fine-Grained Control
// ==========================================
// [FORMAL NAME: "Object.defineProperty()" — precisely control a
//  single property's behavior: writable, enumerable, configurable,
//  or define custom get/set logic.]

const preciseObj: Record<string, unknown> = {};

Object.defineProperty(preciseObj, "id", {
  value: 101,
  writable: false, // can't reassign value
  enumerable: false, // won't show in Object.keys()/for...in
  configurable: false // can't delete or redefine
});

console.log(preciseObj.id); // 101
preciseObj.id = 999; // silently fails (writable: false)
console.log(Object.keys(preciseObj)); // [] (enumerable: false hides it)

// Define multiple properties at once
Object.defineProperties(preciseObj, {
  name: { value: "Harsh", writable: true, enumerable: true },
  age: { value: 26, writable: true, enumerable: true }
});

// Custom getter/setter via defineProperty
const withAccessor: { _value?: number; value?: number } = {};
Object.defineProperty(withAccessor, "value", {
  get() {
    return this._value ?? 0;
  },
  set(newVal: number) {
    this._value = newVal < 0 ? 0 : newVal; // validation logic
  }
});
withAccessor.value = -5;
console.log(withAccessor.value); // 0 (validated, negative rejected)

// ==========================================
// 4. Memory & Garbage Collection (GC)
// ==========================================
// [FORMAL NAME: "Garbage Collection" — automatic memory management.
//  JS engines free memory for objects no longer reachable/referenced.
//  Two main algorithms: Reference Counting and Mark-and-Sweep.]

// Reference Counting (older, simpler algorithm — has flaws)
// Concept: object freed when reference count reaches 0
let objA: { name: string } | null = { name: "A" }; // ref count: 1
let objB = objA; // ref count: 2 (same object, two references)
objA = null; // ref count: 1 (objB still holds reference)
objB = null as any; // ref count: 0 → eligible for garbage collection

// PROBLEM with reference counting: circular references never reach 0
function circularReferenceProblem(): void {
  const nodeA: { name: string; ref?: unknown } = { name: "A" };
  const nodeB: { name: string; ref?: unknown } = { name: "B" };
  nodeA.ref = nodeB; // A references B
  nodeB.ref = nodeA; // B references A (circular!)
  // Even if both go out of scope, reference count never hits 0
  // (this is why modern engines use Mark-and-Sweep instead)
}

// Mark-and-Sweep (modern algorithm — solves circular reference problem)
/*
Concept:
1. MARK phase: starting from "roots" (global object, currently executing
   functions), traverse and mark all REACHABLE objects
2. SWEEP phase: any object NOT marked (unreachable) is garbage collected

Circular references ARE correctly collected because if neither nodeA
nor nodeB is reachable from a root, both get swept — regardless of
referencing each other.
*/

// Common memory leak patterns to avoid:

// Leak 1: Forgotten timers/intervals
function leakyTimer(): void {
  const largeData = new Array(1_000_000).fill("data");
  setInterval(() => {
    console.log(largeData.length); // largeData never freed while interval runs
  }, 1000);
  // Fix: always clearInterval() when done
}

// Leak 2: Detached DOM references
function leakyDomReference(): void {
  const elements: HTMLElement[] = [];
  function addElement() {
    const el = document.createElement("div");
    document.body.appendChild(el);
    elements.push(el); // kept in array even after removing from DOM
  }
  // Fix: remove from array when removing from DOM
}

// Leak 3: Uncleared event listeners
function leakyEventListener(): void {
  const button = document.querySelector("button");
  function handleClick() {
    console.log("clicked");
  }
  button?.addEventListener("click", handleClick);
  // Fix: button?.removeEventListener("click", handleClick) when done
}

// Leak 4: Closures holding large data unnecessarily
function leakyClosure() {
  const hugeArray = new Array(1_000_000).fill("x");
  return function smallFunction() {
    console.log("I don't need hugeArray, but it's still referenced!");
  };
  // Fix: null out large data if not needed, or avoid capturing it
}

// ==========================================
// 5. Modules — Import/Export Patterns
// ==========================================
// [FORMAL NAME: "ES Modules" (ESM) — official JavaScript module system.
//  Each file is its own scope; explicit import/export controls what's
//  shared between files.]

// Named exports (multiple per file)
// export const PI = 3.14159;
// export function add(a: number, b: number): number { return a + b; }
// export class Calculator {}

// Named imports (must match export names, or use `as` to rename)
// import { PI, add, Calculator } from "./math";
// import { add as sum } from "./math"; // renamed on import

// Default export (ONE per file)
// export default class MainComponent {}
// import MainComponent from "./component"; // any name works for default

// Mixed exports (named + default in same file)
// export default function main() {}
// export const helper = () => {};
// import main, { helper } from "./module";

// Re-exporting (barrel pattern — common in larger projects)
// export { add, subtract } from "./math";
// export * from "./utils"; // re-export everything

// Namespace import (import everything as one object)
// import * as MathUtils from "./math";
// MathUtils.add(1, 2);

// ==========================================
// 6. Circular Dependencies — The Problem
// ==========================================
// [FORMAL NAME: "Circular Dependency" — Module A imports Module B,
//  and Module B imports Module A (directly or through a chain).
//  Can cause undefined values if not handled carefully.]

/*
// fileA.ts
import { valueB } from "./fileB";
export const valueA = "A depends on: " + valueB; // may be undefined!

// fileB.ts
import { valueA } from "./fileA";
export const valueB = "B depends on: " + valueA; // circular!

PROBLEM: Depending on import order, one file may see `undefined`
for the other's export, because modules are evaluated once, and
circular imports can reference values before they're initialized.
*/

// Solutions to circular dependencies:
// 1. Refactor: extract shared logic into a THIRD module both depend on
// 2. Use lazy/dynamic imports: import() inside functions (deferred evaluation)
// 3. Restructure: move imports to only what's needed, avoid deep coupling

// Dynamic import (also useful for code-splitting/lazy loading)
async function loadModuleDynamically(): Promise<void> {
  const module = await import("./heavyModule"); // loaded only when needed
  module.doSomething();
}

// ==========================================
// 7. Quick Reference & Key Takeaways
// ==========================================

/*
✓ Object.freeze() = NO add/remove/modify (shallow — nested still mutable)
✓ Object.seal() = NO add/remove, YES modify existing
✓ Object.defineProperty() = fine-grained control (writable/enumerable/configurable)
✓ Reference Counting = old GC algorithm, fails on circular references
✓ Mark-and-Sweep = modern GC algorithm, correctly handles circular refs
✓ Memory leaks: forgotten timers, detached DOM refs, uncleared listeners, closures
✓ Named exports = multiple per file, exact name match on import (or rename with as)
✓ Default export = ONE per file, any name on import
✓ Circular Dependency = A imports B, B imports A — can cause undefined values
✓ Fix circular deps: extract shared module, use dynamic import(), restructure
✓ Dynamic import() = lazy-load modules, returns a Promise
*/

// ✅ Functional Programming — Pure functions, HOFs, composition (compose/pipe), currying, partial application, memoization
// ✅ Advanced Destructuring — Nested patterns, rest, defaults, computed property names
// ✅ Secondary Gaps — Object.freeze/seal/defineProperty, Memory & GC (reference counting vs mark-and-sweep, leak patterns), Modules (import/export patterns, circular dependencies)
// ⏭️ Skipped (already covered): Generators/Iterators, Collections (Map/Set/WeakMap), Prototype Chain, Regex


