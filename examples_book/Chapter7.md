
# บทที่ 7 ฟังก์ชั่น

## นิพจน์ฟังก์ชั่น
```js
let f1 = function (){
	// ซอร์สโค้ด
}
const f2 = function (){
	// ซอร์สโค้ด
}
var f3 = function (){
	// ซอร์สโค้ด
}

f1();
f2();
f3();
```

## พารามิเตอร์แบบดีฟอลต์
```js
function sendMessage(ipaddress, message = "Hello" , callback = function() {}) {	
// ถ้าไม่ส่งค่าอากิวเมนต์มาให้พารามิเตอร์ message จะมีค่าเป็น "Hello"
/* ถ้าไม่ส่งค่าอากิวเมนต์มาให้พารามิเตอร์ callback จะได้เป็นฟังก์ชั่นว่างที่ไม่ได้ทำงานอะไรเลย 
   แต่จะรีเทิร์นค่าเป็น undefined  */
console.log(ipaddress, message, callback() );						
} 
```

```js
// ใช้ค่าดีฟอลต์ของพารามิเตอร์ message กับ callback
sendMessage("127.0.0.1");				// "127.0.0.1 Hello undefined"
// ใช้ค่าดีฟอลต์ของพารามิเตอร์ callback 
sendMessage("127.0.0.1", "Good bye!");		// "127.0.0.1 Good bye! undefined"
// ไม่ได้ใช้ค่าดีฟอลต์อะไรเลย
sendMessage("127.0.0.1", "Good bye!", function() { 
    return "toDoSomething";
});	
```

```js
function sendMessage(ipaddress, message = "Hello", callback = function() {}) {	
console.log(ipaddress, message, callback() );						
} 
// จะใช้ค่าดีฟอลต์ของพารามิเตอร์ callback เพียงตัวเดียวเท่านั้น
sendMessage("127.0.0.1", null, undefined);	// "127.0.0.1 null undefined"	
```

## ตำแหน่งการวางพารามิเตอร์แบบดีฟอลต์
```js
function sendMessage(ipaddress, message = "Hello" , callback) {	
console.log(ipaddress, message, typeof callback);
} 
```

```js
// จะใช้ค่าดีฟอลต์ของพารามิเตอร์ message เพียงตัวเดียวเท่านั้น
sendMessage("127.0.0.1");		// "127.0.0.1 Hello undefined"
```js

```js
sendMessage("127.0.0.1", "Hello", function() {});	// "127.0.0.1 Hello function"
// พารามิเตอร์ message จะได้ค่าเป็น null
sendMessage("127.0.0.1",null, function() {});		// "127.0.0.1 null function"
// พารามิเตอร์ message จะใช้ค่าดีฟอลต์
sendMessage("127.0.0.1", undefined, function() {});	// "127.0.0.1 Hello function"
```

```js
function sendMessage(ipaddress, callback, message = "Hello") {	
console.log(ipaddress, message, typeof callback);
} 
sendMessage("127.0.0.1", function() {});	// "127.0.0.1 Hello function"
```

## ประโยชน์ของพารามิเตอร์แบบดีฟอลต์
```js
function sendMessage(ipaddress, message , callback) {	
message = message || "Hello";
callback = callback || function() { return "callback";};
console.log(ipaddress, message, callback());
} 
// message กับ callback จะใช้ค่าดีฟลอต์
sendMessage("127.0.0.1");			// "127.0.0.1 Hello callback"
sendMessage("127.0.0.1", 0, null);	// "127.0.0.1 Hello callback"
sendMessage("127.0.0.1", NaN, '');	// "127.0.0.1 Hello callback"
```

```js
let value = 1;
function getMessage() {
    return "My_message_" + (value++);
}
function createCallback() {
    return function() {
    	return "callback";
    };
}
function sendMessage(message = getMessage(), callback = createCallback() ) {	
console.log(message, callback());
} 
sendMessage();	// "My_message_1 callback"
sendMessage();	// "My_message_2 callback" 
```

```js
function add(value) {
    return value + 10;
}

function calculate(a, b = add(a), c = a * b) {
    console.log(a, b, c) ;
}

calculate(1,1,1);		// 1 1 1
calculate(10);		// 10 20 200
calculate(20);		// 20 30 600
calculate(30);		// 30 40 1200
```

## พารามิเตอร์แบบเรสต์ 
```js
function iterateItem(item){
	console.log(item);		// แสดงค่าอากิวเมนต์ตัวแรกออกมาก่อน
	let result = 0;
let len = arguments.length;
	for(let i=1; i<len; i++){	// ค่าอากิวเมนต์ตัวที่ 2 เป็นต้นไป 
		result += arguments[i];
	}	
console.log(result);
}

// แม้ว่าจะประกาศให้มีพารามิเตอร์เพียงตัวเดียว แต่ก็สามารถส่งค่าอากิวเมนต์หลาย ๆ ตัวให้กับฟังก์ชั่นได้
iterateItem(1, 1, 2, 3, 4);  
/*แสดงผลลัพธ์เป็น
1
10
*/
```

```js
function iterateItem(item, ...last){
	console.log(item);		// ค่าอากิวเมนต์ตัวที่ 1
	let result = 0;	
let len = last.length;
	for(let i=0; i<len; i++){	// ค่าอากิวเมนต์ตัวที่ 2 เป็นต้นไป 
		result += last[i];
	}	
console.log(result);
}
iterateItem(1, 1, 2, 3, 4);	
/*แสดงผลลัพธ์เป็น
1
10
*/
```

```js
function iterateItem(...last){
	console.log(last[0]);	// ค่าอากิวเมนต์ตัวที่ 1
	let result = 0;	
let len = last.length;
	for(let i=1; i<len; i++){	// ค่าอากิวเมนต์ตัวที่ 2 เป็นต้นไป 
		result += last[i];
	}	
console.log(result);
}
iterateItem(1, 1, 2, 3, 4);	
/*แสดงผลลัพธ์เป็น
1
10
*/
```

## อ็อบเจ็กต์ arguments
```js
function myFunction(a,  b = 2){
console.log(a,  b);			// 1 2

	console.log(arguments.length);	// 1 
	console.log(arguments[0], arguments[1]); // 1 undefined
	a= 10, b= 10;				// แก้ไขค่าของตัวแปร a กับ b จะ ไม่มีผลกระทบอะไรต่อ arguments
	console.log(a, b, arguments[0]);	// 10 10 1
}
myFunction(1);
/* เมื่อเรียกประโยค myFunction(1); จะแสดงผลลัพธ์เป็น
1 2
1
1 undefined
10 10 1
*/
```

```js
function myFunction(...rest){
	rest[0] = 10, rest[1] = 10;		 // แก้ไขค่าของตัวแปร rest
console.log(rest[0], rest[1]);		 // 10 10
console.log(arguments[0], arguments[1]); // 4 5
console.log(rest[0] == arguments[0]);	 // false
console.log(rest[1] == arguments[1]);	 // false
}
myFunction(4, 5);
/* เมื่อเรียกประโยค myFunction(4, 5); จะแสดงผลลัพธ์เป็น
10 10
4 5
false
false
*/
```

## โอเปอเรเตอร์สเปรด
```js
let val = [-134, -20, -7, 33, 10];
console.log(Math.max( val[0], val[1], val[2], val[3], val[4])) ;       // 33
console.log(Math.max( val[0], val[1], val[2], val[3], val[4], 100)) ; // 100
// ใช้เมธอด apply() ซึ่งสามารถรับค่าเป็นอาร์เรย์ได้ และจะรีเทิร์นค่าเป็น 33	
console.log(Math.max.apply(Math, val));	
```

```js
let val = [-134, -20, -7, 33, 10];
console.log(Math.max(...val)); 		// 33
// จะเหมือนเขียนเป็น console.log(Math.max( val[0], val[1], val[2], val[3], val[4]));
```

```js
let val = [-134, -20, -7, 33, 10];
console.log(Math.max(...val, 100)); 	// 100
// จะเหมือนเขียนเป็น console.log(Math.max( val[0], val[1], val[2], val[3], val[4], 100));
```

### ตัวอย่างที่ 1
```js
// จะเหมือนเขียนเป็น console.log(Math.max( 34, 67, -134, -20, -7, 33, 10 , 2, -90, 1));
console.log(Math.max( 34, 67,  ...[-134, -20, -7, 33, 10], 2, -90, 1)); 	// 67
```

### ตัวอย่างที่ 2
```js
// จะเหมือนเขียนเป็น  let array = [ 34, 67, -134, -20, -7, 33, 10 , 2, -90, 1];
let array = [ 34, 67, ...[-134, -20, -7, 33, 10], 2, -90, 1];
console.log(array); 	// [34, 67, -134, -20, -7, 33, 10, 2, -90, 1]
```

### ตัวอย่างที่ 3
```js
let a,b;
let spreadArr = [];
[a, b, ...spreadArr] = [-134, -20, -7, 33, 10];
console.log(a, b);		// -134 -20
console.log(spreadArr);	// [-7, 33, 10]
```

## พารามิเตอร์แบบดีสตรัคเตอร์
### ส่งค่ามาเป็นอ็อบเจ็กต์
```js
function createGrade(firstName, lastName, { gender, age, subject, gpa } ){
	// สามารถใช้ตัวแปร gender, age, subject, gpa ในฟังก์ชั่นได้ตามปกติ
	console.log(firstName, lastName, gender, age, subject, gpa);
}
createGrade("Somchai", "Jaidee", {gender: "Male", age: 21, subject: "Math", gpa: 3.44} );
// แสดงผลลัพธ์เป็น "Somchai Jaidee Male 21 Math 3.44"
createGrade("Somchai", "Jaidee" ); // จะเกิด TypeError เพราะขาดอากิวเมนต์ตัวที่สาม
```

```js
function createGrade(firstName, lastName, { gender, age, subject, gpa=0 } ){
	// ถ้าไม่ได้ส่งค่าอากิวเมนต์มาให้พารามิเตอร์ gender, age และ subject มันจะได้ค่าเป็น undefined
	// ส่วน gpa ถ้าไม่มีค่าอากิวเมนต์ส่งมาให้ จะได้ค่าดีฟอลต์เป็น 0
console.log(firstName, lastName, gender, age, subject, gpa);
}
createGrade("Somchai", "Jaidee", {gender: "Male", age: 21, height: 175} );
//แสดงผลลัพธ์เป็น "Somchai Jaidee Male 21 undefined 0"
```

```js
function createGrade(firstName, lastName, options){
    	let { gender, age, subject, gpa } = options ; 
// options ห้ามมีค่าเป็น null หรือ  undefined เพราะจะเกิด error
console.log(firstName, lastName, gender, age, subject, gpa);
}
createGrade("Somchai", "Jaidee", {gender: "Male", age: 21, subject: "Math", gpa: 3.44} );
// แสดงผลลัพธ์เป็น "Somchai Jaidee Male 21 Math 3.44"
createGrade("Somchai", "Jaidee" ); // จะเกิด TypeError เพราะขาดอากิวเมนต์ตัวที่สาม
```

```js
function createGrade(firstName, lastName,{gender="Male", age=18, subject="Math", gpa=0}){
console.log(firstName, lastName, gender, age, subject, gpa);
}
createGrade("Somchai", "Jaidee", {}); 
//แสดงผลลัพธ์เป็น "Somchai Jaidee Male 18 Math 0"
```

```js
function createGrade(firstName,lastName,{gender="Male", age=18, subject="Math", gpa=0}={})
{
console.log(firstName, lastName, gender, age, subject, gpa);
}
createGrade("Somchai" , "Jaidee"); 	// ไม่เกิด error
// แสดงผลลัพธ์เป็น  "Somchai Jaidee Male 18 Math 0"
```

### ส่งค่ามาเป็นอาร์เรย์
```js
function createGrade(firstName, lastName, [ gender, age, subject, gpa] ){
	console.log(firstName, lastName, gender, age, subject, gpa);
}
let options = ["Male", "18", "Math"];
createGrade("Somchai", "Jaidee", options) 	// พารามิเตอร์ gpa ได้ค่าเป็น undefined
// แสดงผลลัพธ์เป็น "Somchai Jaidee Male 18 Math undefined"
createGrade("Somchai", "Jaidee" ); 		// จะเกิด TypeError เพราะขาดอากิวเมนต์ตัวที่สาม
```

```js
function createGrade(firstName, lastName,[gender="Male", age=18 ,subject="Math", gpa=0]){
	console.log(firstName, lastName, gender, age, subject, gpa);
}
let options = ["Female", "21", "Science"];
createGrade("Somchai", "Jaidee", options);	// พารามิเตอร์ gpa จะใช้ค่าดีฟอลต์เป็น 0
// แสดงผลลัพธ์เป็น "Somchai Jaidee Female 21 Science 0"
createGrade("Somchai", "Jaidee", [] ); 	  	// พารามิเตอร์แบบดีสตรัคเตอร์ทั้งหมด จะใช้ค่าดีฟอลต์
// แสดงผลลัพธ์เป็น "Somchai Jaidee Male 18 Math 0"
createGrade("Somchai", "Jaidee"); 		// จะเกิด TypeEror เพราะไม่ได้ระบุค่าอากิวเมนต์ตัวที่ 3
```

```js
function createGrade(firstName, lastName,[gender="Male",age=18,subject="Math",gpa=0]=[]){
	console.log(firstName, lastName, gender, age, subject, gpa);
}
createGrade("Somchai", "Jaidee"); 	// ไม่เกิด error
// แสดงผลลัพธ์เป็น "Somchai Jaidee Male 18 Math 0"
```


## ชื่อของฟังก์ชั่น
### ตัวอย่างที่ 1
```js
function cleanRoom(){					
	// ซอร์สโค้ดฟังก์ชั่น
}
console.log(cleanRoom.name); 		// "cleanRoom"
```

### ตัวอย่างที่ 2
```js
let cleanToilet = function(){				
	// ซอร์สโค้ดฟังก์ชั่น
}
console.log(cleanToilet.name);		// "cleanToilet"
```

### ตัวอย่างที่ 3
```js
let cleanNewToilet = function cleanOldToilet(){	 
	// ซอร์สโค้ดฟังก์ชั่น
}
console.log(cleanNewToilet.name);		// "cleanOldToilet"
```

### ตัวอย่างที่ 4
```js
var room = {
closeRoom: function(){			
		// ซอร์สโค้ดฟังก์ชั่น
	}
}
console.log(room.closeRoom.name);		// "closeRoom" 
```

### ตัวอย่างที่ 5
```js
let cleanToilet = function(){				
	// ซอร์สโค้ดฟังก์ชั่น
}
console.log(cleanToilet.bind().name);	// "bound cleanToilet"
```

### ตัวอย่างที่ 6
```js
let myFunction = new Function();
console.log(myFunction.name);		// "anonymous"
```


## การประกาศฟังก์ชั่นภายในบล็อก
```js
"use strict";
if(true){
	sayHello();					// จะมองเห็นฟังก์ชั่น sayHello() 
	function sayHello(){		 	// ประกาศฟังก์ชั่น
		console.log("to do something");	// "to do something"
		// จะมองเห็นฟังก์ชั่น sayBye()		
 	console.log(sayBye.name);  	// "sayBye"
		function  sayBye(){			// ประกาศฟังก์ชั่น
			// ซอร์สโค้ด
             } สิ้นสุดฟังก์ชั่น sayBye
	}สิ้นสุดฟังก์ชั่น sayHello
	console.log(typeof sayHello);	// "function"
console.log(typeof sayBye);	// undefined		
}
console.log(typeof sayHello);		// undefined
console.log(typeof sayBye);		// undefined
```

```js
if(true){
	console.log(typeof sayHello);	// undefined	หรือเกิด ReferenceError (แล้วแต่จาวาสคริปต์เอ็นจิ้น)
	let sayHello = function(){		// ประกาศฟังก์ชั่น
		// ซอร์สโค้ดฟังก์ชั่น
	}
console.log(typeof sayHello);	// "function"
}
console.log(typeof sayHello);		// undefined	
```

## new.target 
```js
function Car(color){
	if(this instanceof Car) {		// บรรทัดที่ 2
		this.color = color;
	} else {
		throw new Error("Can't new Car object");
}
}
let objCar = new Car("Red");		// ทำงานได้
let blueCar = Car.call(objCar, "Blue");	// ทำงานได้
let redCar = Car("Red");			// เกิด Error: "Can't new Car object"
```

```js
function Car(color){	
if(typeof new.target !== "undefined")
// หรือจะเขียนแบบนี้ก็ได้ if(new.target === Car)
{
		this.color = color;
	} else {
		throw new Error("Can't new Car object");
}
}
var objCar = new Car("Red");		// ทำงานได้
var blueCar = Car.call(objCar, "Blue");	// เกิด Error: "Can't new Car object"
var redCar = Car("Red");			// เกิด Error: "Can't new Car object"
```
