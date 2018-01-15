
# บทที่ 6 การประกาศตัวแปร และการกำหนดค่า

## การประกาศตัวแปรแบบ let
```js
function calculate(num){
	if (num > 10) {
		let value = num*10;		// ประกาศตัวแปรแบบ let 
		// ซอร์สโค้ดส่วนที่เหลือ
		console.log(value);		// มองเห็นตัวแปร value
	} else {
		// มองไม่เห็นตัวแปร value		
	}	
	// มองไม่เห็นตัวแปร value
}
```

## การใช้ตัวแปรแบบ  var เปรียบเทียบกับ let
```js
var a = 1;
console.log(a);	// 1
{
    var a = 2;
    console.log(a);	// 2
}
console.log(a);	// 2
```

```js
var a  = 1;
console.log(a);	// 1
{
    let a = 2;			
    console.log(a); 	// 2
}
console.log(a);	// 1
```

## var กับ let ในประโยควนลูป
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
var array = [];
for(var i=0; i < 5; i++){ 
	// เพิ่มฟังก์ชั่นเข้าไป เพื่อให้เป็นสมาชิกของอาร์เรย์
	array.push(     function () { console.log(i) }  );	
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
5
*/
```

```js
var array = [];
for(var i=0; i< 5; i++){
	array.push( 
      function(item) {
 	  // รีเทิร์นฟังก์ชั่นออกไป เพื่อให้เป็นสมาชิกของอาร์เรย์
 	  return function() { console.log(item);  } ; 
	}( i )  // ใช้เทคนิค IIFE
);	
}
array.forEach( function(printLog) {
	printLog();	// รอบแรกแสดงค่าเป็น 0 รอบที่สองเป็น 1  รอบที่สามเป็น 2 …จนถึงรอบที่ห้าจะแสดงค่าเป็น 4
});
/*แสดงผลลัพธ์เป็น
0
1
2
3
4
*/
```

```js
var array = [];
for(let i=0; i<5; i++){	// ประกาศตัวแปร i แบบ let
	array.push(     function () { console.log(i); }  );
}
array.forEach(function(printLog){
	printLog();	// รอบแรกแสดงค่าเป็น 0 รอบที่สองเป็น 1  รอบที่สามเป็น 2 …จนถึงรอบที่ห้าจะแสดงค่าเป็น 4 
});
/*แสดงผลลัพธ์เป็น
0
1
2
3
4
*/
```

## สรุปขอบเขตการมองเห็นตัวแปรแบบ let
```js
console.log(count); 		// undefined หรือเกิด ReferenceError (ขึ้นอยู่กับจาวาสคริปต์เอ็นจิ้น)
let count = 89;			// จะมองเห็นตัวแปร count ตั้งแต่จุดนี้เป็นต้นไป
if(true){
console.log(count);		// 89
}
```

```js
var count = 89;
let count = 12; 			// เกิด error เพราะประกาศชื่อตัวแปรซ้ำกัน
```

```js
var count = 89;
if(true) {
let count = 12;		// จะไม่เกิด error
// บรรทัดต่อจากนี้ไป สามารถมองเห็นตัวแปร count ที่ประกาศแบบ let เท่านั้น
console.log(count);		// 12
}
// มองเห็นและเข้าถึงตัวแปร count ที่อยู่นอกบล็อกของ if
console.log(count);			// 89
```

## ตัวแปรค่าคงที่
```js
const MAX_COUNT = 100;	// ประกาศถูกต้องตามไวยากรณ์
const MAX_VALUE;		// เกิด error เพราะไม่ได้กำหนดค่าตั้งต้นให้แต่แรก
const MESSAGE = "Hello";	// ประกาศถูกต้องตามไวยากรณ์
MESSAGE = "Bye"; 		// เกิด error เพราะไปแก้ไขตัวแปรค่าคงที่ภายหลังประกาศใช้งานแล้ว ซึ่งจะทำไม่ได้
```

```js
console.log(count);		// undefined	หรือเกิด ReferenceError (ขึ้นอยู่กับจาวาสคริปต์เอ็นจิ้น)
const count = 89;		// จะมองเห็นตัวแปร count ตั้งแต่จุดนี้เป็นต้นไป
if(true){
console.log(count);	// 89
}
```

```js
var message = "foo"; 
let count = 100;	
// ประกาศตัวแปรค่าคงที่
const message = "bar";	// เกิด  error เพราะประกาศตัวแปรชื่อซ้ำกัน	
const count = 1;		// เกิด error เพราะประกาศตัวแปรชื่อซ้ำกัน
```

```js
var message = "foo";
let count = 100;
if(true) {
	const message = "bar";	
const count = 1;		
// มองเห็นตัวแปร message และ count ที่ประกาศเป็นค่าคงที่เท่านั้น
console.log(message);	// "bar"
console.log(count);		// 1
}
// มองเห็นและเข้าถึง message และ count ที่อยู่นอกบล็อกของ if
console.log(message);	// "foo"
console.log(count);		// 100
```

## ข้อควรระวังเกี่ยวกับตัวแปรค่าคงที่
```js
const obj = {
    value: 100
};
obj.value = 1; 		// สามารถแก้ไขค่าพร็อพเพอร์ตี้ภายในอ็อบเจ็กต์ได้
console.log(obj.value);	// 1
obj = 10; 			// จะเกิด error เพราะแก้ไขตัวแปรค่าคงที่ไม่ได้
```

```js
for (const i=0; i < 10; i++) {	// จะ error เพราะนิพจน์ i++ ได้ไปแก้ไขตัวแปร i ซึ่งเป็นค่าคงที่ มันจะทำไม่ได้
// ซอร์สโค้ด    
}
```

```js
let obj = {
        key1: true,
        key2: true,        
};
for (const key in obj) {
	console.log(key);    
}
/*แสดงผลลัพธ์เป็น
"key1"
"key2"
*/
```

```js
for (const value of [1, 2]) {
	console.log(value);    
}
/*แสดงผลลัพธ์เป็น
1
2
*/
```

## ดีสตรัคเตอร์ริ่ง
```js
let f = {
	color: "red"
,size: "200"
,icon: "small" 
,style: "normal"
, lang: "thai"
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

## ดีสตรัคเตอร์ริ่งจากอ็อบเจ็กต์
```js
let font = {
	color: "red"
,size: 200
} ;
let fontColor = font.color, fontSize = font.size;
```

```js
let font = {
	color: "red"
,size: 200
} ;
// กำหนดค่าให้กับตัวแปร ด้วยวิธีดีสตรัคเตอร์ริ่ง
// จะเสมือนประกาศแบบนี้ 
// let fontColor = font.color, fontSize = font.size;
let {color: fontColor, size: fontSize } = font;
// จะประกาศตัวแปรเป็นแบบ var หรือ const ก็ทำได้เช่นกัน
// var {color: fontColor, size: fontSize } = font;
// const {color: fontColor, size: fontSize } = font;
console.log(fontColor);	// "red" จะมีค่าเท่ากับ font.color
console.log(fontSize); 	// 200 จะมีค่าเท่ากับ font.size
```

```js
let font = {
	color: "red"
,size: 200
};
// จะเสมือนประกาศแบบนี้ 
// let color = font.color, size = font.size;
let {color, size} = font;	 // กำหนดค่าให้กับตัวแปร ด้วยวิธีดีสตรัคเตอร์ริ่งแบบย่อ
console.log(color);		// "red
console.log(size); 		// 200  
```

```js
let font = {
	color: "red"
,size: 200	
};
let { color, size, style } = font;	
console.log(color);		// "red"
console.log(size); 		// 200
console.log(style);		// undefined 
```

## อ็อบเจ็กต์ซ้อนอ็อบเจ็กต์

