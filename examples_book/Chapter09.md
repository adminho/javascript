# โค้ดบทที่ 9 การประกาศตัวแปร และการกำหนดค่า

## การประกาศตัวแปรแบบ let

```js
function calculate(num) {
	if (num > 10) {
		let value = num*10;	         // ประกาศตัวแปรแบบ let 
		// ซอร์สโค้ดส่วนที่เหลือ
		console.log(value);	         // มองเห็นตัวแปร value
	} else {
		// มองไม่เห็นตัวแปร value		
	}	
	// มองไม่เห็นตัวแปร value
}
```

### การใช้ตัวแปรแบบ  var เปรียบเทียบกับ let

```js
var a = 1;
console.log(a);	             // 1
{
    var a = 2;
    console.log(a);	// 2
}
console.log(a);	           // 2
```

```js
var a  = 1;
console.log(a);	           // 1
{
    let a = 2;			
    console.log(a);          // 2
}
console.log(a);	          // 1
```

### var กับ let ในประโยควนลูป

```js
for(var i=0; i < 10; i++) {   // วนลูป 10 ครั้ง
     // ซอร์สโค้ด
}
// สามารถเข้าถึงตัวแปร i ที่ตอนนี้มีค่าเป็น 10 ได้
console.log(i);     // 10
```

```js
for(let i=0; i < 10; i++) {	// วนลูป 10 ครั้ง
    // ซอร์สโค้ด
}
console.log(i);     // จะเกิด ReferenceError เพราะมองไม่เห็นตัวแปร i
```

```js
var array = [ ];
for(var i=0; i < 5; i++) { 
	// เพิ่มฟังก์ชั่นเข้าไป เพื่อให้เป็นสมาชิกของอาร์เรย์
	array.push(  function () { console.log(i) }  );	
}
array.forEach( function(printLog) {
	// เรียกสมาชิกของอาร์เรย์ที่เป็นฟังก์ชั่น ให้ทำงาน
	printLog(); 	// จะแสดงค่าของตัวแปร i เป็นเลข 5 ทั้งหมดห้ารอบด้วยกัน
});
/*แสดงผลลัพธ์เป็น
5
5
5
5
5 */
```

```js
var array = [ ];
for(var i=0; i< 5; i++) {
      array.push( 
          function(item) {
 	   // รีเทิร์นฟังก์ชั่นออกไป เพื่อให้เป็นสมาชิกของอาร์เรย์
 	   return function() { console.log(item); } ; 
	} ( i )  // ใช้เทคนิค IIFE
     );	
}
array.forEach( function(printLog) {
 printLog(); // รอบแรกแสดงค่าเป็น 0 รอบที่สองเป็น 1  รอบที่สามเป็น 2 …จนถึงรอบที่ห้าจะแสดงค่าเป็น 4
});
/*แสดงผลลัพธ์เป็น
0
1
2
3
4 */
```

```js
var array = [ ];
for(let i=0; i<5; i++) {	// ประกาศตัวแปร i แบบ let
	array.push(     function () { console.log(i); }  );
}
array.forEach(function(printLog){
 printLog(); // รอบแรกแสดงค่าเป็น 0 รอบที่สองเป็น 1  รอบที่สามเป็น 2 …จนถึงรอบที่ห้าจะแสดงค่าเป็น 4 
});
/*แสดงผลลัพธ์เป็น
0
1
2
3
4 */
```


### สรุปขอบเขตการมองเห็นตัวแปรแบบ let

```js
console.log(count); 	// เกิด ReferenceError
let count = 89;	            // จะมองเห็นตัวแปร count ตั้งแต่จุดนี้เป็นต้นไป
if(true) {
    console.log(count);	// 89
}
```

```js
var count = 89;
let count = 12; 			// เกิด SyntaxError เพราะประกาศชื่อตัวแปรซ้ำกัน
```

```js
var count = 89;
if(true) {
     let count = 12;		// จะไม่เกิด error
     // จากนี้ไปจะมองเห็นตัวแปร count ที่ประกาศแบบ let เท่านั้น
     console.log(count);		// 12
}
// มองเห็นและเข้าถึงตัวแปร count ที่อยู่นอกบล็อกของ if
console.log(count);		// 89
```

## ตัวแปรค่าคงที่

```js
const MAX_COUNT = 100;	// ประกาศถูกต้องตามไวยากรณ์
const MAX_VALUE;		// เกิด SyntaxError เพราะไม่ได้กำหนดค่าตั้งต้นให้แต่แรก
const MESSAGE = "Hello";	// ประกาศถูกต้องตามไวยากรณ์
MESSAGE = "Bye";  // เกิด TypeError เพราะไปแก้ไขตัวแปรค่าคงที่ภายหลังประกาศใช้งานแล้ว ซึ่งจะทำไม่ได้
```

```js
console.log(count);	// เกิด ReferenceError
const count = 89;	// จะมองเห็นตัวแปร count ตั้งแต่จุดนี้เป็นต้นไป
if(true) {
    console.log(count);	// 89
}
```

```js
var message = "foo"; 
let count = 100;	
// ประกาศตัวแปรค่าคงที่
const message = "bar";	// เกิด SyntaxError เพราะประกาศตัวแปรชื่อซ้ำกัน	
const count = 1;		// เกิด SyntaxError เพราะประกาศตัวแปรชื่อซ้ำกัน
```

```js
var message = "foo";
let count = 100;
if(true) {
          const message = "bar";	
          const count = 1;		   
          // มองเห็นตัวแปร message และ count ที่ประกาศเป็นค่าคงที่เท่านั้น
          console.log(message);	// "bar"
          console.log(count);	// 1
}
// มองเห็นและเข้าถึง message และ count ที่อยู่นอกบล็อกของ if
console.log(message);	           // "foo"
console.log(count);	           // 100
```

### ข้อควรระวังเกี่ยวกับตัวแปรค่าคงที่

```js
const obj = {
    value: 100
};
obj.value = 1; 		          // สามารถแก้ไขค่าพร็อพเพอร์ตี้ภายในอ็อบเจ็กต์ได้
console.log(obj.value);              // 1
obj = 10; 		         // จะเกิด TypeError เพราะแก้ไขตัวแปรค่าคงที่ไม่ได้
```

```js
for (const i=0; i < 10; i++) {  // เกิด TypeError เพราะ i++ ไปแก้ไขตัวแปร i ซึ่งเป็นค่าคงที่ จะทำไม่ได้
    // ซอร์สโค้ด    
}
```

```js
let obj = {
        key1: true,
        key2: true        
};
for (const key in obj) {
	console.log(key);
}
/*แสดงผลลัพธ์เป็น
"key1"
"key2" */
```

```js
for (const value of [1, 2]) {
	console.log(value);    
}
/*แสดงผลลัพธ์เป็น
1
2 */
```

## ดีสตรัคเตอร์ริ่ง

```js
let f = {
	color: "red"
          ,size: "200"
          ,icon: "small" 
          ,style: "normal"
          ,lang: "thai"
} ;
// การแกะข้อมูลภายในอ็อบเจ็กต์ เพื่อไปกำหนดค่าให้กับตัวแปรทีละตัว จะดูยุ่งยากมาก
let color = f.color, size = f.size, icon = f.icon, style=f.style, lang= f.lang;
console.log(color, size, icon, style, lang);	// "red 200 small normal thai"
```

```js
let f = ["red", "200", "small", "normal", "thai"];
// การนำข้อมูลจากอาร์เรย์ เพื่อไปกำหนดค่าให้กับตัวแปรทีละตัว จะดูยุ่งยากมาก
let color = f[0], size = f[1], icon = f[2], style =f[3], lang=f[4];
console.log(color, size, icon, style, lang);	// "red 200 small normal thai"
```

### ดีสตรัคเตอร์ริ่งจากอ็อบเจ็กต์

```js
let font = {
      color: "red",
      size: 200
} ;
let fontColor = font.color, fontSize = font.size;
```

```js
let font = {
      color: "red",
      size: 200
} ;
// กำหนดค่าให้กับตัวแปร ด้วยวิธีดีสตรัคเตอร์ริ่ง
// จะเสมือนประกาศแบบนี้ 
// let fontColor = font.color, fontSize = font.size;
let {color: fontColor, size: fontSize } = font;
// จะประกาศตัวแปรเป็นแบบ var หรือ const ก็ทำได้เช่นกัน
// var {color: fontColor, size: fontSize } = font;
// const {color: fontColor, size: fontSize } = font;
console.log(fontColor);	                         // "red" จะมีค่าเท่ากับ font.color
console.log(fontSize); 	                         // 200 จะมีค่าเท่ากับ font.size
```

```js
let font = {
      color: "red",
      size: 200
};
// จะเสมือนประกาศแบบนี้ 
// let color = font.color, size = font.size;
let {color, size} = font;	            // กำหนดค่าให้กับตัวแปร ด้วยวิธีดีสตรัคเตอร์ริ่งแบบย่อ
console.log(color);		// "red
console.log(size); 		// 200  
```


```js
let font = {
      color: "red",
      size: 200
};
let { color, size, style } = font;	
console.log(color);		// "red"
console.log(size); 		// 200
console.log(style);		// undefined
```

### อ็อบเจ็กต์ซ้อนอ็อบเจ็กต์
```js
let font = {
      color: "red",
      size: 200,
      text : {
	name: "thai"
      }
} ;
// จะเสมือนประกาศแบบนี้ 
// let color = font.color, size = font.size, name = font.text.name;
let {color, size, text: {name} } = font; 
console.log(color, size, name);	             // "red 200 thai"
```

## ดีสตรัคเตอร์ริ่งจากอาร์เรย์

```js
let font = [ "red", "bold", "thai"];
// กำหนดค่าให้กับตัวแปร ด้วยวิธีดีสตรัคเตอร์ริ่ง
// จะเสมือนประกาศตัวแปรแบบนี้
// let color = font[0], style = font[1];
let [ color, style] = font;	
// จะประกาศตัวแปรเป็นแบบ var หรือ const ก็ทำได้เช่นกัน
// var [color, style] = font;	
// const [color, style] = font;
console.log(color);		             // "red" จะมีค่าเท่ากับ font[0]
console.log(style); 	                         // "bold" จะมีค่าเท่ากับ font[1]
```

```js
let font = [ "red", "bold", "thai"];
let [ , style ,  ] = font;
console.log(style);		             // "bold"
```

### อาร์เรย์ซ้อนอาร์เรย์

```js
let font = [ "red", ["200", "thai"], "bold"];
let [ color, [size, lang], style, option] = font;	
console.log(color);			 // "red"
console.log(color === font[0]);		 // true
console.log(size); 			 // "200"
console.log(size === font[1][0]);		 // true
console.log(lang);			 // "thai"
console.log(lang === font[1][1]);		 // true
console.log(style); 			 // "bold"
console.log(style === font[2]);		 // true
console.log(option); 			 // undefined
```

```js
let font = [ "red", ["200", "thai"], "bold"];
let [ color, option , style] = font;	
console.log(color, style);		             // "red bold" 
console.log(option[0]);		             // "200" 
console.log(option[1]); 		             // "thai"
console.log(option === font[1]); 	             // true (เพราะมันอ้างอิงไปที่อาร์เรย์ตำแหน่งเดียวกัน)
```

## ข้อควรรู้เพิ่มเติมของวิธีดีสตรัคเตอร์ริ่ง 

```js
let action = {
     save: true,
     undo: false
};
let save, undo;
{save, undo} = action;		              // เกิด SyntaxError
```

```js
let action = {
     save: true,
     undo: false
};
let save, undo;
({save, undo} = action);		              // ใส่วงเล็บครอบทั้งประโยคจะไม่เกิด error
console.log(save, undo);       	              // true false

```

```js
let font = [ "red", "bold"];
let color, style; 
[color, style] = font;		             // ไม่เกิด error
console.log(color, style);		             // "red bold"
```

### การระบุค่าดีฟอลต์ให้กับตัวแปร

```js
let { color, size = 200  } = {color:"red"}
console.log(color)		             // "red"
console.log(size)		                         // 200
```

```js
let [ , ,lang = "thai"] = []
console.log(lang);		             // "thai"
```

### ข้อมูลผสมระหว่างอ็อบเจ็กต์และอาร์เรย์

```js
let action = {
	save : "success",
	undo : "none",
	option : ["move", "stop", "slow"]
};
// กำหนดค่าให้กับตัวแปรด้วยวิธีดีสตรัคเตอร์ริ่ง 
let {save, undo, option: [ moveOption, stopOption]} = action;
console.log(save, undo, moveOption, stopOption);	// "success none move stop"
```

```js
let action = {
	save : "succes",
	undo : "none",
	option : ["move", "stop", "slow"]
};
let {save, undo, option} = action;	             // บรรทัด a
console.log(save, undo);		             // "success none"
console.log(option[0]);			 // "move"
console.log(option[1]);			 // "stop"
console.log(option[2]);			 // "slow"
console.log(option === action.option);       // true  (เพราะมันอ้างอิงไปที่อาร์เรย์ตำแหน่งเดียวกัน)
```

### การสลับข้อมูล 

```js
let a = 1, b =2
let temp = a;			// temp เป็นตัวแปรชั่วคราวที่ใช้เก็บค่าของ a เอาไว้ก่อน
a = b;
b = temp;
console.log(a);			// 2
console.log(b);			// 1
```

```js
let a = 1, b =2;
[b , a] = [a , b];			// ดีสตรัคเตอร์ริ่งจากอาร์เรย์
console.log(a);			// 2
console.log(b);			// 1
```

```js
let a = 1, b = 2, c = 3, d = 4;
console.log(a, b, c, d);		// 1 2 3 4
[d, c, b ,a] = [a, b, c, d];	            // ดีสตรัคเตอร์ริ่งจากอาร์เรย์
console.log(a, b, c, d);		// 4 3 2 1
```

### รับค่าจากฟังก์ชั่น

```js
function myFunctin() {
	return {a:1 ,b: 2};
}
let {a, b} = myFunctin();
console.log(a, b);	// 1, 2
```

```js
function myFunctin() {
	return [1, 2] ;
}
let [a, b] = myFunctin();
console.log(a, b);      	// 1 2
```

### ข้อมูล JSON

```js
// เป็นข้อมูล JSON ซึ่งเขียนด้วยเทมเพลตสตริง (บทที่ 11)
let jsonText = `{					
  "file": "index.html",		
  "menu": [
      {"value": "New", "onclick": "createDoc"},
      {"value": "Open", "onclick": "openDoc"}
      ]
}`;		
let jsonObj = JSON.parse(jsonText);	 // อ็อบเจ็กต์ที่ใช้เป็นตัวแทนของ JSON
console.log(jsonObj);
/* แสดงผลลัพธ์เป็น
{
  file: 'index.html',
  menu: [
    { value: 'New', onclick: 'createDoc' },
    { value: 'Open', onclick: 'openDoc' }
  ]
} */
let {file, menu:[ menu1, menu2] } = jsonObj;
console.log(file);		     	             // "index.html"
console.log(menu1.value);		 // "New"
console.log(menu1.onclick);		 // "createDoc"
console.log(menu2.value);		 // "Open"
console.log(menu2.onclick);		 // "openDoc"
```

### พร็อพเพอร์ตี้แบบเรสต์

```js
let obj = {foo: 1, bar: 2, zoo: 3};
let {foo, ...rest} = obj;
console.log(foo);        // 1
console.log(rest)        // { bar: 2, zoo: 3 }
```

```js
let obj = {foo: 1, bar: 2, zoo: 3};
let {...rest, zoo} = obj;                               // ...rest วางไว้ด้านหน้าไม่ได้ จะเกิด error
let {foo, ...rest1, ...rest2} = obj;                   // ...rest1 , ...rest2 ใช้ซ้ำกันไม่ได้ จะเกิด error
```


### Nullish Coalescing operator


```js
console.log(null ?? 555);                           // 555
```

```js
console.log(undefined ?? 666);                  // 666
```

```js
let x;                // x = undefined
let a = x ?? 10;  
console.log(a);   // 10
```

```js
let x;               // undefined
let a = x || 10;    // เมื่อยังไม่มีโอเปเรเตอร์ ? ให้ใช้งาน
console.log(a);   // 10
```

```js
let x = null;
let a = x || 10;    // เมื่อยังไม่มีโอเปเรเตอร์ ? ให้ใช้งาน
console.log(a);   // 10
```

```js
let x = 5;
let a = x || 10;    // เมื่อยังไม่มีโอเปเรเตอร์ ? ให้ใช้งาน
console.log(a);   // 5
```

```js
let x = 0;
let a = x || 10;    // เกิดปัญหา เพราะ x มีค่าเป็น 0 ซึ่งเทียบเท่า false
console.log(a);   // 10
a = x ?? 10;   // ไม่มีปัญหาเหมือน ||
console.log(a);   // 0
```

```js
let x;                // x = undefined
let a = x ?? 10;  
console.log(a);   // 10
```

```js
let x;                // x = undefined
let a; 
if ( x==null || x == undefined) {   
    a = 10;         // default
} else {
   a = x;
}
console.log(a);   // 10
```

```js
let x;                // x = undefined
let a = (x !== undefined && x !== null) ? x : 10;  // ยุบเหลือบรรทัดเดียว
console.log(a);   // 10
```

### Logical Assignment Operator

* ตัวอย่างโอเปอเรเตอร์ &&=

```js
let x = true;
let y = 555;
x &&= y;            // เสมือนเขียน x && (x=y);            
console.log(x);   // 555
```

```js
let x = false;
let y = 555;
x &&= y;            // เสมือนเขียน x && (x=y);            
console.log(x);   // false
```

* ตัวอย่างโอเปอเรเตอร์ ||= 

```js
let x = false;
let y = 666;
x ||= y;             // เสมือนเขียน x || (x=y);            
console.log(x)   // 666
```

```js
let x = true;
let y = 555;
x ||= y;              // เสมือนเขียน x || (x=y);             
console.log(x);   // true
```

* ตัวอย่างโอเปอเรเตอร์ ??= 

```js
let x;                // x = undefined
let y = 777
x ??= y;            // เสมือนเขียน x = x ?? (x=y);             
console.log(x)   // 777
```

```js
let x=10;                
let y = 777
x ??= y;            // เสมือนเขียน x = x ?? (x=y);             
console.log(x)   // 10
```
