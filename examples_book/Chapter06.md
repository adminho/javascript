# บทที่ 6  ทบทวนอ็อบเจ็กต์

## วิธีสร้างอ็อบเจ็กต์อย่างง่าย

```js
var font = { };
```

```js
var font = {
	color: "red",	     // คีย์ชื่อ color : ข้อมูลเป็นสตริง "red"
	myFunction: function (param) { // คีย์ชื่อ myFunction : ข้อมูลเป็นเมธอด (ฟังก์ชั่น)
                   /* ซอร์สโค้ดของเมธอดอยู่นี้ */
           },
           option: {                // คีย์ชื่อ option : ข้อมูลเป็นอ็อบเจ็กต์ (อ๊อบเจ็กต์ซ้อนอ๊อบเจ็กต์)
	      value: 1
           }		
};
```

## การเข้าถึงพร็อพเพอร์ตี้

```js
var obj = {
    a: 1,					 // กำหนดให้ a มีค่าตั้งต้นเป็น 1
    myFunction : function() {
          console.log("call myFunction");
    }	
};	
obj.a = 100;				 // กำหนดให้ obj.a มีค่าเป็น 100
console.log(obj.a);			 // 100
console.log(typeof obj.myFunction); 	 // "function"
obj.myFunction();			 // "call myFunction"
```

## การใช้วงเล็บเหลี่ยม

```js
var student = { 
     "First name": "Somchai",
      "Last name": "Jaidee",
      "Who are you": function() {
	console.log("I’m a student");
       },
       nickname: "Tom"
};
console.log(student["First name"]); 	 // "Somchai"
var lastName = "Last name";
console.log(student[lastName]);		 // "Jaidee"
student["Who are you"]();		 // "I’m a student"
console.log(student.nickname);		 // "Tom"
console.log(student["nickname"]);	 // "Tom"
```

```js
var obj = {	
    1: 1,
    true: 2,
    null : 3,
    undefined: 4
};	
console.log(obj[1 + 0]);	 	// 1
console.log(obj[true && true]); 	// 2
console.log(obj[null]); 		// 3
console.log(obj[undefined]);	// 4
```

```js
var obj = {	
     { }: 1      // เกิด error ไม่สามารถใช้อ็อบเจ็กต์เป็นคีย์ได้โดยตรง
};
```

## เพิ่มพร็อพเพอร์ตี้เข้าไปทีหลัง

```js
var obj = {};	
obj.a = 1;			          // เพิ่มพร็อพเพอร์ตี้ที่เป็นตัวแปร a
obj[1]=100;			          // เพิ่มพร็อพเพอร์ตี้ที่มีคีย์เป็นตัวเลข 1
obj["property name"]= 200;	          // เพิ่มพร็อพเพอร์ตี้ที่มีคีย์เป็นสตริง "property name"
obj.myFunction = function() {	          // เพิ่มพร็อพเพอร์ตี้ที่เป็นเมธอด
     console.log("to do something");
};	
console.log(obj.a);		          // 1
console.log(obj[1]);		          // 100
console.log(obj["property name"]);        // 200
obj.myFunction();		         // "to do something"
```

```js
var obj = { };	
var key = { };
obj[key] = 100;		// มีคีย์เป็นอ็อบเจ็กต์ว่าง
console.log(obj[key]);	// 100
```

## การส่งค่าให้ตัวแปร

```js
function myFunction(param1, param2) {
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
var obj2 = obj1;		          // บรรทัด a -- pass by reference
obj2.a = 3;		          // บรรทัด b
console.log(obj1.a); 	          // 3
var value1 = 1;
var value2 = value1;	         // บรรทัด d  -- pass by value
value2 = 3;		         // บรรทัด e
console.log(value1); 	         // 1
```

## การเปรียบเทียบความเท่ากัน

```js
console.log( {a:1} == {a:1} );          // false 
console.log( {a:1} === {a:1} );        // false 

```

```js
var a = 1, b = 1;
console.log(a == b);                   // true 
console.log(a === b);                 // true
```

## this

```js
var obj = {
       a: 1,
       foo: function() {
	return 2;
       },		
       bar: function() { 		
	console.log(this.a);
       },		
       zoo: function() {
	console.log(this.foo());
       }
};
obj.bar();		// 1
obj.zoo();		// 2
```

```js
var obj = {		
    foo: function () { 		
        this.a = 1;		// เพิ่มตัวแปร a เข้าไปในอ็อบเจ็กต์
        console.log(this.a);
    },
    bar: function() {
        console.log(this.a);
    }		
};
obj.foo();		// 1
obj.bar();		// 1
console.log(obj.a);	// 1
```

### การผูก this ไว้กับอ็อบเจ็กต์

```js
var obj1 = { };
var obj2 = {
    a: 1,
    bar : function() {      
	       console.log("this.a =", this.a);
      	       obj1.foo = function() {
	                             console.log("this.a =", this.a);
          	                       }  // สิ้นสุดการประกาศฟังก์ชั่น foo()
   	 } // สิ้นสุดการประกาศฟังก์ชั่น bar()
}; 
obj2.bar();	// "this.a  = 1"
obj1.foo();	// "this.a = undefined"
```

### this ในฟังก์ชั่น

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

### เมธอด call() apply() และ bind()

```js
var obj1 = {
    value: 20
};
var obj2 = {
     myFunction: function(param1, param2) {
 	var value = this.value;	             // this จะชี้ไปยัง obj1
 	console.log(param1, param2, value);
     }
}
obj2.myFunction(1, 10);			 // 1 10 undefined
obj2.myFunction.call(obj1, 1, 10);	             // 1 10 20
obj2.myFunction.apply(obj1, [1, 10]);	 // 1 10 20
var f = obj2.myFunction.bind(obj1, 1, 10);
f();					 // 1 10 20
```

## พร็อพเพอร์ตี้แอคเซสเซอร์

```js
var font = { color: "red" } ;
font.color = "blue";
```

```js
var font = { 
    set color(param) {	           // ประกาศเมธอด setter โดยมีพารามิเตอร์ ได้เพียงตัวเดียว
        this.col = param;               // กำหนดค่าให้กับข้อมูลภายในอ็อบเจ็กต์
    }
};
font.color = "blue";	          // แก้ไขค่าได้
console.log(font.color) 	          // undefined
```

```js
var font = { 
    col: "red", 
    get color() {		          // ประกาศเมธอด getter โดยไม่ต้องมีพารามิเตอร์
        return this.col;	          // รีเทิร์นข้อมูลภายในอ็อบเจ็กต์ออกไป
     }
};
console.log(font.color);	         // "red"
font.color = "blue";	         // ไม่มีผลอะไรเกิดขึ้น หรือจะเกิด TypeError ในโหมดสตริคท์
console.log(font.color);	         // "red"
```

```js
var font = { 
    col: "red",
    set color(param) {
	this.col = param;
    },
    get color() {
	return this.col;
    }
};
console.log(font.color);		// "red"
font.color = "blue";
console.log(font.color);		// "blue"
```

## โอเปอเรเตอร์ delete 

```js
var obj = {x:1 ,y:2} ;
console.log(delete obj.x);	             // true
console.log(delete obj["y"]); 	             // true
console.log(obj); 		             // {}
var a = 1;
console.log(delete a);		             // false หรือเกิด SyntaxError ในโหมดสตริคท์
```

```js
console.log(delete Number.MAX_VALUE);    //  false หรือเกิด TypeError โหมดสตริคต์
```

```js
var a = [1, "Hi"];
console.log(a.length);	                         // 2
console.log(delete a[0]);	                         // true
console.log(delete a[1]);	                         // true
console.log(a[0]);		                         // undefined
console.log(a[1]);		                         // undefined
console.log(a.length);	                         // 2
```

## Descriptor

```js
var obj1 = {};
Object.defineProperty(obj1, "foo", {  	          // อ็อบเจ็กต์ descriptor
    value: 100,
    writable: true  
});
console.log(obj1.foo);			          // 100
console.log(Object.getOwnPropertyDescriptor(obj1,"foo"));	// รีเทิร์น descriptor
// { value: 100, writable: true, enumerable: false, configurable: false }
var obj2 = {};
Object.defineProperties(obj2, {	  
     "foo": {		                                  // อ็อบเจ็กต์ descriptor
          value: "fooValue",
          writable: true
     },
     "bar": {		                                  // อ็อบเจ็กต์ descriptor
         value: "barValue",
         writable: false
     }
    // พร็อพเพอร์ตี้อื่น ๆ
});
console.log(obj2.foo, obj2.bar);	                       // "fooValue barValue"
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
console.log(redCar.color);		             // "red"
console.log(blueCar.color);	             // "blue"
```

```js
function Car(color) {
    this.color = color;		// ถ้าเป็นโหมดสตริคท์จะเกิด error ขึ้นได้
    return true;
}
var blueCar = Car("blue");	// เป็นการเรียกฟังก์ชั่นธรรดา
console.log(blueCar); 		// true
```

```js
function Car(color) {
    console.log("constructor");
}
var redCar = new Car();	           // "constructor"
var blueCar = new Car;	           // "constructor"
```

## เมธอด Object.create() 

```js
var car = {
	drive: function(){   console.log("driving a car") ; }
}
var redCar = Object.create(car);
var blueCar = Object.create(car,		
{  // เพิ่มพร็อพเพอร์ตี้เข้าไป ด้วยการระบุ descriptor
    foo: { writable: true, configurable: true, value: "fooValue" },           // descriptor
    bar:{ writable: true, configurable: true, value: "barValue" }             // descriptor
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
redCar.drive();		// "driving a car"
blueCar.drive();		// "driving a car"

console.log( Object.getPrototypeOf(redCar) === car );        // true (เพราะโปรโตไทป์คือ car) 
console.log( Object.getPrototypeOf(blueCar) === car );      // true (เพราะโปรโตไทป์คือ car)
```

```js
var obj1 = Object.create(null); 		         // ไม่มีโปรโตไทป์
console.log(obj1); 			         // {}
console.log(Object.getPrototypeOf(obj1));           // null
var obj2 = Object.create(Object.prototype);        // จะเหมือนสร้างอ็อบเจ็กต์ด้วยวิธีนี้ var obj = {}
console.log(obj2); 			         // {}
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
    console.log("Drive a", this.color, "car"); // this จะชี้ไปยังอ็อบเจ็กต์ที่ถูกสร้างขึ้นมา
};
var redCar = new Car("red");
```

```js
function Car(color) {
    this.color = color;
}
Car.prototype.drive = function() {
    console.log("Drive a", this.color, "car");         // this จะชี้ไปยังอ็อบเจ็กต์ที่ถูกสร้างขึ้นมา
};
var redCar = new Car("red");
redCar.drive();			             // " Drive a red car"
var blueCar = new Car("blue");
blueCar.drive();			             // " Drive a blue car"
console.log( Object.getPrototypeOf(redCar) === Car.prototype);      // true
console.log( Object.getPrototypeOf(blueCar) === Car.prototype);    // true
```

```js
function Car(color) {
    this.color = color;
}
Car.drive = function() {
    console.log("driving a car");
};
Car.drive();			             // "driving a car"
var redCar = new Car("red");
console.log(typeof redCar.drive); 	             // undefined
```

## การสืบทอดสมาชิกหลายระดับชั้น

```js
var extend = {
    drive: function() {
 	console.log("Drive a", this.color, "car");
    }
}
function Car(color) {
    this.color = color;
}
Car.prototype = extend;				            // บรรทัด a
Car.prototype.stop = function(){			            // บรรทัด b
    console.log("Stop a", this.color, "car");
};
var redCar = new Car("red");
console.log( Object.getPrototypeOf(redCar) === extend);     // true
redCar.drive();		// "Drive a red car"
redCar.stop();		// "Stop a red car"
```

```js
function Car(color) {}
Car.prototype.drive = function() {
    console.log("Drive a", this.color, "car");	              // this ชี้ไปยังอ็อบเจ็กต์ที่ถูกสร้างขึ้นมา
};
function RedCar(color) {
    this.color = color;
}
RedCar.prototype = Object.create(Car.prototype); 	 // บรรทัด a
console.log( Object.getPrototypeOf(RedCar.prototype) === Car.prototype);      // true
RedCar.prototype.stop = function() {
    console.log("Stop a", this.color, "car");	             // this ชี้ไปยังอ็อบเจ็กต์ที่ถูกสร้างขึ้นมา
}
var redCar = new RedCar("red");
console.log( Object.getPrototypeOf(redCar) === RedCar.prototype); 	             // true
redCar.drive();		// "Drive a red car"
redCar.stop();		// "Stop a red car"
```

## โอเปอรเตอร์ instanceof

```js
function Foo() { }				
var obj = new Foo();			
console.log(obj instanceof Foo);				            // true
console.log(Object.getPrototypeOf(obj) === Foo.prototype);            // true
```

```js
function Foo() { }				
var obj = new Foo();			
console.log(obj instanceof Foo);					// true
console.log(Object.getPrototypeOf(obj) === Foo.prototype);	// true
console.log(obj instanceof Object);				// true
console.log(Foo.prototype instanceof Object);			// true
console.log(Object.getPrototypeOf(Foo.prototype) === Object.prototype);	// true
console.log(Object.getPrototypeOf(obj) === Object.prototype);        // false
```

## prototype ที่มีอยู่ในภาษา

```js
console.log( Object.getPrototypeOf(function(){}) === Function.prototype);  // true
console.log( Object.getPrototypeOf([]) === Array.prototype);	         // true
console.log( Object.getPrototypeOf({}) === Object.prototype);	         // true
console.log( Object.getPrototypeOf('') === String.prototype);	         // true
console.log( Object.getPrototypeOf(true) === Boolean.prototype);	         // true
console.log( Object.getPrototypeOf(1) === Number.prototype);	         // true
console.log(function(){} instanceof Function);     // true
console.log([] instanceof Array);		         // true
console.log({} instanceof Object);		         // true
console.log(''instanceof String);		         // false
console.log(true instanceof Boolean);	         // false
console.log(1 instanceof Number);	         // false
```

```js
// ฟังก์ชั่น 
Function.prototype.sayMsg = function(msg) {
    console.log("Function say:", msg);
};
function myFunction() { }
myFunction.sayMsg("Hello");     // " Function say: Hello"
// อาร์เรย์ 
Array.prototype.sayMsg = function(msg) {
	console.log("Array say:", msg);
};
[ ].sayMsg("Hello");	         // "Array say: Hello"
// อ็อบเจ็กต์ 
Object.prototype.sayMsg = function(msg) {
	console.log("Object say:", msg);
};
var obj = { };
obj.sayMsg("Hello");	       // "Object say: Hello"
({}).sayMsg("Hello");	       // "Object say: Hello"
// สตริง 
String.prototype.sayMsg = function(msg) {
	console.log("String say:", msg);
};
"123".sayMsg("Hello");	     // "String say: Hello"
// บูลีน 
Boolean.prototype.sayMsg = function(msg) {
	console.log("Boolean say:", msg);
}
true.sayMsg("Hello");	    // "Boolean say: Hello"
// ตัวเลข 
Number.prototype.sayMsg = function(msg) {
	console.log("Number say:", msg);
}
var num = 123;
num.sayMsg("Hello");	    // "Number say: Hello"
(123).sayMsg("Hello");	    // "Number say: Hello"
```

## โอเปอเรเตอร์ in

```js
var obj = {x: 1, y: 2};
console.log("x" in obj);		// true
console.log("xyz" in obj);	            // false	(อ็อบเจ็กต์ไม่มีพร็อพเพอร์ตี้ xyz)
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
"color"
"size"
"myFunction"
"x"
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

```js
var obj1 = {};
var obj2 = Object.preventExtensions(obj1);
console.log(obj1 === obj2);		//  true
obj1.a = 1;				// จะเพิกเฉย แต่ถ้าอยู่ในโหมดสตริคท์จะเกิด TypeError
var obj3 = Object.create(obj1);
console.log(obj3); 			// {}
obj3.a = 1;				// เพิ่มพร็อพเพอร์ตี้เข้าไปได้
console.log(Object.getPrototypeOf(obj3) === obj1); // true
```

```js
var obj = {};
console.log(Object.isExtensible(obj)); // true
Object.preventExtensions(obj);
console.log(Object.isExtensible(obj)); // false
```

## ฟังก์ชั่นคอนสตรัคเตอร์ที่มีในภาษา

### Object

```js
var obj1 = new Object(1234);		 
var obj2 = new Object();		             // อ็อบเจ็กต์ว่าง
var obj3 = new Object(undefined);	 // อ็อบเจ็กต์ว่าง
var obj4 = new Object(null);		 // อ็อบเจ็กต์ว่าง
var obj5 = Object(1);			 // เรียกแบบฟังก์ชั่น (ค่าอากิวเมนต์เป็นอะไรก็ได้)
console.log(typeof obj5);		             // "object"
```

### Boolean

```js
var obj = new Boolean(true);
console.log(typeof obj);	          // "object"
var b = Boolean(true);     
console.log(typeof b);	          // "boolean"
console.log(b);		          // true
console.log(obj == b);	          // true
console.log(obj === b);	          // false
```

```js
var false1 = Boolean();		// false
var false2 = Boolean(false);	// false
var false3 = Boolean(0);		// false
var false4 = Boolean(-0);		// false
var false5 = Boolean(null);	// false
var false6 = Boolean('');		// false
var false7 = Boolean(NaN);	// false
var false8 = Boolean(undefined);	// false
var true1 = Boolean(true);	// true
var true2 = Boolean("Hi");	// true
var true3 = Boolean("true");	// true
var true4 = Boolean("false");	// true
var true5 = Boolean([]);		// true
var true6 = Boolean({}); 		// true
var true7 = Boolean(true4); 	// true
```

### Number

```js
var obj = new Number(1);
console.log(typeof obj);	                         // "object"
var n1 = Number("1"); 	                         // รับค่าเป็นสตริงก็ได้เช่นกัน
var n2 = Number("a"); 	                         // "a" ไม่ใช่ตัวเลข จึงทำให้ตัวแปร  n2 มีค่าเป็น NaN
console.log(typeof n1, typeof n2);            // "number number"
console.log(n1, n2);		             // 1 NaN
console.log(obj == n1);	                         // true
console.log(obj === n1);	                         // false
```

### String

```js
var str1 = new String("MyString");
console.log(typeof str1);		             // "object"
console.log(str1 ===  "MyString");	             // false
var str2 = String("MyString");
console.log(typeof str2);		             // "string"
console.log(str2 ===  "MyString");	             // true
console.log(str1 ==  str2);		             // true
console.log(str1 ===  str2);		 // false
```

### Array

```js
var array1 = Array( 3 );		             // เรียกแบบฟังก์ชั่น
console.log(array1.length);                        // 3
console.log(array1);		             // [ <3 empty slots> ]
var array2 = new Array(3);
console.log(array2.length);                         // 3
console.log(array2);		             // [ <3 empty slots> ]
```

### Date

```js
console.log(Date());         // "Mon Feb 06 2023 09:28:22 GMT+0700 (Indochina Time)"
console.log(new Date());  // "2023-02-06T02:25:29.853" 
```

```js
console.log( new Date("October 20, 2023 11:13:00") );  // 2023-10-20T04:13:00.000Z
```

## เมธอดของสตริง

```js
console.log( "  Learning JavaScript  ".trim() );          // แสดงผลเป็น "Learning JavaScript"
```

```js
console.log( "foo_foo_foo_".indexOf("foo") );	 // 0
console.log("foo_foo_foo_".lastIndexOf("foo") );    // 8
```

```js
"use strict";
var str = "MyString";
console.log(str.length)       // 8
str.length = 0;		      // TypeError (ถ้าไม่ใช่โหมดสตริคท์จะไม่เกิด error แต่จะเพิกเฉย)
str.func = function(){};	      // TypeError (ถ้าไม่ใช่โหมดสตริคท์จะไม่เกิด error แต่จะเพิกเฉย)
```

## เมธอดของอาร์เรย์

```js
var array = ["a","b","c","d"];
var str = array.join("->");
console.log(str); // "a->b->c->d"
```

```js
var array = [ ];
array.push("a", "b", "c", "d");	     // เพิ่มสมาชิกกี่ตัวก็ได้
console.log(array);		     // ["a", "b", "c", "d"]
console.log(array.pop()); 		     // "d"
console.log(array);		     // ["a", "b", "c"]
```

```js
var array = ["a","b","c","d"];
console.log(array.indexOf("c" ));        // 2
console.log(array.indexOf("e" ));        // -1
```

```js
var array = ["a","b","c","d"];
var result = array.some( function (value, index, arrayObj) {
    // value คือค่าสมาชิกของอาร์เรย์
    // index คืออินเด็กซ์ของอาร์เรย์
    // arrayObj คือ ["a", "b", "c", "d"]
    return value == "c";
} );                                
console.log(result) // true
```

```js
var array = ["a","b","c","d"];
array.forEach(function (value, index, arrayObj) {
    // value คือค่าสมาชิกของอาร์เรย์
    // index คืออินเด็กซ์ของอาร์เรย์
    // arrayObj คือ ["a", "b", "c", "d"]
    console.log("a[", index, "] = ", value);
});
/* แสดงผลลัพธ์
"a[ 0 ] =  a"
"a[ 1 ] =  b"
"a[ 2 ] =  c"
"a[ 3 ] =  d" */
```

## ฟังก์ชั่นก็เป็นอ็อบเจ็กต์

```js
function foo() {
    console.log(foo.x)    // อ้างถึงพร๊อพเพอร์ตี้ x
}

foo();                        // undefined

foo.x = 100;                                // เพิ่มเข้าไป เพื่อให้ a.x หาเจอ
console.log(foo.x)                        // 100
foo();                                         // เรียกใช้ได้ แสดง 100 ออกมา
foo["x"] = true                           // ใช้วงเล็บเหลี่ยมในการเข้าถึง x
foo["name"] = "My function";     // ใช้วงเล็บเหลี่ยมเพิ่มพร๊อพเพอร์ตี้ name เข้าไป
```

## เกร็ดความรู้

```js
let person = {                 // บรรทัด a
    name: "Somchai",
    age: 23
}
function showData(person) {
    console.log("Person is", person.name, ", age is", person.age );
}
showData(person)            // บรรทัด b
/* แสดงผลลัพธ์
Person is Somchai , age is 23
*/
```

```js
function showData(person) {
    console.log("Person is", person.name, ", age is", person.age );
}
showData({                     // บรรทัด a
    name: "Somchai",
    age: 23
})  
/* แสดงผลลัพธ์
Person is Somchai , age is 23
*/
```

```js
let obj = {  first: "Jane",    last: "Doe" };
```

```js
let obj = {
    first: "Jane",
    last: "Doe"
};
```

## ปูพื้นฐาน JSON

### เมธอด JSON.parse() กับ JSON.stringify()

```js
// ใช้ \ เชื่อมสตริงแต่ละบรรทัดเข้าดัวยกัน
var json = '{"bold": true,\
 "color": "red",\
 "size": 100\
}';
var obj = JSON.parse(json);	// obj คืออ็อบเจ็กต์ที่ใช้แทนข้อมูลแบบ JSON	
console.log(typeof obj);	            // "object"
console.log(obj);
// แสดงผลลัพธ์เป็น
// { bold: true, color: 'red', size: 100 }
```

* ตัวอย่าง จะทำการแปลงสตริงที่เขียนอยู่ในรูป JSON ซึ่งคราวนี้จะซับซ้อนหน่อยตรงที่คีย์ชื่อ "people" จะมีส่วน value เป็นอาร์เรย์ที่มีสมาชิกเป็นอ็อบเจ็กต์ (JSON) แล้วจะใช้เมธอด JSON.parse() แปลงให้กลายเป็นอ็อบเจ็กต์ที่อยู่ในรูปอ็อบเจ็กต์ของจาวาสคริปต์

```js
// ใช้ \ เชื่อมสตริงแต่ละบรรทัดเข้าดัวยกัน
var json = '{"people":[\
    {"firstName":"Somchai", "lastName":"Jaidee"},\
    {"firstName":"Mana", "lastName":"Dekdee"},\
    {"firstName":"Surat", "lastName":"Khonthai"}\
]}';
var obj = JSON.parse(json);	// obj คืออ็อบเจ็กต์ที่ใช้แทนข้อมูลแบบ JSON	
console.log(typeof obj);	// "object"
console.log(obj);
/* แสดงผลลัพธ์เป็น
{ people:
   [ { firstName: 'Somchai', lastName: 'Jaidee' },
     { firstName: 'Mana', lastName: 'Dekdee' },
     { firstName: 'Surat', lastName: 'Khonthai' } ] }
*/
```

* 	ตัวอย่าง ใช้ JSON.stringify() จะแปลงอ็อบเจ็กต์ในจาวาสคริปต์ ให้เป็นสตริงที่อยู่ในรูป JSON


```js
var obj = {
     bold: true,
     color: "red",
     size: 100
};
console.log(JSON.stringify(obj));
// แสดงผลลัพธ์เป็น
// {"bold":true,"color":"red","size":100}
```

* 	ตัวอย่าง ใช้ JSON.stringify() จะแปลง value ที่เป็นอาร์เรย์ ให้เป็นสตริงที่อยู่ในรูป JSON

```js
var obj = {
    "cars": ["Toyota", "BMW", "Tesla"]
}
console.log(JSON.stringify(obj));
// แสดงผลลัพธ์เป็น
// {"cars":["Toyota","BMW","Tesla"]}
```

```js
var obj = { 
    people:  [ 
        { firstName: "Somchai", lastName: "Jaidee" },
        { firstName: "Mana", lastName: "Dekdee" },
        { firstName: "Surat", lastName: "Khonthai" } 
   ] ,
   age: Symbol("1")
};
console.log(JSON.stringify(obj));
// แสดงผลลัพธ์เป็น
// {"people":[{"firstName":"Somchai","lastName":"Jaidee"},{"firstName":"Mana",
// "lastName":"Dekdee"},{"firstName":"Surat","lastName":"Khonthai"}]}
```

```js
var obj = { 
    people:  [ 
        { firstName: "Somchai", lastName: "Jaidee" },
        { firstName: "Mana", lastName: "Dekdee" },
        { firstName: "Surat", lastName: "Khonthai" } 
   ]    
};
console.log(JSON.stringify(obj, null, 2));       // ระบุค่าอากิวเมนต์ตัวที่สาม
/* แสดงผลลัพธ์เป็น
{
  "people": [
    {
      "firstName": "Somchai",
      "lastName": "Jaidee"
    },
    {
      "firstName": "Mana",
      "lastName": "Dekdee"
    },
    {
      "firstName": "Surat",
      "lastName": "Khonthai"
    }
  ]
} */
```

```js
var obj = { 
    name: "Somchai",    
    func: function() { },
    age: Symbol("25")
};
console.log(JSON.stringify(obj));
// แสดงผลลัพธ์
// {"name":"Somchai"}
```

```js
var obj = { 
    name: "Somchai",
    today: new Date()
};
console.log(JSON.stringify(obj));
// แสดงผลลัพธ์
// {"name":"Somchai","today":"2023-02-06T02:10:39.018Z"}
```
