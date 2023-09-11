# โค้ดบทที่ 10 ฟังก์ชั่น

## นิพจน์ฟังก์ชั่น

```js
let f1 = function () {
	// ซอร์สโค้ด
}
const f2 = function() {
	// ซอร์สโค้ด
}
var f3 = function() {
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

// ใช้ค่าดีฟอลต์ของพารามิเตอร์ message กับ callback
sendMessage("127.0.0.1");		         // "127.0.0.1 Hello undefined"
// ใช้ค่าดีฟอลต์ของพารามิเตอร์ callback 
sendMessage("127.0.0.1", "Good bye!");	         // "127.0.0.1 Good bye! undefined"
// ไม่ได้ใช้ค่าดีฟอลต์อะไรเลย
sendMessage("127.0.0.1", "Good bye!", function() { 
    return "toDoSomething";
});					         // "127.0.0.1 Good bye! toDoSomething"
```

```js
function sendMessage(ipaddress, message = "Hello", callback = function() {}) {	
    console.log(ipaddress, message, callback() );					
} 
// จะใช้ค่าดีฟอลต์ของพารามิเตอร์ callback เพียงตัวเดียวเท่านั้น
sendMessage("127.0.0.1", null, undefined);	// "127.0.0.1 null undefined"	
```

### ตำแหน่งการวางพารามิเตอร์แบบดีฟอลต์

```js
function sendMessage(ipaddress, message = "Hello" , callback) {	
      console.log(ipaddress, message, typeof callback);
} 

// จะใช้ค่าดีฟอลต์ของพารามิเตอร์ message เพียงตัวเดียวเท่านั้น
sendMessage("127.0.0.1");		 // "127.0.0.1 Hello undefined"

sendMessage("127.0.0.1", "Hello", function() {});	   // "127.0.0.1 Hello function"
// พารามิเตอร์ message จะได้ค่าเป็น null
sendMessage("127.0.0.1",null, function() {});	   // "127.0.0.1 null function"
// พารามิเตอร์ message จะใช้ค่าดีฟอลต์
sendMessage("127.0.0.1", undefined, function() {});	  // "127.0.0.1 Hello function"
```

```js
function sendMessage(ipaddress, callback, message = "Hello") {	
     console.log(ipaddress, message, typeof callback);
} 
sendMessage("127.0.0.1", function() {});	 // "127.0.0.1 Hello function"
```

### ประโยชน์ของพารามิเตอร์แบบดีฟอลต์

```js
function sendMessage(ipaddress, message , callback) {	
    message = message || "Hello";
    callback = callback || function() { return "callback";};
    console.log(ipaddress, message, callback());
} 
// message กับ callback จะใช้ค่าดีฟลอต์
sendMessage("127.0.0.1");		 // "127.0.0.1 Hello callback"
sendMessage("127.0.0.1", 0, null);	             // "127.0.0.1 Hello callback"
sendMessage("127.0.0.1", NaN, '');	 // "127.0.0.1 Hello callback"
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
calculate(1,1,1);		                         // 1 1 1
calculate(10);		                         // 10 20 200
calculate(20);		                         // 20 30 600
calculate(30);		                         // 30 40 1200
```

## พารามิเตอร์แบบเรสต์

```js
function iterateItem(item) {
      console.log(item);		             // แสดงค่าอากิวเมนต์ตัวแรกออกมาก่อน
      let result = 0;
      let len = arguments.length;
      for(let i=1; i<len; i++) {	             // ค่าอากิวเมนต์ตัวที่ 2 เป็นต้นไป 
	result += arguments[i];
       }
       console.log(result);
}
// แม้ว่าจะประกาศให้มีพารามิเตอร์เพียงตัวเดียว แต่ก็สามารถส่งค่าอากิวเมนต์หลาย ๆ ตัวให้กับฟังก์ชั่นได้
iterateItem(1, 1, 2, 3, 4);  
/*แสดงผลลัพธ์เป็น
1
10 */
```

```js
function iterateItem(item, ...last) {
       console.log(item);		             // ค่าอากิวเมนต์ตัวที่ 1
       let result = 0;	
       let len = last.length;
       for(let i=0; i<len; i++) {	             // ค่าอากิวเมนต์ตัวที่ 2 เป็นต้นไป 
	result += last[i];
       }	
       console.log(result);
}
iterateItem(1, 1, 2, 3, 4);	
/*แสดงผลลัพธ์เป็น
1
10 */
```

```js
function iterateItem(...last) {
     console.log(last[0]);	                         // ค่าอากิวเมนต์ตัวที่ 1
     let result = 0;	
     let len = last.length;
     for(let i=1; i<len; i++) {	             // ค่าอากิวเมนต์ตัวที่ 2 เป็นต้นไป 
	result += last[i];
     }	
     console.log(result);
}
iterateItem(1, 1, 2, 3, 4);	
/*แสดงผลลัพธ์เป็น
1
10 */
```

## อ็อบเจ็กต์ arguments

```js
function myFunction(a,  b = 2) {
          console.log(a,  b);			         // 1 2
          console.log(arguments.length);	         // 1 
          console.log(arguments[0], arguments[1]);  // 1 undefined
          a= 10, b= 10;	// แก้ไขค่าของตัวแปร a กับ b จะ ไม่มีผลกระทบอะไรต่อ arguments
          console.log(a, b, arguments[0]);	         // 10 10 1
}
myFunction(1);
/* เมื่อเรียกประโยค myFunction(1); จะแสดงผลลัพธ์เป็น
1 2
1
1 undefined
10 10 1 */
```

```js
function myFunction(...rest) {
          rest[0] = 10, rest[1] = 10;		         // แก้ไขค่าของตัวแปร rest
          console.log(rest[0], rest[1]);		         // 10 10
          console.log(arguments[0], arguments[1]);  // 4 5
          console.log(rest[0] == arguments[0]);       // false
          console.log(rest[1] == arguments[1]);       // false
}
myFunction(4, 5);
/* เมื่อเรียกประโยค myFunction(4, 5); จะแสดงผลลัพธ์เป็น
10 10
4 5
false
false */
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
console.log(Math.max(...val)); 	   // 33
// จะเหมือนเขียนเป็น console.log(Math.max( val[0], val[1], val[2], val[3], val[4]));
```

```js
let val = [-134, -20, -7, 33, 10];
console.log(Math.max(...val, 100)); 	  // 100
// จะเหมือนเขียนเป็น console.log(Math.max( val[0], val[1], val[2], val[3], val[4], 100));
```

* ตัวอย่างที่ 1 ตัวอย่างนี้จะเป็นการใช้โอเปอเรเตอร์สเปรดกับอาร์เรย์โดยตรง
```js
// จะเหมือนเขียนเป็น console.log(Math.max( 34, 67, -134, -20, -7, 33, 10 , 2, -90, 1));
console.log(Math.max( 34, 67,  ...[-134, -20, -7, 33, 10], 2, -90, 1)); 	// 67
```

* ตัวอย่างที่ 2 สามารถใช้โอเปอเรเตอร์สเปรด เพื่อกำหนดค่าให้กับสมาชิกในอาร์เรย์ 

```js
// จะเหมือนเขียนเป็น  let array = [ 34, 67, -134, -20, -7, 33, 10 , 2, -90, 1];
let array = [ 34, 67, ...[-134, -20, -7, 33, 10], 2, -90, 1];
console.log(array); 	  // [ 34, 67, -134, -20, -7, 33, 10, 2, -90, 1 ]
```

* ตัวอย่างที่ 3 สามารถใช้โอเปอเรเตอร์สเปรดร่วมกับวิธีดีสตรัคเตอร์ริ่ง (ที่ใช้กับอาร์เรย์) 
	
```js
let a,b;
let spreadArr = [];
[a, b, ...spreadArr] = [-134, -20, -7, 33, 10];
console.log(a, b);		// -134 -20
console.log(spreadArr);	// [ -7, 33, 10 ]
```

## พารามิเตอร์แบบดีสตรัคเตอร์
	
### ส่งค่ามาเป็นอ็อบเจ็กต์

```js
function createGrade(firstName, lastName, { gender, age, subject, gpa } ) {
	// สามารถใช้ตัวแปร gender, age, subject, gpa ในฟังก์ชั่นได้ตามปกติ
	console.log(firstName, lastName, gender, age, subject, gpa);
}
createGrade("Somchai", "Jaidee", {gender: "Male", age: 21, subject: "Math", gpa: 3.44} );
// แสดงผลลัพธ์เป็น "Somchai Jaidee Male 21 Math 3.44"
createGrade("Somchai", "Jaidee" ); // จะเกิด TypeError เพราะขาดอากิวเมนต์ตัวที่สาม
```

```js
function createGrade(firstName, lastName, { gender, age, subject, gpa=0 } ) {
	// ถ้าไม่ได้ส่งค่าอากิวเมนต์มาให้พารามิเตอร์ gender, age และ subject มันจะได้ค่าเป็น undefined
	// ส่วน gpa ถ้าไม่มีค่าอากิวเมนต์ส่งมาให้ จะได้ค่าดีฟอลต์เป็น 0
	console.log(firstName, lastName, gender, age, subject, gpa);
}
createGrade("Somchai", "Jaidee", {gender: "Male", age: 21, height: 175} );
//แสดงผลลัพธ์เป็น "Somchai Jaidee Male 21 undefined 0"
```

```js
function createGrade(firstName, lastName, options) {
         let { gender, age, subject, gpa } = options ; 
          // options ห้ามมีค่าเป็น null หรือ  undefined เพราะจะเกิด error
          console.log(firstName, lastName, gender, age, subject, gpa);
}
createGrade("Somchai", "Jaidee", {gender: "Male", age: 21, subject: "Math", gpa: 3.44} );
// แสดงผลลัพธ์เป็น "Somchai Jaidee Male 21 Math 3.44"
createGrade("Somchai", "Jaidee" ); // จะเกิด TypeError เพราะขาดอากิวเมนต์ตัวที่สาม
```

```js
function createGrade(firstName, lastName,
                                 {gender="Male", age=18, subject="Math", gpa=0})
{
        console.log(firstName, lastName, gender, age, subject, gpa);
}
createGrade("Somchai", "Jaidee", {}); 
//แสดงผลลัพธ์เป็น "Somchai Jaidee Male 18 Math 0"
```

```js
function createGrade(firstName,lastName,
                                 {gender="Male", age=18, subject="Math", gpa=0}={})
{
         console.log(firstName, lastName, gender, age, subject, gpa);
}
createGrade("Somchai" , "Jaidee"); 	  // ไม่เกิด error
// แสดงผลลัพธ์เป็น  "Somchai Jaidee Male 18 Math 0"
```

### ส่งค่ามาเป็นอาร์เรย์

```js
function createGrade(firstName, lastName, 
                               [ gender, age, subject, gpa] ) {
	console.log(firstName, lastName, gender, age, subject, gpa);
}
let options = ["Male", "18", "Math"];
createGrade("Somchai", "Jaidee", options)        // พารามิเตอร์ gpa ได้ค่าเป็น undefined
// แสดงผลลัพธ์เป็น "Somchai Jaidee Male 18 Math undefined"
```

```js
function createGrade(firstName, lastName,
                               [gender="Male", age=18 ,subject="Math", gpa=0])
{
	console.log(firstName, lastName, gender, age, subject, gpa);
}
let options = ["Female", "21", "Science"];
createGrade("Somchai", "Jaidee", options);        // พารามิเตอร์ gpa จะใช้ค่าดีฟอลต์เป็น 0
// แสดงผลลัพธ์เป็น "Somchai Jaidee Female 21 Science 0"
createGrade("Somchai", "Jaidee", [] );       // พารามิเตอร์แบบดีสตรัคเตอร์ทั้งหมด จะใช้ค่าดีฟอลต์
// แสดงผลลัพธ์เป็น "Somchai Jaidee Male 18 Math 0"
createGrade("Somchai", "Jaidee"); 	 // จะเกิด TypeEror เพราะไม่ได้ระบุค่าอากิวเมนต์ตัวที่ 3
```

```js
function createGrade(firstName,lastName,
			[gender="Male",age=18,subject="Math",gpa=0]=[])
{
	console.log(firstName, lastName, gender, age, subject, gpa);
}
createGrade("Somchai", "Jaidee"); 	// ไม่เกิด error
// แสดงผลลัพธ์เป็น "Somchai Jaidee Male 18 Math 0"
```

## ชื่อของฟังก์ชั่น

* ตัวอย่างที่ 1
```js
function cleanRoom() {					
	// ซอร์สโค้ดฟังก์ชั่น
}
console.log(cleanRoom.name); 		// "cleanRoom"
```

* ตัวอย่างที่ 2

```js
let cleanToilet = function() {				
	// ซอร์สโค้ดฟังก์ชั่น
}
console.log(cleanToilet.name);		// "cleanToilet"
```

* ตัวอย่างที่ 3

```js
let cleanNewToilet = function cleanOldToilet() {	 
	// ซอร์สโค้ดฟังก์ชั่น
}
console.log(cleanNewToilet.name);	        // "cleanOldToilet"
```

* ตัวอย่างที่ 4

```js
var room = {
closeRoom: function() {			
		// ซอร์สโค้ดฟังก์ชั่น
	}
}
console.log(room.closeRoom.name);	        // "closeRoom" 
```

* ตัวอย่างที่ 5 

```js
let cleanToilet = function() {				
	// ซอร์สโค้ดฟังก์ชั่น
}
console.log(cleanToilet.bind().name);	 // "bound cleanToilet"
```

* ตัวอย่างที่ 6 

```js
let myFunction = new Function();
console.log(myFunction.name);		 // "anonymous"
```

## การประกาศฟังก์ชั่นภายในบล็อก

```js
"use strict";
if(true) {
	sayHello();			         // จะมองเห็นฟังก์ชั่น sayHello() 
	function sayHello() {		         // ประกาศฟังก์ชั่น
	          console.log("to do something");  // "to do something"
	          // จะมองเห็นฟังก์ชั่น sayBye()		
 	          console.log(sayBye.name);          // "sayBye"
	          function  sayBye() {	         // ประกาศฟังก์ชั่น
	         	    // ซอร์สโค้ด
                      } // สิ้นสุดฟังก์ชั่น sayBye
	} // สิ้นสุดฟังก์ชั่น sayHello
	console.log(typeof sayHello);	         // "function"
           console.log(typeof sayBye);	         // undefined		
}
console.log(typeof sayHello);		         // undefined
console.log(typeof sayBye);		         // undefined
```

```js
if(true) {
          // console.log(typeof sayHello);	 // ถ้าอ้างถึง sayHello ตรงนี้ จะเกิด ReferenceError
          let sayHello = function() {	             // ประกาศฟังก์ชั่น
	    // ซอร์สโค้ดฟังก์ชั่น
          }
          console.log(typeof sayHello);         // "function"
}
console.log(typeof sayHello);	             // undefined
```

## new.target 

```js
function Car(color) {
	if(this instanceof Car) {		// บรรทัดที่ 2
		this.color = color;
	} else {
		throw new Error("Can't new Car object");
           }
}
let objCar = new Car("Red");		  // ทำงานได้
let blueCar = Car.call(objCar, "Blue");	  // ทำงานได้
let redCar = Car("Red");			  // เกิด Error: "Can't new Car object" 
```

```js
function Car(color) {	
        if(typeof new.target !== "undefined")
        // หรือจะเขียนแบบนี้ก็ได้ if(new.target === Car)
        {
                this.color = color;
        } else {
                throw new Error("Can't new Car object");
       }
}
var objCar = new Car("Red");		  // ทำงานได้
var blueCar = Car.call(objCar, "Blue");        // เกิด Error: "Can't new Car object"
var redCar = Car("Red");		             // เกิด Error: "Can't new Car object"
```

### ฟังก์ชั่นลูกศร

* ตตัวอย่างที่ 1 จะเป็นการประกาศฟังก์ชั่นธรรมดา

```js
let arrowFunc = function(value) {		
	return value;
};
console.log(arrowFunc(122)); 	// 122
```

```js
let arrowFunc = value => { 
	return value;
};
// เรียกใช้ฟังก์ชั่นได้เหมือนปกติธรรมดา
console.log(arrowFunc(122)); 	// 122
```

* ตัวอย่างที่ 2  ถ้าบอดี้ของฟังก์ชั่นลูกศรมีนิพจน์เพียงตัวเดียว ก็ไม่ต้องมีเครื่องหมายปีกกาครอบตัวบอดี้ และค่าของนิพจน์ดังกล่าวจะถูกรีเทิร์นออกมา (ไม่ต้องมีคีย์เวิร์ด return)

```js
// เหมือนในตัวอย่างที่ 1 แต่การเขียนจะสั้นและกระชับกว่า
// ไม่ต้องมีเครื่องหมายปีกกาครอบบอดี้ฟังก์ชั่น รวมทั้งไม่ต้องเขียนประโยคคำสั่ง return
let arrowFunc = value => value;	
console.log(arrowFunc(122)); 	// 122
/* จะเสมือนเขียนเป็น
let arrowFunc = function(value) {		
	return value;
};*/
let arrowFunc2 = value => console.log(value);	
arrowFunc2(122); 	           // 122
/* จะเสมือนเขียนเป็น
let arrowFunc2 = function(value) {		
	return console.log(value);
};*/
```

* ตัวอย่างที่ 3 ถ้าฟังก์ชั่นลูกศรไม่มีการประกาศพารามิเตอร์ ก็ต้องใส่วงเล็บเข้าไปแทน

```js
// ฟังก์ชั่นลูกศรที่ไม่มีการประกาศพารามิเตอร์อะไรเลย
let arrowFunc = () => 122; 	
console.log(arrowFunc()); 	// 122
/* จะเสมือนเขียนเป็น
let arrowFunc = function() {
	return 122;
};*/
```

* ตัวอย่างที่ 4 จากตัวอย่างหน้าก่อนนี้ ถ้าฟังก์ชั่นลูกศรไม่ได้ทำงานอะไรเลย (ตัวบอดี้ไม่มีซอร์สโค้ด) ก็ต้องใส่ {} ปิดท้าย

```js
// ฟังก์ชั่นลูกศรที่ไม่มีพารามิเตอร์ และตัวบอดี้ของฟังก์ชั่นก็ว่างเปล่า
let arrowFunc = () => {}; 
arrowFunc();
// จะเสมือนเขียนเป็น
// var arrowFunc = function(){};
```

* ตัวอย่างที่ 5 ถ้าฟังก์ชั่นลูกศรรีเทิร์นค่าเป็นอ็อบเจ็กต์ จะต้องใส่วงเล็บครอบอ็อบเจ็กต์เสมอ เพราะถ้าไม่ใส่จะเกิด error เนื่องจากมันจะสับสนกับเครื่องหมายปีกกาของตัวบอดี้ฟังก์ชั่น
	
```js
// ใส่เครื่องหมายวงเล็บ เพื่อครอบอ็อบเจ็กต์ที่ถูกรีเทิร์นออกมา
let getFont = () => ( { color: "red", size: 200 } ); 
console.log(getFont());	// { color: 'red', size: 200 }
/* จะเสมือนเขียนเป็น
let getFont = function() {
	return {color: "red", size: 200};
};*/
```

* ตัวอย่างที่ 6 ถ้าฟังก์ชั่นลูกศรมีพารามิเตอร์ตั้งแต่ 2 ตัวขึ้นไป จะต้องมีวงเล็บครอบพารามิเตอร์ และคั่นด้วยเครื่องหมายจุลภาค (,) 

```js
// มีวงเล็บครอบพารามิเตอร์เอาไว้
let sum = (val1, val2, val3) => val1 + val2 + val3;
console.log(sum(1,2,3));		//  6
/* จะเสมือนเขียนเป็น
let sum = function(val1, val2, val3) {
	return val1 + val2 +val3;
};*/
```

* ตัวอย่างที่ 7 ฟังก์ชั่นลูกศรสามารถประกาศใช้พารามิเตอร์แบบดีฟอลต์
	
```js
// ฟังก์ชั่นลูกศรที่ใช้พารามิเตอร์แบบดีฟอลต์
let sum = (val1 = 1, val2 = 2, val3 = 3) => val1 + val2 + val3;
console.log(sum());		//  6
/* จะเสมือนเขียนเป็น
let sum = function(val1 = 1, val2 = 2, val3 = 3) {
	return val1 + val2 +val3;
};*/
```

* ตัวอย่างที่ 8 ฟังก์ชั่นลูกศรสามารถประกาศใช้พารามิเตอร์แบบเรสต์

```js
// ฟังก์ชั่นลูกศรที่ใช้พารามิเตอร์แบบเรสต์ 
let max = (...value) => Math.max(...value);
console.log(max(1, 2, 3, 6));		 // 6
/* จะเสมือนเขียน
let max = function(...value) {		 // พารามิเตอร์แบบเรสต์
	return Math.max(...value);	 // โอเปอเรเตอร์สเปรด
};*/
```

### ฟังก์ชั่นลูกศรต่างจากฟังก์ชั่นธรรมดาอย่างไร

```js
let arrowFunc = value => value;			
console.log(typeof arrowFunc);		         // "function"
console.log(arrowFunc instanceof Function);     // true
```

```js
let arrowFunc = () => {};
console.log(arrowFunc.name);         // จะแสดงชื่อ "arrowFunc" (ขึ้นอยู่กับจาวาสคริปต์เอ็นจิ้น)
```

### อ็อบเจ็กต์ arguments ในฟังก์ชั่นลูกศร

```js
// เขียนแบบฟังก์ชั่นลูกศร 
var arrowFunc = () => console.log(arguments);     //  ไม่สามารถใช้อ็อบเจ็กต์ arguments ได้
arrowFunc(1, 2, 3);	// ถ้ารันบนเว็บเบราเซอร์จะเกิด error แต่บน Node.js ไม่เกิด error
// เขียนแบบฟังก์ชั่นธรรมดา
var arrowFunc2 = function() {
    return console.log(arguments);   // ฟังก์ชั่นธรรมดาสามารถใช้อ็อบเจ็กต์ arguments ได้ตามปกติ
};
arrowFunc2(1, 2, 3);	              // [Arguments] { '0': 1, '1': 2, '2': 3 }
```

```js
function createArrow(value) {
          // ฟังก์ชั่นลูกศรสามารถเรียกใช้ arguments ของฟังก์ชั่น createArrow()
	return () => arguments[0];	 
}
let arrowFunc = createArrow(1);
console.log(arrowFunc())		 // 1
```

### เทคนิคการเขียน IIFE
```js
// เทคนิค IIFE กับฟังก์ชั่นลูกศร
var printItem = ( 
(item) => function() {  console.log(item);  }  
)("IIFE");			
printItem();		// "IIFE"
/* จะเสมือนใช้เทคนิค IIFE กับฟังก์ชั่นธรรมดา
var printItem = function(item) {
 return function() {  console.log(item);  };
}("IIFE");
printItem();		// "IIFE" */
```

### ฟังก์ชั่นคอลแบ็ค

```js
var array = [1, 2, 3, 4];
array.forEach( (value, index, arr) => arr[index] =  value *2 );
console.log(array);		// [ 2, 4, 6, 8 ]
/* จะเสมือนใช้ฟังก์ชั่นคอลแบ็คแบบปกติ
var array = [1, 2, 3, 4];
array.forEach(function(value, index, arr) {	 
	return arr[index] = value * 2;
}); 
console.log(array);		// [ 2, 4, 6, 8 ] */
```

### การใช้ this ในฟังก์ชั่นลูกศร

```html
<!-- ไฟล์ชื่อ index.html-->
<!DOCTYPE html>
<html>
<head></head>
<body>
<!-- แสดงปุ่มคำว่า "Try it" ออกทางหน้าเว็บบราเซอร์ -->
<!-- เมื่อกดปุ่มจะเกิด error -->
<button type="button" id="b1">Try it</button>
<script>
  let obj ={
              value : "JavaScript",
              printValue: function() {
        		console.log("Message:", this.value);       // this จะชี้ไปยังอ็อบเจ็กต์ obj
              },
              handle : function() {	
		console.log("Press a button");
              },
              init : function() {
                        let element = document.querySelector("#b1");              // ปุ่ม "Try it"
		element.addEventListener("click", function(event) {        // บรรทัด a
		 	this.handle();	// this จะชี้ไปยังอ็อบเจ็กต์ element 
		}, false);
               }
   }; // สิ้นสุดการประกาศอ็อบเจ็กต์
   obj.printValue();	// บรรทัด b -- แสดงคำว่า "Message: JavaScript" ออกมาทางหน้าคอนโซล
   obj.init();        	
</script>
</body>
</html>
```

```js
let obj ={
       value : "JavaScript",
       printValue: function() {
             console.log("Message:", this.value);      // this จะชี้ไปยังอ็อบเจ็กต์ obj
       },
       handle : function() {
             console.log("Press a button");
       },
       init : function() {
       	 let element = document.querySelector("#b1");	// ปุ่ม "Try it"
		element.addEventListener("click", function(event) {
			this.handle();	         // this จะชี้ไปยังอ็อบเจ็กต์ obj
		}.bind(this), false);	         // บรรทัด a -- this จะชี้ไปยังไปอ็อบเจ็กต์ obj
		//}.bind(obj), false);	         // จะใช้บรรทัดนี้ก็ได้ มีความหมายเหมือนกัน
       }
}; // สิ้นสุดการประกาศอ็อบเจ็กต์
obj.printValue();	// "Message: JavaScript"
obj.init();       
```

```js
let obj ={
       value : "JavaScript",
       printValue: function() {
             console.log("Message:", this.value);      // this จะชี้ไปยังอ็อบเจ็กต์ obj
       },
       handle : function() {
             console.log("Press a button");
       },
       init : function() {
       	 let element = document.querySelector("#b1");	// ปุ่ม "Try it"
	 element.addEventListener("click", (event)=> this.handle()); //this จะชี้ไปยัง obj 
       }
};   // สิ้นสุดการประกาศอ็อบเจ็กต์     
obj.printValue(); 	    // "Message: JavaScript"
obj.init(); 
```

### เมธอด apply(), call() และ bind()

```js
let sum = (val1, val2) => console.log(val1 + val2) ;
sum.apply(null, [5, 5] );			 // 10
sum.call(null, 5, 5);			 // 10
let resultSum = sum.bind(null, 5, 5);		
resultSum();				// 10
```

```js
let objA = {value: "access objA"};
let objB = {
     value: "access objB",
     myFunction() {
	console.log("this.value in myFunction:", this.value);
            // this ในฟังก์ชั่นลูกศร จะเห็นเหมือนกับที่  myFunction() มองเห็น
	let arrowFunc = () => console.log("Arrow function:", this.value);
	let func = function() { // this ในฟังก์ชั่นปกติ สามารถเปลี่ยนไปชี้อ็อบเจ็กตัวอื่นได้
	     console.log("Normal function:", this.value);	
	}
	arrowFunc.call(objA);	// บรรทัด a –- ไม่สามารถเปลี่ยนค่า this ได้
	func.call(objA);	 // บรรทัด b -- สามารถเปลี่ยนค่า this ให้ชี้ไปยังอ็อบเจ็กต์ objA ได้
     }
}
objB.myFunction();			 // บรรทัด c
/*แสดงผลลัพธ์
"this.value in myFunction: access objB"
"Arrow function: access objB"
"Normal function: access objA" */
objB.myFunction.call(objA);		 // บรรทัด d
/*แสดงผลลัพธ์
"this.value in myFunction: access objA"
"Arrow function: access objA"
"Normal function: access objA" */
```

## Tail call optimization

```js
function foo(a) {
       return a; 			// บรรทัด a
}
function bar(b) {
       let c = b + 100;
       return foo(c); 		// บรรทัด b
}
console.log( bar(30) );  	           // บรรทัด c แสดงผลลัพธ์เป็น 130
```

### ตำแหน่ง Tail call

* กรณีที่ 1

```js
function foo() {
        bar(); 	// เรียกฟังก์ชั่นแบบนี้จะไม่ใช่ตำแหน่งสุดท้าย
        // ถ้าเขียนเป็น return bar();   จะเป็นการเรียกฟังก์ชั่นในตำแหน่งสุดท้าย
}
```

```js
function foo() {
        bar(); 	
        return undefined;
}
```

* กรณีที่ 2

```js
function foo() {
       return 1+ bar(); 	// เรียกฟังก์ชั่นแบบนี้จะไม่ใช่ตำแหน่งสุดท้าย
}
```

```js
function foo() {
       let result = bar();
       return 1 + result;
}
```

* กรณีที่ 3

```js
function foo(condition) {	
       if(condition) {
	return bar();	// บรรทัด a  -- เรียกฟังก์ชั่นในตำแหน่งสุดท้าย	
       } else {
	bar();		// บรรทัด b -- เรียกฟังก์ชั่นแบบนี้จะไม่ใช่ตำแหน่งสุดท้าย	
        }
}
```

### รีเคอร์ซีพ 

```js
function factorial(value) {
        if (value <= 0) {
            return 1;
        } else {
            return value * factorial(value-1);   // บรรทัด a -- ไม่ใช่การเรียกฟังก์ชั่นในตำแหน่งสุดท้าย
        }
    }
console.log(factorial(4));		             // จะได้ค่าเป็น 24 เพราะ 4! = 4 x 3 x 2 x 1 = 24
// จะเกิด RangeError เพราะ stack frame โตเกินไป จนใช้หน่วยความจำหมด
console.log(factorial(200000));	
```

```js
// ต้องประกาศเพื่อทำ TCO แต่ถ้าเขียนบน Traceur หรือ Babel ซอร์สโค้ดจะเป็นสตริคท์โหมดโดยอัตโนมัติ
"use strict";		
function factorial(value) {
        return callFac(1, value);
}
function callFac(temp, val) {
        if (val <= 1) {
            return temp;
        } else {
            return callFac(temp * val, val-1);    // บรรทัด a -- เรียกฟังก์ชั่นในตำแหน่งสุดท้าย
        }
}
console.log(factorial(4));		             // 24
console.log(factorial(200000));       	 // infinity
```

### นิพจน์อื่นที่เป็น Tail call

* กรณีที่ 1

```js
let arrowFunc = param => param ? foo() : bar();
```

```js
let arrowFunc = param => {
      if(param) {
            return foo();		 // เรียกฟังก์ชั่นในตำแหน่งสุดท้าย
      } else {
            return bar();		 // เรียกฟังก์ชั่นในตำแหน่งสุดท้าย
      }	
};
```
กรณีที่ 2 

```js
let arrowFunc = () => (foo(), bar(), zoo());
```

```js
let arrowFunc = () => {
       foo();
       bar();
       return zoo();                                    // เรียกฟังก์ชั่นในตำแหน่งสุดท้าย
};
```

กรณีที่ 3

```js
let arrowFunc = () => foo() || bar();
```

```js
let arrowFunc = () => {
       let temp = foo(); 
       if (temp) {
           return temp;
       } else {
           return bar();	                         // เรียกฟังก์ชั่นในตำแหน่งสุดท้าย
       }
};
```

กรณีที่ 4

```js
let arrowFunc = () => foo() && bar();
```

```js
let arrowFunc = () => {
       let temp = foo(); 
       if (!temp) {
            return temp;
       } else {
            return bar();	// เรียกฟังก์ชั่นในตำแหน่งสุดท้าย
       }
};
```

## การใช้คอมมา (,)

```js
let arr = [ "red", "green", "blue", ];
```

```js
let arr = [  "green", "blue", "red", ];
```

```js
let obj = { 
   foo: 1,
   bar: 2,	
};
```

```js
let obj = { 
   bar: 2,
   foo: 1,   	
};
```

```js
let obj = { foo: 1, bar: 2, };
```

```js
let arr = [  
   "green", 
    "blue", 
    "red", 
 ];
```

```js
function foo(param1, param2, ) {
	console.log(arguments);
}
```

```js
foo( "abc", "def", );    // [Arguments] { '0': 'abc', '1': 'def' }
```

```js
// ตอนประกาศฟังก์ชัน
function foo( 
   param2,
   param1,	
) {
   console.log(arguments);
}
// ตอนเรียกฟังก์ชัน
foo(
 "def",
 "abc",  
); 
// แสดงผลลัพธ์
[Arguments] { '0': 'def', '1': 'abc' }
```
