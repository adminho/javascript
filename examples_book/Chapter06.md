# โค้ดบทที่ 6  ทบทวน Regex

## Regular Expression

* 1. สร้างโดยใช้ฟังก์ชันคอนสตรัคเตอร์ RegExp ตามตัวอย่าง

```js
var myRegex = new RegExp("Hello+");
console.log(myRegex.toString());	// /Hello+/
```

* 2.  สร้างโดยใช้เครื่องหมาย /…/ มาครอบข้อความ regex ตามตัวอย่าง
```js
var myRegex = /Hello+/;
// ข้อความ regex ก็คืออ็อบเจ็กต์ตัวหนึ่ง 
// จึงสามารถแชร์ใช้งานเมธอด  RegExp.prototype.toString()
console.log(/Hello+/.toString());	// /Hello+/
```

### เมธอด test() กับ exec()

```js
console.log( /Hello+/.test("Hellooooo") ); 			// true
console.log( (new RegExp("Hello+")).test("Hellooooo") ); 	            // true
```

```js
var myRegex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
console.log(myRegex.test("xxxxxx.yyyyyy_zzzzz@abc.com"));	// true
```

```js
var myRegex = /^(\-?|\+?)\d*$/;
console.log(myRegex.test("-987"));	 // true
```

```js
var result = /(foo).(bar)/.exec("0123foo_bar");
console.log(result.index);	                         // 4
console.log(result[0]);	                         // "foo_bar"
console.log(result[1]);	                         // "foo"
console.log(result[2]);	                         // "bar"
console.log(result.input);	                         // "0123foo_bar"
```

## รูปแบบการใช้งาน regex ต่างๆ

### การระบุคำที่ต้องการค้นหา

```js
var re = /like/;
console.log(re.exec("I like u"));   // [ 'like', index: 2, input: 'I like u', groups: undefined ]
```

```js
var re = /html|div|br/;
console.log(re.exec("<div>"));    // [ 'div', index: 1, input: '<div>', groups: undefined ]
```

### การระบุช่วงตัวอักษรที่จับคู่

```js
var re = /[abc]/;
console.log(re.exec("feb"));        // [ 'b', index: 2, input: 'feb', groups: undefined ]
```

```js
var re = /[7-9]/;
console.log(re.exec("2+8"));      // [ '8', index: 2, input: '2+8', groups: undefined ]
```

```js
var re = /[a-c]/;
console.log(re.exec("rat"));      // [ 'a', index: 1, input: 'rat', groups: undefined ]
```

```js
var re = /[A-C]/;
console.log(re.exec("COM"));    // [ 'C', index: 0, input: 'COM', groups: undefined ]
```

```js
var re = /[a-cA-C]/;
console.log(re.exec("AND"));    // [ 'A', index: 0, input: 'AND', groups: undefined ]
```

```js
var re = /[a-zB-Mxyz157]/;
console.log(re.exec("3-5"));     // [ '5', index: 2, input: '3-5', groups: undefined ]
```

```js
var re = /[^cat]/;
console.log(re.exec("cats"));      // [ 's', index: 3, input: 'cats', groups: undefined ]
```

```js
var re = /[^0-3]/;
console.log(re.exec("20k"));      // [ 'k', index: 2, input: '20k', groups: undefined ] 
```

```js
var re = /[^w-z]/;
console.log(re.exec("xy12"));      // [ '1', index: 2, input: 'xy12', groups: undefined ] 
```

```js
var re = /[^m-oM-O]/;
console.log(re.exec("Moon!"));      // [ '!', index: 4, input: 'Moon!', groups: undefined ] 
```

### การระบุความถี่ของลำดับตัวอักษรที่จับคู่

```js
var re = /3+/;    
console.log(re.exec("123"));     // [ '3', index: 2, input: '123', groups: undefined ]
```

```js
var re = /p+/; 
console.log(re.exec("app"));    // [ 'pp', index: 1, input: 'app', groups: undefined ]
```

```js
var re = /3*/;
console.log(re.exec("12"));      // [ '', index: 0, input: '12', groups: undefined ]
```

```js
var re = /b*/;
console.log(re.exec("bbc"));    // [ 'bb', index: 0, input: 'bbc', groups: undefined ]
```

```js
var re = /p*/;
console.log(re.exec("app"));    // [ '', index: 0, input: 'app', groups: undefined ]
```

```js
var re = /b?/;
console.log(re.exec("bed"));    // [ 'b', index: 0, input: 'bed', groups: undefined ]
```

```js
var re = /b?/;
console.log(re.exec("bbc"));    // [ 'b', index: 0, input: 'bbc', groups: undefined ]
```

```js
var re = /p?/;
console.log(re.exec("app"));    // [ '', index: 0, input: 'app', groups: undefined ]
```

```js
var re = /g{2}/;
console.log(re.exec("egg"));    // [ 'gg', index: 1, input: 'egg', groups: undefined ]
```

```js
var re = /5{2}/;
console.log(re.exec("555"));    // [ '55', index: 0, input: '555', groups: undefined ]
```

```js
var re = /e{1,3}/;
console.log(re.exec("deep"));   // [ 'ee', index: 1, input: 'deep', groups: undefined ]
```

```js
var re = /x{1,3}/;
console.log(re.exec("xxxx"));   // [ 'xxx', index: 0, input: 'xxxx', groups: undefined ] 
```


```js
var re = /a{2,}/;
console.log(re.exec("zaaa"));    // [ 'aaa', index: 1, input: 'zaaa', groups: undefined ]
```

### การจับคู่แบบ assertions

```js
var re = /^x/;
console.log(re.exec("x-ray"));    // [ 'x', index: 0, input: 'x-ray', groups: undefined ]
```

```js
var re = /r$/;
console.log(re.exec("car"));    // [ 'r', index: 2, input: 'car', groups: undefined ]
```

### การระบุตัวอักษรพิเศษที่จับคู่

```js
var re = /\t/;
console.log(re.exec("<	>"));    // [ '        ', index: 1, input: '<        >', groups: undefined ]  
```

```js
var re = /\x41/;
console.log(re.exec("THAI"));     // [ 'A', index: 2, input: 'THAI', groups: undefined ] 
```

```js
var re = /\u0E14/;
console.log(re.exec("แดง"));     // [ 'ด', index: 1, input: 'แดง', groups: undefined ] 
```

```js
var re = /./;
console.log(re.exec("dog"));    // [ 'd', index: 0, input: 'dog', groups: undefined ]
```

```js
var re = /.ox/;
console.log(re.exec("boxs"));    // [ 'box', index: 0, input: 'boxs', groups: undefined ]
```

```js
var re = /\d/;
console.log(re.exec("x86"));    // [ '8', index: 1, input: 'x86', groups: undefined ]
```

```js
var re = /..\d/;
console.log(re.exec("item1"));    // [ 'em1', index: 2, input: 'item1', groups: undefined ]
```

```js
var re = /\D/;
console.log(re.exec("100px"));    // [ 'p', index: 3, input: '100px', groups: undefined ]
```

```js
var re = /\w/;
console.log(re.exec("$a"));        // [ 'a', index: 1, input: '$a', groups: undefined ] 
console.log(re.exec("$T"));        // [ 'T', index: 1, input: '$T', groups: undefined ] 
console.log(re.exec("$7"));        // [ '7', index: 1, input: '$7', groups: undefined ] 
console.log(re.exec("$_"));        // [ '_', index: 1, input: '$_', groups: undefined ] 
```

```js
var re = /\W/;
console.log(re.exec("a$"));        // [ '$', index: 1, input: 'a$', groups: undefined ] 
console.log(re.exec("T$"));        // [ '$', index: 1, input: 'T$', groups: undefined ] 
console.log(re.exec("7$"));        // [ '$', index: 1, input: '7$', groups: undefined ] 
console.log(re.exec("_$"));        // [ '$', index: 1, input: '_$', groups: undefined ] 
```

```js
var re = /\s/;
console.log(re.exec("^ ^"));    // [ ' ', index: 1, input: '^ ^', groups: undefined ]
```

```js
var re = /\S/;
console.log(re.exec(" @"));    // [ '@', index: 1, input: ' @', groups: undefined ] 
```

### สตริงกับ regex

```js
console.log("012Hellooooo".search(/Hello+/));	           // 3
var result = "Hellooooo Hello".match(/Hello+/g);	
console.log(result);					// [ 'Hellooooo', 'Hello' ]
console.log(result.length);				// 2
var str = "Hellooooo".replace(/Hello+/,"Bye"); 
console.log(str);					          // "Bye"
var split = "1,2,3".split(/,/);
console.log(split);				          // [ '1', '2', '3' ]
```

### ค่าแฟล็ก

```js
var re = /thai/i;
console.log("I' am THAI".search(re));          // 6
```

```js
var regex = /Hello+/gi;
console.log(regex.lastIndex);	// 0
console.log(regex.source);	// "Hello+"
console.log(regex.flags);		// "gi"
console.log(regex.global);	            // true
console.log(regex.ignoreCase);	// true
console.log(regex.multiline);	// false
console.log(regex.unicode);	// false
console.log(regex.sticky);	            // false
console.log(regex.dotAll);	            // false
console.log(regex.hasIndices);	// false
```

```js
var re = /ok/;
console.log(re.exec("ok ok ok"));    
// [ 'ok', index: 0, input: 'ok ok ok', groups: undefined ]
```

```js
var myRegex = /Hello+/g;
var str = "01Hello Hellooo89";
var result = myRegex.exec(str);		// ค้นหาครั้งแรก	
console.log(result[0]);			// "Hello"
console.log(result.index);			// 2
console.log(myRegex.lastIndex); 		// 7
myRegex.exec(str);			// ค้นหาครั้งที่ 2
console.log(result[0]);			// "Hello"
console.log(result.index);			// 2
console.log(myRegex.lastIndex); 		// 15
myRegex.exec(str);			// ค้นหาครั้งที่ 3
console.log(result[0]);			// "Hello"
console.log(result.index);			// 2
console.log(myRegex.lastIndex); 		// 0
myRegex.exec(str);			// ค้นหาครั้งที่ 4
console.log(result[0]);			// "Hello"
console.log(result.index);			// 2
console.log(myRegex.lastIndex); 		// 7
```

```js
console.log( /Hello+/g === /Hello+/g);	// false
/Hello+/g.exec("Hello Hello Hello");	// บรรทัด 2
console.log(/Hello+/g.lastIndex);		// 0
```

```js
var myRegex = /Hello+/g;
var result = "01Hello Hellooo89".match(myRegex);
console.log(result);			// [ 'Hello', 'Hellooo' ]
console.log(myRegex.lastIndex)                // 0
```
