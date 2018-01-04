__[โค้ดตัวอย่างจากหนังสือทั้งหมด]( https://www.se-ed.com/product/พัฒนาเว็บแอปพลิเคชั่นด้วย-JavaScript.aspx?no=9786160825394)__


# บทที่ 1 แนะนำภาษาจาวาสคริปต์

## จาวาสคริปต์บนเว็บเบราเซอร์ 

### ตัวอย่าง 1
```html
<!-- ไฟล์ชื่อ index.html -->
<!DOCTYPE html>
<html>
<head></head>
<body>
	<h1>Hello, world!</h1>
</body>
</html>
```

### ตัวอย่าง 2
```html
<!-- ไฟล์ชื่อ index.html-->
<!DOCTYPE html>
<html>
<head></head>
<body>
<h1 id="element1"></h1>
<script>		
	// ซอร์สโค้ดตามตราฐานเก่า ES5	
       function say(message){
	      		var element = document.querySelector('#element1');
	      		element.innerHTML = message;			
              }
	      say("Hello, world!");
</script>
</body>
</html>
```

## จาวาสคริปต์ฝั่งเซิร์ฟเวอร์
```js
var http = require('http');
http.createServer(function (request, response) {
  response.writeHead(200, {'Content-Type': 'text/plain'});
  response.end("Hello, world!");
}).listen(8001, '127.0.0.1');
console.log('Server running at http://127.0.0.1:8001/');
```

## Traceur 
```html
<!-- ไฟล์ชื่อ index.html-->
<!DOCTYPE html>
<html>
<head>
	 <!--  Traceur -->
<script src="https://google.github.io/traceur-compiler/bin/traceur.js"></script>
<script src="https://google.github.io/traceur-compiler/bin/BrowserSystem.js"></script>
<script src="https://google.github.io/traceur-compiler/src/bootstrap.js"></script>
</head>
<body>
<h1 id="element1"></h1>
<script type="module">		
		class Chat{
			constructor(message) {
				this.message = message;
			}
			say(){
				let  element = document.querySelector('#element1');
				element.innerHTML = this.message;				
			}
		}		
		let chat = new Chat("Hello, world!");
		chat.say();
</script>
</body>
</html>
```

## ตัวอย่าง Babel
```html
<!-- ไฟล์ชื่อ index.html-->
<html>
<head>
<!-- Babel -->
<script src="node_modules/babel-core/browser.js"></script>
</head>
<body>
<h1 id="element1"></h1>
<script type="text/babel">		
		class Chat{
			constructor(message) {
				this.message = message;
			}
			say(){
				let  element = document.querySelector('#element1');
				element.innerHTML = this.message;				
			}
		}		
		let chat = new Chat("Hello, world!");
		chat.say();
</script>
</body>
</html>
```

## ตัวอย่าง ES6 นอกเว็บเบราเซอร์
```js
class Chat{
	constructor(message) {
		this.message = message;
	}
	say(){
       console.log(this.message);
	}
};		
let chat = new Chat("Hello, world!");
chat.say();
```

# บทที่ 2 ทบทวนเบื้องต้น

## คอมเมนต์
### ตัวอย่าง 1
```js
var x = 10; 	//This is an example.
```

### ตัวอย่าง 2
```js
/* This is an example
ECMAScript 6 is very easy*/
var x = 10;
```

## console.log()
### ตัวอย่าง 1
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
### ตัวอย่าง 1
```js
var  x = 100;	
```

### ตัวอย่าง 2
```js
var  x = 1, y = 2, z = 3;	// ประกาศตัวแปร x, y และ z ให้อยู่ในบรรทัดเดียวกัน
```

### ตัวอย่าง 3
```js
var  x= 1,  y = x;
/* จะเสมือนเขียนซอร์สโค้ดแบบนี้
var x = 1;
var y = x;
*/
```

### ตัวอย่าง 4
```js
var x; 	    
console.log(x); 	// undefined
```

## การประกาศตัวแปรโดยไม่มี var
### ตัวอย่าง 1
```js
x = 1;
```

### ตัวอย่าง 2
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
### ตัวอย่าง 1
```js
console.log(null === undefined) 	// false
console.log(null == undefined) 	// true
console.log(typeof null)        	// "object" 
console.log(typeof undefined)   	// "undefined"
```

## ตัวเลข
### ตัวอย่าง 1
```js
console.log(100, 0, -0, -300, 3.14, -78.222); // 100 0 -0 -300 3.14 -78.222
```

### ตัวอย่าง 2
```js
console.log(200e5); 	// 200 x 105  =  20000000
console.log(2E-5);   	// 2 x 10-5 = 0.00002
```

### ตัวอย่าง 3
```js
console.log(Math.sqrt(-1)); 	//  NaN (ไม่สามารถถอดรากที่สองของ -1)
console.log(0/0); 			//  NaN ( 0 หาร 0 ไม่มีนิยาม)
console.log(parseInt("Hi"));	//  NaN (ไม่สามารถแปลง "Hi" เป็นตัวเลขได้)
```

### ตัวอย่าง 4
```js
console.log( Infinity * Infinity);	// Infinity
console.log( Infinity / Infinity);	// NaN
console.log(-344 * Infinity);		// -Infinity
console.log(3 / Infinity);			// 0
```

### ตัวอย่าง 5
```js
console.log(Number.MAX_VALUE);		//  1.7976931348623157e+308 เป็นค่าโดยประมาณ
console.log(Number.MAX_VALUE + 100);	//  1.7976931348623157e+308 เป็นค่าโดยประมาณ (บรรทัด 2)   
console.log(Number.MAX_VALUE * 10);	//  Infinity (บรรทัด 3)
console.log(Number.MAX_VALUE * -10);	//  -Infinity (บรรทัด 4)
```

### ตัวอย่าง 6
```js
console.log(Number.MIN_VALUE);   		//5e-324 (เป็นค่าโดยประมาณ)
```


