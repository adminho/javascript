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

### ตัวอย่าง 2
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
