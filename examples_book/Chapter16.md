# โค้ดบทที่ 16 อิเทอเรเตอร์ และเจนเนอเรเตอร์

## อินเทอเรเตอร์ 

### ตัวอย่างการสร้างอิเทอเรเตอร์

```js
function createIterator(array) {
	let iterator = {  
	    i : 0	// ทุกครั้งที่เรียกใช้ next() ค่าของ i จะบวกเพิ่มเป็นหนึ่งทุกครั้ง
              ,next : function() {
		// เมื่อเข้าถึงสมาชิกในอาร์เรย์ครบทุกตัว done จะมีค่าเป็น true
              	let done = (this.i >= array.length);    
		// เข้าถึงสมาชิกในอาร์เรย์
		let value = !done ? array[this.i++] : undefined;         		
                   return { value, done };
          	    } // สิ้นสุดการประกาศฟังก์ขั่น
	};
	return iterator;
}
let iterator = createIterator([1, 5, 10]);
console.log(iterator.next());		 // { value: 1, done: false }
console.log(iterator.next());		 // { value: 5, done: false }
console.log(iterator.next());		 // { value: 10, done: false }
console.log(iterator.next());		 // { value: undefined, done: true }
console.log(iterator.next());		 // { value: undefined, done: true }
```

## อิเทอเรเตอร์ที่มีอยู่แล้วในภาษา 

```js
let array = [1, 5];
let iterator = array[Symbol.iterator](); 
console.log(iterator.next());		 // { value: 1, done: false }
console.log(iterator.next());		 // { value: 5, done: false }
console.log(iterator.next());		 // { value: undefined, done: true }
```

```js
let say = "hi";
let iterator = say[Symbol.iterator]();          
console.log(iterator.next());		 // { value: "h", done: false }
console.log(iterator.next());		 // { value: "i", done: false }
console.log(iterator.next());		 // { value: undefined, done: true }
```

```js
console.log( typeof String.prototype[Symbol.iterator] );	            // "function"
console.log( typeof Array.prototype[Symbol.iterator] );    	            // "function"
console.log( typeof Set.prototype[Symbol.iterator] );    	            // "function"
console.log( typeof Map.prototype[Symbol.iterator] );    	            // "function"
console.log( typeof Uint8Array.prototype[Symbol.iterator] ); 	// "function"
console.log( typeof WeakSet.prototype[Symbol.iterator] ); 	            // "undefined"
console.log( typeof WeakMap.prototype[Symbol.iterator] );  	// "undefined"
```

### อ็อบเจ็กต์ที่วนซ้ำได้ 

```js
for(let i of [1, 5, 10]) {
	console.log(i)  
}
/* แสดงผลลัพธ์
1
5
10  */
/* อาจเหมือนเขียนประโยคนี้
let iterator = [1, 5, 10][Symbol.iterator]();
let result;
while( (result=iterator.next())   &&  result.done == false){
	let i = result.value;
	console.log(i);	
}*/
```

### สตริงในประโยค for

```js
let str = "ab𠮷";		
console.log(str.length); 	  // 4
for (let i=0; i < str.length; i++) {
    console.log(str[i]);
}
/* แสดงผลลัพธ์ของประโยค for
"a"
"b" 
(blank)
(blank) */
```

```js
let str = "ab𠮷";
for (let i of str) {
    console.log(i);
}
/* แสดงผลลัพธ์
"a"
"b" 
"𠮷" */
```

### เมธอด values(), keys และ entries()

```js
let array = [5, 10];
let set= new Set(["red", "green"]);
let map = new Map();
map.set("firstname", "Somchai");
map.set("lastname", "Jaidee");
for (let value of array.values()) {
    console.log(value);
}
for (let value of set.values ()) {
    console.log(value);
}
for (let value of map.values ()) {
    console.log(value);
}
/* จะแสดงผลลัพธ์ดังนี้
เมื่อใช้ array.values() จะแสดงผลลัพธ์เป็น
5
10
เมื่อใช้ set.values() จะแสดงผลลัพธ์เป็น
"red"
"green"
เมื่อใช้ map.values() จะแสดงผลลัพธ์เป็น
"Somchai"
"Jaidee" */
```

```js
let array = [5, 10];
let set= new Set(["red", "green"]);
let map = new Map();
map.set("firstname", "Somchai");
map.set("lastname", "Jaidee");
for (let key of array.keys()) {
    console.log(key);
}
for (let key of set.keys ()) {
    console.log(key);
}
for (let key of map.keys ()) {
    console.log(key);
}
/* จะแสดงผลลัพธ์ดังนี้
เมื่อใช้ array.keys() จะแสดงผลลัพธ์เป็น
0
1
เมื่อใช้ set.keys() จะแสดงผลลัพธ์เป็น
"red"
"green"
เมื่อใช้ map.keys() จะแสดงผลลัพธ์เป็น
"firstname"
"lastname" */
```

```js
let array = [5, 10];
let set= new Set(["red", "green"]);
let map = new Map();
map.set("firstname", "Somchai");
map.set("lastname", "Jaidee");
for (let entry of array.entries()) {
    console.log(entry);
}
for (let entry of set.entries()) {
    console.log(entry);
}
for (let entry of map.entries()) {
    console.log(entry);
}
/* จะแสดงผลลัพธ์ดังนี้
เมื่อใช้ array.entries() จะแสดงผลลัพธ์เป็น
[ 0, 5 ]
[ 1, 10 ]
เมื่อใช้ set.entries() จะแสดงผลลัพธ์เป็น
[ 'red', 'red' ]
[ 'green', 'green' ]
เมื่อใช้ map.entries() จะแสดงผลลัพธ์เป็น
[ 'firstname', 'Somchai' ]
[ 'lastname', 'Jaidee' ] */
```

```js
let array = [5, 10];
let set= new Set(["red", "green"]);
let map = new Map();
map.set("firstname", "Somchai");
map.set("lastname", "Jaidee");
for (let value of array) {		 // จะเหมือนกับการใช้ array.values()
    console.log(value);
}
for (let value of set) {			 // จะเหมือนกับการใช้ set.values()
    console.log(value);
}
for (let entry of map) {		            // จะเหมือนกับการใช้ map.entries()
    console.log(entry);
}
/*  จะแสดงผลลัพธ์ดังนี้
5
10
"red"
"green"
[ 'firstname', 'Somchai' ]
[ 'lastname', 'Jaidee' ] */
```

### โอเปอเรเตอร์สเปรด

* ตัวอย่างที่ 1 จะแสดงการใช้งานโอเปอเรเตอร์สเปรดกับสตริง เพื่อนำไปกำหนดค่าให้เป็นสมาชิกของอาร์เรย์

```js
let array = [..."abc"];	                         // จะเหมือนเขียนเป็น let array = ["a", "b", "c"];
console.log(array[0], array[1], array[2]);	 // "a b c"
```

* ตัวอย่างที่ 2  เมื่อใช้โอเปอเรเตอร์สเปรดกับเซท มันจะไปเรียกเมธอด @@iterator ของเซท ให้สร้างอิเทอเรเตอร์ขึ้นมา เพื่อใช้เข้าถึงและแตกสมาชิกของเซทออกมา

```js
let set = new Set(["a", "b", "c"]) ;	
let array = [...set];
console.log(array[0], array[1], array[2]);	 // "a b c"
```

```js
let set = new Set(["a", "b", "b", "c", "c",]);      // Set {"a", "b", "c"}
let keys = [ ...set.keys() ],
    values = [ ...set.values() ],
    entries = [ ...set.entries() ];
console.log(keys);		            // ["a", "b", "c"]
console.log(values);		            // ["a", "b", "c"]
console.log(entries[0][0]);	            // "a"
console.log(entries[0][1]); 	            // "a"
console.log(entries[1][0]); 	            // "b"
console.log(entries[1][1]); 	            // "b"
console.log(entries[2][0]); 	            // "c"
console.log(entries[2][1]); 	            // "c"
```

* ตัวอย่างที่ 3 จะแสดงการใช้งานโอเปอเรเตอร์สเปรดกับแม็พ เพื่อนำไปกำหนดค่าให้เป็นสมาชิกของอาร์เรย์

```js
let map = new Map([ [1,"a"] , [2, "b"] ]);
let keys = [ ...map.keys() ],
    values = [ ...map.values() ],
    entries = [ ...map.entries() ];
console.log(keys);		             // [1, 2]
console.log(values);		             // [ 'a', 'b' ]
console.log(entries[0][0]);	                         // 1
console.log(entries[0][1]);	                         // "a"
console.log(entries[1][0]);	                         // 2
console.log(entries[1][1]);	                         // "b"
console.log( [...map]);		             // [ [ 1, 'a' ], [ 2, 'b' ] ]
```

* ตัวอย่างที่ 4 จะแสดงการใช้โอเปอเรเตอร์สเปรด กับอาร์เรย์

```js
let array = [ ];
array.length  = 3;
array[1] = "a";
console.log(...array.keys());		 // 0 1 2
console.log(...array.values());		 // undefined a undefined 
console.log(...array.entries());		 // [ 0, undefined ] [ 1, 'a' ] [ 2, undefined ]
console.log(...array);			 // undefined "a" undefined
```

* ตัวอย่างที่ 5 จะแสดงการใช้โอเปอเรเตอร์สเปรด กับอาร์เรย์ระดับบิต
```js
let uint8 = new Uint8Array( 2 );
uint8[0] = 10 ;
uint8[1] = 20 ;
console.log(...uint8.keys());		 // 0 1
console.log(...uint8.values());		 // 10 20
console.log(...uint8.entries());		 // [0, 10] [1, 20]
console.log(...uint8);			 // 10 20
```

* ตัวอย่างที่ 6 จะแสดงการใช้งานโอเปอรเตอร์สเปรดกับคอลเลคชั่น เพื่อแตกค่าออกมาก่อน แล้วจึงส่งมันให้เป็นค่าอากิวเมนต์แก่ฟังก์ชั่น 
```js
let set = new Set([1, 2, 3]);
let array = [10, 20, 30];
function plus(a, b, c) {
	console.log(a + b + c);
} 
plus(...set);		// 6
plus(...array);		// 60
```

### ยูเนียน  อินเตอร์เซคชัน ผลต่างของเซต

* ยูเนียน
```js
let a = new Set([1, 2, 3, 4, 5]);		  // Set {1, 2, 3, 4, 5}
let b = new Set([3, 4, 5, 6, 7]);		  // Set {3, 4, 5, 6, 7}
let union = new Set([...a, ...b]);	
console.log(...union);			  //  1 2 3 4 5 6 7
```

* อินเตอร์เซคชั่น 
```js
let a = new Set([1, 2, 3, 4, 5]);		 // Set {1, 2, 3, 4, 5}
let b = new Set([3, 4, 5, 6, 7]);		 // Set {3, 4, 5, 6, 7}
let temp = [...a];		// แตกสมาชิกของเซทออกมา ให้กลายมาเป็นอาร์เรย์ชั่วคราว
let intersect = new Set(temp.filter( item => b.has(item) ) ); 	
// หรือจะเขียนสั้น ๆ ได้เป็น 
// let intersect = new Set([...a].filter(item => b.has(item) ) );
console.log(...intersect);			 //  3 4 5
```

* ผลต่างของเซต 
```js
let a = new Set([1, 2, 3, 4, 5]);		 // Set {1, 2, 3, 4, 5}
let b = new Set([3, 4, 5, 6, 7]);		 // Set {3, 4, 5, 6, 7}
let temp = [...a];		// แตกสมาชิกของเซทออกมา ให้กลายมาเป็นอาร์เรย์ชั่วคราว
let diff = new Set(temp.filter(item => !b.has(item) ) );
// หรือจะเขียนสั้น ๆ ได้เป็น 
// let diff = new Set([...a].filter(item => !b.has(item) ) ); 	
console.log(...diff);			 //  1 2
```

### ดีสตรัคเตอร์ริ่ง

* ตัวอย่างที่ 1 ลองพิจารณาการใช้งานเซท กับวิธีดีสตรัคเตอร์ริ่ง

```js
let [a, b, c] = new Set(["a", "b", "c"]);
console.log(a, b, c)		             // "a b c"
```

* ตัวอย่างที่ 2 ลองพิจารณาการใช้งานแม็พ กับวิธีดีสตรัคเตอร์ริ่ง

```js
let map = new Map();
map.set("firstname", "Somchai");
map.set("lastname", "Jaidee");
//let map = new Map( [["firstname","Somchai"] , ["lastname", "Jaidee"] ]);
let [a, b] = map;
console.log(a); 			             // [ "firstname", "Somchai" ]
console.log(b); 			             // [ "lastname", "Jaidee" ]
let [ [key1, value1] , [key2, value2]] = map;
console.log(key1,key2);		             // "firstname lastname"
console.log(value1,value2);		 // "Somchai Jaidee"
```

* ตัวอย่างที่ 3 ลองพิจารณาการใช้งานอาร์เรย์ระดับบิต ด้วยการใช้โอเปอเรเตอร์สเปรด ร่วมกับวิธีดีสตรัคเตอร์ริ่ง

```js
let uint8 = new Uint8Array( 2 );
[...uint8] = [10, 20];
console.log(uint8[0], uint8[1]);	             // 10 20
```

* ตัวอย่างที่ 4 ลองพิจารณาการนำข้อมูลจากคอลเลคชั่นมากำหนดค่าให้กับอาร์เรย์ ด้วยการใช้โอเปอเรเตอร์สเปรด ร่วมกับวิธีดีสตรัคเตอร์ริ่ง
```js
let a1 = [], a2 = [];
let set = new Set([10, 20]);
[...a1] = [...set];
console.log(a1[0], a1[1]);		             // 10 20
let map = new Map( [["firstname","Somchai"] , ["lastname", "Jaidee"] ]);
[...a2] = [...map];
console.log(a2[0]);			 // ["firstname", "Somchai"]
console.log(a2[1]);  			 // ["lastname", "Jaidee"]
console.log(a2[0][0], a2[0][1]);		 // "firstname Somchai"
console.log(a2[1][0], a2[1][1]);   	             // "lastname Jaidee"
```

* ตัวอย่างที่ 5 ลองพิจารณาการใช้งานเมธอด entries() ของคอลเลคชั่น ในประโยค for …of

```js
let array = [5, 10];
let set= new Set(["red", "green"]);
let map = new Map( [["firstname","Somchai"] , ["lastname", "Jaidee"] ]);
let uint8 = new Uint8Array( 2 );
[...uint8] = [10, 20];
for(let [key,value] of array.entries()) {
	console.log(key, value);
}
for(let [key,value] of set.entries()) {
	console.log(key, value);
}
for(let [key,value] of map.entries()) {
	console.log(key, value);
}
for(let [key,value] of uint8.entries()) {
	console.log(key, value);
}
```

* ตัวอย่างที่ 6 ลองพิจารณาการใช้วิธีดีสตรัคเตอร์ริ่ง มารับค่าจากการรีเทิร์นของฟังก์ชั่น 
```js
function myFunction() {
	return new Set(["red", "green"]);
}
let [a, b] = myFunction();
console.log(a, b);	          // "red green"
```

### พารามิเตอร์แบบดีสตรัคเตอร์

```js
function createGrade(firstName, lastName,[gender="Male", 
			age=18 ,subject="Math", gpa=0]) {
	console.log(firstName, lastName, gender, age, subject, gpa);
}
let set = new Set(["Female", "21", "Science", "3.44"]);
let map = new Map([["k1","Male"], ["k2","19"], ["k3","Math"], ["k4","3.20"]]);
createGrade("Somchai", "Jaidee", set);  // "Somchai Jaidee Female 21 Science 3.44"
createGrade("Mana", "Dekdee", map.values());// "Mana Dekdee Male 19 Math 3.20"
```

### อ็อบเจ็กต์ที่วนซ้ำได้แบบอื่นๆ

```html
<!DOCTYPE html>
<html>
<head>  
<script src="https://google.github.io/traceur-compiler/bin/traceur.js"></script>
</head>
<body>
    <ul>
        <li>One</li>
        <li>Two</li>
        <li>Three</li>    
    </ul>
    <script type="module">
	let element = document.getElementsByTagName("li");		
	for (let e of element) {
    		console.log(e.innerHTML);
	} 
    </script>
</body>
</html>
<!-- จะแสดงผลลัพธ์ออกทางหน้าคอนโซลเป็น
"One"
"Two"
"Three" -->
```

### วิธีสร้างอ็อบเจ็กต์ที่วนซ้ำได้


```js
let obj = { array: [1, 5, 10] };
obj[Symbol.iterator] = function () {	        // บรรทัดที่ 2
	return this.array[Symbol.iterator]();       // บรรทัดที่ 3	 
	// return this.array.values(); 	        // หรือจะเขียนแบบนี้ก็สามารถทำได้
};	
for(let i of obj){
	console.log(i);		
}
/* แสดงผลลัพธ์
1
5
10 */
```

```js
let obj = {  
	array: [1, 5, 10],
	[Symbol.iterator] () { 
	       return this.array[Symbol.iterator]();	 
 		// return this.array.values(); 	
	}
}; 
```

```js
class Iterable { 
    constructor(array) {
	this.array = array;
    }
    [Symbol.iterator] () { 
          return this.array[Symbol.iterator]();	 
          // return this.array.values();
    }
}
let obj = new Iterable([1, 5, 10]);
for (let i of obj) {
    console.log(i);
}
/* แสดงผลลัพธ์เป็น
1
5
10 */
```

```js
String.prototype[Symbol.iterator] =  function() {
	let item = this;
	let iterator = {  
	    i : 0	// ทุกครั้งที่เรียกใช้ next() ค่าของ i จะบวกเพิ่มเป็นหนึ่งทุกครั้ง
        	    ,next() {
 		// เมื่อเข้าถึงสมาชิกในอาร์เรย์ครบทุกตัว done จะมีค่าเป็น true
		let done = (this.i >= item.length); 
     		// เปลี่ยนเป็นตัวอักษรตัวใหญ่
		let value = !done ? item[this.i++].toUpperCase() : undefined; 
          		return {  value, done };
          	    } // สิ้นสุดการประกาศเมธอด next()
	};
	return iterator;
}
for(let i of "abc") {
     console.log(i);
}
/* แสดงผลลัพธ์เป็น
"A"
"B"
"C" */
```

## เจนเนอเรเตอร์ 

```js
function * genIterator() {
   // ซอร์สโค้ด
    yield 1;
   // ซอร์สโค้ด
    yield 5;
   // ซอร์สโค้ด
    yield 10;
   // ซอร์สโค้ด
}
let iterator = genIterator();
console.log(iterator.next());		 // {value: 1, done: false}
console.log(iterator.next());		 // {value: 5, done: false}
console.log(iterator.next());		 // {value: 10, done: false}
console.log(iterator.next());		 // {value: undefined, done: true}
```

```js
function * genIterator(array) {
    for (let i=0; i < array.length; i++) {
       // ซอร์สโค้ดก่อนหน้า
        yield array[i];  // เมื่อประโยคนี้ทำงานเสร็จ ก็จะหยุดรอการเรียก iterator.next() ครั้งต่อไป
       // ซอร์สโค้ดตามหลัง
    }
}
let iterator = genIterator ([1, 5, 10]);
console.log(iterator.next());	// {value: 1, done: false}
console.log(iterator.next());	// {value: 5, done: false}
console.log(iterator.next());	// {value: 10, done: false}
console.log(iterator.next());	// {value: undefined, done: true}
```

```js
function * genIterator(item) {
    for (let i=0; i < item.length; i++) {
        yield item[i];
    }
}
let iterator = genIterator([1, 5, 10]);
for (let i of iterator) { // อิเทอเรเตอร์ของเจนเนอเรเตอร์สามารถอยู่ในประโยค for …of ได้
    console.log(i);	
}
/* แสดงผลลัพธ์เป็น
1
5
10 */
```


### ประโยค return ในเจนเนอเรเตอร์

```js
function * genIterator () {
    yield 1;
    yield 5;
    return 45;		       // จบการทำงานแค่บรรทัดนี้
    yield 10;		       // การทำงานจะมาไม่ถึงบรรทัดนี้
}
let iterator = genIterator ();
console.log(iterator.next());     // { value: 1, done: false }
console.log(iterator.next());     // { value: 5, done: false }
console.log(iterator.next());     // { value: 45, done: true }
console.log(iterator.next());     // { value: undefined, done: true }
console.log(iterator.next());     // { value: undefined, done: true }
```

```js
function * genIterator () {
    yield 1;
    yield 5;
    return;		             // จบการทำงานแค่บรรทัดนี้
    yield 10;
}
let iterator = genIterator ();
console.log(iterator.next());           // { value: 1, done: false }	
console.log(iterator.next());           // { value: 5, done: false }
console.log(iterator.next());           // { value: undefined, done: true }
```

### ประโยคคำสั่ง yield *นิพจน์

```js
function * g() {
	yield 2;
	yield 3;
}
function * genIterator() {
	yield 1;			             // บรรทัด a
	yield* g();			 // บรรทัด b
	yield* "45";			 // บรรทัด c
	yield* Array.from(arguments);	 // บรรทัด d
	let item = new Set([8, 9]);		
	yield* item.values();		 // บรรทัด e
}
let iterator = genIterator(6, 7);		 // บรรทัด f	
console.log(iterator.next()); 		 // {value: 1, done: false}
console.log(iterator.next()); 		 // {value: 2, done: false}
console.log(iterator.next()); 		 // {value: 3, done: false}
console.log(iterator.next()); 		 // {value: "4", done: false}
console.log(iterator.next()); 		 // {value: "5", done: false}
console.log(iterator.next()); 		 // {value: 6, done: false}
console.log(iterator.next()); 		 // {value: 7, done: false}
console.log(iterator.next()); 		 // {value: 8, done: false}
console.log(iterator.next()); 		 // {value: 9, done: false}
console.log(iterator.next()); 		 // {value: undefined, done: true}
```

```js
function * f() {
	yield 1;		            // บรรทัด a
	return 2;		// บรรทัด b
}
function * g(count) {
	for(let i=0; i<2 ; i++){
	      yield count + i;	// บรรทัด c
	}
}
function * genIterator() {
	let result = yield *f();	// บรรทัด d
	yield result + 10;	// บรรทัด e
	yield *g(result);	// บรรทัด f
}
let iterator = genIterator();
console.log(iterator.next());           // {value: 1, done: false}
console.log(iterator.next());           // {value: 12, done: false}
console.log(iterator.next());           // {value: 2, done: false}
console.log(iterator.next());           // {value: 3, done: false}
console.log(iterator.next());           // {value: undefined, done: true}
```

### ส่งค่าอากิวเมนต์ไปให้เมธอด next()

```js
function * genIterator() {
    let a = yield 1;			
    let b = yield a + 3;       		
    yield b + 7;                  	
}
let iterator = genIterator();
console.log(iterator.next());          // {value: 1, done: false}
console.log(iterator.next(2));        // {value: 5, done: false}
console.log(iterator.next(3));        // {value: 10, done: false}
console.log(iterator.next(4));        // {value: undefined, done: true}
```

### เมธอด throw()

```js
function * genIterator() {
    let a = yield 1;
    let b = yield a + 3;
    yield b + 7;                   
}
let iterator = genIterator ();
console.log(iterator.next());                          // {value: 1, done: false}
console.log(iterator.next(2));                        // {value: 5, done: false}
console.log(iterator.throw(new Error('')));      // error
```

```js
function * genIterator() {
   let a = yield 1;
   let b;
   try {
	b = yield a + 3;
   } catch(ex) {
   	b = 3;
   }
    yield b + 7;                   
}
let iterator = genIterator();
console.log(iterator.next());        		 // {value: 1, done: false}
console.log(iterator.next(2));              	 // {value: 5, done: false}
console.log(iterator.throw(new Error('')));	 // {value: 10, done: false}
console.log(iterator.next());            	 // {value: undefined, done: true}
```

### นิพจน์เจนเนอเรเตอร์

```js
let genIterator  = function *(item) {	 // นิพจน์เจนเนอเรเตอร์
    for (let i=0; i < item.length; i++) {
        yield item[i];
    }
}
for (let i of genIterator([1, 5, 10]) ) {
    console.log(i);	
}
/* แสดงผลลัพธ์เป็น
1
5
10 */
```
### ประกาศเจนเนอเรเตอร์ในอ็อบเจ็กต์

```js
let obj = {};
obj.genIterator =  function *(item) {	 // ประกาศเจนเนอเรเตอร์
        for (let i=0; i < item.length; i++) {
            yield item[i];
        }
};
for(let i of obj.genIterator( [1, 5, 10]) ) {
        console.log(i);
}
/* แสดงผลลัพธ์
1
5
10 */
```

```js
let obj = {
    genIterator: function *(item) {	// ประกาศเจนเนอเรเตอร์
        for (let i=0; i < item.length; i++) {
            yield item[i];
        }
    }
};
```

```js
let obj = {
    *genIterator (item) {		// ประกาศเจนเนอเรเตอร์แบบย่อ
        for (let i=0; i < item.length; i++) {
            yield item[i];
        }
    }
};
```

### ประกาศเจนเนอเรเตอร์ในคลาส

```js
class IteratorClass {
     *genIterator (item) {		// ประกาศเจนเนอเรเตอร์
        for (let i=0; i < item.length; i++) {
     		 yield item[i];
     	 }
     }
}
let  myClass = new IteratorClass();
for(let i of myClass.genIterator([1, 5, 10]) ) {
	console.log(i);
}
/* แสดงผลลัพธ์
1
5
10 */
```

### สร้างอ็อบเจ็กต์ที่วนซ้ำได้ด้วยเจนเนอเรเตอร์

```js
let obj = { item: [1, 5, 10] };
obj[Symbol.iterator] = function *() {          // ประกาศเจนเนอเรเตอร์
	yield *this.item;
};
for(let i of obj) {
	console.log(i);
}
/* แสดงผลลัพธ์เป็น
1
5
10 */
```

```js
let obj = { 
	item: [1, 5, 10],
	[Symbol.iterator] :  function *() {   // ประกาศเจนเนอเรเตอร์
		yield *this.item;
	}
 };
```

```js
let obj = { 
	item: [1, 5, 10],
	*[Symbol.iterator]() {                 // ประกาศเจนเนอเรเตอร์แบบย่อ
		yield *this.item;
	}
 };
```

```js
class GenIterable {
    constructor(item) {
        this.item = item;
    }
    *[Symbol.iterator]() {		// ประกาศเจนเนอเรเตอร์
        yield *this.item;
    }
}
let obj = new GenIterable([1, 5, 10]);
for(let i of obj) {
	console.log(i);
}
/* แสดงผลลัพธ์
1
5
10 */
```
