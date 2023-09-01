# โค้ดบทที่ 3 รันจาวาสคริปต์อย่างง่าย

## จาวาสคริปต์บนเว็บเบราเซอร์

### วิธีแทรกจาวาสคริปต์ลงในไฟล์ HTML

```html
<!DOCTYPE html>
<html>
	<head>
		<script>
			function hello(msg) {			
			     return "Hello " + msg;
			}
		</script>
	</head>
	<body>
		<h1></h1>
		<div></div>
		<h1 id="element1"></h1>
		<script>
		         var element = document.querySelector('#element1');	
	                     element.innerHTML = hello("JavaScript");			           
		</script>
	</body>
</html>
```

### ตัวอย่างการวางจาวาสคริต์ใน &lt;body&gt; ...&lt;/body&gt;

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

```html
<!-- ไฟล์ชื่อ index.html-->
<!DOCTYPE html>
<html>
<head></head>
<body>
	<h1 id="element1"></h1>
	<script>		
  	// ซอร์สโค้ดจาวาสคริปต์
       	function say(message) {
	      		var element = document.querySelector('#element1');
	      		element.innerHTML = message;			
	}
	say("Hello, world!");
</script>
</body>
</html>
```

### ตัวอย่างการวางจาวาสคริต์ใน &lt;head&lt; ...&lt;/head&gt;

```html
<!-- ไฟล์ชื่อ index.html-->
<!DOCTYPE html>
<html>
<head>
	<script>		
		alert("Hello, World!")	  
	</script>
</head>
<body>
	<h1 id="element1">Hello, World!</h1>
</body>
</html>
```

```html
<!-- ไฟล์ชื่อ index.html-->
<!DOCTYPE html>
<html>
<head>
	<script>		
	// ซอร์สโค้ดจาวาสคริปต์
       	function say(message) {
	     var element = document.querySelector('#element1');
	     element.innerHTML = message;			
            }
	say("Hello, world!");
	</script>
</head>
<body>
	<h1 id="element1"></h1>
</body>
</html>
```

```html
<!-- ไฟล์ชื่อ index.html-->
<!DOCTYPE html>
<html>
<head>
	<script>		
	// ซอร์สโค้ดจาวาสคริปต์
       	function say(message){
	      		var element = document.querySelector('#element1');
	      		element.innerHTML = message;			
            }
	</script>
</head>
<body>
	<h1 id="element1"></h1>
	<script>
		say("Hello, world!");
	</script>
</body>
</html>
```

### ตัวอย่างการใช้งาน ES6 ในฝั่งเว็บเบราเซอร์

```html
<!-- ไฟล์ชื่อ index.html-->
<!DOCTYPE html>
<html>
<head></head>
<body>
<h1 id="element1"></h1>
<script>		
	class Chat {
		constructor(message) {
			this.message = message;
		}
		say() {
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

### แยกไฟล์จาวาสคริปต์ ออกจาก HTML


* [ไฟล์ myScript_1.js](Chapter03/myScript_1.js)

* [ไฟล์ myScript_2.js](Chapter03/myScript_2.js)

```html
<!DOCTYPE html>
<html>
	<head>
		<script src="js/myScript_1.js"></script>
	</head>
	<body>
		<script src="js/myScript_2.js" ></script>
	</body>
</html>
```

## จาวาสคริปต์ ES บนเว็บเบราเซอร์รุ่นเก่า

### ตัวอย่างการใช้งาน Traceur

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
	class Chat {
		constructor(message) {
			this.message = message;
		}
		say() {
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

### ตัวอย่างการใช้งาน Babel

```html
<!-- ไฟล์ชื่อ index.html-->
<html>
<head>
<!-- Babel -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.26.0/babel.js"></script>
</head>
<body>
<h1 id="element1"></h1>
<script type="text/babel">		
	class Chat {
		constructor(message) {
			this.message = message;
		}
		say() {
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

## จาวาสคริปต์นอกเว็บเบราเซอร์ด้วย Node.js

### รันจาวาสคริปต์นอกเว็บเบราเซอร์ จากไฟล์นามสกุล .js ตามลำพัง

```js
class Chat {
	constructor(message) {
	    this.message = message;
	}
	say() {
                console.log(this.message);
	}
};
let chat = new Chat("Hello, world!");
chat.say();
```

### ตัวอย่างการรันจาวาสคริปต์ให้กลายเป็นเซิร์ฟเวอร์

```js
var http = require('http');
http.createServer(function (request, response) {
  response.writeHead(200, {'Content-Type': 'text/plain'});
  response.end("Hello, world!");
}).listen(8001, '127.0.0.1');
console.log('Server running at http://127.0.0.1:8001/');
```

## จาวาสคริปต์นอกเว็บเบราเซอร์ด้วย Deno

```js
import { serve } from "https://deno.land/std@0.97.0/http/server.ts";
const s = serve({ port: 8000 });
console.log("http://localhost:8000/");
for await (const req of s) {
  req.respond({ body: "Hello, world!" });
}
```

## เครื่องมือในการดีบั๊ก

```html
<!-- ไฟล์ชื่อ index.html-->
<!DOCTYPE html>
<html>
<head></head>
<body>
<h1 id="element1"></h1>
<script>		
	let  element = document.querySelector('#element1');
	element.innerHTML = "Hello, world!";				
	console.log('Finish program');	
</script>
</body>
</html>
```
