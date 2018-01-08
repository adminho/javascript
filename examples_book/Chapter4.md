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
