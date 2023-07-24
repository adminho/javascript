# บทที่ 13 ฟีเจอร์ใหม่ของอ็อบเจ็กต์

## กำหนดค่าให้พร็อพเพอร์ตี้แบบย่อ 

```js
let color = "red";
let size = 200;
let font = { 
	color: color,		// คีย์กับข้อมูล ชื่อซ้ำกัน
	size: size		// คีย์กับข้อมูล ชื่อซ้ำกัน
};
console.log(font.color);	            // "red"
console.log(font.size);		// 200
```

```js
let color = "red";
let size = 200;
let font = { color, size};	             // พร็อพเพอร์ตี้ของอ็อบเจ็กต์แบบย่อ
console.log(font.color); 	             // "red"
console.log(font.size);		 // 200
```

## การประกาศเมธอดแบบย่อ
```js
let obj = { 
	myFunction: function (param) {	 // ประกาศเมธอดเต็มรูปแบบ
		console.log(param);
	}
};
obj.myFunction(200);			 // 200
```

```js
let obj = { 
	myFunction(param){		 //  ประกาศเมธอดแบบย่อ
		console.log(param);
	}
} ;
obj.myFunction(200);			 // 200
```

## ชื่อคีย์ซ้ำกัน

```js
let font = { 
	color: "red",
	color: "green",			 // เลือกใช้ตัวนี้
	myFunction() {				
		console.log("myFunction1");
	},
	myFunction() {			 // เลือกใช้ตัวนี้
		console.log("myFunction2");
	}
} ;
console.log(font.color); 			 // "green"
font.myFunction();			 // "myFunction2"
```