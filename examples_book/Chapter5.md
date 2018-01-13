# บทที่ 5 ฟีเจอร์ใหม่ของตัวเลข สตริง และ regex

## การแปลงสตริงเป็นตัวเลข
```js
console.log(Number.parseInt("15")); 		// 15
console.log(Number.parseFloat("123.5"));	// 123.5
console.log(Number.parseInt("abc"));		// NaN	(แปลงเป็นเลขจำนวนเต็มไม่ได้)
console.log(Number.parseFloat("abc"));		// NaN	(แปลงเป็นเลขทศนิยมไม่ได้)  
```

```js
console.log(parseInt("15")); 			// 15
console.log(parseFloat("123.5"));			// 123.5
console.log(typeof window.parseInt);		// "function" (บนเว็บบราวเซอร์) 
console.log(typeof window.parseFloat);		// "function" (บนเว็บบราวเซอร์)
//console.log(typeof global.parseInt);		// "function" (บน Node.js) 
//console.log(typeof global.parseFloat);	// "function" (บน Node.js)
```

## เลขฐาน 2 ฐาน 8 และฐาน 16
```js
console.log(Number("100"));		// 100
console.log(Number("0b111"));		// 7
console.log(Number("0o45"));		// 37
console.log(Number("0x17"));		// 23
// ใช้ Number.parseInt() 
console.log(Number.parseInt("100"));	// 100
console.log(Number.parseInt("0b111"));	// 0
console.log(Number.parseInt("0o45"));	// 0
console.log(Number.parseInt("0x17"));	// 23
```

## เมธอด Number.isFinite() กับ Number.isNaN()
```js
console.log(isFinite(2560));			// true
console.log(isFinite("2560"));			// true	
console.log(Number.isFinite(2560));		// true
console.log(Number.isFinite("2560"));		// false
console.log(isNaN(NaN));				// true
console.log(isNaN("NaN"));				// true
console.log(Number.isNaN(NaN) );			// true
console.log(Number.isNaN("NaN"));			// false
console.log(typeof window.isFinite);		// "function" (บนเว็บบราวเซอร์) 
console.log(typeof window.isNaN);			// "function" (บนเว็บบราวเซอร์)
//console.log(typeof global.isFinite);		// "function" (บน Node.js) 
//console.log(typeof global.isNaN);		// "function" (บน Node.js)
```

## เมธอด Number.isInteger() กับ Number.isSafeInteger()
```js
console.log(Number.isInteger(34.6));		// false
console.log(Number.isInteger(34.0));		// true (เขียนเป็นเลข 34.0 ก็จริง แต่จะถูกจัดเก็บเป็นเลข 34)
console.log(Number.isInteger(34));		// true
```

```js
console.log(Math.pow(2,53));    		// 9007199254740992
console.log(Math.pow(2,53) + 1); 		// 9007199254740992		-- บรรทัด 2
console.log(Math.pow(2,53) + 2); 		// 9007199254740994		-- บรรทัด 3
console.log(Math.pow(2,53) + 3); 		// 9007199254740996		-- บรรทัด 4
console.log(Math.pow(2,53) * 100); 	// 900719925474099200	-- บรรทัด 5
```

```js
var upper = Number.MAX_SAFE_INTEGER; 
console.log(Number.isSafeInteger(upper));		// true
console.log(Number.isInteger(upper));			// true
var outside_upper = upper + 1;
console.log(Number.isSafeInteger(outside_upper));	// false
console.log(Number.isInteger(outside_upper));		// true
var lower  = Number.MIN_SAFE_INTEGER; 
console.log(Number.isSafeInteger(lower));		// true
console.log(Number.isInteger(lower));			// true
var outside_lower = lower - 1;
console.log(Number.isSafeInteger(outside_lower));	// false
console.log(Number.isInteger(outside_lower));		// true
```

## ค่าคงที่ Number.EPSILON
```js
console.log(Number.EPSILON);	// 2.220446049250313e-16
```

## เมธอด repeat()
```js
console.log( "JavaScript".repeat(3) );     // "JavaScriptJavaScriptJavaScript"
```

## เมธอด startsWith(), endsWith(), กับ includes()
```js
console.log("JavaScript".startsWith("Java"));	// true (มีคำว่า "Java" อยู่ตำแหน่งแรก)
console.log("JavaScript".startsWith("world"));	// false (ไม่มีคำว่า "world" อยู่ตำแหน่งแรก)
console.log("JavaScript".endsWith("Script"));	// true (มีคำว่า "Script" อยู่ตำแหน่งสุดท้าย)
console.log("JavaScript".endsWith("Hello"));	// false (ไม่มีคำว่า "Hello" อยู่ตำแหน่งสุดท้าย)
console.log("JavaScript".includes("va"));	// true (มีคำว่า "va" อยู่ในสตริง)
console.log("JavaScript".includes("same"));	// false (ไม่มีคำว่า "same" อยู่ในสตริง)
```

```js
console.log("JavaScript".startsWith("ri", 6));        // true
console.log("JavaScript".endsWith("va", 4));          // true
console.log("JavaScript".includes("ri", 2));          // true
```

## ยูนิโคด
```js
var a = "ABC";
console.log(a.length);		   	// 3
console.log(a.codePointAt(0));          // 65
console.log(a.codePointAt(1));          // 66
console.log(a.codePointAt(2));          // 67
console.log(a.codePointAt(3));          // undefined
```

```js
var thai = "กขค";
console.log(thai.length);			        	// 3
console.log(thai.codePointAt(0).toString(16));       	// e01
console.log(thai.codePointAt(1).toString(16));       	// e02
console.log(thai.codePointAt(2).toString(16));    	// e04
```

```js
console.log(String.fromCodePoint(42));       			// "*"
console.log(String.fromCodePoint(65, 66, 67));   		// "ABC"
console.log(String.fromCodePoint(0xe01, 0xe02, 0xe04) );	// "กขค"
// สามารถส่งค่าอากิวเมนต์เป็นสตริงที่เขียนด้วยตัวเลข ก็สามารถทำได้เช่นกัน
console.log(String.fromCodePoint("97", "98", "99"));   	   // "abc"
console.log(String.fromCodePoint("0xe07", "0xe08", "0xe09") ); // "งจฉ"
//String.fromCodePoint('_');           	// RangeError
//String.fromCodePoint(Infinity);   	// RangeError
//String.fromCodePoint(-1);          	// RangeError
//String.fromCodePoint(NaN);      	// RangeError
```

```js
console.log("\u{e01}");			  	// "ก"
console.log("\u{e01}\u{e02}\u{e04}ABC");	// "กขคABC"
```

```js
console.log("\u0e01");		// "ก"
```

```js
console.log("\u20BB7");        	// " 7"
console.log("\u{20BB7}");     	// "𠮷"
```

```js
console.log("a".length);		// 1
console.log("ก".length);		// 1
var char = "𤭢";			// "\u{24b62}"	-- เป็นอักษรกลุ่ม CJK
console.log(char.length);		// 2
```

## การตั้งชื่อด้วยตัวอักษรพิเศษยูนิโคด
```js
var \u{e01} = 100;			// จะเหมือนเขียน  var ก = 100
console.log(\u{e01});		// 100
console.log("\u{e01}");		// "ก"
var ข = "JavaScript";
console.log(ข);  			// "JavaScript"
```

```js
var \u0e01 = 100;			// จะเหมือนเขียน  var ก = 100
console.log(\u0e01);		// 100
```

## เมธอด normalize()
```js
function toCodePoint(str){		// ฟังก์ชั่นแสดงค่า code point ของสตริงออกทางหน้าคอนโซล
	var concat = "";
	for(var i = 0; i < str.length; i++ ){
		concat += "0x" + str.codePointAt(i).toString(16) + " ";
	}
	console.log(concat);
}

// U+1E9B: LATIN SMALL LETTER LONG S WITH DOT ABOVE
// U+0373: GREEK SMALL LETTER ARCHAIC SAMPI
var str = "\u{1E9B}\u{0373}";
var s1= str.normalize("NFC");
toCodePoint(s1);			// 0x1e9b 0x373

var s2= str.normalize("NFD");
toCodePoint(s2);			// 0x17f 0x307 0x373

var s3 = str.normalize("NFKC");
toCodePoint(s3);			// 0x1e61 0x373

var s4 = str.normalize("NFKD");
toCodePoint(s4);			// 0x73 0x307 0x373
```

## แฟล็ก u
```js
var str = "𠮷";
console.log(str.length);           	// 2 
console.log(/^.$/.test(str));      	// false
```

```js
var str = "𠮷";
console.log(/^.$/u.test(str));      	// true
```

```js
var result1 =  "𠮷กขคง𤭢".match(/[\s\S]/gu);
console.log(result1.length);		// 6

// ถ้าไม่ใช้แฟล็ก u จะนับตัวอักษรผิด
var result2 =  "𠮷กขคง𤭢".match(/[\s\S]/g);
console.log(result2.length); 		// 8
```

## แฟล็ก y
```js
var str = "foo1_foo2_foo3";		// สตริงที่จะค้นหา
var  regex = /foo\d_?/;			// ไม่มีแฟล็ก
var  regexG = /foo\d_?/g;			// แฟล็ก g
var  regexY = /foo\d_?/y;			// แฟลก y
var result = regex.exec(str);
var resultG = regexG.exec(str);
var resultY = regexY.exec(str);
console.log(result[0]);			// "foo1_"
console.log(resultG[0]);   		// "foo1_"
console.log(resultY[0]);   		// "foo1_"
console.log(regex.lastIndex);  	 	// 0
console.log(regexG.lastIndex);  	 	// 5
console.log(regexY.lastIndex);  	 	// 5
```

```js
result = regex.exec(str);
resultG = regexG.exec(str),
resultY = regexY.exec(str);
console.log(result[0]);   		// "foo1_"
console.log(resultG[0]);   	// "foo2_"
console.log(resultY[0]);   	// "foo2_"
console.log(regex.lastIndex);   	// 0
console.log(regexG.lastIndex);   	// 10
console.log(regexY.lastIndex);   	// 10
```

```js
var str = "foo1_foo2_foo3";
var  regex = /foo\d_?/;
var  regexG = /foo\d_?/g;			// แฟล็ก g
var  regexY = /foo\d_?/y;			// แฟลก y

regex.lastIndex = 1;
regexG.lastIndex = 1;
regexY.lastIndex = 1;
var result = regex.exec(str);
var resultG = regexG.exec(str);
var resultY = regexY.exec(str);

console.log(result[0]);   			// "foo1_" 
console.log(resultG[0]);   		// "foo2_"
console.log(resultY);   			// มีค่าเป็น null เพราะค้นหาไม่เจอข้อความ
```

```js
var  myRegex = /foo+/y;
console.log(myRegex.sticky);     // true
myRegex.sticky = 1;			// TypeError ไม่สามารถแก้ไขค่าได้ มีไว้อ่านอย่างเดียว
```

## RegExp
```js
var myRegex = /foo/g;
var regex2 = new RegExp(myRegex);
console.log(regex2.test("foo"));		// true
console.log(myRegex === regex2);		// false
```

```js
var myRegex = /foo/i;
var regex2 = new RegExp(myRegex, "g");	
console.log(myRegex.test("FOO"));       // true (ไม่สนใจตัวพิมพ์ใหญ่พิมพ์เล็ก)
console.log(regex2.test("FOO"));        // false
```

```js
var myRegex = new RegExp("foo", "y");	// จะเสมือนเขียน var myRegex = /foo/y;	
console.log(myRegex.exec("foo_abc"));	// ["foo"]
```

## พร็อพเพอร์ตี้ flags
```js
var myRegex = /foo/i;
console.log(myRegex.source);     		// "foo"
console.log(myRegex.flags);      		// "i"
```

