# บทที่ 4 ทบทวนมาตรฐานเก่า

## คอมเมนต์
```js
var x = 10;	//This is an example.
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
console.log("Hello world", 122, 333.333);   // "Hello world 122 333.333"
```

### debugger
```js
console.log("line 1");
debugger;  // บรรทัดนี้เป็นตำแหน่งของ breakpoint เพื่อหยุดการทำงานของโปรแกรมชั่วขณะ ตอนดีบั๊กโปรแกรม
console.log("line 2");
```

## การใช้เซมิโคลอน (;)
```js
console.log("Hello world"); 
```

```js
console
.log
(
"Hello world"
);
```

```js
;
;
;
```

```js
;;;;;
```

```js
console.log("Hello world")
console
.log
(
"Hello world"
)
```

```js
var a = 1
var b = 5 
var c = a + b
(a * b)
```

```js
var a = 1;
var b = 5; 
var c = a + b(a * b);
```

```js
var a = 1 + 2 
-3 + 10
console.log(a)     // 10
```

```js
var a = 1 + 2 -3 + 10;
console.log(a);   // 10
```

## เส้นทางการทำงานโปรแกรม

```js
console.log(1);
console.log(2);
console.log(3);
console.log(4);
```

```js
console.log(1); console.log(2); console.log(3); console.log(4); 
```

```js
console.log(1) console.log(2) console.log(3) console.log(4)
```

## การตั้งชื่อ
```js
var _ = 100;		// ตั้งชื่อแบบนี้ได้
var $ = 100;		// ตั้งชื่อแบบนี้ได้
var _a =100; 		// ตั้งชื่อแบบนี้ได้
var $a =100; 		// ตั้งชื่อแบบนี้ได้
var Abc = 100;	            // ตั้งชื่อแบบนี้ได้
var abc = 100;	           // ตั้งชื่อแบบนี้ได้ แต่ทว่าตัวแปร Abc กับ abc จะถือว่าคนละชื่อกัน 
var a0123 = 100;	           // ตั้งชื่อแบบนี้ได้
var 9b = 100;	           // ทำไม่ได้ มันจะเกิด SyntaxError เพราะมีเลข 9 นำหน้าชื่อตัวแปร
var สวัสดีครับ = 100;       // ตั้งชื่อภาษาไทยแบบนี้ได้ แต่ส่วนใหญ่นิยมตั้งชื่อเป็นภาษาอังกฤษ)
```

## คำสงวน

```js
var let = -1;		// ทำไม่ได้ มันจะเกิด SyntaxError เพราะ let เป็นคำสงวน
var this= -10;		// ทำไม่ได้ มันจะเกิด SyntaxError เพราะ this เป็นคำสงวน
```

```js
var Date = 100;
console.log(Date);	// แสดงผลลัพธ์ 100
```

```js
var Date = 100;
console.log(Date);	// แสดงผลลัพธ์ 100
var d = new Date();
console.log(d);
```

## การประกาศตัวแปร
```js
var x = 100;	
```

```js
var  x = 1, y = 2, z = 3;	// ประกาศตัวแปร x, y และ z ให้อยู่ในบรรทัดเดียวกัน
```

```js
var x = 1;
var y = 2; 
var z = 3;
```

```js
var x= 1, y = x;
/* จะเสมือนเขียนซอร์สโค้ดแบบนี้
var x = 1;
var y = x;
*/
```

```js
var x; 	    
console.log(x); 	// undefined
```

```js
var undefined = 55555; 	    
console.log(undefined);   // บนเว็บเบราเซอร์จะแสดง 55555 แต่บน Node.js จะแสดง undefined	
var x;
console.log(x);		// undefined	
```

### การประกาศตัวแปรโดยไม่มี var
```js
x = 1;
```

```js
console.log(x);		// ReferenceError
```

```js
var x;                           // ประกาศตัวแปร แต่ยังไมีการกำหนดค่าให้ x จึงมีค่าเป็น undefined
console.log(x);	           // undefined
```


## ไดนามิกไทป์
```js
var foo = 42;    	// เริ่มต้นตัวแปร foo จะมีชนิดข้อมูลเป็นตัวเลข
foo = "bar"; 	// ภายหลัง foo เปลี่ยนมาเก็บข้อมูลเป็นสตริง
foo = true;  	// ภายหลัง foo เปลี่ยนมาเก็บข้อมูลเป็นบูลีน
```

## ข้อมูล

### null กับ undefined

```js
console.log(null === undefined) 	// false
console.log(null == undefined) 	// true
console.log(typeof null)        	// "object" 
console.log(typeof undefined)     // "undefined"
```

## ตัวเลข
```js
console.log(100, 0, -0, -300, 3.14, -78.222);    // 100 0 -0 -300 3.14 -78.222
```

```js
console.log(200e5); 	// 200 x 105  =  20000000
console.log(2E-5);   	// 2 x 10-5 = 0.00002
```

```js
console.log(Math.sqrt(-1)); 	//  NaN (ไม่สามารถถอดรากที่สองของ -1)
console.log(0/0); 		//  NaN ( 0 หาร 0 ไม่มีนิยาม)
console.log(parseInt("Hi"));	//  NaN (ไม่สามารถแปลง "Hi" เป็นตัวเลขได้)
```

```js
console.log(Infinity * Infinity);	 // Infinity
console.log(Infinity / Infinity);	 // NaN
console.log(-344 * Infinity);	// -Infinity
console.log(3 / Infinity);		// 0
```

```js
console.log(Number.MAX_VALUE);	         //  1.7976931348623157e+308 โดยประมาณ
console.log(Number.MAX_VALUE + 100); //  1.7976931348623157e+308 โดยประมาณ (บรรทัด 2)   
console.log(Number.MAX_VALUE * 10);   //  Infinity (บรรทัด 3)
console.log(Number.MAX_VALUE * -10);  //  -Infinity (บรรทัด 4)
```

```js
console.log(Number.MIN_VALUE);         //5e-324 (เป็นค่าโดยประมาณ)
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
console.log(str);	       // line1line2line3
```

```js
console.log("1234567890".length);	 // 10
```

## บูลีน

```js
var TRUE_value = true;
var FALSE_value = false
console.log(TRUE_value);      // true
console.log(FALSe_value);     // false
```

```js
-5;
-10.71;
"Learning JavaScript";
true;
var a = -5;
var b = -10.71;
var c = "Learning JavaScript";
var d = true;
```

## โอเปอเรเตอร์ทางคณิตศาสตร์ 
```js
console.log(true + 0);         // ได้ผลลัพธ์เป็น 1 เพราะ true จะถือว่ามีค่าเป็น 1
console.log(false + false);   // ได้ผลลัพธ์เป็น 0 เพราะ false จะถือว่ามีค่าเป็น 0
console.log(100 - true);      // 99
console.log(true * 30);       // 30
console.log(true / 2);         // 0.5
console.log(true % 10);      // 1
console.log(+true);            // 1
console.log(-false);            // -0
var a = false,  b=true; 
console.log(++a);	  // 1     
console.log(--b);               // 0
```

```js
console.log(NaN + 30);      // NaN
console.log(NaN - 30);       // NaN
console.log(NaN * 30);      // NaN
console.log(NaN / 30);      // NaN
console.log(NaN % 30);    // NaN
console.log(+NaN);          // NaN
console.log(-NaN);           // NaN
var x = NaN; 
console.log(++x);            // NaN
console.log(--x);              // NaN
```

```js
console.log(Infinity * 0);           // NaN
console.log(Infinity * 1);           // Infinity
console.log(Infinity * Infinity);   // Infinity
console.log(Infinity * -Infinity);  // -Infinity
console.log(Infinity / 0);          // Infinity
```

* การใช้งานโอเปอเรเตอร์ยกกำลัง (Exponentiation Operator) 

```js
var ans = 10 ** 2;		          // นำเลข 10 มายกกำลัง 2  ( 102 )
console.log(ans);                   	         // 100
// เสมือนใช้เมธอด Math.pow() ดังนี้
console.log(ans === Math.pow(10, 2));   // true
```

* ลำดับของโอเปอเรเตอร์ **

```js
var ans = 3 * 10 ** 2;	
console.log(ans);              // 300
```

```js
var ans = 3 * (10 ** 2);	
console.log(ans);              // 300
```
* ข้อเข้มงวดของโอเปอเรเตอร์ **

```js
var ans1 = -10 ** 2; 	// syntax error
var ans2 = +10 ** 2; 	// syntax error
```

```js
ans1 = - (10 ** 2); 	// -100
ans1 = (-10) ** 2; 	// 100
ans2 = + (10 ** 2); 	// 100
ans2 = (+10) ** 2; 	// 100
```

```js
var value1 = 9, value2 = 10;
// ใช้งานโอเปอเรเตอร์ ++ แบบ prefix
// ค่าของ value1 ถูกบวกด้วยหนึ่ง ก่อนที่จะยกกำลัง 2 
console.log(++value1 ** 2);     // 100
console.log(value1);               // 10
// ใช้งานโอเปอเรเตอร์ ++ แบบ postfix
// หลังจากยกกำลัง 2 ไปแล้ว ค่าของ value2 จึงถูกบวกด้วยหนึ่งทีหลัง
console.log(value2++ ** 2);    // 100
console.log(value2);              // 11
```

```js
var value1 = 11, value2 = 10;
// ใช้งานโอเปอเรเตอร์ -- แบบ prefix
// ค่า value1 ถูกลบด้วยหนึ่ง ก่อนที่จะยกกำลัง 2 
console.log(--value1 ** 2);     // 100
console.log(value1);             // 10 
// ใช้งานโอเปอเรเตอร์ -- แบบ postfix
// หลังจากยกกำลัง 2 ไปแล้ว ค่าของ value2 จึงถูกลบด้วยหนึ่งทีหลัง 
console.log(value2-- ** 2);     // 100
console.log(value2);             // 9
```

### โอเปอเรเตอร์ที่ใช้กำหนดค่าให้กับตัวแปร

```js
var a = 20;		
a +=true;     	// true มีค่าเป็น 1
console.log(a);	// 21
a *=NaN;
console.log(a);	// NaN
```

### โอเปอเรเตอร์ที่ใช้กับสตริง

```js
100 + true + "50"	 // "10150"
// เสมือนเขียน (100 + true) + "50"
```

```js
20 / "10" + "76";           // 276
// เสมือนเขียน ( 20 / "10") + "276"
```

### โอเปเรอเตอร์แบบตรรกะ 
```js
console.log(true || true);	            // true	(เงื่อนไข short circuit)
console.log(true || false);	            // true	(เงื่อนไข short circuit)
console.log(false || true);	            // true	
console.log(false || false);	            // false
console.log(true && true);	            // true
console.log(true && false);	// false
console.log(false && true);	// false	(เงื่อนไข short circuit)
console.log(false && false);	// false	(เงื่อนไข short circuit)
console.log(!true);		// false
console.log(!false);		// true
```

### โอเปอเรเตอร์ระหว่างบิต

* ตัวอย่าง Bitwise AND
```js
var a = 12;			// 1100 (เลขฐานสอง)
var b = 5;			// 0101 (เลขฐานสอง)
var c = a & b;			// 0100 (เลขฐานสอง)
console.log(c.toString(2)); 	            // 100 (เลขฐานสอง)
console.log(c);			// 4
console.log(12 & 5);		// 4
```

* ตัวอย่าง Bitwise OR

```js
var a = 12;			// 1100 
var b = 5;			// 0101 
var c = a | b;			// 1101
console.log(c.toString(2));	            // 1101
console.log(c);			// 13
console.log(12 | 5);		// 13
```

* ตัวอย่าง Bitwise XOR

```js
var a =12;			// 1100 
var b= 5;			// 0101 
var c = a ^ b;			// 1001
console.log(c.toString(2));	            // 1001
console.log(c);			// 9
console.log(12 ^ 5);		// 9
```

* ตัวอย่าง Bitwise NOT

```js
var a= 9;		// 00000000000000000000000000001001
var b = ~a;		// 11111111111111111111111111110110 (1's Complement)
console.log(b);		// -10 
console.log(~9);	            // -10
```

* ตัวอย่าง การเลื่อนบิตไปทางซ้ายมือ

```js
var a = 9; 		// 00000000000000000000000000001001
var c = a << 2;		// เลื่อนบิตจากขวามือไปทางซ้ายมือ 2 ตำแหน่ง
			// 00000000000000000000000000100100
console.log(c);		// 36
console.log(9 << 2);	// 36
```

* ตัวอย่าง การเลื่อนบิตไปทางขวามือ

```js
var a = 9; 		// 00000000000000000000000000001001
var c = a >> 2;		// เลื่อนบิตจากซ้ายมือไปทางขวามือ 2 ตำแหน่ง
			// 00000000000000000000000000000010
console.log(c);		// 2
console.log(9 >> 2);	// 2
```

```js
-9;            // 11111111111111111111111111110111 (เลขฐานสอง)
-9 >> 2;    // 11111111111111111111111111111101 (เลขฐานสอง) = -3 (เลขฐานสิบ)
```

```js
var a = 9; 	        // 00000000000000000000000000001001
var c = a >>> 2;         // เลื่อนบิตจากซ้ายมือไปทางขวามือ 2 ตำแหน่ง พร้อมเติมเลข 0 ที่บิตด้านหน้าสุด
		        // 00000000000000000000000000000010
console.log(c);	        // 2
console.log(9 >>> 2);  // 2
```

### โอเปอเรเตอร์ typeof

```js
console.log(typeof true);		             // "boolean"
console.log(typeof false); 		 // "boolean"		
console.log(typeof -0.13); 		 // "number"
console.log(typeof NaN); 		 // "number"
console.log(typeof Infinity); 		 // "number"
console.log(typeof undefined);   	             // "undefined"
console.log(typeof ''); 		             // "string"
console.log(typeof "Hi");		             // "string"
console.log(typeof (typeof 100) ); 	 // "string"
console.log(typeof null ); 		 // "object"
console.log(typeof {x: 1, y: 2});	             // "object" 
console.log(typeof [1, 2]); 		 // "object"
console.log(typeof function(){});	             // "function"
console.log(typeof Math.sqrt);	             // "function"
console.log(typeof class C {});	             // "function" 
console.log(typeof Symbol());		 // "symbol"
```

### โอเปอเรเตอร์วงเล็บ

```js
var a = 1 + 2 * 3 + 5; 
// จะเสมือนเขียนเป็น var a = 1 + (2 * 3) + 5;
console.log(a); // 12
```

```js
var a = (1 + 2) * (3 + 5); 
console.log(a); // 24
```

### โอเปอเรเตอร์คอมม่า 

```js
var a = 1, b = 2;
var x = (1+34, a+=2, b*=10, b+1);
console.log(x);	     // 21
```

### โอเปอเรเตอร์ void

```js
var a = void 12;
console.log(a);			   // undefined
console.log(Math.ceil(4.4));	   // 5
console.log(void Math.ceil(4.4));      // undefined  	
var b = 1;
console.log(void (++b)); 	              // undefined  
console.log(b);			  // แสดงค่าออกมาเป็น 2 เพราะตัวแปร b ถูกบวกเพิ่มไป 1 ค่า
```

## อาร์เรย์
```js
[1, 1, 1, true, "Array"];	         // อาร์เรย์
```

```js
var a = ["a", "b", "c", "d", "e"];
console.log(typeof a);			     // "object"
console.log(a[0], a[1], a[2], a[3], a [4]);	     // "a b c d e"
```

```js
var array = [ ];	// ประกาศเป็นอาร์เรย์ว่าง
array[0] = 1;		
array[1] = 2;
```

```js
var array = [1, 2, 3, 4, 5];
console.log(array.length); 	// 5
```

```js
var array = [1, 2, 3, 4, 5];
console.log(array.length); 	// 5
array.length = 7;		            // เพิ่มขนาดอาร์เรย์จาก 5 เป็น 7 
console.log(array);		// [ 1, 2, 3, 4, 5, <2 empty slots> ]
console.log(array.length); 	// 7
array[9] = 100;		
console.log(array);		// [ 1, 2, 3, 4, 5, <4 empty slots>, 100 ]
console.log(array.length);             // 10
```

## การประกาศฟังก์ชั่น

```js
function calculate(param1, param2) {
    return param1 * param2;
}
```

```js
var result = calculate(10, 2);	
console.log(result);		// 20
```

```js
function calculate() {
    return 20;
}
var result = calculate();		
console.log(result);		// 20

calculate();      // คืนค่า 20
calculate();     // คืนค่า 20
calculate();     // คืนค่า 20
```
## ประโยค return

```js
function myFunction() {
	return 1;
	console.log("myFunction");      // บรรทัดนี้เส้นทางการทำงานของโปรแกรมจะมาไม่ถึง
}
var result = myFunction();		
console.log(result);		        // 1
```

```js
function myFunction() {
	return;
}
var result = myFunction(); 	
console.log(result);		         // undefined
```

```js
function myFunction() {
    console.log("myFunction");
    // จะเสมือนมีประโยค return undefined; วางไว้ตำแหน่งสุดท้าย ก่อนฟังก์ชั่นจบการทำงาน
}
var result = myFunction();	// "myFunction"
console.log(result);	            // undefined
```

```js
var result = calculate();		
console.log(result);	   // 20
function calculate() {
    return 20;
}
```

### ฟังก์ชั่นไร้ชื่อ 

```js
function (param1,param2) {
    return param1 * param2;
}
```

### นิพจน์ฟังก์ชั่น

```js
var calculate = function (param1,param2) {
    return param1 * param2;
}
console.log(calculate(10, 2)); 	// 20
calculate = 100; 		            // ตัวแปร calculation สามารถแก้ไขให้เป็นค่าอื่นได้
console.log(calculate);		// 100
```

```js
var calculate = function calc2(param1,param2) {
    return param1 * param2;
}
console.log(calculate(10,2)); 	// 20
```

```js
function cal(a, b) {
    console.log(a * b);
}
```

```js
cal = function(a, b) {
    console.log(a*b):
}
```

```js
var myFunction =  cal;
```

```js
myFunction(5,4);   //  20
cal(5,4);               // 20
```

### ฟังก์ชั่นคอลแบ็ค

```js
function sayHi() {
    console.log("Hi");
}
function sayBye() {
    console.log("Bye");
}
function say(func) {
    func();	      // เรียกฟังก์ชั่นให้ทำงาน
}
say(sayHi);	     // "Hi" 
say(sayBye);	     // "Bye"
```

### รีเทิร์นออกมาเป็นฟังก์ชั่น 

```js
function say(func) {
          console.log("Say...");
          function sayHi() {	
              console.log("Hi");
           } 
          return sayHi;	// รีเทิร์นฟังก์ชั่น
}  // สิ้นสุดการประกาศฟังก์ชั่น
var hi = say();	           // "Say..."
hi();		           // "Hi"
```

```js
function say(func) {
          console.log("Say...");
          return  function() {		// รีเทิร์นฟังก์ชั่นไร้ชื่อ
                console.log("Hi");
          } 
}  // สิ้นสุดการประกาศฟังก์ชั่น
var hi = say();	           // "Say..."
hi();			// "Hi"
```

### อ็อบเจ็กต์ arguments

```js
function myFunction(param1, param2) {
    console.log(param1, param2);
}
myFunction();			// undefined undefined
myFunction(100);		// 100	undefined
myFunction(100,200);		// 100 200
myFunction(100,200,300,400);	// 100 200
```

```js
function myFunction (param1, param2) {
    console.log(arguments);
}
myFunction(100,200,300,400);	// [100, 200, 300, 400]
```

```js
function myFunction(param1,param2) { // ฟังก์ชั่นนี้ไม่เคยถูกเรียกใช้	
	console.log("function1 value:", param1, param2); 
}
myFunction(100, 200);   		// เรียกใช้ฟังก์ชั่นที่ประกาศอยู่ด้านล่าง
function myFunction(param) { 	// จะโอเวอร์ไรด์ทับฟังก์ชั่นที่ประกาศไว้ก่อนหน้านี้
	console.log("function2 value:", param);
}
myFunction(100);     	
myFunction(100, 200);  	
/* แสดงผลลัพธ์เป็น
"function2 value: 100"
"function2 value: 100"
"function2 value: 100" */
```

### ระวังไป overriding ทับชื่อที่มีอยู่แล้ว

```js
alert = function(data) {
    console.log(data);	         // แสดงข้อความออกทางหน้าคอนโซล
}
alert("Hello, World");               // แสดงข้อความ "Hello, World" ออกทางหน้าคอนโซล
```

### ขอบเขตการมองเห็นของตัวแปร
```js
if(true){
var a = 1;		// a มีขอบเขตการมองเห็นแบบโกลบอล
}
{
var b = 2;		// b มีขอบเขตการมองเห็นแบบโกลบอล
}
console.log(a, b);		//  1 2
```

### ขอบเขตการมองเห็นของตัวแปร

```js
if(true) {
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
<script>
var a = "Hi";    	             // a มีขอบเขตการมองเห็นแบบโกลบอล
function myFunction() {
    var a = "Bye";            // a มีขอบเขตการมองเห็นแบบโลคอล เพราะประกาศภายใต้ฟังก์ชั่น 
    console.log(a);	
}
myFunction();		// "Bye"
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

### ฟังก์ชั่นซ้อนฟังก์ชั่น

```js
function outerFunc() {
  var value = 0;
  function innerFunc() {
    console.log(++value);
  }
  return innerFunc;
}
var func1 = outerFunc();		// บรรทัด a
func1();	    // 1
func1();	   // 2
var func2 = outerFunc();		// บรรทัด b
func2();	   // 1
func2();	   // 2
```

```js
function cumulative(num) {
    n = num
    return function(a) {
           n += a
          console.log("answer = ", n)
      }
}
cumA= cumulative(100)
cumA(1)      // "answer =  101"
cumA(1)      //  "answer =  102"
cumA(1)      //  "answer =  103"
cumB = cumulative(20)
cumB(-1)     // "answer =  19"
cumB(-1);    // "answer =  18"
cumB(-1);    // "answer =  17"
```

```js
function part_cal(x) {
  return function(y) {
    return function(z) {
      console.log(x+y+z);      // บรรทัด a
    }
  }
}
part_cal(10)(20)(30)           // 60
```

```js
function cal(x, y, z) {
  console.log(x + y + z)
}
cal(10, 20 , 30)    // 60
```


## Hoist
```js
var value = 100;		
```

```js
console.log(x)
x = 1
/* แบบนี้ไม่เกิด error
 x = 1
 console.log(x) */
```

```js
console.log(x)     // undefined
var x = 1
```

```js
x = undefined    // เสมือนลอยขึ้นไปข้างบน
console.log(x)
x = 1
```

```js
function myFunction(num) {
	// สามารถมองเห็นตัวแปร value		
	console.log(value);		// undefined
	if(num > 10) {
		var value = num*10;	// ประกาศตัวแปร value ที่ตรงนี้ แต่มองเห็นได้ทั่วฟังก์ชั่น
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
function myFunction(num) {
	var value;     // ประกาศตัวแปร value โดยไม่มีค่าเริ่มต้น จึงทำให้มีค่าเป็น undefined
            console.log(value);	// undefined
	if(num > 10) {
		value = num*10;   // บรรทัดนี้เป็นเพียงการกำหนดค่าให้กับตัวแปร value
		/* ซอร์สโค้ด */
	} else {
               console.log(value);	     // undefined
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
console.log(value);	// 100 
```

```js
var value; 		// ประกาศตัวแปร value โดยไม่มีค่าเริ่มต้น จึงทำให้มีค่าเป็น undefined
console.log(value); 	// undefined
if(true) {
    value = 100;	            // บรรทัดนี้เป็นเพียงการกำหนดค่าให้กับตัวแปร value
}
console.log(value);	// 100 
```

```js
// มองเห็นฟังก์ชั่นก่อนการประกาศใช้งาน
myFunction(); 	           // "Hoisted"
function myFunction() {
    console.log("Hoisted");
}
myFunction();		// "Hoisted"
```

```js
function outerFunc() {
  innerFunc();	                        // มองเห็นฟังก์ชั่นก่อนการประกาศใช้งาน
  function innerFunc() {  
    console.log("inner function");
  }
}
outerFunc();			// "inner function"
console.log(typeof innerFunc);	// undefined
```

## สตริคท์โหมด

```js
"use strict";	// ประกาศโหมดสตริคท์ ด้วยการเขียนไว้ที่ตอนต้นของไฟล์
var x = 1;
```

```js
function myFunction() {
   "use strict"; 	// เฉพาะฟังก์ชั่นนี้จะอยู่ในโหมดสตริคท์
    var x = 1;   
}
```

1) 

```js
"use strict";
x = 1;           // เกิด error เพราะไม่ได้ประกาศตัวแปรแบบ var ถ้าอยู่ดี ๆ จะมากำหนดค่าให้ทันทีแบบนี้จะทำไม่ได้
```

2)

```js
"use strict";
function x(a, a) { };               // เกิด error เพราะประกาศพารามิเตอร์ ที่มีชื่อ a ซ้ำกัน
```

3) 

```js
"use strict";
var x = 1;
delete x;		     // เกิด error ไม่สามารถลบตัวแปรได้
```

4)

```js
"use strict";
delete Object.prototype;     //เกิด error เพราะพร็อพเพอร์ตี้ตัวนี้ห้ามลบ
```

5)

```js
"use strict";
var x = 010;                       // เกิด error ไม่สามารถประกาศแบบนี้ได้
var y = \010;                     // เกิด error ไม่สามารถประกาศแบบนี้ได้
```

6)

```js
"use strict";
var obj = { };
Object.defineProperty(obj, "x", {value:0, writable:false});
obj.x = 1;                          // เกิด error เนื่องจากมันเป็นพร็อพเพอร์ตี้ที่อ่านค่าได้อย่างเดียว
```

7)

```js
"use strict";
var obj = {get x() {return 0} };
obj.x = 1;                         // เกิด error ไม่สามารถกำหนดค่าให้กับ x ได้
```

8)

```js
"use strict";
var obj = { };
Object.preventExtensions(obj);  
obj.a= 1;                         // เกิด error ไม่สามารถเพิ่มพร็อพเพอร์ตี้เข้าไปในอ็อบเจ็กต์ได้
```

9)

```js
"use strict";
function f() { return this; }
console.log(f());                    // undefined
```

10)

```js
"use strict";
var eval = 1;                       // เกิด error ไม่สามารถใช้ชื่อ eval เป็นตัวแปร

```

11)

```js
"use strict";
var arguments = 1;               // เกิด error ไม่สามา รถใช้ชื่อ arguments เป็นตัวแปร
```

12)

```js
"use strict";
with (Math) { a = cos(1) };        //  เกิด error ไม่สามารถใช้ประโยคคำสั่ง  with ได้
```

13)

```js
"use strict";
eval("var x = 1;");	      // ประกาศตัวแปร x ด้วย eval()
x = 2;                                  // เกิด error
// แบบนี้จะไม่เกิด error
// eval("var x = 1; x = 2;");     // ไม่เกิด error
```

14)

```js
"use strict";
var implements =1;     // เกิด error เพราะ implements คือคำสงวนในโหมดสตริคท์
```

15)

```js
"use strict";
if(true) {
    function myFunction1(){ }  	  // ขอบเขตแบบโลบอล
}
{
    function myFunction2(){ }	  // ขอบเขตแบบโลบอล
}
console.log(typeof myFunction1);  // undefined (ถ้าไม่ใช่โหมดสตริคท์จะแสดงค่าเป็น "function")
console.log(typeof myFunction2);  // undefined (ถ้าไม่ใช่โหมดสตริคท์จะแสดงค่าเป็น "function")
```

```js
"use strict";
var isStrict = (function() { return !this; })( );
console.log(isStrict);     // true
```