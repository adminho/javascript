# โค้ดบทที่ 17 เมต้าโปรแกรมมิ่ง

## เมต้าโปรแกรมมิ่ง

### ฟังก์ชั่น eval()

```js
var function1 = "function myFunction (a, b) { console.log(a*b); }";
var function2 = "function myFunction (a, b) { console.log(a/b); }";
var randomNumber = Math.random() >= 0.5;	// true หรือ false
var code = randomNumber ? function1 : function2;
eval(code);
myFunction(10,5);	// 50 หรือ  2  -- บรรทัด a
/* จะเสมือนเขียน
function myFunction(a, b) { 
	console.log(a*b);
}*/
/* หรืออาจะเขียนเป็น
function myFunction(a, b) {
	console.log(a/b);
}*/
```

### Function()

```js
var body1 = "console.log(a*b)";
var body2 = "console.log(a/b)";
var randomNumber = Math.random() >= 0.5;      // true หรือ false
var myBody = randomNumber ? body1 : body2;
var myFunction = Function("a","b", myBody);
myFunction(10,5);	// 50 หรือ  2
/* จะเสมือนเขียน
function myFunction(a, b){ 
	console.log(a*b);
}*/
/* หรืออาจะเขียนเป็น
function myFunction(a, b){
	console.log(a/b);
}*/
```

## Reflect

```js
let obj = { };
obj.a = 100;
console.log(obj.a);	// 100
```

```js
let obj = { };
Reflect.set(obj,"a", 100);			 // เหมือนเขียนประโยค obj.a = 100;	
console.log( Reflect.get(obj,"a") );		 // 100 -- เหมือนเขียนประโยค console.log(obj.a);  
```

## พร็อกซี่

```js
let obj = { a: 100 };
let handler = { };			             // บรรทัด 2
let proxyObj = new Proxy( obj, handler);    // บรรทัด 3
console.log(proxyObj.a);			 // 100 (บรรทัด 4)
console.log(obj.a);			 // 100 (บรรทัด 5)
```

```js
// ห่ออาร์เรย์
let proxyArray = new Proxy( [1, 2, 3], {});				// บรรทัด a
console.log(proxyArray[1]);				    	// 2
console.log(...proxyArray);					           // 1 2 3
// ห่อฟังก์ชั่นลูกศร
let proxyFunc = new Proxy( ()=> console.log("myFunction") , {} );  // บรรทัด b
proxyFunc();						          // "myFunction"
// ห่อพร็อกซี่
let proxyObj1  =  new Proxy(proxyArray, {});		          // บรรทัด c
console.log(...proxyObj1);					          // 1 2 3
// ห่อพร็อกซี่
let proxyObj2  =  new Proxy(proxyFunc, {});		          // บรรทัด d
proxyObj2();						          // "myFunction"
```

### Trap

```js
let obj = { a: 100 };
let trapLogic = {
        get(targetObj,key, proxy) {		
                 console.log(`key: ${key}`);	
	      // targetObj ในตัวอย่างนี้คือ obj
                 // proxy ในตัวอย่างนี้คือ proxyObj
          	     return Reflect.get(targetObj, key);	
       	     // เนื่องจาก Reflect บางเว็บบราวเซอร์อาจไม่ทำงาน จึงอาจเขียนแบบนี้แทนก็ได้ 
	     // return targetObj[key];
        }
 };
let proxyObj = new Proxy( obj, trapLogic);	
console.log(proxyObj.a);		             // บรรทัด a
// แสดงผลลัพธ์เป็น			
// "key: a"
// 100
console.log(obj.a);			 // 100
```

### ตัวอย่างการใช้งานพร็อกซี่

* ตัวอย่างที่ 1 จะแสดงการดัดแปลงพฤติกรรมของอ็อบเจ็กต์ ด้วยการใช้พร็อกซี่

```js
let obj = { foo: 1 };
let trapLogic  = {
    set(targetObj, key, value, proxy) {	 // กำหนดค่าให้กับพร็อพเพอร์ตี้
        if(Reflect.has( targetObj, key )) {
            return Reflect.set( targetObj, key, value );
        } else {
            throw `Can’t write property: ${key}`;
        }
     }
    ,get(targetObj, key, proxy) {		 // อ่านค่าพร็อพเพอร์ตี้
        if(Reflect.has( targetObj, key )) {
            return Reflect.get(targetObj, key);
        } else {
            throw `Can’t read property: ${key}`;
        }
     }	 
     ,deleteProperty(targetObj, key){	// ลบพร็อพเพอร์ตี้
        if(Reflect.has( targetObj, key )) {
            return Reflect.deleteProperty(targetObj, key);
        } else {
            throw `Can’t delete property: ${key}`;
        }
      }
}
let proxyObj = new Proxy(obj, trapLogic);
proxyObj.foo = 100;
console.log(proxyObj.foo); 		 // 100
// console.log(delete proxyObj.foo);           // true
proxyObj.a = 1;		                         // exception: Can’t write property: a
console.log(proxyObj.b);	                         // exception: Can’t read property: b
delete proxyObj.c ; 	                         // exception: Can’t delete property: c
```

* ตัวอย่างที่ 2 จะแสดงการตรวจสอบค่าอากิวเมนต์ที่ส่งไปให้พารามิเตอร์ของฟังก์ชั่น รวมทั้งค่ารีเทิร์นจากฟังก์ชั่นด้วย

```js
let validation = { // handler
    apply(targetObj, thisObj, argumentList) {         // ดักจับตอนฟังก์ชันเป้าหมายถูกเรียกใช้งาน
           if( argumentList.length == 0 ) { 	          // ไม่มีค่าอากิวเมนต์ส่งมาให้ฟังก์ชั่น
	           throw new Error("Must send arguments to the function");
           }
           argumentList.forEach( function(value, index, thisObj) { 
	           if(typeof value != "number") { 	
				// ตรวจสอบค่าอากิวเมนต์ที่ส่งให้ฟังก์ชั่น มันเป็นตัวเลขหรือไม่ ?
				throw new Error("All arguments must be numbers");
	           } // สิ้นสุด if		 
           }); // สิ้นสุด argumentList.forEach()           
           // เรียกใช้งานฟังก์ชันเป้าหมาย
           let result = Reflect.apply(targetObj, thisObj, argumentList); 
           // ตรวจสอบค่าที่รีเทิร์นจากฟังก์ชั่น มันอยู่ในช่วง safe integer หรือไม่ ?
           if( Number.isSafeInteger(result) == false) { 
	           throw new Error("The result is not safe integer");
          }; 
          return result;
    } // สิ้นสุด apply
} // สิ้นสุดการประกาศอ็อบเจ็กต์ validation

function sum(param1, param2) {	             // หาผลบวก
	return param1 + param2;
}
function multiply(param1, param2) {	 // หาผลคูณ
	return param1 * param2;
}

let proxySum = new Proxy(sum, validation);	
let proxyMultiply = new Proxy(multiply, validation);	
// เรียกฟังก์ชั่น โดยส่งค่าอากิวเมนต์ไปให้ ที่เป็นตัวเลข 
// แล้วรีเทิร์นค่าไม่เกิน "safe integer" ก็จะทำงานได้ตามปกติ
console.log(proxySum(2, 3 ));		 // 5 = 2 + 3
console.log(proxyMultiply(2, 3));	             // 6 = 2 * 3

// ไม่มีค่าอากิวเมนต์ส่งไปให้ฟังก์ชั่น ก็จะเกิด error
proxySum();			             // error
proxyMultiply();		                         // error

// เมื่อส่งค่าอากิวเมนต์ที่ไม่ใช่ตัวเลข ก็จะเกิด error
proxySum(2, "3");        		            // error
proxyMultiply(2, "3");		            // error

// ค่าที่รีเทิร์นออกจากฟังก์ชั่น ถ้าเกินช่วง safe integer ก็จะเกิด error
let maxNum = Number.MAX_SAFE_INTEGER + 1;
proxySum(maxNum, maxNum);	             // error
proxyMultiply(maxNum, maxNum);	 // error
```

* ตัวอย่างที่ 3 จะแสดงกลไกการป้องกันเวลากำหนดโปรโตไทป์ให้กับอ็อบเจ็กต์

```js
let people = {};	

let preventObj = { 	// handler
	// ดักจับตอนกำหนดโปรโตไทป์ให้กับอ็อบเจ็กต์เป้าหมาย
	setPrototypeOf(targetObj, prototype) { 
	if(prototype !== people) { // ตรวจสอบว่าได้กำหนดโปรโตไทป์เป็น  people หรือไม่
	     throw new Error("Prototype must be people object only");
     	}
	console.log("Set the people prototype");
	return Reflect.setPrototypeOf(targetObj, prototype);
       }	// สิ้นสุด  setPrototypeOf	
}// สิ้นสุดประกาศอ็อบเจ้กต์

let man = { age: 17 };
let woman = { age: 20 };
let proxyMan = new Proxy(man, preventObj);
let proxyWoman = new Proxy(woman, preventObj);

// กำหนดโปรโตไทป์เป็น people ก็จะทำงานได้ตามปกติ
proxyMan.__proto__ = people; 		         // "Set the people prototype"
proxyWoman.__proto__ = people;	         // "Set the people prototype"
console.log( man.__proto__ === people );        // true
console.log( woman.__proto__ === people );    // true

// เมื่อกำหนดโปรโตไทป์ที่ไม่ใช่ people ก็จะเกิด error
let car = { speed: 100 };		            // กำหนดให้เป็นโปรโตไทป์ของ man กับ woman
proxyMan.__proto__ = car; 		// error
proxyWoman.__proto__ = car;	            // error
```

* ตัวอย่างที่ 4 จะแสดงกลไกป้องกันการกำหนดสมาชิกคนละชนิดในอาร์เรย์
```js
let checkType = {
    set(targetObj, key, value, proxy) {
	 if( targetObj.length == 0) { // ถ้าเป็นอาร์เรย์ว่าง
 	         return Reflect.set( targetObj, key, value );
	}	
 	let val0 = Reflect.get(targetObj, 0); // เข้าถึงสมาชิกตัวแรกของอาร์เรย์ (อินเด็กซ์ 0)
 	if( typeof val0 == typeof value ) { // ข้อมูลสมาชิกที่กำหนดเข้ามาเป็นชนิดเดียวกัน
            	return Reflect.set( targetObj, key, value );
        	} else {   // ถ้าเป็นคนข้อมูลคนละชนิดกัน ก็จะเกิด error
            	throw new Error(`Can’t add this type: ${typeof value}`);
        	}
    } // สิ้นสุดการประกาศ set
}

let myArray = [ 0, 1, 2, 3, 4];
let proxyArray = new Proxy(myArray, checkType);

// เพิ่มสมาชิกตัวที่ 5 (มีชนิดข้อมูลเป็นตัวเลข)
proxyArray[5] = 5;
console.log(proxyArray);	            // [ 0, 1, 2, 3, 4, 5 ]
console.log(myArray);		// [ 0, 1, 2, 3, 4, 5 ]

// เพิ่มสมาชิกตัวที่ 6 แต่เป็นสตริง จะเกิด error ขึ้นได้
proxyArray[6] = "6";	          // error
```

* ตัวอย่างที่ 5 จะแสดงวิธีที่ทำให้อ็อบเจ๊กที่เคยสร้างแล้วจะถูก cached เก็บไว้ จะได้ไม่ต้องสร้างซ้ำ ๆ กันหลายรอบ
```js
class Image{
	constructor(imageName){
		this.imageName = imageName;
		// สมมติว่าไปโหลดไปมาจากฐานข้อมูล
		// ซึ่งอาจเสียเวลานานด้วย
		// loadImageFromDB(imageName);
	}
}

let createImage = { 	// handler
       imageMap: new Map(), // เอาไว้เก็บอ็อบเจ็กต์ (cached)
       construct(targetObj, thisArugment, newTarget) { // ดักจับเมื่อสร้างอ็อบเจ็กต์เป้าหมาย
             imageName = thisArugment[0];
	 let map = this.imageMap;
	 if( map.has(imageName)) {
	       console.log("Clone an Object from cached");
 	       // โคลนนิ่งอ็อบเจ๊กที่เก็บไว้ใน imageMap มาใส่อ็อบเจ็กต์เปล่า แล้วรีเทิร์นออกไป
	       return Object.assign({},map.get(imageName));
     	 } 	
	 // ถ้าไม่มีเก็บไว้ในแม็พ
 	 console.log("Create new Object");
             let newObj = Reflect.construct(targetObj, thisArugment, newTarget);
             map.set(imageName, newObj);	// เก็บไว้ในแม็พ
	 return newObj	       
       }	// สิ้นสุด  construct	
}// สิ้นสุดประกาศอ็อบเจ็กต์

let proxyImage = new Proxy(Image, createImage);

// เมื่อสร้างอ็อบเจ็กต์ด้วยการเรียกใช้ new 
let catImage1 = new proxyImage("cat");     // Create new Object

// เมื่อระบุค่าอากิวเมนต์ "cat" ซ้ำอีกครั้ง ก็จะเป็นการโคลนิ่งอ็อบเจ็กต์ที่มีอยู่แล้ว
let catImage2 = new proxyImage("cat");	 // Clone an Object from cached
console.log( catImage1 === catImage2) 	 // false
```

### ข้อควรระวังเมื่อใช้ trap

```js
let obj = {a: 100};
let trapLogic = {
    getOwnPropertyDescriptor(targetObj, key) {
        	console.log(`getOwnPropertyDescriptor: ${key}`);	// บรรทัด a
        	return Reflect.getOwnPropertyDescriptor(targetObj, key);
    },
    defineProperty(targetObj, key, descriptor) {	            // บรรทัด b
        	console.log(`defineProperty: ${key}`);			
       	return Reflect.defineProperty(targetObj, key, descriptor);
    }
   /* ,set(targetObj, key, value, proxy) {			// บรรทัด c
		console.log(`set property: ${key} = ${value}`);
		return Reflect.set( targetObj, key, value );
    }*/
};
let proxyObj = new Proxy( obj, trapLogic);
proxyObj.a = 100;
/* แสดงผลลัพธ์เป็น
"getOwnPropertyDescriptor: a"
"defineProperty: a"
*/
/* แต่ถ้าเอาคอมเมนต์ของบรรทัด c ออกไป จะเปลี่ยนไปแสดงผลลัพธ์เป็น
"set property: a = 100"
*/
```

### วิธียกเลิกพร็อกซี่

```js
let trapLogic = {
    set(target,key,value, proxy) {
	console.log(`set property: ${key} = ${value}`);
       return true;
   }
};
let {proxy: myProxy, revoke: revokeFunc} = Proxy.revocable({}, trapLogic);     // บรรทัด a
myProxy.a = 100;		// "set property: a = 100"  		-- บรรทัด b
revokeFunc();			// หยุดการทำงานของพร็อกซี่
console.log(myProxy.a);	            // TypeError				-- บรรทัด c
```

## ลำดับของพร็อพเพอร์ตี้

```js
let parent = { parentKey: 1 };
let obj = {
	__proto__: parent 	 // กำหนดโปรโตไทป์เป็น parent
};
console.log(obj.parentKey);           // 1
obj.z = 100;
obj.y = 200;
obj [Symbol("c")] = "symbol c";
obj [Symbol("a")] = "symbol a";
obj[3.14] = 400;
obj[-10] = 300
obj[null] = 500;
obj[undefined] = 600;
obj[true] = 700;
obj[{}] = 800;
obj[10] = "foo";
obj[0] = "bar";
console.log(Reflect.ownKeys(obj));         
/* [ "0", "10", "z", "y", "3.14", "-10", "null", "undefined", "true", "Object{}", Symbol(c), Symbol(a)]] */
console.log(Object.getOwnPropertyNames(obj)); 	
// [ "0", "10", "z", "y", "3.14", "-10", "null", "undefined", "true", "Object{}"]
console.log(Object.getOwnPropertySymbols(obj));     // [Symbol(c), Symbol(a)]
```

