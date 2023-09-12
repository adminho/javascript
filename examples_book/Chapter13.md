# โค้ดบทที่ 13 ฟีเจอร์ใหม่ของอ็อบเจ็กต์

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
	myFunction(param) {		 //  ประกาศเมธอดแบบย่อ
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

## ประกาศชื่อคีย์แบบวงเล็บเหลี่ยม

```js
let name = "name"
let student = { 
	["First " + name] : "Somchai",      // ประกาศชื่อคีย์แบบวงเล็บเหลี่ยม
	[ `Last ${name}`] : "Jaidee"	 // ประกาศชื่อคีย์แบบวงเล็บเหลี่ยม (ใช้เทมเพลตสตริง)
};
console.log(student["First name"]); 	 // "Somchai"
let lastName = `Last ${name}`;
console.log(student[lastName]);	             // "Jaidee"
```

```js
let  key1 = {a:1};
let  key2 = {b:2};
let obj = {
	[key1] : 100,
	[key2]: 200		             // ใช้คีย์ตัวนี้
}
console.log(obj[key1], obj[key2]);		 // 200 200
console.log(obj[key1] === obj[key2]);	 // true
```


```js
let name = "myFunction";
let obj = { 
	[name]: function(param) {	             // ประกาศเมธอดโดยใช้วงเล็บเหลี่ยม
		console.log(param);
	}
};
obj[name](200);			             // 200
obj.myFunction(200);			 // 200
```

```js
let name = "myFunction";
let obj = { 
	[name](param)	{		 // ประกาศเมธอดแบบย่อ
		console.log(param);
	}
};
obj[name](200);			             // 200
obj.myFunction(200);			 // 200
```

## เมธอด Object.assign()

```js
let obj = { x: 1, y: 2 };
let cloned1 = Object.assign({}, obj);
let cloned2 = Object.assign({}, obj);
//สร้างอ็อบเจ็กต์ใหม่ได้เรื่อย ๆ ที่เหมือนกับอ็อบเจ็กต์ต้นแบบ obj ทุกประการ  
console.log(cloned1); 			// { x: 1, y: 2 }
console.log(cloned2); 			// { x: 1, y: 2 }
console.log(cloned1 === cloned2);	// false
```

```js
let obj1 = { x: 1 };
let obj2 = { y: 2 };
let obj3 = { z: 3 };		
let merged = Object.assign(obj1, obj2, obj3);
console.log(merged);		// { x: 1, y: 2, z: 3 }
console.log(obj1);		    // { x: 1, y: 2, z: 3 }	
console.log(merged === obj1); 	// true
console.log(merged === obj2); 	// false
console.log(merged === obj3); 	// false
```

```js
let person1 = {};
let person2 = {
        firstName: "Somchai",
        lastName: "Jaidee"
};
let person3 = {
        lastName: "Dekdee"		
};
let person4 = {
        lastName: "Rakdee"	// ถ้าชื่อคีย์มันซ้ำกัน จะเลือกก็อปปี้จากอ็อบเจ็กต์ตัวล่าสุดเท่านั้น
};
Object.assign(person1, person2, person3, person4);
console.log(person1.firstName);	             // "Somchai"
console.log(person1.lastName);  	             // "Rakdee"
```

```js
let sym = Symbol("example");
let name = "to do";
let obj = { 
	myFunction(param) { 
		console.log(param);
	},
	[ `${name}`]( ) { 		
		console.log("to do something");
	},
	x : null,
	y : undefined,
	[sym] : 100
};
let cloned = Object.assign({}, obj);
cloned.myFunction(200);		             // 200
cloned[`${name}`]();			 // "to do something"
console.log(cloned.x);			 // null
console.log(cloned.y);			 // undefined
console.log(cloned[sym]);		             // 100
```

```js
let person = {
        set firstName(param) {
	this.fname = param;
        },
        get firstName() {
            return this.fname;
        } 	
};
person.firstName = "Somchai";
let target = Object.assign({}, person);
let descriptor = Object.getOwnPropertyDescriptor(target, "firstName");
console.log(descriptor.value);     	             // "Somchai"
console.log(typeof descriptor.set); 	 // undefined
console.log(typeof descriptor.get); 	 // undefined
console.log(target.firstName);		 // "Somchai"
```

```js
let font = {} ;
Object.defineProperties (font, {
          color: {
	          value : "red",
        	          writable: false		 // ไม่สามารถก็อปปี้ได้
          },
          size:  {
	          value : 200,
        	          enumerable: false	             // ไม่สามารถก็อปปี้ได้
     	}
});
let obj = Object.assign({}, font);
console.log(typeof obj.color);		 // undefined
console.log(typeof obj.size);		 // undefined
```

```js
let car = {
      drive() { 
           console.log("Drive a car") ;
      }
};
let taxi = Object.create(car); 		 // กำหนดให้ taxi มีโปรโตไทป์เป็น car
taxi.drive();				 // "Drive a car"
let driver = Object.assign({}, taxi);	             // driver โคลนนิ่งมาจาก taxi
console.log(typeof driver.drive);           // undefined
```

## การเปลี่ยนโปรโตไทป์ 
```js
let car = {
	drive() { 
 		console.log("Drive a car") ;
	}
};
let taxi = {
	drive() { 
	       console.log("Drive a taxi") ;
	}
};
let driver = Object.create(car); 		                  // บรรทัด a -- โปรโตไทป์คือ car
console.log( Object.getPrototypeOf(driver) === car);     // true
driver.drive();					      // "Drive a car"
Object.setPrototypeOf(driver, taxi);	                  // บรรทัด b -- เปลี่ยนโปรโตไทป์เป็น taxi
console.log( Object.getPrototypeOf(driver) === taxi);    // true
driver.drive();					     // "Drive a taxi"
```

## '__proto__'

```js
let car = {
	drive() { 
	       console.log("Drive a car") ;
	}
};
let taxi = {
	drive() { 
	 	console.log("Drive a taxi") ;
	}
};
let driver ={
	__proto__ : car			        // โปรโตไทป์คือ car
}		
console.log(driver.__proto__ === car);	       // true 
driver.drive();				        // "Drive a car"
driver.__proto__ = taxi;		       // เปลี่ยนโปรโตไทป์เป็น taxi
console.log(driver.__proto__ === taxi);	       // true
driver.drive();				       // "Drive a taxi"
```

```js
let car = {
	drive() { 
	      console.log("Drive a car") ;
	}
};
let driver ={
	__proto__ : car,				
	__proto__ : car	                         // SyntaxError
}
```

```js
let car = {
	drive() { 
	      console.log("Drive a car") ;
	}
};
let driver = {
	["__proto__"]: car				
}	
console.log(typeof driver.drive);		 // undefined
console.log(driver["__proto__"] === car);	 // true
```

## การใช้ supper

```js
let car = {
	speed: 100,
	drive() { 
	 	return "Car speed: ";	 
	}
};
let driver = {
          __proto__: car,
          drive() { 
                     return "Car speed: " +  this.speed  ;
          }
};
console.log(driver.speed);		             // 100
console.log(driver.drive());		             // "Car speed: 100"
```

```js
let car = {
	speed: 100,
	drive() { 
	       return "Car speed: " ;
	}
};
let driver = {
	__proto__: car,
	drive() {           
      	        return super.drive() + super.speed ;	// เรียกใช้งาน super
// อาจเรียกวิธีนี้แทนก็ได้
// 1) return Object.getPrototypeOf(this).drive.call(this) + this.__proto__.speed;
// 2) return this.__proto__. drive.call(this) +  this.__proto__.speed;
    	} // สิ้นสุดการประกาศ drive()
};
console.log(driver.speed);		// 100
console.log(driver.drive());		// "Car speed: 100"
```

```js
let car = {
	["car speed"]: 100,
	["drive a car"] ( ) { 
	           return "Car speed: " ;
	}
};
let driver = {
	__proto__: car,
	speed: 900,
	drive() { 
		return super["drive a car"]() + super["car speed"] ; // เรียกใช้งาน super
	}
};
console.log(driver.speed);		             // 900
console.log(driver.drive());	                         // "Car speed: 100"
```

```js
let car = {
	drive() { 
 		return "is driving";
	}
};
let taxi = {
	__proto__ : car,		// โปรโตไทป์คือ car
	drive() { 
           	return super.drive() +  " a taxi";
	}
};
let driver ={
	__proto__ : taxi,		// โปรโตไทป์คือ taxi
	drive() { 
           	return "Someone " + super.drive();
	}
}
console.log(car.drive());		// "is driving"
console.log(taxi.drive());		// "is driving a taxi"
console.log(driver.drive());		// "Someone is driving a taxi"
```

```js
let car = {
	drive() {  
 	    return "Driving";
          }
};
let taxi = {
          __proto__ : car,		                      // โปรโตไทป์คือ car
	drive() { 
                 return super.drive() +  " a taxi";       // บรรทัด a
          }
};
let driver = {
	__proto__ : taxi		                     // โปรโตไทป์คือ taxi
}	
console.log(car.drive());		                     // "Driving"
console.log(taxi.drive());		                     // "Driving a taxi"
console.log(driver.drive());	                                 // "Driving a taxi"
```

```js
let car = {
	drive() { 
 	     return "Driving";
          }
};
let taxi = {
          __proto__ : car,		// โปรโตไทป์คือ car
	drive() { 
 	    return Object.getPrototypeOf(this).drive.call(this) +  " a taxi";
          }
};
let driver ={
	__proto__ : taxi		// โปรโตไทป์คือ taxi
}	
console.log(car.drive());		// "Driving"
console.log(taxi.drive());		// "Driving a taxi"
console.log(driver.drive());	            // RangeError: Maximum call stack size exceeded
```

### เบื้องหลังการใช้งาน super

```js
function drive() { 
        console.log("Drive a taxi");
}
```

```js
let car = {
      drive() { 
 	console.log("Drive a car");
       }
};
```

```js
let car = {
    drive() { 
         console.log("Drive a car. It has speed:", this.speed ) ;
    }	
};
let driver = {
       __proto__: car,
       speed: 100,
       drive() {           		             // บรรทัด a
              super.drive();		             // บรรทัด b
              // จะเหมือน Object.getPrototypeOf(driver).drive.call(this);
        }  // สิ้นสุดการประกาศ drive()
};
driver.drive();		                         // "Drive a car. It has speed: 100"
```

```js
function startCar() {
	console.log( super.drive());	 // เกิด SyntaxError
}
```

```js
let car = {
	drive() { 
	 	console.log("Drive a car. It has speed:", this.speed ) ;
	}
};
let driver = {
	__proto__: car,
	speed: 100,
	drive() { 
	       console.log("Drive a taxi") ;
	}
};
function startCar() {
	return super.drive() + " :100";	 // บรรทัด a - เกิด SyntaxError
}
driver.drive = startCar;                              // กำหนดค่าทับพร็อพเพอร์ตี้ driver.drive
driver.drive();		 		 		 
```

```js
let car = {
    drive()  { 
       console.log("Drive a car. It has speed:", this.speed ) ;
    }	
};
let driver = {
      __proto__: car,
      speed: 100,
      drive: function() {           	             //  บรรทัด a -- ไม่ได้ประกาศเมธอดแบบย่อ
            super.drive();		             // บรรทัด b - เกิด SyntaxError
      } // สิ้นสุดการประกาศ drive()                
};
driver.drive();          
```

## เมธอด Object.is()
```js
console.log(NaN === NaN); 	            // false 
console.log(-0 === +0);   	                        // true
```

```js
// เปรียบเทียบค่า NaN
console.log(NaN === NaN);           	// false
console.log(NaN === 0/0);           	            // false
console.log(Object.is(NaN, NaN));   	// true
console.log(Object.is(NaN, 0/0));      	// true
// เปรียบเทียบเลข 0
console.log(+0 === -0);            	            // true
console.log(Object.is(+0, -0));     	            // false
// เปรียบเทียบตัวเลข 
console.log(10 === 10);             	            // true
console.log(10 === "10");             	// false
console.log(Object.is(10, 10));       	            // true
console.log(Object.is(10, "10"));     	// false
// เปรียบเทียบอ็อบเจ็กต์
console.log([] === []);            		// false
console.log({} === {});            		// false
console.log(Object.is([], []));            	// false
console.log(Object.is({}, {}));            	// false
var obj = { x: 1, y: 2 };
console.log(obj === obj);            	            // true
console.log(Object.is(obj, obj));       	// true
// เปรียบเทียบค่า undefinded และ null 
console.log(undefined === undefined);      // true
console.log(null === null);       	             // true
console.log(Object.is(undefined, undefined));     // true
console.log(Object.is(null, null));                // true
// เปรียบเทียบสตริง
console.log("Hello" === "Hello");             // true 
console.log(Object.is("Hello", "Hello"));     // true 
// เปรียบเทียบบูลีน
console.log("" === false);	             // false
console.log(0 === false);		             // false
console.log(0 === "");		             // false	
console.log(false === false);	             // true
console.log(Object.is("", false));	             // false
console.log(Object.is(0, false));		 // false
console.log(Object.is(0, ""));		 // false
console.log(Object.is(false, false));	             // true
```
## เมธอด Object.values()

```js
let obj = { foo: 1, bar: 2 };
let array = Object.values(obj);
console.log(array);         // [ 1, 2 ]
```

```js
let foo = Symbol("foo");
let obj = {
    [foo]: 1,
    bar: 2,
 };
let array = Object.values(obj);
console.log(array);         // [ 2 ]
```

```js
let obj = { foo: 1, bar: 2 };
for (let v of Object.values(obj)) {      // สกัดส่วนข้อมูลจากอ็อบเจ็กต์ obj ออกมา
    console.log(v);     
}
/* แสดงผลลัพธ์
1
2 */
```

## เมธอด Object.entries() 

```js
let obj = { foo: 1, bar: 2 };
let array = Object.entries(obj);
console.log(array);         //  [ [ 'foo', 1 ], [ 'bar', 2 ] ]
```

```js
let foo = Symbol("foo");
let obj = {
    [foo]: 1,
    bar: 2,
 };
let array = Object.entries(obj);
console.log(array);         // [ [ 'bar', 2 ] ]
```

```js
let obj = { foo: 1, bar: 2 };
for (let [k,v] of Object.entries(obj)) {   // สกัดคีย์กับข้อมูลจากอ็อบเจ็กต์ obj ออกมา
    console.log(`${k}: ${v}`);
}
/* แสดงผลลัพธ์
foo: 1
bar: 2 */
```

```js
let obj = { foo: 1, bar: 2 };
let map = new Map(Object.entries(obj));
console.log(map);       // Map(2) { 'foo' => 1, 'bar' => 2 }
```

## เมธอด Object.getOwnPropertyDescriptors()
```js
let obj = {"foo": 100, "bar": 200 };
console.log( Object.getOwnPropertyDescriptor(obj,"foo"));	     // รีเทิร์น descriptor
// { value: 100, writable: true, enumerable: true, configurable: true }
console.log( Object.getOwnPropertyDescriptor(obj,"bar"));	     // รีเทิร์น descriptor
// { value: 200, writable: true, enumerable: true, configurable: true }
```

```js
let obj = { 
    foo: 1,
    get bar() { return 2 },
    [Symbol("zoo")]: 3
};
console.log(Object.getOwnPropertyDescriptors(obj));

/* แสดงผลลัพธ์
{
  foo: { value: 1, writable: true, enumerable: true, configurable: true },
  bar: {
    get: [Function: get bar],
    set: undefined,
    enumerable: true,
    configurable: true
  },
  [Symbol(zoo)]: { value: 3, writable: true, enumerable: true, configurable: true }
}
*/
```

## เมธอด Object.fromEntries()

```js
let array = [["name", "somchai"], ["age", 65]];
let obj = Object.fromEntries(array);
console.log(obj);    // { name: 'somchai', age: 65 }
```

```js
let map = new Map([["name", "somchai"], ["age", 65]]);    // สร้างแม็พขึ้นมาก่อน
console.log(map);   // Map(2) { 'name' => 'somchai', 'age' => 65 }
let obj = Object.fromEntries(map)
console.log(obj);      // { name: 'somchai', age: 65 }
```

## เมธอด Object.hasOwn()
```js
let foo = {
   fooProp: 100,
};
let bar = {
    __proto__: foo,
    barProp: 200,
};

console.log("fooProp" in bar);  // true

console.log( Object.hasOwn(foo, "fooProp") );  // true     -- foo เป็นเจ้าของ "fooProp"
console.log( Object.hasOwn(bar, "fooProp") );  // false    -- bar ไม่ใช่เจ้าของ "fooProp"

console.log( foo.hasOwnProperty("fooProp") );  // true     -- foo เป็นเจ้าของ "fooProp"
console.log( bar.hasOwnProperty("fooProp") );  // false    -- bar ไม่ใช่เจ้าของ "fooProp"
```

## การกระจายพร็อพเพอร์ตี้ไปให้อีกอ็อบเจ็กต์
```js
let obj1 = {a: "foo", b: "bar"};
let obj2 = {...obj1 };                  // ใช้โอเปอเรเตอร์สเปรด ประกาศสมาชิก
console.log(obj2)                     // { a: 'foo', b: 'bar' }
// แก้ไขอ็อบเจ็กต์ obj1 ก็ไม่กระทบต่อ obj2
obj1.a = "zoo";
console.log(obj1);   // { a: 'zoo', b: 'bar' }
console.log(obj2);   // { a: 'foo', b: 'bar' }
```

```js
let obj1 = {a: "foo", b: "bar"};
let obj2 = {...obj1, c: "zoo"};
console.log(obj2)   // { a: 'foo', b: 'bar', c: 'zoo' }
```

```js
let obj1 = {a:"foo", b:"bar"};
let obj2 = {x:"zoo", y:"car"};
let obj3 = {...obj1, d:"car", ...obj2};
console.log(obj3)   // { a: 'foo', b: 'bar', d: 'car', x: 'zoo', y: 'car' }
```

```js
let obj1 = {a:"foo", b:"bar"};
let obj2 = {a:"zoo", ...obj1};
console.log(obj2)   // { a: 'foo', b: 'bar' }
let obj3 = {...obj1, a:"zoo"};
console.log(obj3)   // { a: 'zoo', b: 'bar' }
```

```js
console.log( {...undefined});               //  {}
console.log( {...null} );                       //  {}
console.log( {...123} );                       //  {}
console.log( {..."abc"} );                    // { '0': 'a', '1': 'b', '2': 'c' }
console.log( {...["foo", "bar"]});          // { '0': 'foo', '1': 'bar'
```

## Optional Chaining
```js
let data = {
    parent : {
	child: {
            name: {
                firstName: "สมชาย",
                lastName : "ใจดี"
            }
        }
    }
}; 
console.log(data.parent.child.name.firstName);    // "สมชาย"
console.log(data.parent.child.name.surname);     // undefined
console.log(data.parent.child.NAME.firstName);    //  บรรทัด a -- เกิด error

console.log(data.parent.child.NAME?.firstName);        // undefined
console.log(data.parent.child.name?.firstName);        // "สมชาย"

console.log(data.parent.child.NAME?.["firstName"]);     // undefined
console.log(data.parent.child.name?.["firstName"]);     // "สมชาย"

console.log(data.parent.child.name.surname?);   // วาง ? ไว้ท้ายสุด เกิด error ทำไม่ได้
```

```js
function foo (x, y) {
     return x*y;
}
let result1 = foo?.(2, 3);      // - บรรทัด a
console.log(result1);          // 6
```

```js
let bar;                           //undefined
let result2 = bar?.(2, 3);
console.log(result2);        // undefined
```

```js
let zoo = null;
let result3 = zoo?.(2, 3);
console.log(result3);        // undefined
```

## globalThis
```js
function findGlobal () {
          if (typeof global !== "undefined") {
		return global;
	 }
	if (typeof window !== "undefined") {
		return window
	};
	if (typeof self !== "undefined") {
		return self
	};
};	
console.log(findGlobal());   
```

```js
console.log(globalThis);  
```