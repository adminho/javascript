# ภาคผนวก ง  Well-Known symbols

```js
console.log(typeof Symbol.asyncIterator);        // symbol --ส่วนข้อมูลเป็นฟังก์ชัน หรือเมธอด
console.log(typeof Symbol.hasInstance);	      // symbol --ส่วนข้อมูลเป็นฟังก์ชัน หรือเมธอด
console.log(typeof Symbol.isConcatSpreadable);  // symbol –-ส่วนข้อมูลเป็นบูลีน
console.log(typeof Symbol.iterator);	      // symbol --ส่วนข้อมูลเป็นฟังก์ชัน หรือเมธอด
console.log(typeof Symbol.match);	      // symbol --ส่วนข้อมูลเป็นฟังก์ชัน หรือเมธอด
console.log(typeof Symbol.matchAll);             // symbol
console.log(typeof Symbol.replace);	      // symbol --ส่วนข้อมูลเป็นฟังก์ชัน หรือเมธอด
console.log(typeof Symbol.search);	      // symbol --ส่วนข้อมูลเป็นฟังก์ชัน หรือเมธอด
console.log(typeof Symbol.split);		      // symbol --ส่วนข้อมูลเป็นฟังก์ชัน หรือเมธอด
console.log(typeof Symbol.species);	      // symbol --ส่วนข้อมูลเป็นคอนสตรัคเตอร์
console.log(typeof Symbol.toPrimitive);	      // symbol --ส่วนข้อมูลเป็นฟังก์ชัน หรือเมธอด
console.log(typeof Symbol.toStringTag);	      // symbol --ส่วนข้อมูลเป็นสตริง
console.log(typeof Symbol.unscopeables);      // undefined --ส่วนข้อมูลเป็นอ็อบเจ็กต์
```

## การใช้งาน Symbol.hasInstance 

```js
function  MyConstructor() { }
class MyClass { }
let obj1 = new MyConstructor();
let obj2 = new MyClass();
console.log(obj1 instanceof MyConstructor);		// true
console.log(obj2 instanceof MyClass);			// true
```

```js
console.log(MyConstructor[Symbol.hasInstance](obj1));	    // true
// จะเหมือนเขียน console.log(obj1 instanceof MyConstructor);   // true
console.log(MyClass[Symbol.hasInstance](obj2));		    // true
// จะเหมือนเขียน console.log(obj2 instanceof MyClass);            // true
```

```js
class PositiveNumber {
     constructor(value) {
 	this.value = value;
     }
}
Object.defineProperty( PositiveNumber, Symbol.hasInstance, {
  // ดัดแปลงพฤติกรรมของพร็อพเพอร์ตี้ Symbol.hasInstance อันเดิม ด้วยการประกาศเมธอดอันใหม่
  value: function(objNumber) {
    // พารามิเตอร์ objNumber รับค่าอากิวเมนต์เป็นอ็อบเจ็กต์ที่ถูกสร้างขึ้นมา
     if(objNumber.value > 0) {
          return true;		// ถ้าค่าในอ็อบเจ็กต์มากกว่า 0
     } else {
          return false;		// ถ้าค่าในอ็อบเจ็กต์น้อยกว่าหรือเท่ากับ 0
     }
  } // สิ้นสุดประกาศฟังก์ชัน
}); // สิ้นสุด Object.defineProperty
let positive = new PositiveNumber(10);
let negative = new PositiveNumber(-10);
console.log(positive instanceof PositiveNumber);	// true
console.log(negative instanceof PositiveNumber);	// false
```

## การใช้งาน Symbol.isConcatSpreadable

```js
let a1 = [1, 2, 3];
let a2 = [4, 5, 6];
let a3 = a1.concat(a2);
console.log(a3);					// [ 1, 2, 3, 4, 5, 6 ]
console.log(a1[Symbol.isConcatSpreadable]);	// undefined
console.log(a2[Symbol.isConcatSpreadable]);	// undefined
console.log(a3[Symbol.isConcatSpreadable]);	// undefined
```

```js
a1[Symbol.isConcatSpreadable] = true;
a2[Symbol.isConcatSpreadable] = true;
let a3 = a1.concat(a2);
console.log(a3);		        // [ 1, 2, 3, 4, 5, 6 ]
```

```js
a1[Symbol.isConcatSpreadable] = false;
a2[Symbol.isConcatSpreadable] = false;
let a3 = a1.concat(a2);
console.log(a3);		        // [ [ 1, 2, 3 ], [ 4, 5, 6 ] ]
```

```js
a1[Symbol.isConcatSpreadable] = true;
a2[Symbol.isConcatSpreadable] = false;
let a3 = a1.concat(a2);
console.log(a3);		       // [ 1, 2, 3, [ 4, 5, 6 ] ]
```

```js
a1[Symbol.isConcatSpreadable] = false;
a2[Symbol.isConcatSpreadable] = true;
let a3 = a1.concat(a2);
console.log(a3);	                   // [ [ 1, 2, 3 ], 4, 5, 6 ]
```

```js
let likedArray = {
    0: "a"
    , 1: "b"
    , length: 2,
    [Symbol.isConcatSpreadable]: true		
};
let arr = [ "A", "B" ].concat(likedArray);		
console.log(arr);	     // [ 'A', 'B', 'a', 'b' ]
```

## การใช้งาน Symbol.match, Symbol.matchAll, Symbol.replace, Symbol.search, Symbol.split

```js
console.log(typeof RegExp.prototype[Symbol.match]);	// "function"
console.log(typeof RegExp.prototype[Symbol.matchAll]);	// "function"
console.log(typeof RegExp.prototype[Symbol.replace]);	// "function"
console.log(typeof RegExp.prototype[Symbol.search]);	// "function"
console.log(typeof RegExp.prototype[Symbol.split]);	// "function"
```

```js
let regexObj = {
    [Symbol.match](value) {	
         return value.match(/Hello/);	      // จับคู่คำว่า "Hello"
    }
    ,[Symbol.replace](value, replacement) {	         
         return value.replace(/!/, replacement);   // แทนที่คำว่า "!" ด้วย replacement	 
    }
    ,[Symbol.search](value) {	
         return value.search(/World/);	     // ค้นหาคำว่า "World"
    }	
    ,[Symbol.split](value) {	
         return value.split(/\s/);	                 // ใช้ช่องว่างเป็นตัวแบ่ง
     }
}
let str = "Hello World !";
// เรียกเมธอด [Symbol.match] 
console.log(str.match(regexObj));               // [ 'Hello', index: 0, input: 'Hello World !' ]
// เรียกเมธอด [Symbol.replace] 
console.log(str.replace(regexObj, "?"));       // "Hello World ?"
// เรียกเมธอด [Symbol.search] 
console.log(str.search(regexObj));	             // 6
// เรียกเมธอด [Symbol.split] 
console.log(str.split(regexObj));	             // [ 'Hello', 'World!', '!' ]
```

```js
let regexObj = {
    [Symbol.matchAll](value) {	
         return value.matchAll(/o/g);             // จับคู่ตัวอักษร "o"
    }
}
let str = "Hello World !";
result = str.matchAll(regexObj)
for (const m of result) {
     console.log(m);
}
// แสดงผลลัพธ์
// [ 'o', index: 4, input: 'Hello World !', groups: undefined ] 
// [ 'o', index: 7, input: 'Hello World !', groups: undefined ]
```

## การใช้งาน Symbol.species 

```js
class MyArray extends Array {   
}
let array = new MyArray(1, 2, 3, 4);
let newarray = array.filter((item) => item > 2);
console.log(newarray);	// [ 3, 4 ]
console.log(array instanceof MyArray);      	         // true
console.log(newarray instanceof Array);              // true
console.log(newarray instanceof MyArray);          // true
```

```js
class MyArray extends Array {
    static get [Symbol.species]() {
        return Array;
    }
}
let array = new MyArray(1, 2, 3, 4);
let newarray = array.filter((item) => item > 2);
console.log(newarray);	                                 // [ 3, 4 ]
console.log(array instanceof MyArray);      	         // true
console.log(newarray instanceof Array);              // true
console.log(newarray instanceof MyArray);          // false
```

```js
class MyArray extends Array {
    static get [Symbol.species]() {
        return this;
    }
}
let array = new MyArray(1, 2, 3, 4);
let newarray = array.filter((item) => item > 2);
console.log(newarray);	                                 // [ 3, 4 ]
console.log(array instanceof MyArray);      	         // true
console.log(newarray instanceof Array);              // true
console.log(newarray instanceof MyArray);          // true
```

```js
class MyClass {
    static get [Symbol.species]() {
	 console.log("Symbol.species is called");
        return this;
    }
    constructor(value) {
        this.value = value;
    }
    create() {
        return new this.constructor[Symbol.species](this.value);
        // เสมือนเขียน return new MyClass(this.value);
    }
}
let obj = new MyClass();
obj.create();			                     // "Symbol.species is called"
```

```js
class MyClass2 extends MyClass { 	
}
let obj = new MyClass2();
let obj2 = obj.create();		             // "Symbol.species is called"
console.log(obj2 instanceof MyClass);         // true
console.log(obj2 instanceof MyClass2);       // true
```

```js
class MyClass2 extends MyClass { 
     static get [Symbol.species]() {
 	console.log("Symbol.species is overrided");
        	return MyClass;
      }
}
let obj = new MyClass2();
let obj2 = obj.create();			 // "Symbol.species is overrided"
console.log(obj2 instanceof MyClass);        // true
console.log(obj2 instanceof MyClass2);      // false
```

## การใช้งาน Symbol.toPrimitive

```js
let a = {};
console.log("It is " + a)      // "It is [object Object]"
```

```js
let two = new Number(2);                         // ประกาศอ็อบเจ็กต์ Number
console.log(two.toString());	             // "2" 
console.log(two.valueOf());  	             // 2
// เบื้องหลังจะเรียกใช้ two.valueOf() ให้กลายเป็น 2 ก่อน แล้วถึงคูณด้วย  5 จึงกลายเป็น 2 * 5
console.log(two * 5);		             // 10 
```

```js
let obj = {};
console.log(obj.toString() ); 	             // "[object Object]"	
console.log(obj.valueOf());	             // {}
// เบื้องหลังจะเรียกใช้ obj.toString() 
console.log(String(obj));                            // "[object Object]"
```

```js
let date = new Date("12-30-2023");
console.log(date.toString());  // "Sat Dec 30 2023 00:00:00 GMT+0700 (Indochina Time)"
console.log(date.valueOf());  // 1703869200000 
// เบื้องหลังจะเรียกใช้ date.toString() 
console.log(new Date(date)); // "Sat Dec 30 2023 00:00:00 GMT+0700 (Indochina Time)"
```

```js
class ThaiCurrency {
     constructor(amount) {
          this.amount = amount;
     }
}
let obj = new ThaiCurrency();
console.log(obj[Symbol.toPrimitive]);	  // undefined
```

```js
class ThaiCurrency {
     constructor(amount){
          this.amount = amount;
     }
     [Symbol.toPrimitive](hint) {	
          switch (hint) {        		
               case "number":
                    return this.amount;
               case "string":
                    return this.amount + " Baht";
                case "default":
                    return this.amount + " THB";  	
 	} // สิ้นสุด switch
     } // สิ้นสุดประกาศเมธอด
} // สิ้นสุดประกาศคลาส
let money = new ThaiCurrency (100);
console.log(money / 2);              	             // 50		     -- case "number": 
console.log(String(money));          	             // "100 Baht"	     -- case "string"
console.log("Price " + money);                 // "Price 100 THB"    -- case "default"
console.log(money == "100 THB");           // true                     -- case "default"
```

```js
function ThaiCurrency(amount) {
        this.amount = amount;
}
ThaiCurrency.prototype[Symbol.toPrimitive] = function(hint)  {	
          switch (hint) {        		
               case "number":
                    return this.amount;
               case "string":
                    return this.amount + " Baht";	
                case "default":
                    return this.amount + " THB";  	
 	} // สิ้นสุด switch
}; // สิ้นสุดประกาศเมธอด
let money = new ThaiCurrency (100);
console.log(money / 2);              	             // 50		     -- case "number": 
console.log(String(money));          	             // "100 Baht"	     -- case "string"
console.log("Price " + money);                 // "Price 100 THB"    -- case "default"
console.log(money == "100 THB");            // true                     -- case "default"
```

## การใช้งาน Symbol.toStringTag

```js
obj = {}
obj[Symbol.toStringTag] = "My Object";
console.log(obj.toString());                                  // "[object My Object]"
console.log(Object.prototype.toString.call(obj));    // "[object My Object]"
```

```js
class MyClass { }
let obj = new  MyClass();
console.log(obj[Symbol.toStringTag]);	         // undefined
console.log(obj.toString());		         // "[object Object]"
```

```js
class MyClass {
     constructor() {
         this[Symbol.toStringTag] = "MyClass";
    }  
}
let obj = new  MyClass();
console.log(obj[Symbol.toStringTag]);			// "MyClass"
console.log(obj.toString());				// "[object MyClass]"
// toString() เบื้องหลังจะเก็บไว้ที่ MyClass.Prototype.toString() 
// ซึ่งสืบทอดมาจาก Object.prototype.toString()
console.log(obj.toString === MyClass.prototype.toString);	// true
console.log(obj.toString === Object.prototype.toString); 	// true
// กำหนดให้ this ชี้ไปยัง obj
console.log(Object.prototype.toString.call(obj));    		// "[object MyClass]"
```

```js
class MyClass {
     constructor() {
 	this[Symbol.toStringTag] = "MyClass";
     }
     toString() {	// โอเวอร์ไลด์เมธอด Object.prototype.toString
	return "This is MyClass";	                     // ไม่ได้แสดงข้อความ  "[object MyClass]"
     }
}
let obj = new  MyClass();
console.log(obj.toString());	                     // "This is MyClass"
console.log(Object.prototype.toString.call(obj));   // "[object MyClass]"
```

```js
function MyConstructor() { }
MyConstructor.prototype[Symbol.toStringTag] = "My Object";
let obj = new MyConstructor();
console.log(obj.toString());                                // "[object My Object]"
console.log(Object.prototype.toString.call(obj));  // "[object My Object]"
```

```js
Array.prototype[Symbol.toStringTag] = "My Array";
let myarray = [1, 2, 3];
console.log(Object.prototype.toString.call(myarray));    // "[object My Array]"
// ต่อไปจะทำการเรียก toString() ของอาร์เรย์
console.log(myarray.toString())			    // "[1, 2, 3]"	
console.log(Array.prototype.toString.call(myarray))	    // "[1, 2, 3]"
```

## การใช้งาน Symbol.unscopables

```js
Array.prototype[Symbol.unscopables] = Object.assign(Object.create(null), { // โดยดีฟอลต์
    copyWithin: true,
    entries: true,
    fill: true,
    find, true,
    findIndex: true,
    keys: true,
    values: true
});
```

```js
let array = [4, 3, 2, 1];
console.log(array);			  // [4, 3, 2, 1]
with(array) {		
     sort();				 // เรียงลำดับอาร์เรย์ใหม่จากน้อยไปหามาก
     console.log(typeof copyWithin);	 // "undefined"
}
console.log(array);			 // [ 1, 2, 3, 4 ]
```

```js
let obj = {
     foo: "foo value"
     ,bar: "bar value"
}
with(obj) {
    console.log(foo);	                         // "foo value"
    console.log(bar);	                         // "bar value"
}
```

```js
let obj = {
 	foo: "foo value"
 	,bar: "bar value"
}
obj[Symbol.unscopables] = Object.assign(Object.create(null), { 
    foo: true 	                                     // ห้ามใช้  foo ในบล็อกของประโยคคำสั่ง with
});
with(obj) {
     console.log(typeof foo);	             // "undefined"
     console.log(bar);		             // "bar value"
}
```


