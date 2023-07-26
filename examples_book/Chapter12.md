# บทที่ 12 ซิมโบล

## การใช้งานซิมโบล

```js
let sym1 = Symbol();			 // ไม่มี description 
let sym2 = Symbol("example");	             // มี description เป็น "example"
let sym3 = Symbol("example");	             // มี description เป็น "example"
console.log(sym2 === sym3);		 // false
```

```js
let  sym = Symbol("example");
console.log(sym.toString());    // Symbol(example)
console.log(sym);       // Symbol(example)
```

```js
console.log( typeof Symbol() );		         // "symbol"
console.log( typeof Symbol("example") );         // "symbol"
```

## ข้อควรระวังการใช้ซิมโบล

```js
let bool = new Boolean();		 // สามารถทำได้
let str = new String(); 		             // สามารถทำได้
let num = new Number();		 // สามารถทำได้
let sym = new Symbol(); 		             // จะเกิด TypeError
```

```js
let sym = Symbol("example");
let symObj1 = Object(sym);
let symObj2 = new Object(sym);
console.log(typeof sym);         	             // "symbol" 
console.log(typeof symObj1);  	             // "object"
console.log(typeof symObj2);  	             // "object"
```

```js
let sym = Symbol("example");
console.log(sym == Object(sym));	
// ถ้าใช้บน Firefox จะได้เป็น true แต่ถ้าใช้บน Google Chrome จะเป็น fasle
```

## ใช้ซิมโบลเป็นคีย์ในอ็อบเจ็กต์

```js
let sym = Symbol("first symbol");
let obj = { [sym]: 100 };		             // ใช้ซิมโบลเป็นชื่อคีย์ในอ็อบเจ็กต์
console.log(obj[sym]);            	             // 100
obj[sym] = 200;
console.log(obj[sym]);			 // 200
let lastSym = Symbol("last symbol");
Object.defineProperties(obj, {
    [lastSym]: {		                         // ใช้ซิมโบลเป็นชื่อคีย์ในอ็อบเจ็กต์
        value: 300,
        writable: true
    }
});
console.log(obj[lastSym]); // 300
Object.defineProperty(obj, sym, { writable: false }); // กำหนดให้พร็อพเพอร์ตี้ ไม่สามารถแก้ไขค่าได้
obj[sym] = 1;    	// จะเกิด error เพราะไม่สามารถแก้ไขค่าได้ (อยู่ในโหมดสตริคท์)
```

## การแชร์ซิมโบล

```js
let uid = Symbol.for("uid");	             // มีค่า description เป็น "uid"
console.log(uid);                                      // Symbol(uid)
```

```js
let sym1 = Symbol.for("uid");		 // ค้นหาซิมโบลครั้งแรก
let sym2 = Symbol.for("uid");	             // ค้นหาซิมโบลครั้งที่สอง
console.log(sym1 === sym2);                    // true (เพราะ sym1 กับ sym2 คือซิมโบลตัวเดียวกัน)
console.log(sym1);		      	 // Symbol(uid)
// เนื่องจาก sym1 กับ sym2 คือซิมโบลตัวเดียวกัน จึงสามารถใช้แทนกันได้
let obj = {[sym1]: 100};
console.log(obj[sym2]);		             // 100 
```

```js
let sym1 = Symbol.for("uid");
console.log(Symbol.keyFor(sym1));    // "uid"
let sym2 = Symbol("uid");
console.log(Symbol.keyFor(sym2));    // undefined
```

```js
Symbol.for("dojo.uid");
Symbol.for("jquery.uid");
```

## ซิมโบลในประโยค for...in 

```js
let obj = {};
obj.car = "100";
obj["zoo"] = "200";
obj[Symbol("foo")] = "foo";
obj[Symbol("bar")] = "bar";
for (let i in obj) {
   console.log(i); 		
}
// ประโยค for จะแสดงผลลัพธ์	
// "car" 
// "zoo" 
let keys = Object.getOwnPropertyNames(obj);
console.log(keys);	// ["car", "zoo"]
```

```js
let obj = {};
obj.car = "100";
obj["zoo"] = "200";
obj[Symbol("foo")] = "foo";
obj[Symbol("bar")] = "bar";
let keys = Object.getOwnPropertySymbols(obj);
console.log(keys);	// [Symbol(foo), Symbol(bar)]
```

## JSON.stringify()

```js
let obj = {
[Symbol("example")]: "100",
"bar" : "200"
}
// จะได้เป็นสตริงที่เขียนอยู่ในรูปแบบของ JSON  
console.log(JSON.stringify(obj));    // ‘{"bar" : "200"}’
```

## แปลงซิมโบลเป็นสตริง

```js
let sym = Symbol("foo");
++sym;				             // TypeError
sym + 0;			             // TypeError
```

```js
Symbol("foo") + "bar"; 	                         // TypeError
```

```js
let sym = Symbol("foo");
console.log(sym.toString());   		 // Symbol(foo)
console.log(String(sym));		             // Symbol(foo)		
new String(sym);			             //  TypeError
```

## พร็อพเพอร์ตี้ description

```js
let sym= Symbol("foo"); 
console.log(sym)                                                // Symbol(foo)
console.log(String(sym) === `Symbol(${"foo"})`);    // true
console.log(sym.toString());                                  // "Symbol(foo)"
console.log(sym.description);                               // "foo"
```