# บทที่ 11 เทมเพลตสตริง

```js

```

## เทมเพลตสตริงคืออะไร

```js
let msg = `JavaScript`;
console.log(msg);             	// "JavaScript"
console.log(msg.length);      	// 10 
console.log(typeof msg);      	// "string"
```

```js
let msg = `\`One\` "Two" ‘Three’`;
console.log(msg);    	   	// แสดงคำว่า `One` "Two" ‘Three’
```

### เขียนสตริงหลายบรรทัด

```js
let div = `<div>
<h1>Hello world</h1>
</div>`;
console.log(div);
/* แสดงผลลัพธ์เป็น
<div>
	<h1>Hello world</h1>
</div>
*/
```

```js
let div = "<div>\n\t<h1>Hello world</h1>\n</div>";
console.log(div);
/* แสดงผลลัพธ์เป็น
<div>
	<h1>Hello world</h1>
</div>
*/
```

```js
let div = "<div>\n" +
"	<h1>Hello world</h1>\n" +
"</div>";
console.log(div);
/* แสดงผลลัพธ์เป็น
<div>
	<h1>Hello world</h1>
</div>
*/
```

```js
let div = ["<div>", "\t<h1>Hello world</h1>", "</div>"].join("\n");
console.log(div);
/* แสดงผลลัพธ์เป็น
<div>
	<h1>Hello world</h1>
</div>
*/
```

```js
let div = "<div>\
<h1>Hello world</h1>\
</div>";
console.log(div);
// แสดงผลลัพธ์เป็น
// <div><h1>Hello world</h1></div>
```

```js
let msg = `Hello\nworld`;
console.log(msg);
/* แสดงผลลัพธ์เป็น
Hello
world
*/
```

### คอมเมนต์ในเทมเพลตสตริง

```js
let msg = `First line   // This is not a comment
/*
This is not a comment
*/
Last line`;		
console.log(msg);
```

### ความยาวของเทมเพลตสตริง

```js
let msg = `
JavaScript
  String`;	
console.log(msg.length);		            // 20
console.log(msg.trim().length); 	            // 19

```

## นิพจน์ในเทมเพลตสตริง

```js
let name = "Somchai";
let msg = `My name is ${name}`;
console.log(msg) 	// "My name is Somchai"
```

```js
let a = 5, b = 10, c = 100;
console.log("Price $" + ((a*b).toFixed(2)) + ", not " + (c + a) );   	
// แสดงผลลัพธ์เป็น
// "Price $50.00, not 105"
```

```js
let a = 5, b = 10, c = 100;
console.log(`Price $${(a*b).toFixed(2)}, not ${c + a}` ); 		
// แสดงผลลัพธ์เป็น
// "Price $50.00, not 105"
```

```js
function myFunction() {
	let name = "Somchai";
}
console.log(`My name is ${name}`); 
// อาจเกิด ReferenceError หรือไม่มีค่า name (ขึ้นอยู่กับจาวาสคริปต์เอนจิน)
```

## นิพจน์ในเทมเพลตสตริง

```js
let n = 1, a = 3, b = 6;
console.log(divTag`${n}) Hello world : ${a * b} items`);	// บรรทัด 2
```

```js
function divTag(strings, ...values) {
  	//console.log(strings[0]); 	// ""
 	//console.log(strings[1]); 	// ") Hello world world : "
    	//console.log(strings[2]); 	// " items"
  	//console.log(values[0]);  	// 1  (เป็นค่าของนิพจน์ ${n} )
  	//console.log(values[1]);  	// 18 (เป็นค่าของนิพจน์ ${a * b} )
	
	let result = "";
 	for (let i = 0; i < values.length; i++) {
        	      result += strings [i];
        	      result += values [i];
           }
	if(values.length < strings.length){
            result += strings[values.length]; // ต่อท้ายสตริงด้วยข้อความที่เหลือคือ " items"
           }
// เมื่อโปรแกรมทำงานถึงตรงนี้ ค่าของตัวแปร result ก็คือสตริงตัวเดิมที่ถูกส่งเข้ามา
// ส่วนค่าที่รีเทิร์นออกมา จะเป็นสตริงตัวใหม่ที่มี <div> กับ </div> ครอบเปิดและปิดท้ายสตริงตัวเดิม
	return `<div>${result}</div>`;  
}
let n = 1, a = 3, b = 6;
console.log(divTag`${n}) Hello world : ${a * b} items`);	
// แสดงผลลัพธ์เป็น
// "<div>1) Hello world : 18 items</div>"
```

### String.raw
```js
console.log(`One\tTwo\nThree`); 
/* เมื่อตัวอักษรพิเศษถูกประมวลผล ก็จะแสดงผลลัพธ์เป็น
"One	Two
Three"
*/
```

```js
console.log(String.raw `One\tTwo\nThree`);   
// แสดงผลลัพธ์เป็น
// "One\tTwo\nThree"
```

```js
function rawTag(strings, ...values) {
	let result = "";
	for (let i = 0; i < strings.length; i++) {
                result += strings.raw[i];	// บรรทัด a
	}
          return result;
}
console.log(rawTag`One\tTwo\nThree`);	
// แสดงผลลัพธ์เป็น
// "One\tTwo\nThree"
```

```js
console.log(`\u{004B}`);                 // ’K’
console.log(`\u004B`);                   // ’K’
console.log(`\x4B`);                      // ’K’
```

```js
console.log("C:\unit\x-ray\12");     // เกิด SyntaxError
console.log(`C:\unit\x-ray\12`);      // เกิด SyntaxError
```

```js
function windowPath(str) { 
    console.log(str[0])    //  ถ้าใช้ \ ผิด ก็จะได้สตริงเป็น undefined
 }
windowPath `C:\unit\x-ray\12`;   // undefined
```

```js
function windowPath(str) { 
    return str.raw[0];
 }
let str = windowPath `C:\unit\x-ray\12`;  
console.log(str)  // C:\unit\x-ray\12
```