# โค้ดบทที่ 15 คอลเลคชั่น

## อาเรย์

### Array.of()

```js
let array = Array.of( 1, 2, 3 );
console.log(array.length);       		 // 3
console.log(array);         		             // [ 1, 2, 3 ]
console.log(array[0], array[1], array[2]);	 // 1 2 3
// จะเสมือนสร้างอาร์เรย์โดยใช้วงเล็บเหลี่ยม
// let array = [1, 2, 3];
```

### Array.from()

```js
let a = [1, 2, 3];
let array1 = Array.from(a);	
console.log(array1);		             // [ 1, 2, 3 ] 
let str = "456";
let array2 = Array.from(str);
console.log(array2);		             // [ '4', '5', '6' ]
let set = new Set([7, 8, 9]);	
let array3 = Array.from(set);
console.log(array3);		             // [ 7, 8, 9 ]
```

```js
let obj = {
    length: 4,
    1: "foo",
    2: "bar"
};
let array = Array.from(obj);
console.log(obj.length);	                         // 4
console.log(array);  		             // [ undefined, 'foo', 'bar', undefined ]
```

```js
let a = Array.from( { length: 4 } );   	// มีสมาชิกทั้งหมด 4 ตัว ที่มีค่าเป็น undefined
console.log(a);				// [ undefined, undefined, undefined, undefined ]
```

```js
let b = Array( 4 );                             
console.log(b);				// [ <4 empty  items> ] 
let c = Array.apply( null, { length: 4 } );     
console.log(c);				// [ undefined, undefined, undefined, undefined ] 
```

```js
let obj = {
    length: 4,
    1: "foo",
    2: "bar"
};
let toUpper =  function (value,index) {     // ฟังก์ชั่นคอลแบ็ค
    if (typeof value == "string") {
        return value.toUpperCase();	           // รีเทิร์นสตริงตัวพิมพ์ใหญ่
    } else {
        return "index_" + index;    // รีเทิร์นข้อความที่ขึ้นต้นด้วยคำว่า "index_" แล้วตามด้วยอินเด็กซ์
    }
};
let array = Array.from( obj, toUpper );
console.log(array); 
// จะแปลงจาก [ undefined, 'foo', 'bar', undefined ] 
// ให้กลายมาเป็น  [ 'index_0', 'FOO', 'BAR', 'index_3' ]
```

```js
let obj = {
    length: 4,
    1: "foo",
    2: "bar"
};
let array = Array.from( obj, function (value,index) {
	// console.log(this === obj);          // true
    	return this[index];
},obj);				             // อากิวเมนต์ตัวที่สาม 
console.log(array);		             // [ undefined, 'foo', 'bar', undefined ]
```

### copyWithin()

```js
let a1 = [0, 1, 2, 3, 4, 5];
a1.copyWithin( 3, 0 ); 		
console.log(a1);			             // [ 0, 1, 2, 0, 1, 2 ]
let a2 = [0, 1, 2, 3, 4, 5];
a2.copyWithin( 3, 0, 2 );         		
console.log(a2);			             // [ 0, 1, 2, 0, 1, 5 ]
```

```js
let a3 = [0, 1, 2, 3, 4, 5];
a3.copyWithin( 0, -2 );           
console.log(a3)		             // [ 4, 5, 2, 3, 4, 5 ]
let a4 = [0, 1, 2, 3, 4, 5];
a4.copyWithin( 0, -3, -1);
console.log(a4);       		// [ 3, 4, 2, 3, 4, 5 ]
```

### fill()

```js
let array = Array.of("a", "b", "c", "d");
console.log(array);		// [ 'a', 'b', 'c', 'd' ]
array.fill( 1 );
console.log(array);		// [ 1, 1, 1, 1 ]
```

```js
let array = [ null, null, null, null ,null].fill( 10, 1 );
console.log(array);                    // [ null, 10, 10, 10, 10 ]
```

```js
let array = [ null, null, null, null ,null].fill( 10, 1, 4 );
console.log(array);                   // [ null, 10, 10, 10, null ]
```

### find() 

```js
let a = ["red", "green", "blue", "yellow"];
function search(value, index, array) {	 // ฟังก์ชั่นคอลแบ็ค
    //console.log(array);	// [ 'red', 'green', 'blue', 'yellow' ]
    return value == "blue";
}
let result = a.find(search);                          
console.log(result);			 // 'blue'
```

```js
let a = ["red", "green", "blue", "yellow"];
let result = a.find( function (value, index, array) {
    //console.log(array);	            // [ 'red', 'green', 'blue', 'yellow' ]	
    //console.log(this === a);	// true
    return this[index] == "blue";
}, a);                          	           // อากิวเมนต์ตัวที่สอง
console.log(result);	           // 'blue'
```

### findIndex()

```js
let a = ["red", "green", "blue", "yellow"];
function search (value ,index, array) {  // ฟังก์ชั่นคอลแบ็ค
    // console.log(array);	// [ 'red', 'green', 'blue', 'yellow' ]
    return value == "blue";
};
let result = a.findIndex( search );                          
console.log(result);	// 2   
```

```js
let a = ["red", "green", "blue", "yellow"];
let result = a.findIndex( function (value, index, array){
    // console.log(array);		// [ 'red', 'green', 'blue', 'yellow' ]
    // console.log(this === a);	// true
    return this[index] == "blue";
}, a);                          	           // อากิวเมนต์ตัวที่สอง
console.log(result);		// 2       
```

### includes()

```js
let array = ["A", "B", "C"];		 // ประกาศอาร์เรย์
console.log(array.includes("A"));		 // true 
console.log(array.includes("Z"));		 // false
```

```js
let array = ["A", "B", "C"]; 		 // ประกาศอาร์เรย์
// เริ่มค้นหา "B" จากอินเด็กซ์คือ 2 ซึ่งจะพบว่าหาไม่เจอ
console.log(array.includes("B", 2)); 	 // false
// แต่ถ้าเปลี่ยนมาเริ่มค้นหาจากอินเด็กซ์เป็น 1 ก็จะหา "B" เจอ
console.log(array.includes("B", 1)); 	 // true
```

```js
let array = [0, NaN, 1];
console.log(array.indexOf(NaN)); 		 // -1 เพราะไม่เจอสมาชิกที่ต้องการ
console.log(array.includes(NaN)); 	             // true
```

```js
let array = [-0, NaN, 1];
console.log(array.indexOf(+0)); 	         // 0 เพราะเจอค่า -0 อยู่ในอาร์เรย์ที่ตำแหน่งอินเด็กซ์ 0
console.log(array.includes(+0));             // true
```

### flat()

หมายเหตุ โค้ดต่อไปนี้จะเป็นการประกาศตัวแปร arr1 ขึ้นมา จึงต้องก็อปปี้ไปรันในโค้ดถัดๆ ไป ภายในในหัวข้อ flat()ด้วย มิฉะนั้นจะหาตัวแปร arr1 ไม่เจอ
```js
let arr1 = [1, 2, 3, [4, 5, 6, [7, 8, 9, [10, 11, 12]]]];
```

```js
let arr2 = arr1.flat();    // arr2 มีสมาชิกซ้อนกัน 3 ระดับ
console.log(arr2);       //  [ 1, 2, 3, 4, 5, 6, [ 7, 8, 9, [ 10, 11, 12 ] ] ]
let arr3 = arr2.flat();    // arr2 มีสมาชิกซ้อนกัน 2 ระดับ
console.log(arr3);      // [ 1, 2, 3, 4, 5, 6, 7, 8, 9, [ 10, 11, 12 ] ]
```

```js
let arr4 = arr1.flat().flat().flat();      // จับยืดออก 3 ครั้ง
console.log(arr4);
/* แสดงผลลัพธ์
[
   1,  2, 3, 4,  5,
   6,  7, 8, 9, 10,
  11, 12
] */
```

```js
let arr5 = arr1.flat(3);                 // จับยืดออก 3 ครั้ง
console.log(arr5);
/* แสดงผลลัพธ์
[
   1,  2, 3, 4,  5,
   6,  7, 8, 9, 10,
  11, 12
] */
```

```js
let arr6 = arr1.flat(Infinity);            // คลี่ออกมาหมด
console.log(arr6);
/* แสดงผลลัพธ์
[
   1,  2, 3, 4,  5,
   6,  7, 8, 9, 10,
  11, 12
] */
```

### flatMap()

```js
let arr = [1, 2, 3, 4, 5];
let newArr1 = arr.map( function(x) { 
      return [x, x * 2]; 
});
console.log(newArr1);                  // [ [ 1, 2 ], [ 2, 4 ], [ 3, 6 ], [ 4, 8 ], [ 5, 10 ] ]
```

```js
let arr = [1, 2, 3, 4, 5];
let newArr2 = arr.flatMap( function(x) {
     return [x, x * 2];
});
console.log(newArr2);
/* แสดงผลลัพธ์
[
  1, 2, 2, 4,  3,
  6, 4, 8, 5, 10
] */
```

### เสริมเพิ่มเติม	

```js
let array = [1, 2, 3, 4];
array.forEach( (value, index, arrayObj) => console.log(`a[${index}] = ${value}`) );
/*แสดงผลลัพธ์
a[0] = 1
a[1] = 2
a[2] = 3
a[3] = 4 */
```

```js
let array = [1, 2, 3, 4];
array.forEach( value => console.log(value));  // ส่ง value เป็นค่าอากิวเมนต์ตัวแรก
/*แสดงผลลัพธ์
1
2
3
4 */
```

```js
let array = [1, 2, 3, 4, 5];
let result = array.every( value => value > 0 );          // สมาชิกของอาร์เรย์ต้องมากกว่า 0
console.log(result)       // true
```

```js
let array = [1, 2, 3, 4, 5];
let result = array.some( (value) => value == 3 );     // รีเทิร์น boolean                        
console.log(result)      // true
result = array.find( (value) => value == 3 );            // รีเทิร์นสมาชิก                     
console.log(result)      // 3
result = array.findIndex( (value) => value == 3 );    // รีเทิร์นอินเด็กซ์                             
console.log(result)      // 2
```

```js
let array = [1, 2, 3, 4, 5];
let result = array.filter( value => value > 2 );          // เลือกเฉพาะสมาชิกที่มีค่ามากกว่า 2
console.log(result)      // [ 3, 4, 5 ]    
```

```js
let array = [1, 2, 3, 4, 5];
let result = array.reduce( (acc, value) => acc + value );     // บวกรวมสมาชิกทุกตัว
console.log(result)      // 15                    
```

```js
let arr = [1, 2, 3, 4, 5];
let newArr1 = arr.map( value =>  2 * value );       // แปลงสมาขิกทุกตัวด้วยการคูณสอง
console.log(newArr1);      // [ 2, 4, 6, 8, 10 ]
```

```js
let arr = [1, 2, 3, 4, 5];
let result = arr.flatMap(value => [value, value * 2]); 
console.log(result);
/* แสดงผลลัพธ์
[
  1, 2, 2, 4,  3,
  6, 4, 8, 5, 10
] */
```

```js
let arr = [1, 2, 3, 4, 5];
let result = Array.from( arr, value => 2 * value );   // แปลงสมาขิกทุกตัวด้วยการคูณสอง  
console.log(result);         // [ 2, 4, 6, 8, 10 ]
```

## เซท

```js
let set = new Set();
console.log(set.size);	   // 0
```

```js
let set = new Set();
set.add( 1 );		
set.add("2");	
set.add({id : 1});	
console.log(set);	   // Set(3) { 1, '2', { id: 1 } }
```

```js
let set = new Set();
set.add( 1 );
set.add("1");
set.add( true );
set.add( true );
set.add( null );
set.add( null );
set.add( undefined );
set.add( undefined );
set.add({});		   // บรรทัด a
set.add({})		   // บรรทัด b
console.log(set);	   // Set { 1, "1",  true, null, undefined, Object {}, Object {} }
console.log(set.size); 	   // 7
```

```js
let set = new Set();
set.add(1).add(2).add(3);	   // เรียกเมธอด add() ต่อเนื่องกันได้
console.log(set);		   // Set {1, 2, 3}
```

### คอนสตรัคเตอร์ของเซท

```js
let set1 = new Set( ["a", "b", "c"] );
console.log(set1);			 // Set {"a", "b", "c"}
let set2 = new Set( "def" );
console.log(set2);			 // Set {"d", "e", "f"}
```

```js
let set1 = new Set( ["a", "b", "c"] );			
let set2 = new Set( set1);		             // สร้าง set2 จาก set1 ที่มีอยู่ก่อนแล้ว
console.log(set2);			 // Set {"a", "b", "c"}
```

### วิธีลบสมาชิกของเซท

```js
let set = new Set(["a", "b", "c"]);
console.log(set);			             // Set {"a", "b", "c"}
console.log(set.delete("a"));	             // true
console.log(set);			             // Set {"b", "c"}
set.clear();
console.log(set.size);		             // 0
```

### เมธอด has()

```js
let set = new Set();
let b = {b: 2};	
set.add(b);
set.add(0);
console.log(set.has(b));          	// true
console.log(set.has(0));             	// true
console.log(set.has(-0));          	// true
console.log(Object.is(0,-0));	// false
```

### เมธอด forEach() 

```js
function log(value1, value2, setObj) {
    // console.log(setObj);		// Set {"a", "b", "c"}
    // console.log(this === set);	// true
    console.log(`[${value1}] = ${value2}`);   
}
let set = new Set( ["a", "b", "c"] );
set.forEach( log, set);		// ระบุค่าอากิวเมนต์ตัวที่สองเป็น set
/*แสดงผลลัพธ์เป็น
"[a] = a"
"[b] = b"
"[c] = c" */
```

```js
let set = new Set( ["a", "b", "c"] );
set.forEach( value => console.log(value) );  // ระบุค่าอากิวเมนต์เป็นฟังก์ชั่นลูกศร
/*แสดงผลลัพธ์เป็น
a
b
c */
```

### ข้อควรระวังเมื่อใช้อ็อบเจ็กต์ในเซท

```js
let set = new Set(["a", true, 1]);
console.log(set.has("a"));  	             // true
console.log(set.has(true));	                         // true
console.log(set.has(1));	                         // true
set.delete("a");
set.delete(true);
set.delete(1);
console.log(set.size); 		             // 0
```

```js
let set = new Set();
set.add({a: 1});			             // 		-- บรรทัด a
console.log(set.delete({a:1}));	             // false   	-- บรรทัด b
let b = {b: 2};			
set.add(b)				 // 		-- บรรทัด c
console.log(set.delete(b));		 // true		-- บรรทัด d
let c = {c:3};
set.add(c);
console.log(set.has({c:3}));		             // false		-- บรรทัด e
console.log(set.has(c));		             // true		-- บรรทัด f
let d  = [ ];
set.add(d);
console.log(set.has([ ]));		             // false  	--  บรรทัด g
console.log(set.has(d));		             // true   	-- บรรทัด h
```

# WeakSet

```js
let a = { x: 1}, b = { y: 2};
a = null;		            // อ็อบเจ็กต์ {x: 1} จะรอให้ GC มาเรียกคืนหน่วยความจำ
b = null;		// อ็อบเจ็กต์ {y: 2} จะรอให้ GC มาเรียกคืนหน่วยความจำ
```

```js
let set = new Set();
let a = { x: 1}, b = { y: 2};
set.add(a).add(b);
a = null;		                        // อ็อบเจ็กต์ {x: 1} ยังไม่ถูก GC มาเรียกคืนหน่วยความจำ
b = null;		            // อ็อบเจ็กต์ {y: 2} ยังไม่ถูก GC มาเรียกคืนหน่วยความจำ
console.log(set);  	            // Set {Object {x: 1}, Object {y: 2}}
```

```js
let wset = new WeakSet();
let a = { x: 1 }, b = { y: 2};
wset.add( a);
wset.add( b ); 
console.log(wset.has(a));  	// true
console.log(wset.has(b));  	// true
a = null;			            // อ็อบเจ็กต์ {x: 1} จะรอให้  GC มาเรียกคืนหน่วยความจำ
b = null;			// อ็อบเจ็กต์ {y: 2} จะรอให้  GC มาเรียกคืนหน่วยความจำ
console.log(wset.has(a));  	// false
console.log(wset.has(b)); 	            // false
```

## แม็พ

```js
let map = new Map();
console.log(map.size)	                         // 0
```

```js
let map = new Map();
map.set("1", "Hello" );		
map.set("1", "Hi" );			 // เลือกใช้สมาชิกตัวนี้
map.set( {id:2}, "World");		             // บรรทัด a	
map.set( {id:2}, "World");		             // บรรทัด b
map.set( null, "You");		
map.set( null, "We");			 // เลือกใช้สมาชิกตัวนี้
map.set( undefined, "Good");		
map.set( undefined, "Bye");		 // เลือกใช้สมาชิกตัวนี้		
console.log(map);
/*แสดงผลลัพธ์เป็น
Map {"1" => "Hi", Object {id: 2} => "World", Object {id: 2} => "World", null => "We", undefined => "Bye"} 
*/
```

```js
let map = new Map();
map.set(1, "a").set(2, "b").set(3, "c");
console.log(map);		// Map {1 => "a", 2 => "b", 3 => "c"}
```

### คอนสตรัคเตอร์ของแม็พ

```js
let map = new Map( [ [1, "a"] , [2, "b"] ]);
console.log(map);		// Map {1 => "a", 2 => "b"}
```

```js
let map1 = new Map();
map1.set( 1, "a" );
map1.set( 2, "b");
let map2 = new Map(map1);
console.log(map2);		// Map {1 => "a", 2 => "b"}
```

### วิธีลบสมาชิกของแม็พ

```js
let map = new Map();
map.set( 1, "a" );			
map.set( 2, "b");	
map.set( 3, "c");	
console.log(map);			 // Map {1 => "a", 2 => "b", 3 => "c"}
console.log(map.delete(1)); 		 // true 
console.log(map);			 // Map {2 => "b", 3 => "c"}
map.clear();
console.log(map.size);			 // 0
```

### เมธอด get() และ has() 

```js
let map = new Map();
map.set( 1, "a");			
map.set( 2, "b");	
console.log(map.get( 1 ));		             // "a"
console.log(map.get( 2 ));		             // "b"
```

```js
let map = new Map();
map.set( 0, "a" );			
map.set( 1, "b" );
console.log(map.has(0));                           // true
console.log(map.has(-0));                          // true
console.log(map.has(1));                           // true
```

### เมธอด forEach()

```js
function log(value, key, mapObj) {
    // console.log(mapObj);		 // Map {1 => "a", 2 => "b"}
    // console.log(this === map);	             // true
    console.log(`[${key}] = ${value}`);    
}
let map = new Map( [ [1, "a"] , [2, "b"] ]);
map.forEach( log, map);		             //ระบุค่าอากิวเมนต์ตัวที่สองเป็น map
/*แสดงผลลัพธ์เป็น
"[1] = a"
"[2] = b" */
```

```js
let map = new Map( [ [1, "a"] , [2, "b"] ]);
map.forEach( value => console.log(value) );     // ระบุค่าอากิวเมนต์เป็นฟังก์ชั่นลูกศร
/*แสดงผลลัพธ์เป็น
a
b */
```

### ข้อควรระวังเมื่อใช้อ็อบเจ็กต์ในแม็พ

```js
let map = new Map();
let obj =  {a:1} ; 			             // 		--บรรทัด a
map.set( obj, "HI");		
console.log(map.delete({a:1}));	             // false 	--บรรทัด b
console.log(map.has({a:1}));		 // false   	--บรรทัด c	
map.set([],"Bye");			 // 		--บรรทัด d
console.log(map.has([]));		             // false  	--บรรทัด f
```

### การสร้างแม็พด้วยปีกกา

```js
let map = {};			    	 // จำลองการสร้างแม็พ
let a = { x: 1 },  b = { y: 2 };
map[a] = "foo";			             // กำหนดให้ a เป็นค่าคีย์
map[b] = "bar";		    	             // กำหนดให้ b เป็นค่าคีย์
console.log(map[a]);             		 // "bar"
console.log(map[b]);             		 // "bar"
```

## WeakMap

```js
let wmap = new WeakMap();
let a = { x: 1 }, b = { y: 2};
wmap.set( a, "foo" );
wmap.set( b, "bar" );
console.log(wmap.get(a));	                         // "foo"
console.log(wmap.get(b));	                         // "bar"
a = null;			                         // { x: 1 } จะรอให้ GC มาเรียกคืนหน่วยความจำ
b = null;			             // { y: 1 } จะรอให้ GC มาเรียกคืนหน่วยความจำ
console.log(wmap.get(a));	                         // undefined
console.log(wmap.get(b));	                         // undefined
```

```js
let wmap = new WeakMap();
let a = { x: 1 }, b = { y: 2};
wmap.set(a,b);
b=null
console.log(wmap.get(a));	                         // { y: 2}
```

## อาร์เรย์ระดับบิต

```js
let buffer = new ArrayBuffer(32);		 // ระบุความยาว 32 ไบต์ (256 บิต)
console.log(buffer.byteLength);  		 // 32
```

```js
let buffer = new ArrayBuffer( 32 );	 // ระบุความยาว 32 ไบต์ (256 บิต)
console.log(buffer.byteLength);  	 // 32 
let uint16 = new Uint16Array( buffer );
console.log(uint16.length);             	 // สมาชิก 16 ตัว
```

```js
let buffer = new ArrayBuffer( 2 );		 // 2 ไบต์ (16 บิต)
let uint16 = new Uint16Array( buffer );  
console.log(uint16.length);             	 // 1       
uint16[0] = 0b0001110000001111;		 // 7183 (เลขฐานสิบ)
console.log(uint16[0] == 7183);		 // true
```

```js
let buffer = new ArrayBuffer( 2 );		 // 2 ไบต์ (16 บิต)
let uint16 = new Uint16Array(buffer);	 // มีสมาชิกตัวเดียวขนาด 16 บิต
let uint8 = new Uint8Array(buffer);	 // มีสมาชิกสองตัว ตัวละ 8 บิต
uint16[0] = 0x105b;			 // 4187 (เลขฐานสิบ)
console.log(uint8[0] == 0x5b);          	 // true 
console.log(uint8[1] == 0x10);         	 // true
[uint8[1], uint8[0] ] = [uint8[0], uint8[1]] 	 // สลับข้อมูล (ดีสตรัคเตอร์ริ่ง)
console.log(uint8[0] == 0x10);		 // true
console.log(uint8[1] ==  0x5b);		 // true
console.log(uint16[0]);			 // 23312
```

### อาร์เรย์ระดับบิตอื่น ๆ

```js
let buffer = new ArrayBuffer(2);	             // 2 ไบต์ (16 บิต) 
let a = new Int16Array(buffer);	             // มองเห็น 16 บิตของบัฟเฟอร์
let b = new Int8Array(buffer, 0, 1);	             // มองเห็น 8 บิตล่างของบัฟเฟอร์
let c = new Int8Array(buffer, 1, 1);	             //  มองเห็น 8 บิตบนของบัฟเฟอร์
let d = new Int8Array(buffer,1);	             // เข้าถึงบัฟเฟอร์ตั้งแต่ offset มีค่าเป็น 1 เป็นต้นไป
a[0] = 0x105b;				 // 4187 (เลขฐานสิบ)
console.log(b[0] == 0x5b);		 // true
console.log(c[0] == 0x10);    		 // true
console.log(d[0] == 0x10);		 // true
```

```js
new TypedArray(length); 	                     // ระบุความยาว length (จำนวนสมาชิก)  ไม่ต้องใช้บัฟเฟอร์
new TypedArray(typedArr);  	         // สร้างจากอาร์เรย์ระดับบิตตัวอื่น ๆ อีกที
new TypedArray(obj); 		         // สร้างจากอาร์เรย์ หรืออ็อบเจ็กต์ที่ทำตัวเสมือนเป็นอาร์เรย์
```

```js
let a = new Float32Array(2);
console.log(a.length);	                     // 2
console.log(a[0], a[1]);    	                     // 0 0
let b = new Float64Array(a);
console.log(b.length);   	                     // 2
console.log(b[0], b[1]);	                     // 0 0
let c = new Int32Array([100, 200]);
console.log(c[0], c[1]);	                     // 100  200
let likeArray = {
	length: 2
	,0: 300
	,1: 400
}
let d = new Uint32Array(likeArray);
console.log(d[0], d[1]);	                     // 300 400
```

### เมธอดของอาร์เรย์ระดับบิต

```js
let int32 = new Int32Array( 3 );
int32 [0] = 1;
int32 [1] = 2;
int32 [2] = 3;
let result = int32.map( function(i) {
    return i*i;
} );
console.log(result);		             // [ 1, 4, 9 ]
let join = int32.join( "," );
console.log(join);		                         // "1,2,3"
```

```js
var array = [ 10, 1, 5 ];
array.sort();                               
console.log(array);			 // [1,10, 5]
let uint8 = new Uint8Array([1,10, 5]);
uint8.sort();                               
console.log(uint8);			 // [1,5,10]
```

```js
let uint8 = new Uint8Array( 2 );
uint8[0] = 20;
uint8[1] = 40;
let result = uint8.map( function(i) {
    return i * i;
} );
console.log(result[0]);	 // 144	(จริง ๆ ควรได้ค่า 400)
console.log(result[1]);	 // 64 (จริง ๆ ควรได้ค่า 1600)
```

```js
let uint8 = new Uint8Array( 2 );
uint8[0] = 20;
uint8[1] = 40;
let result1 = Uint8Array.from(uint8,  function(i) {
    return i * i;
} );
console.log(result1);      // [ 144, 64 ]
let result2 = Array.from(uint8,  function(i) {
    return i * i;
} );
console.log(result2);      // [ 400, 1600 ]
```

### includes()

```js
let uint8 = new Uint8Array([1, 2, 3, 4, 5]);
console.log(uint8.includes(1)); 	             // true
console.log(uint8.includes(5)); 	             // true
console.log(uint8.includes(10)); 	             // false
```

## เมธอด at()

```js
let array = ['a', 'b', 'c', 'd', 'e'];
console.log(array.at(3));             // 'd'
console.log(array.at(-3));            // 'c'
```

```js
let str = "abcde";
console.log(str.at(3));               // 'd'    
console.log(str.at(-3));              // 'c'
```

