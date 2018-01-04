[โค้ดตัวอย่างจากหนังสือทั้งหมด]( https://www.se-ed.com/product/พัฒนาเว็บแอปพลิเคชั่นด้วย-JavaScript.aspx?no=9786160825394)


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
