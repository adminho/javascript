# บทที่ 14 คลาส

## คลาส

```js
class Car { 
// สมาชิกภายในคลาส 
}
```

```js
class Car { 
      // สมาชิกภายในคลาส 
} 
let car1 = new Car();
let car2 = new Car();
let car3 = new Car();
// สร้างอ็อบเจ็กต์ได้เรื่อยๆ
```

## โอเปอเรเตอร์ instanceof

```js
class Car { 
	// สมาชิกภายในคลาส 
}
let car1 = new Car();
let car2 = new Car();
console.log(car1 instanceof Car);	             // true
console.log(car2 instanceof Car);	             // true
console.log(car1 === car2);		 // false
```

## สมาชิกคลาส

```js
class Car { 
    constructor(param) { 
	console.log(param);
    }
}
let carObj = new Car(“red”);	// “red”
```

## ข้อมูลภายในอินสแตนซ์

```js
class Car { 
    constructor(param) { 
	this.color = param;
    }
}
let carObj = new Car(“red”);
console.log(carObj.color); 	// “red” (ไม่แนะนำให้เข้าถึงโดยตรงด้วยวิธีนี้)
```

```js
class Car { 
    intField(param) { 
	this.color = param;    // บรรทัด a
    }
}
let carObj = new Car();
carObj.intField(“red”) 	             // this.color ถูกสร้างขึ้นมา
console.log(carObj.color); 	 // “red” (ไม่แนะนำให้เข้าถึงโดยตรงด้วยวิธีนี้)
```

```js
let c1 = new Car(“red”);
let c2 = new Car(“black”);
let c3 = new Car(“white”);
console.log(c1.color);                  // “red”
console.log(c2.color);                 // “black”
console.log(c3.color);                 // “white”
```

```js
class Car { 
    color = “red”;                        // บรรทัด a  -- ประกาศฟิวด์ color
    speed = 100;                         // บรรทัด b  -- ประกาศฟิวด์ speed
    constructor() { 
         console.log(this.color);      // “red”
         console.log(this.speed);    // 100
    }    
}
new Car();
// แสดงผลลัพธ์
// “red”
// 100
```

```js
class Car { 
    color;                                   // undefined
    var speed = 100;                   // ทำไม่ได้ 
    let weight = 50;                     // ทำไม่ได้  
    const height = 1.5;                // ทำไม่ได้    
}
```


### ประกาศเมธอด

```js
class Car {
     constructor (speed) {
 	this.speed = speed;
     }	
     drive() {
	console.log(“Driving speed:”, this.speed);
     } 	
     stop() {
	console.log(“Stop a car”);
     }
}
let carObj = new Car(100);
carObj.drive();		        // “Driving speed: 100”
carObj.stop();	                    // “Stop a car”
```

```js
class Car {
     constructor (speed) {
	this.speed = speed;
     }
     drive() {
	console.log(“Driving speed:”, this.speed);	
     } 	
     drive() {            // เลือกใช้เมธอดตัวนี้
	console.log(“Stop a car”);
     }
} 
let carObj = new Car(100);
carObj.drive();	   // “Stop a car”
```

## เงื่อนไขการประกาศคลาส

* ตัวอย่างที่ 1

```js
let car = new Car(); 	// จะเกิด error เพราะมองไม่เห็น Car ที่ประกาศอยู่ข้างล่าง
class Car {		// คลาสจะถูกมองเห็นตั้งแต่บรรทัดนี้เป็นต้นไป
	                       // สมาชิกคลาส
}
```

* ตัวอย่างที่ 2

```js
class Car {		                     
}
let car = Car();          // จะเกิด error เพระาไม่ใช่ new
```

* ตัวอย่างที่ 3

```js
class Car {
	constructor (speed) {   
		this.speed = speed;
	}
	drive() {  /*ซอร์สโค้ด*/ }
}
let car = new Car(100);
for(let c in car) {
	console.log(c);	
}
// แสดงผลลัพธ์เป็น
// “speed”
```

* ตัวอย่างที่ 4

```js
class Car {
   constructor() {
       Car = 100;    // จะเกิด error
   }
}
Car = 100; 	// กำหนดค่าใหม่ให้กับตัวแปร Car จากข้างนอกคลาส จะสามารถทำได้
```

## เบื้องหลังของคลาส

```js
class Car {
	constructor (speed) {   
		this.speed = speed;
	}
	drive() {  
 		console.log(“Driving speed:”, this.speed);
	}
}
let carObj = new Car(100);
carObj.drive();			    		   // “Driving speed: 100”
console.log(typeof carObj);   	    		   // “object”
console.log(carObj instanceof Car);     	               // true
console.log(carObj instanceof Object);  	               // true
console.log(carObj.drive === Car.prototype.drive);     // true
console.log(typeof Car.prototype.drive);	               // “function”
// คลาส Car ก็คือฟังก์ชั่นคอนสตรัคเตอร์ที่ชื่อ Car
console.log(typeof Car);                	               // “function”
console.log(Car.name);                  	               // “Car”
console.log(Car === Car.prototype.constructor);        // true
console.log(Car.prototype.constructor.name);           // “Car”
```

```js
let Car = function() {
    “use strict”;
    const Car = function(speed) {
    	if(typeof new.target === “undefined”) {
          		throw new TypeError(“Cannot call a class as a function”);
          }
    	this.speed = speed;
    };
    Object.defineProperty(Car.prototype, “drive”, {
        value: function() {
        	   if(typeof new.target !== “undefined”) {
             	throw new TypeError(“Method cannot be called with new.”);
	   }
 	   console.log(“Driving speed:”, this.speed);
        }
        ,enumerable: false
        ,writable: true
        ,configurable: true
    });
    return Car;
}();	// เทคนิค IIFE 
let carObj = new Car(100);
carObj.drive();			// “Driving speed: 100”
```

## เพิ่มสมาชิกเข้าไปในคลาสทีหลัง

```js
class Car {
	constructor (speed){
		this.speed = speed;
	}
}
Car.prototype.drive = function() {	// เพิ่มเมธอดเข้าไปทีหลัง
	console.log(“Driving speed:”, this.speed);
};
let car = new Car(100);
car.drive();			         
// แสดงผลลัพธ์
// “Driving speed: 100”
for(let c in car) {
      console.log(c);	
}
// ประโยค for ...in จะแสดงผลลัพธ์ดังนี้
// “speed”
// “drive”
```

```js
class Car {
	constructor (speed){
		this.speed = speed;
	}
}
Object.defineProperty(Car.prototype, “drive”, {
        value: function() {
                     console.log(“Driving speed:”, this.speed);
        },
        enumerable: false,
        writable: true,
        configurable: true
    });
let car = new Car(100);
car.drive();			
// แสดงผลลัพธ์
// “Driving speed: 100”
for(let c in car) {
	console.log(c);	
}
// ประโยค for ...in จะแสดงผลลัพธ์ดังนี้
// “speed”
```

## นิพจน์คลาส

```js
let Car = class {	                             // คลาสไร้ชื่อ
	// สมาชิกคลาส
};
console.log(typeof Car);   	     // “function”
let carObj = new Car();
console.log(typeof carObj);  	     // “object”
console.log(carObj instanceof Car);   // true
```

```js
let Car2 = class Car1 {
	// สมาชิกคลาส
};
console.log(typeof Car2);            // “function”
let carObj = new Car2();
```

```js
let carObj = new Car();               // จะเกิด TypeError ได้
var Car = class{};	                       // บรรทัด 2 --  นิพจน์คลาสจะถูกมองเห็นตั้งแต่บรรทัดนี้เป็นต้นไป
/* จะเสมือนเขียนแบบนี้
var Car;
let carObj = new Car();
Car = class{ }; */
```

```js
function myFunction(classExpr) { 
    let c = new classExpr();	// บรรทัด a
    c.drive(100);
}
myFunction( class {		// บรรทัด b -- คลาสไร้ชื่อ
    drive(speed) {
        	console.log(“Driving speed:”, speed);
    }
});
// แสดงผลลัพธ์เป็น
// “Driving speed: 100”
```

```js
function myFunction(classExpr) { 
	return class {	
    		drive(speed) {
        			console.log(“Driving speed:”, speed);
    		}
	}
}
let Car = myFunction();
let carObj = new Car();
carObj.drive(100);		// “Driving speed: 100”
```

```js
let carObj = new class {
	constructor (speed) {
		this.speed = speed;
	}
	drive() {
		console.log(“Driving speed:”, this.speed);
	}
}(100);	
console.log(typeof carObj);	// “object”
carObj.drive(100);       		// “Driving speed: 100”
```

## พร็อพเพอร์ตี้แอคเซสเซอร์

```js
class Car {
	constructor () {
		this.speedValue = 100; 	
	}
	get speed() {
		return this.speedValue;
	}
   	set speed(speedValue) {
        		this.speedValue = speedValue;
    	}
}
let carObj = new Car(100);
console.log(carObj.speed);		// 100
carObj.speed = 60;
console.log(carObj.speed);		// 60
console.log(carObj.speedValue);	            // 60 (เข้าถึงได้ แต่ไม่ควรเข้าถึงด้วยวิธีนี้ โดยตรง)
```

```js
let desc = Object.getOwnPropertyDescriptor(Car.prototype, “speed”);
console.log(“get” in desc);          // true
console.log(“set” in desc);          // true
console.log(desc.enumerable);    // false
```

## สมาชิกที่เป็นสแตติก

### ฟิวด์สแตติก

```js
class Car {
    static speed = 100;
    color = “red”;
}
console.log(Car.speed);                    // 100
let carObj = new Car();
console.log(carObj.color);                 // “red”
console.log(typeof carObj.speed);	    // undefined
```

```js
class Car {
    static speed = 100;                        // speed เป็นของคลาส
    speed = Car.speed * 10;                 // บรรทัด a  -- Car.speed * 10 = 1000
    drive() {
        console.log(“Driving speed:”, Car.speed);   // บรรทัด b
    }
}
console.log(Car.speed);                      // 100
let carObj = new Car();
console.log(carObj.speed);                 // 1000
carObj.drive();                                   // Driving speed: 100
```

### เมธอดสแตติก

```js
class Car {
	constructor (speed) {	// ห้ามมีคำว่า static นำหน้าคอนสตัคเตอร์
		this.speed = speed;
	}
	drive() {			
		console.log(“Driving speed:”, this.speed);
	}
   	static stop() { 		             // เมธอดสแตติก
	        	console.log(“Stop this car”);
    	}
}
// เมธอดสแตติก 
Car.stop();				 // “Stop this car”
let carObj = new Car(100);
carObj.drive();			             // “Driving speed: 100”
console.log(typeof carObj.stop);	             // undefined
```

```js
class Car {
	static constructor () {	             // จะกลายเป็นเมธอดสแตติกชื่อ constructor
		console.log(“constructor function”);
	}
}
Car.constructor();			             // “constructor function”
```

```js
class Car {
	static set color(value) {	
		this.value = value; 	// จะเสมือนเขียนเป็น Car.value = value
	}
	static get color() {	
		return this.value;	// จะเสมือนเขียนเป็น  return Car.value;
	}
}
Car.color = “red”;			
console.log(Car.color);			// “red”
console.log(Car.value);		            // “red”
let carObj = new Car();
console.log(typeof carObj.color);	             // undefined
```

```js
class Car {
	constructor (speed) {	
		this.speed = speed;
	}
	drive() {			
		console.log(“Driving speed:”, this.speed);
	}
	static set color(value) {	             // เมธอด setter
		this.value = value; 
	}
}
let carObj = new Car(100);
console.log(carObj.value);		 // undefined
console.log(carObj.speed);		 // 100
carObj.drive();				 // “Driving speed: 100”
Car.color= “red”;			
console.log(Car.value);		             // “red”
console.log(Car.speed);		             // undefined
```

```js
class Car {
      static speed = 100;
      static reduce(val) {
           // หลีกเลี่ยงใช้ this 
           // return this.speed / val;
           return Car.speed / val;                                      // บรรทัด a
      }
      static drive() {           
            // หลีกเลี่ยงใช้ this 
   	console.log(“Driving speed:”, Car.reduce(10) );   // บรรทัด b
      }
}
Car.drive();		                         // “Driving speed: 10”
```

```js
class Car {
	static speed = 100;
	static drive(value) {	
		console.log(“Driving speed:”, value);
	}
}
let carObj = new Car();
for (let prop in carObj) {
    console.log(prop)    // จะไม่เข้ามาทำงานในประโยค for
}
```

```js
for (let prop in Car) {
    console.log(prop)
}
// แสดงผลลัพธ์
// “speed”
```

## การใช้วงเล็บเหลี่ยมในคลาส

```js
let name1=  “speed”;
let name2 = “drive”;
let name3 = “stop”;
let name4 = Symbol(“reduce”);
class Car {
         [“constructor”] (speedValue) {          // กลายเป็นเมธอดตัวหนึ่ง ไม่ใช่คอนสตรัคเตอร์
	    this.speedValue = speedValue;
	    console.log(“Not a constructor: speed =”, this.speedValue);
        }
        set [name1](speedValue) {	             // เมธอด setter
	    this.speedValue = speedValue;
        }
        get [name1]() {			 // เมธอด getter
	    return this. speedValue;
         }
         [name2]() { 			 // เมธอดที่ไม่ใช่สแตติก
	    console.log(“Driving speed:”, this.speedValue);
         }
         static [name3]() { 		             // เมธอดสแตติก
        	    console.log(“Stop this car”);
          }
          [name4]() {                                    // ชื่อเมธอดเป็นซิมโบล
                console.log(“Reduce speed”);
          }
          [2+2]() {                                        // ชื่อเมธอดเป็นนิพจน์ 2+2 = 4
                 console.log(“Start this car”);
          } 
}
let carObj = new Car(100);
console.log(carObj.speedValue);	             // undefined
carObj.constructor(100);		             // “Not a constructor: speed = 100”
console.log(carObj.speedValue);	             // 100
carObj.speed = 60;
console.log(carObj.speed);		 // 60
carObj.drive();			             // “Driving speed: 60”
Car.stop();				 // “Stop this car”
// หรือจะเรียกเมธอดผ่านวงเล็บเหลี่ยมก็ได้
carObj[name4]();                                      // “Reduce speed”
carObj[3+1]();                                          // “Start this car”
```

```js
let speed= “speed”;
let reduce = Symbol(“reduce”);
class Car {
    [speed] = 100;
    [“drive”] = “Driving this car”;
    [reduce] = 1;
    [2+2] = 20.5;
}
let carObj = new Car();
console.log( carObj[speed] );                     // 100
console.log( carObj[“drive”] );                   // “Driving this car”
console.log( carObj[reduce] );                    // 1
console.log( carObj[3+1] );                        // 20.5
```

## การสืบทอดคลาส

```js
class Calculation {
           constructor (a, b) {
		this.a = a;
		this.b = b;
	}
	multiply() {
		return this.a * this.b;
            }   	
}
class Division extends Calculation {	 // บรรทัด a -- Division สืบทอดมาจาก Calculation
         constructor (a, b) {
                super(a, b);		             // บรรทัด b -- เรียกใช้คอนสตรัคเตอร์ของ Calculation
	     // สามารถกำหนดค่าให้กับ this.a และ this.b ที่อยู่ในคลาสแม่ได้โดยตรง 
 	     // แต่การทำเช่นนี้จะไม่ปลอดภัย 
	     // this.a = a; 	   // ไม่ควรทำ	
	     // this.b = b;	   // ไม่ควรทำ
         }	
         divide() {
               return this.a / this.b;
         }
}
let div = new Division(20,10);
console.log(div.multiply());		 // 200
console.log(div.divide());		             // 2
console.log(div.a, div.b);		             // 20 10 (ไม่ควรเข้าถึงข้อมูลอินสแตนซ์โดยตรง ด้วยวิธีนี้)
console.log(div instanceof Division);   	 // true
console.log(div instanceof Calculation);   	 // true
console.log(div instanceof Object);   	 // true
```

```js
// เบื้องหลังจะมีการทำ prototype chain
console.log(Object.getPrototypeOf(div) === Division.prototype);                     // true
console.log(Object.getPrototypeOf(Division.prototype) === Calculation.prototype);   // true
```

```js
function Calculation(a, b) {
	this.a = a;
	this.b = b;
}
Calculation.prototype.multiply = function() {
	return this.a * this.b;
}
function Division (a, b) {
	Calculation.call(this, a, b);	 // เรียกใช้ฟังก์ชั่นคอนสตรัคเตอร์ Calculation
}
Division.prototype = Object.create(Calculation.prototype, { // prototype chain
    constructor: {
        value: Division,
        enumerable: false,
        writable: true,
        configurable: true
    }
});
Division.prototype.divide = function(){
     return this.a / this.b;
}
let div = new Division(20,10);
console.log(div.multiply());		 // 200
console.log(div.divide());			 // 2
console.log(div.a, div.b);		 	 // 20 10	
console.log(div instanceof Division);   	 // true
console.log(div instanceof Calculation);   	 // true
```

### คอนสตรัคเตอร์ดีฟอลต์ของคลาสลูก


```js
class Calculation {
	constructor (a, b) {
		this.a = a;
		this.b = b;
		console.log(“Calculation:”, a , b);		
	}
}
class Division extends Calculation {
	// ไม่มีคอนสตรัคเตอร์
	// แต่จาวาสคริปต์ จะสร้างคอนสตรัคเตอร์ที่เป็นดีฟอลต์มาให้
}
let div = new Division(100 , 200);	// “Calculation: 100 200”
// จะเสมือนมีคอนสตรัคเตอร์ที่เป็นค่าดีฟอลต์มาให้ดังนี้
/* class Division extends Calculation {
 	constructor (...args) {
		super(...args);
	}
} */
```

```js
class Calculation {
}
class Division extends Calculation {
}
```

## การสืบทอดคลาสหลายระดับชั้น

```js
class Calculation {
}
class Division extends Calculation {
    constructor() {
 	// ปราศจาก super(); จะเกิด error
    }
}
```

```js
class Animal {
	constructor(name) { 	
		this.name = name; 				
		 console.log(“Animal constructor”);             // บรรทัด a
	}
	showName() {
		console.log(“Animal is”, this.name);
	}
	static sleep() {
		console.log(“This animal is sleeping”);
	}
}
class Quadruped extends Animal {
	constructor(name) {      	 
		super(name);		
		console.log(“Quadruped constructor”);       // บรรทัด b
	}
	showColor() {
		console.log(this.name, “is red”);
	}
}
class Dog extends Quadruped {
	constructor(name) {
                      super(name);
	           console.log(“Dog constructor”);		// บรรทัด c
	}
	run() {
		console.log(this.name, “is running”);
	}
}
let dogObj = new Dog(“Pit bull”);
// คอนสตรัคเตอร์จะทำงานก่อนรันเมธอด ด้วยการแสดงผลลัพธ์
//”Animal constructor”
//”Quadruped constructor”
//”Dog constructor”
console.log(dogObj instanceof Dog);      	         // true
console.log(dogObj instanceof Quadruped);       // true
console.log(dogObj instanceof Animal);   	         // true
console.log(dogObj instanceof Object);  	         // true
dogObj.showName();			         // “Animal is Pit bull”
dogObj.showColor();			         // “Pit bull is red”
dogObj.run();				         // “Pit bull is running”
Dog.sleep();				         // “This animal is sleeping”
console.log(typeof dogObj.sleep); 	         // undefined
```

## โอเวอร์ไรด์เมธอดของคลาสแม่

```js
class Calculation {
	constructor (a, b) {
		this.a = a;
		this.b = b;
	}
	multiply() {
		return this.a * this.b;
	}   	
}
class Multiplying extends Calculation {
	constructor (a, b) {
		super(a, b);
	}
	multiply() { 	            // โอเวอร์ไรด์เมธอด multiply() ของคลาสแม่
		return “The result is “ + super.multiply();
	}   	
}
let m = new  Multiplying(20,10);
console.log(m.multiply());		// “The result is 200”
```

```js
class Calculation {
	constructor (a, b) {
		this.a = a;
		this.b = b;
	}
	multiply() {
		return this.a * this.b;
 	}   	
}
let name = “multiply”;
class Multiplying extends Calculation {
	constructor (a, b) {
		super(a, b);
	}
	[name]() {
		return “The result is “ + super.multiply();
		// หรือจะเขียนเป็น  return “The result is “ + super[name]();
	}   	
}
let m = new Multiplying(20,10);
console.log(m[name]());		// “The result is 200”
console.log(m.multiply());		// “The result is 200”
```

```js
class Animal {
	constructor (name) {
		this.name = name;                     // บรรทัด a
	}
	set animalName(name) {
		this.name = name;
	}
	get animalName() {
		return this.name;
	}
}
class Dog extends Animal {
	constructor (name) {
		super(name);                            // บรรทัด b
	}
	showName() {
		console.log(this.name);	           // “A dog” 
		console.log(super.name);	           // undefined
		// เข้าถึงพร็อพเพอร์ตี้แอคเซสเซอร์ของคลาสแม่ ผ่านทาง super
		super.animalName=”Pit bull dog”;
		console.log(super.animalName);	// “Pitbull dog”
	}
}
let dogObj = new  Dog(“A dog”);
dogObj.showName();
/* แสดงผลลัพธ์เป็น
“A dog”
undefined
“Pit bull dog” */
```

## สืบทอดคลาสแบบนิพจน์

```js
function getClass() {
	let c = class Calculation {
	        constructor (a, b) {
		    this.a = a;
		    this.b = b;
	         }
                     multiply() {
		    return this.a * this.b;
         	         } // สิ้นสุดการประกาศเมธอด multiply
	} // สิ้นสุดการประกาศคลาส Calculation
	return c;	// รีเทิร์นคลาสออกไป
}
class Multiplying extends getClass() {	 // สืบทอดคลาสแบบนิพจน์
          constructor (a, b) {
		super(a, b);
	}
}
let m = new Multiplying(20,10);
console.log(m.multiply());			 // 200
```

```js
function Calculation (a,b) {
	this.a = a;
	this.b = b;
}
Calculation.prototype.multiply = function() {
	return this.a * this.b;
};
class Multiplying extends Calculation {
          constructor (a, b) {
		super(a, b);
	}
}
let m = new Multiplying(20,10);
console.log(m.multiply());			 // 200
```

## การสืบทอดคลาสมากกว่า 1 ตัว

```js
let MultiplyingObj = {
	multiply() {
		return this.a * this.b;
	}
};
let DivisionObj = {
	divide() {
		return this.a / this.b;
	}
};
function getClass (...args) {
    let merged = function() {};		 // ฟังก์ชั่นคอนสตรัคเตอร์
    // เมธอดของ MultiplyingObj กับ DivisionObj จะมารวมอยู่ที่ merged.prototype
    Object.assign(merged.prototype, ...args);	 // บรรทัด a
    return merged;		             // รีเทิร์น  merged ซึ่งทำหน้าที่เป็นฟังก์ชั่นคอนสตรัคเตอร์
}
class MyCalc extends getClass(MultiplyingObj, DivisionObj) {	
 	// สืบทอดมาจาก  MultiplyingObj กับ DivisionObj
	constructor (a, b) {
		super();		
	       	// ไม่สามารถเรียก super(a,b);
		this.a = a;
		this.b = b;
	}	
}
let calc = new MyCalc(20,10);
console.log(calc.multiply());	             // 200
console.log(calc.divide());	                         // 2
```

## สืบทอดคลาสจากที่มีอยู่แล้วในจาวาสคริปต์

```js
class ArrayExt extends Array {
    get(index) {
	return this[index];
    }
}
let array = new ArrayExt();
array[0] = 1;
array[1] = 2;
console.log(array.get(0));                           // 1
console.log(array.get(1));                           // 2
```

```js
class ArrayExt extends Array {
	constructor(length){
		super(length);
	}
}
let a1 = ArrayExt.of(“one”, “two”, “three”);
console.log(a1 instanceof ArrayExt );	 // true
console.log(a1 instanceof Array );	             // true
console.log(a1.length);			 // 3
let a2 = ArrayExt.from([“one”, “two”, “three”]);
console.log(a2 instanceof ArrayExt );	 // true
console.log(a2 instanceof Array );	             // true
console.log(a2.length);			 // 3
```

## คอมโพสิชั่น

```js
class Calculation {
	constructor (a, b) {
		this.a = a;
		this.b = b;
	}
	execute() {
		return this.a * this.b;
	}   	
}
class Multiplying {
	constructor (calcObj) {
	     if(calcObj instanceof Calculation) {
	         this.calcObj = calcObj; //บรรทัด a -- อ้างถึงอ็อบเจ็กต์ที่เป็นอินสแตนซ์ของ Calculation
	     }
	}
	multiply() { 	
	     return “This value is “ + this.calcObj.execute(); // บรรทัด b
	}   	
}
let c1 = new Calculation(10,10);
let m1 = new Multiplying(c1);
console.log(m1.multiply());		 // “This value is 100”
let c2 = new Calculation(20,20);
let m2 = new Multiplying(c2);
console.log(m2.multiply());		 // “This value is 400”
```

## new.target

```js
class Calculation {
     constructor () {
	console.log(new.target === Calculation);   // true
           // new.target คือคลาส Calculation
          	console.log(new.target);	                        // “class Calculation”	
	console.log(Calculation);	                        // “class Calculation”
    }
}
new Calculation();
// แสดงผลลัพธ์
// true
// “class Calculation” (แต่ละจาวาสคริปต์รันไทม์แสดงผลไม่เหมือนกัน)
// “class Calculation” (แต่ละจาวาสคริปต์รันไทม์แสดงผลไม่เหมือนกัน)
```

```js
class Calculation {
     constructor () {
    	// ถ้าคลาสลูกเรียกคอนสตรัคเตอร์ของแม่  ค่าของ new.target จะมีค่าเท่ากับ undefined
    	console.log(“new.target in Calculaton:”, new.target === Calculation); 
    }
}
class Multiplying extends Calculation {
     constructor () {
          super();
	console.log(“new.target in Multiplying:”, new.target === Multiplying);           
     }
}
new Multiplying();		
// แสดงผลลัพธ์
// “new.target in Calculaton: false”
// “new.target in Multiplying: true”
```

## สมาชิกแบบ private

```js
class Car {
    speed = 100;
}
let  carObj = new Car();
carObj.speed = 200    // บรรทัด a     -- ไม่ควรเข้าถึง speed โดยตรง
carObj.speed = -10    // บรรทัด b     -- ไม่ควรเข้าถึง speed โดยตรง
```

### ฟิวด์ที่เป็น private

```js
class Car {
    #speed = 100;                 // เมื่ออินสแตนซ์ถูกสร้างขึึ้นมา ฟิวด์ #speed จะมีค่าเป็น 100
    /*static {
        console.log(#speed in new Car());  // true
    }*/
}
let carObj = new Car();
console.log(carObj.speed);     // undefined
console.log(carObj.#speed);   // เกิด error
```

```js
class Car {
    #speed;                        // ไม่จำเป็นต้องกำหนดค่าเริ่มต้นก็ได้
    constuctor() {
        this.#speed = 100;     // กำหนดค่าให้ทีหลัง
    }
}
let carObj = new Car();      // เมื่ออินสแตนซ์ถูกสร้างขึึ้นมา ฟิวด์ #myField จะมีค่าเป็น 100
```

```js
class Car {
    constuctor() {
        this.speed = 100;              // บรรทัด a  -- ทำงานได้ปกติ
        this.#value = 1;                // บรรทัด b  -- เกิด error  
    }
}
```

### เมธอดที่เป็น private

```js
class Car {
    #drive() {                                        // บรรทัด a
        console.log(“Driving this car”);
    }
    /*static {
        console.log( #drive in new Car());  // true
    }*/
}
let carObj = new Car(); 
carObj.#drive();                                  // เกิด error
```

### ฟิวด์สแตติกที่เป็น private	

```js
class Car {
    static #speed = 100;
    /*static {
        console.log( #speed in Car );             // true
    }*/
}
console.log(Car.speed);                            // undefined
console.log(Car.#speed );                         // error
```

### เมธอดสแตติกที่เป็น private

```js
class Car {    
    static #drive() {
        console.log(“Driving this car”);
    }
    /*static {
        console.log( #drive in Car );     // true
    }*/
}
Car.#drive();                                 // เกิด error
```

```js
class Car {
    #speedValue;                             // ไม่จำเป็นต้องประกาศค่าเริ่มต้นก็ได้
    get #speed() {
        return this.#speedValue;
    }
    set #speed(value) {
        this.#speedValue = value;
    }
}
```

```js
class MyClass {
  #syncMethod() { }
  get #accessor() { }
  set #accessor(value) { }    
  * #syncGenerator() { }
  async #asyncMethod() { }
  async * #asyncGenerator() { }
}
```

```js
class MyClass {  
  static #syncMethod() { }
  static get #accessor() { }
  static set #accessor(value) { }
  static * #syncGenerator() { }
  static async #asyncMethod() { }
  static async * #asyncGenerator() { }  
}
```

### ตัวอย่างการเข้าถึงสมาชิกที่เป็น private

* ตัวอย่าง การเข้าถึงฟิวด์ที่เป็น private ภายในอินสแตนซ์
	
```js
class Car {
    #speed = 100;                                                 
    drive() {			
	console.log(“Driving speed:”, this.#speed);   // บรรทัด a
    }
}
let objCar = new Car();
objCar.drive();                                                      // “Driving speed: 100”
```

* ตัวอย่าง การเข้าถึงเมธอดที่เป็น private ภายในอินสแตนซ์

```js
class Car {
    #getSpeed() {                                                         
           return 100;                                                   
    }
    drive() {			
	console.log(“Driving speed:”, this.#getSpeed());   // บรรทัด a
    }   
}
let objCar = new Car();
objCar.drive();                                                             // “Driving speed: 100”
```

* ตัวอย่าง การเข้าถึงฟิวด์ที่เป็น private จากคอนสตรัคเตอร์ และ getter กับ setter ภายในอินสแตนซ์

```js
class Car {
    #speed ;                                             // บรรทัด a
    constructor(speed) {
        this.#speed = speed;                        // บรรทัด b
    } 
    get speed() {			
        return  this.#speed;                        // บรรทัด c
    }
    set speed(speed) {
         this.#speed = speed;                      // บรรทัด d
     }
}
let objCar = new Car(100);
objCar.speed = 5;                                          
console.log(objCar.speed);                        // 5
```

* ตัวอย่าง การเข้าถึงฟิวด์สแตติกที่เป็น private จากภายในบอดี้ของคลาส

```js
class Car {
    static #speed = 100;         
    drive() {			
	  console.log(“Driving speed:”, Car.#speed);   // บรรทัด a
    }
}
let objCar = new Car();
objCar.drive();                                                      // Driving speed: 100
```

* ตัวอย่าง การเข้าถึงเมธอดแตติกที่เป็น private จากภายในบอดี้ของคลาส
	
```js
class Car {
    static #getSpeed() {                                                         
           return 100;                                                   
    }
    drive() {			
	console.log(“Driving speed:”, Car.#getSpeed());   // บรรทัด a
    }   
}
let objCar = new Car();
objCar.drive();                                                            // “Driving speed: 100”
```

*สรุป สมาชิกใดๆ ที่จะเข้าถึงสมาชิกที่เป็น private ก็ขอให้ประกาศอยู่ภายใต้บอดี้ของคลาสเดียวกันก็สามารถเข้าถึงได้หมดเลย ดังตัวอย่าง

```js
class Car {
    #speed = 10;
    speedValue = this.#speed * 10;             // บรรทัด a
}
let objCar = new Car();
console.log(objCar.speedValue);                // 100
```

```js
class MyClass {
    #myField;    
    constructor(value) {
         this.#myField = value;
    }
    showValue(inst) {
          console.log(“Show value:”, inst.#myField );
    }
}
let inst1 = new MyClass(1);
let inst2 = new MyClass(100);
inst1.showValue(inst2);       // “Show value: 100”
```

### การสืบทอดสมาชิกที่เป็น private

```js
class SuperClass {
    #superField = 1;
}
class MyClass extends SuperClass {
    showMsg() {
        console.log(“Result:”, this.#superField);     // บรรทัด a -- เกิด error
    }
}
```

```js
class SuperClass {
     #superField = 1;  
     get superField() {
          return this.#superField;
     }
}
class MyClass extends SuperClass {
     showMsg() {
        console.log(“Result:”, super.superField);           // บรรทัด a
     }
}
let inst = new MyClass();
inst.showMsg();                                                       // “Result: 1”
```

### ข้อควรรู้ชื่อ private ในอินสแตนซ์

```js
class Car {
    #speed = 100;
    color = “red”;
    showSpeed() {
        console.log( this.#speed );
    }
    showColor() {
        console.log( this.color );
    }
}
/*let carObj = new Car()
carObj.showSpeed();   // 100
carObj.showColor();   // “red”*/
```

```js
let Car;
{ // ขอบเขตของคลาส
  const speed = Symbol();
  Car = class {  
    __PrivateElements__ = new Map([
      [speed, 100],
    ]);
    color = “red”
    showSpeed() {
        console.log( this.__PrivateElements__.get(speed) );
    }
    showColor() {
        console.log( this.color );
    }
  }
}
```

### ชื่อฟิวด์ที่เป็น private เมื่อยู่คนละคลาส จะไม่ชนกัน

```js
class ClassA {
    #myField = 1;   
}
class ClassB { 
   #myField = 100;
}
```

```js
class SuperClass {
      #myField = 1;          // บรรทัด a
      get myField() {
          return this.#myField;
      }
}
class MyClass extends SuperClass {
      #myField = 2;         // บรรทัด b
      showMsg() {
           console.log(“Result:”, super.myField + this.#myField);  // บรรทัด c
      }
}
let inst = new MyClass();
inst.showMsg();                                                                   // “Result: 3”
```

### ชื่อที่เป็น private กับ public จะไม่ชนกัน

```js
class MyClass {
    myField;
    #myField;
    myMethod(){ }
    #myMethod(){ }
}
```

### ลำดับการสร้างฟิวด์ เมื่อมีการสืบทอด

```js
class MyClass {
    constructor() {
         console.log(“MyClass constructor”);          // บรรทัด a
    }
    pubField = console.log(“pubField”);              // บรรทัด b
    #privateField = console.log(“privateField”);    // บรรทัด c
}
new MyClass();
// แสดงผลลัพธ์
// “pubField”
// “privateField”
// “MyClass constructor”
```

```js
class SuperClass {
    superField = console.log(“superField”);          // บรรทัด a
    constructor() {
      console.log(“SuperClass constructor”);         // บรรทัด b
    }
  }
class MyClass extends SuperClass {
    myField = console.log(“myField”);                 // บรรทัด c
    constructor() {
      super();
      console.log(“MyClass constructor”);             // บรรทัด d
    }
 }
new MyClass();
// แสดงผลลัพธ์
// “superField”
// “SuperClass constructor”
// “myField”
// “MyClass constructor”
```

```js
class SuperClass {
    #superField = console.log(“#superField”);      // บรรทัด a
    constructor() {
      console.log(“SuperClass constructor”);         // บรรทัด b
    }
  }
class MyClass extends SuperClass {
    #myField = console.log(“#myField”);             // บรรทัด c
    constructor() {
      super();
      console.log(“MyClass constructor”);             // บรรทัด d
    }
 }
new MyClass();
// แสดงผลลัพธ์
// “#superField”
// “SuperClass constructor”
// “#myField”
// “MyClass constructor”
```

## บล็อกสแตติก

```js
class Car {      
    static {			             // บรรทัด a
	  console.log(“Driving this car”);     // บรรทัด b
    }                                                     
}
// แสดงผลลัพธ์
// “Driving this car”
```

* ตัวอย่าง การใช้สแตติกบล็อกเข้าถึงฟิวด์ของอินสแตนซ์ที่เป็น private 
	
```js
class Car {
    #speed;
    static {
        let objCar = new Car();
        objCar.#speed = 100;        
    }
}
```

* ตัวอย่าง การใช้สแตติกบล็อกเข้าถึงฟิวด์ของอินสแตนซ์ที่เป็น public
	
```js
class Car {
    speed=1;
    static {
        let objCar = new Car();
        objCar.speed = 100;       
    }
}
```

* ตัวอย่าง การใช้สแตติกบล็อกเข้าถึงฟิวด์สแตติกของคลาสที่เป็น private	
	
```js
class Car {
    static #speed;
    static {
        Car.#speed = 100;        
    }
}
```

* ตัวอย่าง การใช้สแตติกบล็อกเข้าถึงฟิวด์สแตติกของคลาสที่เป็น public
	
```js
class Car {
    static speed;
    static {
        Car.speed = 100;        
    }
}
```

```js
class Car {
    static speed = 100;
    static  drive() {
        console.log(“Driving this car”);
    }
    static {
        console.log(this.speed);      // บรรทัด a
        this.drive();                       // บรรทัด b
    }
}
// แสดงผลลัพธ์ 
// 100
// “Driving this car”
```

```js
class Car {
    static #speed = 100;
    static  #drive() {
        console.log(“Driving this car”);
    }
    static {
        console.log(this.#speed);                  // บรรทัด a
        this.#drive() ;                                  // บรรทัด b
    }
}
// แสดงผลลัพธ์ 
// 100
// “Driving this car”
```

```js
class Car {
    static speed = 100;
    static {
        console.log(this.speed);                    // บรรทัด a
        console.log(this === Car);                 // บรรทัด b -- true
    }
}
// แสดงผลลัพธ์ 
// 100
// true
```

```js
class Car {
    static {
        console.log(Car.speed);                     // บรรทัด a -- มองไม่เห็น จะได้เป็น undefined
    }
    static speed = 100;                              // บรรทัด b
}
// แสดงผลลัพธ์ 
// undefined
```

```js
class Car {
    static {
        console.log(“static”);                        // บรรทัด a 
    }
    static speed = console.log(“speed”);     // บรรทัด b
    static color = console.log(“color”);        // บรรทัด c
}
// แสดงผลลัพธ์ 
// “static”
// “speed”
// “color”
```

```js
class MyClass {
    static {
        console.log(“Line a”);                      // บรรทัด a
     }
    static {
        console.log(“Line b”);                     // บรรทัด b     
    }
}
// แสดงผลลัพธ์ 
// “Line a”
// “Line b”
```

```js
class MyClass {
    static myFiled1 = console.log(“myFiled1”);       // บรรทัด a
    static {
        console.log(“Static line b”);                        // บรรทัด b
    }
    static myFiled2 = console.log(“myFiled2”);       // บรรทัด c 
    static {
        console.log(“Static line d”);                        // บรรทัด d     
    }
}
// แสดงผลลัพธ์ 
// “myFiled1”
// “Static line a”
// “myFiled2”
// “Static line d”
```

```js
class SuberClass {
    static superFiled = console.log(“superFiled”);    // บรรทัด a
    static {
        console.log(“Static line b”);                         // บรรทัด b
     }
}
class MyClass extends SuberClass{    
    static myFiled = console.log(“myFiled”);          // บรรทัด c   
    static {
        console.log(“Static line d”);                        // บรรทัด d     
    }
}
// แสดงผลลัพธ์
// “superFiled”
// “Static line b”
// “myFiled”
// “Static line d”
```

```js
class SuperClass {
  static #myFiled = 1;
  static showMsg() {
    console.log( this.#myFiled);                  // บรรทัด a
  }
}
class MyClass extends SuperClass {
    // สืบทอด showMsg() มาด้วย
}
SuperClass.showMsg();                              // error
```

```js
class SuperClass {
  static #myFiled = 1;
  static showMsg() {
    console.log( SuperClass.#myFiled);  // บรรทัด a
  }
}
class MyClass extends SuperClass {
    // สืบทอด showMsg() มาด้วย
}
SuperClass.showMsg();                           // 1
```

## เบื้องหลังสมาชิกของอินสแตนซ์

```js
class MyClass {    
    #privateField = 1    
    #privateMethod() {  }
    get #privateFieldValue() {  }
    set #privateFieldValue(field) {  }  
    pubField = 2;
    publicMethod() {  }
    get pubFieldValue() {  }
    set pubFieldValue(field) {  }  
}
let inst = new MyClass();
console.log(Object.keys(inst))                     // [ ‘pubField’ ]
```

```js
class MyClass {    
    static #privateField = 2    
    static #privateMethod() {  }
    static get #privateFieldValue() {  }
    static set #privateFieldValue(field) {  }  
    static pubField = 1;                      // มองเห็นเป็นชื่อคีย์ pubField
    static publicMethod() {  }
    static get pubFieldValue() {  }
    static set pubFieldValue(field) {  }  
}
console.log(Object.keys(MyClass))           // [ ‘pubField’ ]
```

### การแชร์เมธอดระหว่างอินสแตนซ์

```js
class Car {
     #drive() { }
     stop() { }
     static {
        let car1 = new Car();
        let car2= new Car();
        console.log( car1.#drive === car2.#drive );    // true  -- บรรทัด a
        console.log( car1.stop === car2.stop );         // true  -- บรรทัด b
     }
}
// แสดงผลลัพธ์
// true
// true
```

```js
class Car {
     get #speed() { return 100; }
     set #speed(value) {  }
     get color() { return “red”; }
     set color(value) {  }
     static {
        let car1 = new Car();
        let car2= new Car();
        console.log( car1.#speed === car2.#speed );    // true  -- บรรทัด a
        console.log( car1.color === car2.color );          // true  -- บรรทัด b
     }
}
// แสดงผลลัพธ์
// true
// true
```

```js
class Car {
  #drive() { }
  static {
       let carObj = new Car();
       console.log( #drive in carObj );                  // true -- บรรทัด a
       console.log( #drive in Car.prototype );        // false -- บรรทัด b
       console.log( #drive in Car );                      // false
  }
}
// แสดงผลลัพธ์
// true
// false
// false
```

```js
class Car {
     get #speed() {  return 100;  }
     set #speed(value) {  }
     static {
          let carObj = new Car();
          console.log( #speed in carObj );              // true -- บรรทัด a
          console.log( #speed in Car.prototype );    // false -- บรรทัด b
          console.log( #speed in Car );                   // false
     }
}
// แสดงผลลัพธ์
// true
// false
// false
```

```js
class Car {
    drive() { }
    get speed() { return 100; }
    set speed(value) {}
}
let objCar = new Car();
console.log(objCar.drive == Car.prototype.drive);       // true   -- บรรทัด a
console.log(objCar.speed == Car.prototype.speed);    // true   -- บรรทัด b
```

## ตรวจสอบสมาชิกที่เป็น private

```js
class Car {
    #speed = 100;    
    static check(target) {
        console.log(  #speed in target );        // บรรทัด a
    }
}
let objCar = new Car();
Car.check(objCar);                                    // true
Car.check(Car);                                        // false
```

```js
class Car {
    #drive() {
        console.log(“Driving this car”);
    }
    static check(target) {
        console.log(  #drive in target );          // บรรทัด a
    }
}
let objCar = new Car();
Car.check(objCar);                                    // true
Car.check(Car);                                        // false
```

```js
class Car {
    static #speed = 100;    
    static check(target) {
          console.log( #speed in target );        // บรรทัด a
    }
}
let objCar = new Car();
Car.check(objCar);                                   // false
Car.check(Car);                                        // true
```

```js
class Car {
    static #drive() {
        console.log(“Driving this car”);
    }
    static check(target) {
        console.log( #drive in target );         // บรรทัด a
    }
}
let objCar = new Car();
Car.check(objCar);                                    // false
Car.check(Car);                                        // true
```

## แอ็บสแตรคท์คลาส

```js
class Calculation {
	constructor() {
		if(new.target === Calculation) {
            		throw new Error(“Abstract class cannot be instantiated.”)
        		}
	}
	execute() {  
	       // ไม่มีซอร์สโค้ด ต้องให้คลาสอื่นมา extends เพื่อไปใช้งานต่อ
	} 
}
new Calculation();    // จะโยน error ออกมา
```

```js
class Multiplying extends Calculation {
	constructor (a, b) {
		super();
		this.a = a;
		this.b = b	
	}
	execute() {
		return this.a * this.b;
	}
}
let m = new Multiplying(2, 2);
console.log(m.execute());			 // 4
```

```js
class Calculation {
	constructor (a,b) {
		if (new.target === Calculation) {
            		throw new Error(“Abstract class cannot be instantiated.”)
	        	}
		this.a = a;
		this.b = b
	}
	execute() { }	// เมธอดเปล่าๆ ยังไม่มีการทำงานอะไร
}
class Multiplying extends Calculation {
	constructor (a, b) {
		super(a, b);			
	}
	execute() {
		return this.a * this.b ;
	}
}
class Division extends Calculation {
	constructor (a, b) {
		super(a, b);
	}
	execute() {
		return this.a / this.b ;
	}
}
class Subtraction extends Calculation {
	constructor (a, b) {
		super(a, b);
	}
	execute() {
		return this.a - this.b ;
	}
}
function calc(calcObj) {
	if(calcObj instanceof Calculation) {
                 // ผลการทำงานจะขึ้นอยู่กับอ็อบเจ็กต์ที่ส่งเข้ามา ว่ามันเป็นอะไร
	     console.log(calcObj.execute()); 
	}
}
calc(new Multiplying(20,10) );		 // 200
calc(new Division(20,10) );		 // 2
calc(new Subtraction(20,10) );		 // 10
```