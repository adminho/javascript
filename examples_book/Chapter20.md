# โค้ดบทที่ 20 มอดูล

## มอดูลคืออะไร

```js
// ไฟล์ main.js
// ไม่ได้โหลดอะไรเข้ามา
import "lib/mylib";
```

```js
// -------------- ไฟล์ lib/mylib.js ---------------
export var a = 1;
export var b = 2;
// -------------- ไฟล์ main.js --------------------
import { a, b } from "lib/mylib";
console.log(a); // 1
console.log(b); // 2
```

## เอ็กซ์พอร์ตด้วยการระบุชื่อ

```js
// ไฟล์ lib.js
export var a = 1;
export let b = 2;
export const MY_CONST = 100;
export  function myFunction() {
     // ซอร์สโค้ด
}
export function * myGenerator() {
     // ซอร์สโค้ด
}
export  class MyClass {
     // ซอร์สโค้ด
}
```

```js
// ไฟล์ example.js 
const CONST_VALUE = 100;		  // บรรทัด a -- จะไม่ถูกเอ็กซ์พอร์ตออกไป
export function square(x) {		  // บรรทัด b
        return x * x;
}
export function calculate(x, y) {	             // บรรทัด c
        return (square(x) + square(y)) * CONST_VALUE; 
}
function multiply(num1, num2) { 	             // บรรทัด d 
    return num1 * num2;
}
export multiply;			             // บรรทัด e -- เอ็กซ์พอร์ตภายหลัง
```

```js
// ไฟล์ example.js 
const CONST_VALUE = 100;		 
function square(x) {	
        return x * x;
}
function calculate(x, y) {	
        return (square(x) + square(y)) * CONST_VALUE; 
}
function multiply(num1, num2) { 	
    return num1 * num2;
}
export { square, calculate, multiply};	 // เขียนคำว่า export ที่บรรทัดสุดท้ายที่เดียว
```

```js
let condition = true;
if (condition) {
    export condition;    // syntax error
}
```

## วิธีโหลดมอดูล

```js
// -------------- ไฟล์ example.js --------------
const CONST_VALUE = 100;		 
function square(x) {	
        return x * x;
}
function calculate(x, y) {	
        return (square(x) + square(y)) * CONST_VALUE; 
}
function multiply(num1, num2) { 	
    return num1 * num2;
}
export {square, calculate, multiply};
```

```js
// -------------- ไฟล์ main.js -----------------
import {square, calculate} from "example";
console.log(square(2)); 	                         // 4
console.log(calculate(2, 2)); 	             // 800
square =1;		                         // error	
calculate= 2; 	                                     // error	
var square = 1;  	                                     // error	
var calculate = 2 ;	                         // error	
```

```js
// -------------- ไฟล์ msg.js -----------------
export var message = "Hi";
export function setMessage(msg) {
    message = msg;
}
```

```js
// -------------- ไฟล์ main.js --------------
import { message, setMessage } from "msg";
console.log(message);	                         // "Hi"
setMessage("Bye");      	                         // บรรทัด a
console.log(message);                              // "Bye" 
message = "Good morning";                     // บรรทัด b -- จะเกิด error
```

```js
// ไฟล์ main.js 
import * as lib from "example";
console.log(lib.square(2)); 	 
console.log(lib.calculate(2, 2));
```

```js
import { square } from "example";
import { calculate } from "example";
import { multiply } from "example";
```

## เปลี่ยนชื่อสิ่งที่ต้องการโหลด และเอ็กซ์พอร์ต

```js
// ไฟล์ main.js 
import { square, calculate as calc } from "example";
console.log(square(2)); 
console.log(calc(2, 2));
```

```js
// -------------- ไฟล์ example.js --------------
const CONST_VALUE = 100;		
export function square(x) {
        return x * x;
}
export function calculate(x, y) {				
        return (square(x) + square(y)) * CONST_VALUE; 
}
function multiply(num1, num2) { 
        return num1 * num2;
}
export { square as sqr, calculate as calc, multiply as mul};	// บรรทัด a
```

```js
// -------------- ไฟล์ main.js -----------------
import {sqr, calc, mul} from "example";
console.log(sqr(2)); 	// 4
console.log(calc(2, 2)); 	// 800
console.log(mul(2,2)); 	// 4
```

## เอ็กซ์พอร์ตแบบดีฟอลต์ 

```js
// -------------- ไฟล์ MyFunc.js --------------
export default function () { /*…*/ }
```

```js
// -------------- ไฟล์ MyClass.js --------------
export default class { /*…*/ }
```

```js
// -------------- ไฟล์ MyValue.js --------------
export default 123;
```

```js
// -------------- ไฟล์ MyArrow.js --------------
export default param => param;
```

```js
// ไฟล์ main.js 
import func from "MyFunc";
import _class from "MyClas";
import value from "MyValue";
import arrowFunc from "MyArrow";
```

```js
// -------------- ไฟล์ mydefault.js --------------
export var value = 100;
export function square(x) {	
    return x * x;
}
export default function(num1, num2) {    // ฟังก์ชั่นไร้ชื่อ
    return num1 + num2;
}
```

```js
// -------------- ไฟล์ main.js -------------------
import multiply, {value, square} from "mydefault";
console.log(value);			 // 100
console.log(square(2,2));		             // 4
console.log(multiply(2,2));	             // 4
```

## เอ็กซ์พอร์ตซ้ำจากมอดูลอื่น

```js
// -------------- ไฟล์ mylib.js --------------
var foo = 1;
var bar = 2;
export {foo, bar};
```

```js
// -------------- ไฟล์ example.js --------------
export {foo, bar} from "mylib";
```

```js
// -------------- ไฟล์ example.js --------------
import {foo, bar} from "mylib";
export {foo, bar};
```

```js
// -------------- ไฟล์ example.js --------------
export {foo as foo1, bar} from "mylib";
```

```js
// -------------- ไฟล์ example.js --------------
export * from "mylib";
```

## Namespace re-exporting

```js
export * as ns from "http";
```

* ลองพิจารณาตัวอย่างไฟล์ 3 อัน ดังต่อไปนี้
* 1) ไฟล์ name.js จะเป็นมอดูลง่ายๆ เก็บตัวแปร firstname กับ lastname
	
```js
// -------------- ไฟล์ name.js ------------------
const firstname = "Somchai";
const lastname = "Jaidee";
export {firstname, lastname};                    // ส่งออก firstname กับ lastname
```

* 2) ไฟล์ student.js เป็นมอดูลอย่างง่าย ข้างในทำการ export ส่งออกตัวแปร age และจะนำเข้ามอดูล name.js พร้อม export ส่องออกมอดูลออกมาเป็นชื่อ person (เปลี่ยนชื่อ namespace)

```js
// -------------- ไฟล์ student.js ------------------
const age = 25;
export {age};                                          // ส่งออก age
export * as person from "./name.js"        // ส่งออก person
```

* 3) ไฟล์ myprogram.js เอาไว้รันทดสอบโปรแกรม โดยจะนำเข้ามอดูล student.js ดังตัวอย่าง

```js
// -------------- ไฟล์ myprogram.js -----------------
import {age, person} from "./student.js"
console.log(age);                                     // 25
console.log(person.firstname);                  // "Somchai"         
console.log(person.lastname);                  // "Jaidee"
```

## อ็อบเจ็กต์โกลบอล

```js
// --------------  ไฟล์ example.js --------------
Object.prototype.say = function(msg) {
     console.log(msg);
};
```

```js
// -------------- ไฟล์ main.js ------------------
import "example";
let a = { };
a.say("I love JavaScript");		// "I love JavaScript"
```

## ลองใช้งานมอดูลกันจริงๆ

### วิธีใช้งานมอดูลบนเว็บเบราเซอร์

```html
<!DOCTYPE html>
<html>
<head> </head>
<body> 
     <script type="module"> 
        import {msg} from "./mylib.js";
        alert(msg);   
   </script>
</body>
</html>
```

```js
// -------------- ไฟล์ mylib.js ------------------
export const msg = "I love JavaScriptt";
```

```js
<script nomodule>
  import {msg} from "./mylib.js" ;
  alert(msg);
</script>
```

```js
// -------------- ไฟล์ mylib.mjs ------------------
export const msg = "I love JavaScript";
```

```js
// -------------- ไฟล์ myapp.mjs ------------------
import { msg } from './mylib.mjs';
console.log(msg);
```

```js
// -------------- ไฟล์ mylib.js ------------------
export const msg = "I love JavaScript";
```

```js
// -------------- ไฟล์ myapp.mjs ------------------
import { msg } from './mylib.js';
console.log(msg);
```

```js
{ "type": "module" }
```

```js
{
  "name": "my-awesome-package",
  "version": "1.0.0"
  ,"type": "module"
}
```

```js
var http = require("http");
var fs = require("fs"),
var url = require("url"); 
```

```js
import * as http from "http";
import * as fs from "fs";
import * as url from "url";
```

## โอเปอเรเตอร์ import()

```js
import("http")
.then((httpModule) => {
  console.log(httpModule.maxHeaderSize);    //16384
});
```

```js
const httpModule = await import("http");
console.log(httpModule.maxHeaderSize);     //16384
```

## import.meta

```js
console.log(import.meta.url);     // "file:///c:/javascript/mymodule.js"
```