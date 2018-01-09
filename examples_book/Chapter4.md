# บทที่ 4 ทบทวนอ็อบเจ็กต์

## วิธีสร้างอ็อบเจ็กต์อย่างง่าย

```js
var font = {};
```

```js
var font = {
	color: "red"				// คีย์ชื่อ color 	    : ข้อมูลจะเป็นสตริง "red"
	,myFunction: function (param){ 	// คีย์ชื่อ myFunction : ข้อมูลจะเป็นเมธอด (ฟังก์ชั่น)
		// ซอร์สโค้ดของเมธอด
}
,option: {				// คีย์ชื่อ option     : ข้อมูลจะเป็นอ็อบเจ็กต์
	value: 1
}		
};
```


## การเข้าถึงพร็อพเพอร์ตี้
```js
var obj = {
	a: 1					// กำหนดให้ a มีค่าตั้งต้นเป็น 1
,myFunction : function() {
      console.log("call myFunction");
}	
};	
obj.a = 100;					// กำหนดให้ obj.a มีค่าเป็น 100
console.log(obj.a);				// 100
console.log(typeof obj.myFunction); 	// "function"
obj.myFunction();				// "call myFunction"
```

## การใช้วงเล็บเหลี่ยม
```js
var student = { 
"First name": "Somchai"
,"Last name": "Jaidee"
,"Who are you": function(){
	console.log("I’m a student");
}
,nickname: "Tom"
};
console.log(student["First name"]); 	// "Somchai"
var lastName = "Last name";
console.log(student[lastName]);		// "Jaidee"
student["Who are you"]();			// "I’m a student"
console.log(student.nickname);		// "Tom"
console.log(student["nickname"]);		// "Tom"
```

```js
var obj = {	
1: 1
,true: 2
,null : 3
,undefined: 4
};	
console.log(obj[1 + 0]);	 		// 1
console.log(obj[true && true]); 		// 2
console.log(obj[null]); 			// 3
console.log(obj[undefined]); 		// 4
```

```js
var obj = {	
{}: 1 // เกิด error ไม่สามารถใช้อ็อบเจ็กต์เป็นคีย์ได้โดยตรง
};
```

## เพิ่มพร็อพเพอร์ตี้เข้าไปทีหลัง
```js
var obj = {};	
obj.a = 1;					// เพิ่มพร็อพเพอร์ตี้ที่เป็นตัวแปร a
obj[1]=100;					// เพิ่มพร็อพเพอร์ตี้ที่มีคีย์เป็นตัวเลข 1
obj["property name"]= 200;			// เพิ่มพร็อพเพอร์ตี้ที่มีคีย์เป็นสตริง "property name"
obj.myFunction = function(){		// เพิ่มพร็อพเพอร์ตี้ที่เป็นเมธอด
console.log("to do something");
};	

console.log(obj.a);				// 1
console.log(obj[1]);			// 100
console.log(obj["property name"]);	// 200
obj.myFunction();				// "to do something"
```

```js
var obj = { };	
var key = { };
obj[key] = 100;		// มีคีย์เป็นอ็อบเจ็กต์ว่าง
console.log(obj[key]);	// 100
```

## การส่งค่าให้ตัวแปร
```js
function myFunction(param1, param2){
      param1.a = 3;		// pass by reference
                   param2 = 200;		// pass by value
}
var obj = {a:1, b:2}, value = 100;
myFunction(obj, value);
console.log(obj.a);		// 3
console.log(value);		// 100
```

```js
var obj1 = {a:1, b:2};
var obj2 = obj1;		// บรรทัด a -- pass by reference
obj2.a = 3;			// บรรทัด b
console.log(obj1.a); 	// 3
var value1 = 1;
var value2 = value1;	// บรรทัด d  -- pass by value
value2 = 3;			// บรรทัด e
console.log(value1); 	// 1
```

## การเปรียบเทียบความเท่ากัน
```js
console.log({a:1} == {a:1});  // false 
console.log({a:1} === {a:1}); // false 
```

```js
var a = 1, b = 1;
console.log(a == b);  // true 
console.log(a === b); // true 
```

## this 
```js
var obj = {
	a: 1
       ,foo: function(){
		return 2;
       }		
	,bar: function(){ 		
	console.log(this.a);
}		
,zoo: function(){
	console.log(this.foo());
}
};
obj.bar();		// 1
obj.zoo();		// 2
```

```js
var obj = {		
	foo: function (){ 		
		this.a = 1;		// เพิ่มตัวแปร a เข้าไปในอ็อบเจ็กต์
	console.log(this.a );
}
,bar: function(){
	console.log(this.a);
}		
};

obj.foo();		// 1
obj.bar();		// 1
console.log(obj.a);	// 1
```

## การผูก this ไว้กับอ็อบเจ็กต์
```js
var obj1 = {};
var obj2 ={
a: 1
,bar : function(){      
	       console.log("this.a =", this.a);
      	obj1.foo = function(){
			console.log("this.a =", this.a);
      		} // สิ้นสุดการประกาศฟังก์ชั่น foo()
   	 } // สิ้นสุดการประกาศฟังก์ชั่น bar()
}; 
obj2.bar();	// "this.a  = 1"
obj1.foo();	// "this.a = undefined"
```

## this ในฟังก์ชั่น
```js
//"use strict";
function myFunction() {
 	return this;
}	
var obj = myFunction();
console.log(typeof obj); 	  
// แสดงผลลัพธ์เป็น
// undefined		(ถ้าเป็นโหมดสตริคท์)
// "object"		(ถ้าไม่ใช่โหมดสตริคท์)
```

## เมธอด call() apply() และ bind()
```js
var obj1 = {
	value: 20
};
var obj2 = {
myFunction: function(param1, param2){
 	var value = this.value;	// this จะชี้ไปยัง obj1
 	console.log(param1, param2, value);
}
}
obj2.myFunction(1, 10);			// 1 10 undefined
obj2.myFunction.call(obj1, 1, 10);	// 1 10 20
obj2.myFunction.apply(obj1, [1, 10]);	// 1 10 20
var f = obj2.myFunction.bind(obj1, 1, 10);
f();						// 1 10 20
```

## พร็อพเพอร์ตี้แอคเซสเซอร์
```js
var font = { color: "red" } ;
font.color = "blue" ;
```

```js
var font = { 
	set color(param){		// ประกาศเมธอด setter โดยมีพารามิเตอร์ ได้เพียงตัวเดียว
		this.col = param;	// กำหนดค่าให้กับข้อมูลภายในอ็อบเจ็กต์
}
} ;
font.color = "blue";		// แก้ไขค่าได้
console.log(font.color) 		// undefined
```

```js
var font = { 
       col: "red" 
       ,get color(){		// ประกาศเมธอด getter โดยไม่ต้องมีพารามิเตอร์
		return this.col;	// รีเทิร์นข้อมูลภายในอ็อบเจ็กต์ออกไป
}
};
console.log(font.color);		// "red"
font.color = "blue";		// ไม่มีผลอะไรเกิดขึ้น หรือจะเกิด TypeError ในโหมดสตริคท์
console.log(font.color);		// "red"
```

```js
var font = { 
col: "red"
	,set color(param){
		this.col = param;
}
,get color(){
		return this.col;
}
} ;
console.log(font.color);		// "red"
font.color = "blue";
console.log(font.color);		// "blue"
```

## โอเปอเรเตอร์ delete
```js
var obj = {x:1 ,y:2} ;
console.log(delete obj.x);		// true
console.log(delete obj["y"]); 	// true
console.log(obj); 			// {}
var a = 1;
console.log(delete a);		// false หรือเกิด SyntaxError ในโหมดสตริคท์
```

```js
console.log(delete Number.MAX_VALUE); //  false หรือเกิด TypeError โหมดสตริคต์
```

```js
var a = [1, "Hi"];
console.log(a.length);	// 2
console.log(delete a[0]);	// true
console.log(delete a[1]);	// true
console.log(a[0]);		// undefined
console.log(a[1]);		// undefined
console.log(a.length);	// 2
```

## Descriptor
```js
var obj1 = {};
Object.defineProperty(obj1, "foo", {  	// อ็อบเจ็กต์ descriptor
  value: 100
  ,writable: true  
});
console.log(obj1.foo);			// 100
console.log(Object.getOwnPropertyDescriptor(obj1,"foo"));	// รีเทิร์น descriptor
// { value: 100, writable: true, enumerable: false, configurable: false }
var obj2 = {};
Object.defineProperties(obj2, {	  
  "foo": {		// อ็อบเจ็กต์ descriptor
    value: "fooValue",
    writable: true
  }
  ,"bar": {		// อ็อบเจ็กต์ descriptor
    value: "barValue",
    writable: false
  }
  // พร็อพเพอร์ตี้อื่น ๆ
});
console.log(obj2.foo, obj2.bar);		// "fooValue barValue"
console.log(Object.getOwnPropertyDescriptor(obj2,"foo"));	// รีเทิร์น descriptor
// { value: "fooValue", writable: true, enumerable: false, configurable: false }
console.log(Object.getOwnPropertyDescriptor(obj2,"bar"));	// รีเทิร์น descriptor
// { value: "barValue", writable: false, enumerable: false, configurable: false }
```

## ฟังก์ชั่นคอนสตรัคเตอร์
```js
function Car(color) {
this.color = color;
return true;
}
var redCar = new Car("red");
var blueCar = new Car("blue");
//… สร้างอ็อบเจ็กต์ใหม่ได้เรื่อยด้วยโอเปอเรเตอร์ new
console.log(redCar.color);		// "red"
console.log(blueCar.color);	// "blue"
```

```js
function Car(color) {
this.color = color;		// ถ้าเป็นโหมดสตริคท์จะเกิด error ขึ้นได้
return true;
}
var blueCar = Car("blue");		// เป็นการเรียกฟังก์ชั่นธรรดา
console.log(blueCar); 		// true
```

```js
function Car(color) {
console.log("constructor");
}
var redCar = new Car();	// "constructor"
var blueCar = new Car;	// "constructor"
```

## เมธอด Object.create() 
```js
var car = {
	drive: function(){   console.log("driving a car") ; }
}
var redCar = Object.create(car);
var blueCar = Object.create(car,		
{  // เพิ่มพร็อพเพอร์ตี้เข้าไป ด้วยการระบุ descriptor
  	  foo: { writable: true, configurable: true, value: "fooValue" } // descriptor
  	  ,bar:{ writable: true, configurable: true, value: "barValue" } // descriptor
}
);
// สร้างอ็อบเจ็กต์ใหม่ได้เรื่อย ๆ ด้วย Object.create()
// …
redCar.drive();			//  "driving a car"
blueCar.drive();			//  "driving a car"
console.log(blueCar.foo);		// "fooValue"
console.log(blueCar.bar);		// "barValue"
```

```js
var car = { }
var redCar = Object.create(car);
var blueCar = Object.create(car);
car.drive = function() {
	console.log("driving a car");
}
redCar.drive();			// "driving a car"
blueCar.drive();			// "driving a car"
```

```js
console.log( Object.getPrototypeOf(redCar) === car );		// true (เพราะโปรโตไทป์คือ car) 
console.log( Object.getPrototypeOf(blueCar) === car );	// true (เพราะโปรโตไทป์คือ car) 
```

```js
var obj1 = Object.create(null); 		 	// ไม่มีโปรโตไทป์
console.log(obj1); 					// {}
console.log(Object.getPrototypeOf(obj1)); 	// null

var obj2 = Object.create(Object.prototype); 	// จะเหมือนสร้างอ็อบเจ็กต์ด้วยวิธีนี้ var obj = {}
console.log(obj2); 					// {}
console.log(Object.getPrototypeOf(obj2) === Object.prototype); 	// true 
```

## prototype
```js
function Car(color) {
this.color = color;
}
var redCar = new Car("red");
console.log( Object.getPrototypeOf(redCar) === Car.prototype); // true
```

```js
function Car(color) {
this.color = color;
}
Car.prototype.drive = function() {
console.log("Drive a", this.color, "car");	// this จะชี้ไปยังอ็อบเจ็กต์ที่ถูกสร้างขึ้นมา
};
var redCar = new Car("red");
redCar.drive();			// " Drive a red car"
var blueCar = new Car("blue");
blueCar.drive();			// " Drive a blue car"
console.log( Object.getPrototypeOf(redCar) === Car.prototype); // true
console.log( Object.getPrototypeOf(blueCar) === Car.prototype); // true
```

```js
function Car(color) {
this.color = color;
}
Car.drive = function() {
console.log("driving a car");
};
Car.drive();					// "driving a car"
var redCar = new Car("red");
console.log(typeof redCar.drive); 	// undefined
```

## การสืบทอดสมาชิกหลายระดับชั้น
```js
var extend = {
drive: function(){
 	console.log("Drive a", this.color, "car");
}
}
function Car(color) {
this.color = color;
}
Car.prototype = extend;						// บรรทัด a
Car.prototype.stop = function(){					// บรรทัด b
console.log("Stop a", this.color, "car");
};
var redCar = new Car("red");
console.log( Object.getPrototypeOf(redCar) === extend); 	// true
redCar.drive();		// "Drive a red car"
redCar.stop();		// "Stop a red car"
```

```js
function Car(color) {}
Car.prototype.drive = function() {
console.log("Drive a", this.color, "car");	// this ชี้ไปยังอ็อบเจ็กต์ที่ถูกสร้างขึ้นมา
};
function RedCar(color){
	this.color = color;
}
RedCar.prototype = Object.create(Car.prototype); 	// บรรทัด a
console.log( Object.getPrototypeOf(RedCar.prototype) === Car.prototype); // true
RedCar.prototype.stop = function(){
console.log("Stop a", this.color, "car");	// this ชี้ไปยังอ็อบเจ็กต์ที่ถูกสร้างขึ้นมา
}
var redCar = new RedCar("red");
console.log( Object.getPrototypeOf(redCar) === RedCar.prototype); 		// true
redCar.drive();		// "Drive a red car"
redCar.stop();		// "Stop a red car"
```

## โอเปอรเตอร์ instanceof
```js
function Foo() { }				
var obj = new Foo();			
console.log(obj instanceof Foo);					// true
console.log(Object.getPrototypeOf(obj) === Foo.prototype);	// true
```

```js
function Foo() { }				
var obj = new Foo();			
console.log(obj instanceof Foo);					// true
console.log(Object.getPrototypeOf(obj) === Foo.prototype);	// true

console.log(obj instanceof Object);				// true
console.log(Foo.prototype instanceof Object);			// true
console.log(Object.getPrototypeOf(Foo.prototype) === Object.prototype);	// true
console.log(Object.getPrototypeOf(obj) === Object.prototype); // false
```

## prototype ที่มีอยู่ในภาษา
```js
console.log( Object.getPrototypeOf(function(){}) === Function.prototype); // true
console.log( Object.getPrototypeOf([]) === Array.prototype);	// true
console.log( Object.getPrototypeOf({}) === Object.prototype);	// true
console.log( Object.getPrototypeOf('') === String.prototype);	// true
console.log( Object.getPrototypeOf(true) === Boolean.prototype);	// true
console.log( Object.getPrototypeOf(1) === Number.prototype);	// true
console.log(function(){} instanceof Function);	// true
console.log([] instanceof Array);			// true
console.log({} instanceof Object);		// true
console.log(''instanceof String);			// false
console.log(true instanceof Boolean);		// false
console.log(1 instanceof Number);			// false
```

```js
// ฟังก์ชั่น 
Function.prototype.sayMsg = function(msg) {
	console.log("Function say:", msg);
};
function myFunction(){}
myFunction.sayMsg("Hello");// " Function say: Hello"
// อาร์เรย์ 
Array.prototype.sayMsg = function(msg) {
	console.log("Array say:", msg);
};
[].sayMsg("Hello");		// "Array say: Hello"
// อ็อบเจ็กต์ 
Object.prototype.sayMsg = function(msg) {
	console.log("Object say:", msg);
};
var obj = {};
obj.sayMsg("Hello");	// "Object say: Hello"
({}).sayMsg("Hello");	// "Object say: Hello"
// สตริง 
String.prototype.sayMsg = function(msg) {
	console.log("String say:", msg);
};
"123".sayMsg("Hello");	// "String say: Hello"
// บูลีน 
Boolean.prototype.sayMsg = function(msg) {
	console.log("Boolean say:", msg);
}
true.sayMsg("Hello");	// "Boolean say: Hello"
// ตัวเลข 
Number.prototype.sayMsg = function(msg) {
	console.log("Number say:", msg);
}
var num = 123;
num.sayMsg("Hello");	// "Number say: Hello"
(123).sayMsg("Hello");	// "Number say: Hello"
```

## โอเปอเรเตอร์ in
```js
var obj = {x: 1, y: 2};
console.log("x" in obj);		// true
console.log("xyz" in obj);		// false	(อ็อบเจ็กต์ไม่มีพร็อพเพอร์ตี้ xyz)
var a = ["a", "b", "c"];
console.log(0 in a);		// true	(อาร์เรย์นี้มีอินเด็กซ์ 0)
console.log(5 in a);		// false	(อาร์เรย์ไม่มีอินเด็กซ์ 5)
console.log("1" in a); 		// true	(อาร์เรย์นี้มีอินเด็กซ์ 1)
console.log("length" in a); 	// true	(อาร์เรย์จะมี length เป็นพร็อพเพอร์ตี้)
```

```js
var parent = {x:1};
var obj = Object.create(parent);
console.log("x" in obj);		// true
```

## ประโยคคำสั่ง for …in
```js
function Font() {
  	this.color = "red";
  	this.size = 200;
}
var coordinate = {x: 1, y: 1, z: 1}
Font.prototype = Object.create(coordinate);
Font.prototype.myFunction = function(){};
var font = new Font();
font[1] = "fontValue";	
for(var prop in font) {
console.log(prop);
}
/* แสดงผลลัพธ์เป็น
"1"
"color "
"size "
"myFunction"
"x "
"y "
"z " */
```

```js
function Font() {
  	this.color = "red";
  	this.size = 200;
}
var coordinate = {x: 1, y: 1, z: 1}
Font.prototype = Object.create(coordinate);
Font.prototype.myFunction = function(){};
var font = new Font();
font[1] = "fontValue";
for(var prop in font) {
	if(font.hasOwnProperty( prop ) ) {	// เข้าถึงคีย์ที่อยู่ในอ็อบเจ็กต์เท่านั้น
     console.log("font." + prop, "=", font[prop]);
}
}
/* แสดงผลลัพธ์เป็น
"font.1 = fontValue"
"font.color = red"
"font.size = 200" */
```

## Object.preventExtensions() กับ Object.isExtensions()
