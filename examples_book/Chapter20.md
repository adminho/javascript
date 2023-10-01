# โค้ดบทที่ 20 มอดูล

## มอดูลคืออะไร

```js
// -------------- ไฟล์ main.js --------------------
import "./lib/mylib.js"; // ไม่ได้โหลดอะไรเข้ามา
```

```module
// -------------- ไฟล์ lib/mylib.js ---------------
export var a = 1;
export var b = 2;
```

```run.module
// -------------- ไฟล์ main.js --------------------
import { a, b } from "./lib/mylib.js";
console.log(a); // 1
console.log(b); // 2
```

## เอ็กซ์พอร์ตด้วยการระบุชื่อ

```module
// -------------- ไฟล์ lib.js --------------------
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

```module
// -------------- ไฟล์ example.js -------------------- 
const CONST_VALUE = 100;		  // บรรทัด a -- จะไม่ถูกเอ็กซ์พอร์ตออกไป
export function square(x) {		  // บรรทัด b
        return x * x;
}
export function calculate(x, y) {	             // บรรทัด c
        return (square(x) + square(y)) * CONST_VALUE; 
}
function multiply(num1, num2) { 	 // บรรทัด d 
    return num1 * num2;
}
export multiply;			             // บรรทัด e -- เอ็กซ์พอร์ตภายหลัง
```

```module
// -------------- ไฟล์ example.js -------------------- 
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
    export condition;    // SyntaxError
}
```

## วิธีโหลดมอดูล

```module
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

```run.module
// -------------- ไฟล์ main.js -----------------
import {square, calculate} from "./example.js";
console.log(square(2)); 	                         // 4
console.log(calculate(2, 2)); 	             // 800
square =1;		                         // บรรทัด a -- จะเกิด TypeError	
calculate= 2; 	                                     // บรรทัด b -- จะเกิด ypeError	
var square = 1;  	                                     // บรรทัด c -- จะเกิด SyntaxError	
var calculate = 2 ;	                         // บรรทัด d -- จะเกิด SyntaxError	
```

-----

```module
// -------------- ไฟล์ msg.js -----------------
export var message = "Hi";
export function setMessage(msg) {
    message = msg;
}
```

```run.module
// -------------- ไฟล์ main.js --------------
import { message, setMessage } from "./msg.js";
console.log(message);	                         // "Hi"
setMessage("Bye");      	                         // บรรทัด a
console.log(message);                              // "Bye" 
message = "Good morning";                     // บรรทัด b -- จะเกิด TypeError
```

```run.module
// ไฟล์ main.js 
import * as lib from "./example.js";
console.log(lib.square(2)); 	// 4	 
console.log(lib.calculate(2, 2));	// 800
```

```run.module
// -------------- ไฟล์ main.js -------------- 
import { square } from "./example.js";
import { calculate } from "./example.js";
import { multiply } from "./example.js";
```

เพื่อให้เข้าใจถึงหลักการทำงานเวลามอดูลถูกโหลดเข้ามา สมมติว่ามีไฟล์มอดูล say.js ดังนี้
```module
// -------------- ไฟล์ say.js -----------------
export const msg = "Hello";                   // บรรทัด a
console.log(msg);                                    // บรรทัด b
```

```run.module
// -------------- ไฟล์ main.js -------------- 
import { msg } from "./say.js";
// แสดงผลลัพธ์
// "Hello"
```

```run.module
// -------------- ไฟล์ main.js -------------- 
import * as say1 from "./say.js";
import * as say2 from "./say.js";
import * as say3 from "./say.js";
// แสดงผลลัพธ์
// "Hello"
```

```run.module
// -------------- ไฟล์ main.js -------------- 
import { msg } from "./say.js";
import { msg } from "./say.js";    // เกิด SyntaxError เพราะประกาศชื่อ msg ซ้ำกัน 2 ครั้ง
```

```run.module
// -------------- ไฟล์ main.js -------------- 
import { msg as msg1 } from "./say.js";
import { msg as msg2 } from "./say.js";    
// แสดงผลลัพธ์
// "Hello"
```

```run.module
// -------------- ไฟล์ main.js -------------- 
console.log("Hi")                                    // บรรทัด a
import { msg } from "./say.js";                 // บรรทัด b
// แสดงผลลัพธ์
// "Hello"
// "Hi"
```

```run.module
// -------------- ไฟล์ main.js -------------- 
{ 
     import { msg } from "./say.js";            // SyntaxError     
}
```

## เปลี่ยนชื่อสิ่งที่ต้องการโหลด และเอ็กซ์พอร์ต

```run.module
// -------------- ไฟล์ main.js -------------- 
import { square, calculate as calc } from "./example.js";
console.log(square(2)); 	// 4
console.log(calc(2, 2));	// 800
```

```module
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

```run.module
// -------------- ไฟล์ main.js -----------------
import {sqr, calc, mul} from "./example.js";
console.log(sqr(2)); 	// 4
console.log(calc(2, 2)); 	// 800
console.log(mul(2,2)); 	// 4
```

## เอ็กซ์พอร์ตแบบดีฟอลต์ 

```module
// -------------- ไฟล์ MyFunc.js --------------
export default function () { /*…*/ }
```

```module
// -------------- ไฟล์ MyClass.js --------------
export default class { /*…*/ }
```

```module
// -------------- ไฟล์ MyValue.js --------------
export default 123;
```

```module
// -------------- ไฟล์ MyArrow.js --------------
export default param => param;
```

```run.module
// -------------- ไฟล์ main.js -------------- 
import func from "./MyFunc.js";
import _class from "./MyClass.js";
import value from "./MyValue.js";
import arrowFunc from "./MyArrow.js";
```

----

```module
// -------------- ไฟล์ mydefault.js --------------
export var value = 100;
export function square(x) {	
    return x * x;
}
export default function(num1, num2) {    // ฟังก์ชั่นไร้ชื่อ
    return num1 + num2;
}
```

```run.module
// -------------- ไฟล์ main.js -------------------
import multiply, {value, square} from "./mydefault.js";
console.log(value);			 // 100
console.log(square(2,2));		             // 4
console.log(multiply(2,2));	             // 4
```

## เอ็กซ์พอร์ตซ้ำจากมอดูลอื่น

```module
// -------------- ไฟล์ mylib.js --------------
var foo = 1;
var bar = 2;
export {foo, bar};
```

```module
// -------------- ไฟล์ example.js --------------
export {foo, bar} from "./mylib.js";
```

```module
// -------------- ไฟล์ example.js --------------
import {foo, bar} from "./mylib.js";
export {foo, bar};
```

```module
// -------------- ไฟล์ example.js --------------
export {foo as foo1, bar} from "./mylib.js";
```

```module
// -------------- ไฟล์ example.js --------------
export * from "./mylib.js";
```

หมายเหตุ โค้ดสำหรับเทสในหัวข้อนี้ (ไม่มีในหนังสือ)

```run.module
// -------------- ไฟล์ main.js --------------
import {foo, bar} from "./example.js";
console.log(foo, bar);
```

## Namespace re-exporting

```js
export * as ns from "http";
```

* ลองพิจารณาตัวอย่างไฟล์ 3 อัน ดังต่อไปนี้
* 1) ไฟล์ name.js จะเป็นมอดูลง่ายๆ เก็บตัวแปร firstname กับ lastname
	
```module
// -------------- ไฟล์ name.js ------------------
const firstname = "Somchai";
const lastname = "Jaidee";
export {firstname, lastname};                    // ส่งออก firstname กับ lastname
```

* 2) ไฟล์ student.js เป็นมอดูลอย่างง่าย ข้างในทำการ export ส่งออกตัวแปร age และจะนำเข้ามอดูล name.js พร้อม export ส่องออกมอดูลออกมาเป็นชื่อ person (เปลี่ยนชื่อ namespace)

```module
// -------------- ไฟล์ student.js ------------------
const age = 25;
export {age};                                          // ส่งออก age
export * as person from "./name.js"        // ส่งออก person
```

* 3) ไฟล์ myprogram.js เอาไว้รันทดสอบโปรแกรม โดยจะนำเข้ามอดูล student.js ดังตัวอย่าง

```run.module
// -------------- ไฟล์ myprogram.js -----------------
import {age, person} from "./student.js"
console.log(age);                                     // 25
console.log(person.firstname);                  // "Somchai"         
console.log(person.lastname);                  // "Jaidee"
```

## อ็อบเจ็กต์โกลบอล

```module
// --------------  ไฟล์ example.js --------------
Object.prototype.say = function(msg) {
     console.log(msg);
};
```

```run.module
// -------------- ไฟล์ main.js ------------------
import "./example.js";
let a = { };
a.say("I love JavaScript");		// "I love JavaScript"
```

## ลองใช้งานมอดูลกันจริงๆ

### วิธีใช้งานมอดูลบนเว็บเบราเซอร์

หมายเหตุ ตัวอย่างหน้า HTML นี้ ต้องมีมอดูล mylib.js ข้างล่างเสียก่อน ไม่เช่นนั้นตัวอย่างหน้าเว็บจะไม่เจอมอดูล

เช่น mylib.js อยู่ในโฟลเดอร์ test_module เราก็อ้างถึงพาธ "./test_modulejs/mylib.js"

```tab.html
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

หมายเหตุ mylib.js สมมติอยู่ในโฟลเดอร์ test_modulejs

```module
// -------------- ไฟล์ mylib.js ------------------
export const msg = "I love JavaScript";
```

```js
<script nomodule>
  import {msg} from "./mylib.js";
  alert(msg);
</script>
```

### วิธีใช้งานมอดูลบน Node.js
 
หมายเหตุ หลายตัวอย่างต่อไปนี้ต้องทดสอบบน Node.js เท่านั้น เพราะบนเว็บเบราเซอร์ยังไม่รองรับ
 
```js
// -------------- ไฟล์ mylib.mjs ------------------
export const msg = "I love JavaScript";
```

```js
// -------------- ไฟล์ myapp.mjs ------------------
import { msg } from "./mylib.mjs";
console.log(msg);
```

```module
// -------------- ไฟล์ mylib.js ------------------
export const msg = "I love JavaScript";
```

```run.module
// -------------- ไฟล์ myapp.js ------------------
import { msg } from "./mylib.js";
console.log(msg);
```

ตัวอย่างไฟล์ package.json 

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

### เสริมเพิ่มเติม

หมายเหตุ โค้ดต่อไปนี้ให้รันบน Node.js 

```js
var http = require("http");
var fs = require("fs");
var url = require("url"); 
```

```js
import * as http from "http";
import * as fs from "fs";
import * as url from "url";
```

## โอเปอเรเตอร์ import()

หมายเหตุ โค้ดต่อไปนี้ให้รันบน Node.js 

```js
import("http")
.then((httpModule) => {
  console.log(httpModule.maxHeaderSize);    // 16384
});
```

```js
const httpModule = await import("http");
console.log(httpModule.maxHeaderSize);     // 16384
```

## import.meta

```run.module
console.log(import.meta.url);     // "file:///c:/javascript/mymodule.js"
```