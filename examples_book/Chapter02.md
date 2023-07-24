# บทที่ 2 ทบทวนเบื้องต้น

## คอมเมนต์
```js
var x = 10; 	//This is an example.
```

```js
/* This is an example
ECMAScript 6 is very easy*/
var x = 10;
```

## console.log()
```html
<!DOCTYPE html>
<html>
<head></head>
<body>
<h1>Hello, world!</h1>
<script>		
             console.log("Hello, world!");
</script>
</body>
</html>
```

```js
console.log("Hello world", 122, 333.333); // "Hello world 122 333.333"
```

## debugger
```js
console.log("line 1");
debugger;			// บรรทัดนี้จะเป็นตำแหน่งของ breakpoint เพื่อหยุดการทำงานชั่วขณะ ตอนดีบั๊กโปรแกรม
console.log("line 2");
```

## การตั้งชื่อ
```js
var _ = 100;		// ตั้งชื่อแบบนี้ได้
var $ = 100;		// ตั้งชื่อแบบนี้ได้
var _a =100; 		// ตั้งชื่อแบบนี้ได้
var $a =100; 		// ตั้งชื่อแบบนี้ได้
var Abc = 100;	// ตั้งชื่อแบบนี้ได้
var abc = 100;	// ตั้งชื่อแบบนี้ได้ แต่ทว่าตัวแปร Abc กับ abc จะถือว่าคนละชื่อกัน 
var a0123 = 100;	// ตั้งชื่อแบบนี้ได้
var 9b = 100;		// ทำไม่ได้ มันจะเกิด SyntaxError เพราะมีเลข 9 นำหน้าชื่อตัวแปร
```

## การประกาศตัวแปร
```js
var  x = 100;	
```

```js
var  x = 1, y = 2, z = 3;	// ประกาศตัวแปร x, y และ z ให้อยู่ในบรรทัดเดียวกัน
```

```js
var  x= 1,  y = x;
/* จะเสมือนเขียนซอร์สโค้ดแบบนี้
var x = 1;
var y = x;
*/
```

```js
var x; 	    
console.log(x); 	// undefined
```

## การประกาศตัวแปรโดยไม่มี var
```js
x = 1;
```

```js
console.log(x);	// ReferenceError
```

## ไดนามิกไทป์
```js
var foo = 42;    	// เริ่มต้นตัวแปร foo จะมีชนิดข้อมูลเป็นตัวเลข
foo = "bar"; 		// foo เปลี่ยนมาเก็บข้อมูลเป็นสตริง
foo = true;  		// foo เปลี่ยนมาเก็บข้อมูลเป็นบูลีน
```


### null กับ undefined
```js
console.log(null === undefined) 	// false
console.log(null == undefined) 	// true
console.log(typeof null)        	// "object" 
console.log(typeof undefined)   	// "undefined"
```

## ตัวเลข
```js
console.log(100, 0, -0, -300, 3.14, -78.222); // 100 0 -0 -300 3.14 -78.222
```

```js
console.log(200e5); 	// 200 x 105  =  20000000
console.log(2E-5);   	// 2 x 10-5 = 0.00002
```

```js
console.log(Math.sqrt(-1)); 	//  NaN (ไม่สามารถถอดรากที่สองของ -1)
console.log(0/0); 			//  NaN ( 0 หาร 0 ไม่มีนิยาม)
console.log(parseInt("Hi"));	//  NaN (ไม่สามารถแปลง "Hi" เป็นตัวเลขได้)
```

```js
console.log( Infinity * Infinity);	// Infinity
console.log( Infinity / Infinity);	// NaN
console.log(-344 * Infinity);		// -Infinity
console.log(3 / Infinity);			// 0
```

```js
console.log(Number.MAX_VALUE);		//  1.7976931348623157e+308 เป็นค่าโดยประมาณ
console.log(Number.MAX_VALUE + 100);	//  1.7976931348623157e+308 เป็นค่าโดยประมาณ (บรรทัด 2)   
console.log(Number.MAX_VALUE * 10);	//  Infinity (บรรทัด 3)
console.log(Number.MAX_VALUE * -10);	//  -Infinity (บรรทัด 4)
```

```js
console.log(Number.MIN_VALUE);   		//5e-324 (เป็นค่าโดยประมาณ)
```

## สตริง
```js
"Learning JavaScript"		
'Learning JavaScript'
```

```js
// ใช้ \" อยู่ภายในสตริง ส่วนเครื่องหมาย ' สามารถเขียนอยู่ในสตริงได้เลย
console.log("...\"Learning\" 'JavaScript'...");	// ..."Learning" 'JavaScript'...
// ใช้ \' อยู่ภายในสตริง ส่วนเครื่องหมาย " สามารถเขียนอยู่ในสตริงได้เลย
console.log('..."Learning" \'JavaScript\'...');	//  ..."Learning" 'JavaScript'...	
```

```js
var str= "line1\
line2\
line3";
console.log(str);	// line1line2line3
```

```js
console.log("1234567890".length);	 // 10
```

## โอเปอเรเตอร์ทางคณิตศาสตร์ 
```js
console.log(true + 0);        // ได้ผลลัพธ์เป็น 1 เพราะ true จะถือว่ามีค่าเป็น 1
console.log(false + false);   // ได้ผลลัพธ์เป็น 0 เพราะ false จะถือว่ามีค่าเป็น 0
console.log(100 - true);      // 99
console.log(true * 30);       // 30
console.log(true  / 2);       // 0.5
console.log(true %10);        // 1
console.log(+true);           // 1
console.log(-false);          // -0
var a = false,  b=true; 
console.log(++a);	          // 1     
console.log(--b);             // 0
```

```js
console.log(NaN + 30);        // NaN
console.log(NaN - 30);        // NaN
console.log(NaN * 30);        // NaN
console.log(NaN / 30);        // NaN
console.log(NaN % 30);       // NaN
console.log(+NaN);           // NaN
console.log(-NaN);           // NaN
var x = NaN; 
console.log(++x);             // NaN
console.log(--x);             // NaN
```

```js
console.log(Infinity * 0);    // NaN
console.log(Infinity * 1);    // Infinity
console.log(Infinity * Infinity);   // Infinity
console.log(Infinity * -Infinity);  // -Infinity
console.log(Infinity / 0);          // Infinity
```

## โอเปอเรเตอร์ที่ใช้กำหนดค่าให้กับตัวแปร
```js
var a = 20;		
a +=true;     	// true มีค่าเป็น 1
console.log(a);	// 21
a *=NaN;
console.log(a);	// NaN
```

## โอเปเรอเตอร์แบบตรรกะ 
```js
console.log(true || true);		// true	(เงื่อนไข short circuit)
console.log(true || false);	// true	(เงื่อนไข short circuit)
console.log(false || true);	// true	
console.log(false || false);	// false
console.log(true && true);		// true
console.log(true && false);	// false
console.log(false && true);	// false	(เงื่อนไข short circuit)
console.log(false && false);	// false	(เงื่อนไข short circuit)
console.log(!true);			// false
console.log(!false);		// true
```

## โอเปอเรเตอร์ระหว่างบิต
```js
var a = 12;				// 1100 (เลขฐานสอง)
var b = 5;				// 0101 (เลขฐานสอง)
var c = a & b;			// 0100 (เลขฐานสอง)
console.log(c.toString(2)); 	// 100 (เลขฐานสอง)
console.log(c);			// 4
console.log(12 & 5);		// 4
```

```js
var a = 12;				// 1100 
var b = 5;				// 0101 
var c = a | b;			// 1101
console.log(c.toString(2));	// 1101
console.log(c);			// 13
console.log(12 | 5);		// 13
```

```js
var a =12;				// 1100 
var b= 5;				// 0101 
var c = a ^ b;			// 1001
console.log(c.toString(2));	// 1001
console.log(c);			// 9
console.log(12 ^ 5);		// 9
```

```js
var a= 9;			 // 00000000000000000000000000001001
var b = ~a;			 // 11111111111111111111111111110110 (1’s Complement)
console.log(b);		 // -10 
console.log(~9);		 // -10
```

```js
var a = 9; 			// 00000000000000000000000000001001
var c = a << 2;		// เลื่อนบิตจากขวามือไปทางซ้ายมือ 2 ตำแหน่ง
				// 00000000000000000000000000100100
console.log(c);		// 36
console.log(9 << 2);	// 36
```

```js
var a = 9; 			// 00000000000000000000000000001001
var c = a >> 2;		// เลื่อนบิตจากซ้ายมือไปทางขวามือ 2 ตำแหน่ง
				// 00000000000000000000000000000010
console.log(c);		// 2
console.log(9 >> 2);	// 2
```

```js
-9;                // 11111111111111111111111111110111 (เลขฐานสอง)
-9 >> 2;    // 11111111111111111111111111111101 (เลขฐานสอง) = -3 (เลขฐานสิบ)
```

```js
var a = 9; 			// 00000000000000000000000000001001
var c = a >>> 2;		// เลื่อนบิตจากซ้ายมือไปทางขวามือ 2 ตำแหน่ง พร้อมเติมเลข 0 ที่บิตด้านหน้าสุด
				// 00000000000000000000000000000010
console.log(c);		// 2
console.log(9 >>> 2);	// 2
```

## โอเปอเรเตอร์ typeof
```js
console.log(typeof true);			// "boolean"
console.log(typeof false); 		// "boolean"		
console.log(typeof -0.13); 		// "number"
console.log(typeof NaN); 			// "number"
console.log(typeof Infinity); 		// "number"
console.log(typeof undefined); 		// "undefined"
console.log(typeof ''); 			// "string"
console.log(typeof "Hi");			// "string"
console.log(typeof (typeof 100) ); 	// "string"
console.log(typeof null ); 		// "object"
console.log(typeof {x: 1, y: 2});		// "object" 
console.log(typeof [1, 2]); 		// "object"
console.log(typeof function(){});		// "function"
console.log(typeof Math.sqrt);		// "function"
console.log(typeof class C {});		// "function" 
console.log(typeof Symbol());		// "symbol"
```

## โอเปอเรเตอร์วงเล็บ
```js
var a = 1 + 2 * 3 + 5; 
// จะเสมือนเขียนเป็น var a = 1 + (2 * 3) + 5;
console.log(a); // 12
```

```js
var a = (1 + 2) * (3 + 5); 
console.log(a); // 24
```

## โอเปอเรเตอร์คอมม่า 
```js
var a = 1, b = 2;
var x = (1+34, a+=2, b*=10, b+1);
console.log(x);	// 21
```

## โอเปอเรเตอร์ void
```js
var a = void 12;
console.log(a);			// undefined
console.log(Math.ceil(4.4));	// 5
console.log(void Math.ceil(4.4)); // undefined  	
var b = 1;
console.log(void (++b)); 		// undefined  
console.log(b);			// แสดงค่าออกมาเป็น 2 เพราะตัวแปร b ถูกบวกเพิ่มไป 1 ค่า
```

## อาร์เรย์
```js
[1, 1, 1, true, "Array"];	// อาร์เรย์
```

```js
var a = ["a", "b", "c", "d", "e"];
console.log(typeof a);				// "object"
console.log(a[0], a[1], a[2], a[3], a [4]);	// "a b c d e"
```

```js
var array = [];	// ประกาศเป็นอาร์เรย์ว่าง
array[0] = 1;		
array[1] = 2;	
```

```js
var array = [1, 2, 3, 4, 5];
console.log(array.length); 	// 5
```

```js
var array = [1, 2, 3, 4, 5];
console.log(array.length); // 5
array.length = 7;		// เพิ่มขนาดอาร์เรย์จาก 5 เป็น 7 
console.log(array);		// [ 1, 2, 3, 4, 5, <2 empty slots> ]
console.log(array.length); // 7
array[9] = 100;		
console.log(array);		// [ 1, 2, 3, 4, 5, <4 empty slots>, 100 ]
console.log(array.length); // 10
```

## การประกาศฟังก์ชั่น
```js
function function_Name (พารามิเตอร์1,  พารามิเตอร์2, …, พารามิเตอร์N) 
{
// ซอร์สโค้ดภายในบอดี้ของฟังก์ชั่น
return [value]; 
// จะมีหรือไม่มีประโยค return ก็ได้ 
// ส่วนค่า value หลังคำว่า return จะมีหรือไม่มีก็ได้
}
```

```js
function calculate(param1, param2){
return param1 * param2;
}
```

```js
var result = calculate(10, 2);	
console.log(result);		// 20
```

```js
function calculate(){
return 20;
}
var result = calculate();		
console.log(result);		// 20
```

## ประโยค return
```js
function myFunction (){
	return 1;
	console.log("myFunction");// บรรทัดนี้เส้นทางการทำงานของโปรแกรมจะมาไม่ถึง
}
var result = myFunction();		
console.log(result);		// 1
```

```js
function myFunction (){
	return;
}
var result = myFunction(); 	
console.log(result);		// undefined
```

```js
function myFunction (){
console.log("myFunction");
// จะเสมือนมีประโยค return undefined; วางไว้ตำแหน่งสุดท้าย ก่อนฟังก์ชั่นจบการทำงาน
}
var result = myFunction();	// "myFunction"
console.log(result);	// undefined
```

## ฟังก์ชั่นไร้ชื่อ 
```js
function (param1,param2){
return param1 * param2;
}
```

## นิพจน์ฟังก์ชั่น
```js
var calculate = function (param1,param2){
return param1 * param2;
}
console.log(calculate(10, 2)); 	// 20
calculate = 100; 			// ตัวแปร calculation สามารถแก้ไขให้เป็นค่าอื่นได้
console.log(calculate);		// 100
```

```js
var calculate = function calc2(param1,param2){
return param1 * param2;
}
console.log(calculate(10,2)); 		// 20
```

## ฟังก์ชั่นคอลแบ็ค
```js
function sayHi(){
console.log("Hi");
}
function sayBye(){
console.log("Bye");
}

function say(func){
	func();	// เรียกฟังก์ชั่นให้ทำงาน
}
say(sayHi);		// "Hi" 
say(sayBye);		// "Bye"
```

```js
function say(func){
	console.log("Say...");
function sayHi(){	
      console.log("Hi");
} 
return sayHi;		// รีเทิร์นฟังก์ชั่น
} 
var hi = say();	// "Say..."
hi();			// "Hi"
```

```js
function say(func){
	console.log("Say...");
	return  function(){		// รีเทิร์นฟังก์ชั่นไร้ชื่อ
      console.log("Hi");
} 
} // สิ้นสุดการประกาศฟังก์ชั่น
var hi = say();	// "Say..."
hi();			// "Hi"
```

## อ็อบเจ็กต์ arguments
```js
function myFunction(param1, param2){
console.log(param1, param2);
}
myFunction();				// undefined undefined
myFunction(100);			// 100	undefined
myFunction(100,200);		// 100 200
myFunction(100,200,300,400);	// 100 200
```

```js
function myFunction (param1, param2){
console.log(arguments);
}
myFunction(100,200,300,400);	// [100, 200, 300, 400]
```

```js
function myFunction(param1,param2){ // ฟังก์ชั่นนี้ไม่เคยถูกเรียกใช้			
	console.log("function1 value:", param1, param2); 
}
myFunction(100, 200);   		// เรียกใช้ฟังก์ชั่นที่ประกาศอยู่ด้านล่าง
function myFunction(param){ 	// จะโอเวอร์ไรด์ทับฟังก์ชั่นที่ประกาศไว้ก่อนหน้านี้
	console.log("function2 value:", param);
}
myFunction(100);     	
myFunction(100, 200);  	
/* แสดงผลลัพธ์เป็น
"function2 value: 100"
"function2 value: 100"
"function2 value: 100" */
```

## ขอบเขตการมองเห็นของตัวแปร
```js
if(true){
var a = 1;		// a มีขอบเขตการมองเห็นแบบโกลบอล
}
{
var b = 2;		// b มีขอบเขตการมองเห็นแบบโกลบอล
}
console.log(a, b);		//  1 2
```

```html
<!DOCTYPE html>
<html>
<head></head>
<body>
<script type="text/javascript">
var a = "Hi";    		// a มีขอบเขตการมองเห็นแบบโกลบอล
function myFunction() {
    	var a = "Bye"; 	// a มีขอบเขตการมองเห็นแบบโลคอล เพราะประกาศภายใต้ฟังก์ชั่น
		console.log(a);	
}
myFunction();			// "Bye"
console.log(a);		// "Hi"
console.log(window.a);	// "Hi"
</script>
</body>
</html>
```

```js
console.log(NaN, undefined, Infinity);     // NaN undefined Infinity
console.log(window.NaN, window.undefined, window.Infinity); // NaN undefined Infinity
// ถ้ารันอยู่ใน Node.js
// console.log(global.NaN,  global.undefined,  global.Infinity);	    
// NaN undefined Infinity
```

## ฟังก์ชั่นซ้อนฟังก์ชั่น
```js
function outerFunc() {
  var value = 0;
  function innerFunc() {
    console.log(++value);
  }
  return innerFunc;
};
var func1 = outerFunc();		// บรรทัด a
func1();	// 1
func1();	// 2

var func2 = outerFunc();		// บรรทัด b
func2();	// 1
func2();	// 2
```

## Hoist
```js
var value = 100;	
```

```js
function myFunction(num){
	// สามารถมองเห็นตัวแปร value		
	console.log(value);			// undefined

	if(num > 10) {
		var value = num*10;		// ประกาศตัวแปร value ที่ตรงนี้ แต่มองเห็นได้ทั่วฟังก์ชั่น
		/* ซอร์สโค้ด */
	} else {
		// ถ้าเงื่อนไขประโยค if เป็นเท็จ ก็จะเข้ามาทำงานที่ else 
 	// ซึ่งจะเห็นตัวแปร value มีค่าเป็น undefined	
		console.log(value);		// undefined
	}			
// สามารถมองเห็นตัวแปร value ได้ หลังจากประโยค if …else ทำงานเสร็จสิ้น
	console.log(value);			
}
```

```js
function myFunction(num){
	var value; 			// ประกาศตัวแปร value โดยไม่มีค่าเริ่มต้น จึงทำให้มีค่าเป็น undefined
console.log(value);		// undefined
	if(num > 10) {
		value = num*10;	// บรรทัดนี้เป็นเพียงการกำหนดค่าให้กับตัวแปร value
		/* ซอร์สโค้ด */
	} else {
       console.log(value);	// undefined
	}	
	console.log(value);		
}
```

```js
// สามารถมองเห็นตัวแปร value 
console.log(value); 	// undefined
if(true) {
var value = 100;	// ประกาศตัวแปรแบบ var
}
console.log(value);		// 100 
```

```js
var value; 			// ประกาศตัวแปร value โดยไม่มีค่าเริ่มต้น จึงทำให้มีค่าเป็น undefined
console.log(value); 	// undefined
if(true) {
	value = 100;		// บรรทัดนี้เป็นเพียงการกำหนดค่าให้กับตัวแปร value
}
console.log(value);		// 100 
```

```js
// มองเห็นฟังก์ชั่นก่อนการประกาศใช้งาน
myFunction(); 	// "Hoisted"
function myFunction(){
console.log("Hoisted");
}

myFunction();		// "Hoisted"
```

```js
function outerFunc() {
  innerFunc();	// มองเห็นฟังก์ชั่นก่อนการประกาศใช้งาน
  function innerFunc() {  
    console.log("inner function");
  }
};
outerFunc();				// "inner function"
console.log(typeof innerFunc);	// undefined
```

## สตริคท์โหมด
```js
"use strict";		// ประกาศโหมดสตริคท์ ด้วยการเขียนไว้ที่ตอนต้นของไฟล์
var x = 1;       
```

```js
function myFunction() {
   "use strict"; 	// เฉพาะฟังก์ชั่นนี้จะอยู่ในโหมดสตริคท์
    var x = 1;   
}
```

```js
"use strict";
x = 1;           // เกิด error เพราะไม่ได้ประกาศตัวแปรแบบ var ถ้าอยู่ดี ๆ จะมากำหนดค่าให้ทันทีแบบนี้จะทำไม่ได้
```

```js
"use strict";
function x(a, a) {};    // เกิด error เพราะประกาศพารามิเตอร์ ที่มีชื่อ a ซ้ำกัน
```

```js
"use strict";
var x = 1;
delete x;			// เกิด error ไม่สามารถลบตัวแปรได้
```

```js
"use strict";
delete Object.prototype; //เกิด error เพราะพร็อพเพอร์ตี้ตัวนี้ห้ามลบ
```

```js
"use strict";
var x = 010;             // เกิด error ไม่สามารถประกาศแบบนี้ได้
var y = \010;            // เกิด error ไม่สามารถประกาศแบบนี้ได้
```

```js
"use strict";
var obj = {};
Object.defineProperty(obj, "x", {value:0, writable:false});
obj.x = 1;            // เกิด error เนื่องจากมันเป็นพร็อพเพอร์ตี้ที่อ่านค่าได้อย่างเดียว
```

```js
"use strict";
var obj = {get x() {return 0} };
obj.x = 1;            // เกิด error ไม่สามารถกำหนดค่าให้กับ x ได้ 
```

```js
"use strict";
var obj = {};
Object.preventExtensions(obj);  
obj.a= 1; 		 // เกิด error ไม่สามารถเพิ่มพร็อพเพอร์ตี้เข้าไปในอ็อบเจ็กต์ได้
```

```js
"use strict";
function f() { return this; }
console.log(f());	// undefined
```

```js
"use strict";
var eval = 1;         // เกิด error ไม่สามารถใช้ชื่อ eval เป็นตัวแปร
```

```js
"use strict";
var arguments = 1;     // เกิด error ไม่สามารถใช้ชื่อ arguments เป็นตัวแปร
```

```js
"use strict";
with (Math){ a = cos(1)}; 	//  เกิด error ไม่สามารถใช้ประโยคคำสั่ง  with ได้
```

```js
"use strict";
eval("var x = 1;");	  // ประกาศตัวแปร x ด้วย eval()
x = 2;                // เกิด error
// แบบนี้จะไม่เกิด error
// eval("var x = 1; x = 2;"); // ไม่เกิด error
```

```js
"use strict";
var implements =1;     // เกิด error เพราะ implements คือคำสงวนในโหมดสตริคท์
```

```js
"use strict";
if(true) {
function myFunction1(){ }			// ขอบเขตแบบโลบอล
}

{
function myFunction2(){ }			// ขอบเขตแบบโลบอล

}
console.log(typeof myFunction1);	// undefined (ถ้าไม่ใช่โหมดสตริคท์จะแสดงค่าเป็น "function")
console.log(typeof myFunction2);	// undefined (ถ้าไม่ใช่โหมดสตริคท์จะแสดงค่าเป็น "function")
```




