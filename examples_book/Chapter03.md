# บทที่ 3 รันจาวาสคริปต์อย่างง่าย

## จาวาสคริปต์บนเว็บเบราเซอร์

### ตัวอย่างการวางจาวาสคริต์ใน <body> ...</body>

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
	<h1 id=”element1”></h1>
	<script>		
  	// ซอร์สโค้ดจาวาสคริปต์
       	function say(message) {
	      		var element = document.querySelector(‘#element1’);
	      		element.innerHTML = message;			
	}
	say(“Hello, world!”);
</script>
</body>
</html>
```

### ตัวอย่างการวางจาวาสคริต์ใน <head> ...</head>

```html
<!-- ไฟล์ชื่อ index.html-->
<!DOCTYPE html>
<html>
<head>
	<script>		
		alert(“Hello, World!“)	  
	</script>
</head>
<body>
	<h1 id=”element1”>Hello, World!</h1>
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
	     var element = document.querySelector(‘#element1’);
	     element.innerHTML = message;			
            }
	say(“Hello, world!”);
	</script>
</head>
<body>
	<h1 id=”element1”></h1>
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
	      		var element = document.querySelector(‘#element1’);
	      		element.innerHTML = message;			
            }
	</script>
</head>
<body>
	<h1 id=”element1”></h1>
	<script>
		say(“Hello, world!”);
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
<h1 id=”element1”></h1>
<script>		
	class Chat {
		constructor(message) {
			this.message = message;
		}
		say() {
			let  element = document.querySelector(‘#element1’);
			element.innerHTML = this.message;			
		}
	}		
	let chat = new Chat(“Hello, world!”);
	chat.say();
</script>
</body>
</html>
```

### แยกไฟล์จาวาสคริปต์ ออกจาก HTML


[ไฟล์ myScript_1.js](Chapter03/myScript_1.js)

[ไฟล์ myScript_2.js](Chapter03/myScript_2.js)

```html
<!DOCTYPE html>
<html>
	<head>
		<script src=“js/myScript_1.js”></script>
	</head>
	<body>
		<script src=“js/myScript_2.js” ></script>
	</body>
</html>
```

```html

```

```html

```

```html

```

```html

```

```html

```

```html

```

```html

```

```js

```

```js

```

```js

```

```js

```
