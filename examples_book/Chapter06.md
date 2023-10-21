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

ตัวอย่าง 6.1 การใช้งานเมธอด test() เพื่อค้นหาข้อความในสตริง
```js
console.log( /Hello+/.test("Hellooooo") ); 			// true
console.log( (new RegExp("Hello+")).test("Hellooooo") ); 	            // true
```

ตัวอย่าง 6.2 เนื่องจากข้อความแบบ regex สามารถนำไปประยุกต์ใช้งานได้หลายกรณี และตัวอย่างต่อไปนี้จะเป็นการใช้ regex มาตรวจสอบข้อความว่าเป็นอีเมลหรือไม่
```js
var myRegex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
console.log(myRegex.test("xxxxxx.yyyyyy_zzzzz@abc.com"));	// true
```

ตัวอย่าง 6.3 ข้อความแบบ regex สามารถนำไปใช้ตรวจสอบตัวเลข
```js
var myRegex = /^(\-?|\+?)\d*$/;
console.log(myRegex.test("-987"));	 // true
```

ตัวอย่าง 6.4 การใช้งานเมธอด exec() เพื่อค้นหาข้อความในสตริง
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

ตัวอย่าง 6.5 ใช้ /like/ เป็น regex เพื่อจับคู่ลำดับตัวอักษร "like" ในสตริง "I like u" ซึ่งเจอชุดตัวอักษร "like" ที่อินเด็กซ์ 2
```js
var re = /like/;
console.log(re.exec("I like u"));   // [ 'like', index: 2, input: 'I like u', groups: undefined ]
```

ตัวอย่าง 6.6 ใช้ /html|div|br/ เป็น regex เพื่อจับคู่ลำดับตัวอักษร "html" หรือ "div" หรือ "br" อย่างใดอย่างหนึ่ง ในสตริง "<div>" ซึ่งเจอชุดอักษร "div" ที่อินเด็กซ์ 1
```js
var re = /html|div|br/;
console.log(re.exec("<div>"));    // [ 'div', index: 1, input: '<div>', groups: undefined ]
```

### การระบุช่วงตัวอักษรที่จับคู่

ตัวอย่าง 6.7 ใช้ regex เป็น /[abc]/ หมายถึงจะจับคู่ตัวอักษร a หรือ b หรือ c โดยจะค้นหาตัวแรกที่พบเจอ ซึ่งจะเจออักษร "b" ในตริง "feb" ที่อินเด็กซ์ 2
```js
var re = /[abc]/;
console.log(re.exec("feb"));        // [ 'b', index: 2, input: 'feb', groups: undefined ]
```

ตัวอย่าง 6.8 ใช้ regex เป็น /[7-9]/ หมายถึงจะจับคู่ตัวเลขในช่วง 7 ถึง 9 โดยจะค้นหาตัวแรกที่พบเจอ ซึ่งจะเจออักษรเลข "8" ในตริง "2+8"" ที่อินเด็กซ์ 2
```js
var re = /[7-9]/;
console.log(re.exec("2+8"));      // [ '8', index: 2, input: '2+8', groups: undefined ]
```

ตัวอย่าง 6.9 ใช้ regex เป็น /[a-c]/ หมายถึงจะจับคู่ตัวอักษรตัวพิมพ์เล็ก ตั้งแต่ a ถึง c โดยจะค้นหาตัวแรกที่พบเจอ ซึ่งจะเจออักษรเลข "a" ในตริง "rat" ที่อินเด็กซ์ 1
```js
var re = /[a-c]/;
console.log(re.exec("rat"));      // [ 'a', index: 1, input: 'rat', groups: undefined ]
```

ตัวอย่าง 6.10 ใช้ regex เป็น /[A-C]/ หมายถึงจะจับคู่ตัวอักษรตัวพิมพ์ใหญ่ ตั้งแต่ A ถึง C โดยจะค้นหาตัวแรกที่พบเจอ ซึ่งจะเจออักษรเลข "C" ในตริง "COM" ที่อินเด็กซ์ 0
```js
var re = /[A-C]/;
console.log(re.exec("COM"));    // [ 'C', index: 0, input: 'COM', groups: undefined ]
```

ตัวอย่าง 6.11 ใช้ regex เป็น /[a-cA-C]/ หมายถึงจะจับคู่ตัวอักษรตัวพิมพ์เล็ก ตั้งแต่ a ถึง c หรือตัวอักษรตัวพิมพ์ใหญ่ ตั้งแต่ A ถึง C โดยจะค้นหาตัวแรกที่พบเจอ ซึ่งจะเจออักษร "A" ในตริง "AND" ที่อินเด็กซ์ 0
```js
var re = /[a-cA-C]/;
console.log(re.exec("AND"));    // [ 'A', index: 0, input: 'AND', groups: undefined ]
```

ตัวอย่าง 6.12 ใช้ regex เป็น /[^cat]/ หมายถึงจะจับคู่ตัวอักษร ที่ไม่ใช่ c หรือ a หรือ t โดยจะค้นหาตัวแรกที่พบเจอ ซึ่งจะเจออักษร "s" ในตริง "cats" ที่อินเด็กซ์ 3
```js
var re = /[^cat]/;
console.log(re.exec("cats"));      // [ 's', index: 3, input: 'cats', groups: undefined ]
```

ตัวอย่าง 6.13 ใช้ regex เป็น /[^0-3]/ หมายถึงจะจับคู่ตัวอักษร ที่ไม่ใช่เลข 0 ถึง 3 โดยจะค้นหาตัวแรกที่พบเจอ ซึ่งจะเจออักษร "k" ในตริง "20k" ที่อินเด็กซ์ 2
```js
var re = /[^0-3]/;
console.log(re.exec("20k"));      // [ 'k', index: 2, input: '20k', groups: undefined ] 
```

ตัวอย่าง 6.14 ใช้ regex เป็น /[^w-z]/ หมายถึงจะจับคู่ตัวอักษร ที่ไม่ใช่ตัวอักษร w ถึง z โดยจะค้นหาตัวแรกที่พบเจอ ซึ่งจะเจอเลข 1 ในตริง "xy12" ที่อินเด็กซ์ 2
```js
var re = /[^w-z]/;
console.log(re.exec("xy12"));      // [ '1', index: 2, input: 'xy12', groups: undefined ] 
```

ตัวอย่าง 6.15 ใช้ regex เป็น /[^m-oM-O]/ หมายถึงจะจับคู่ตัวอักษร ที่ไม่ใช่ตัวอักษร m ถึง o และไม่ใช่ M ถึง O โดยจะค้นหาตัวแรกที่พบเจอ ซึ่งจะเจอเลข "!" ในตริง "Moon!" ที่อินเด็กซ์ 4
```js
var re = /[^m-oM-O]/;
console.log(re.exec("Moon!"));      // [ '!', index: 4, input: 'Moon!', groups: undefined ] 
```

ตัวอย่าง 6.16 เป็นการประยุกต์ใช้ regex ที่ดูซับซ้อนขึ้น ได้แก่ /[a-zB-Mxyz157]/ หมายถึงจะจับคู่ตัวอักษรระหว่าง a ถึง z หรือ B ถึง M หรือ x หรือ y หรือ z หรือ 1 หรือ 5 หรือ 7 โดยจะค้นหาตัวแรกที่พบเจอ ซึ่งจะเจออักษรเลข "5" ในตริง "3-5" ที่อินเด็กซ์ 2
```js
var re = /[a-zB-Mxyz157]/;
console.log(re.exec("3-5"));     // [ '5', index: 2, input: '3-5', groups: undefined ]
```

### การระบุความถี่ของลำดับตัวอักษรที่จับคู่

ตัวอย่าง 6.17 ใช้ regex เป็น /3+/ หมายถึงจะจับคู่ลำดัับตัวเลข 3 ตั้งแต่ 1 ตัวขึ้นไป โดยจะเจออักษร "3" ในตริง "123" ที่อินเด็กซ์ 2
```js
var re = /3+/;    
console.log(re.exec("123"));     // [ '3', index: 2, input: '123', groups: undefined ]
```

ตัวอย่าง 6.18 ใช้ regex เป็น /p+/ หมายถึงจะจับคู่ลำดับตัวอักษร "p" ตั้งแต่ 1 ตัวขึ้นไป โดยจะเจออักษร "pp" ในสตริง "app" ที่อินเด็กซ์ 1
```js
var re = /p+/; 
console.log(re.exec("app"));    // [ 'pp', index: 1, input: 'app', groups: undefined ]
```

ตัวอย่าง 6.19 ใช้ regex เป็น /3*/ หมายถึงจะจับคู่ลำดับตัวเลข 3 ตั้งแต่ศูนย์ตัวขึ้นไป ในตัวอย่างนี้เป็นตริง "12" ก็จะถือว่าเจอสตริงว่าง ‘’ ที่อินเด็กซ์ 0
```js
var re = /3*/;
console.log(re.exec("12"));      // [ '', index: 0, input: '12', groups: undefined ]
```

ตัวอย่าง 6.20 ใช้ regex เป็น /b*/ หมายถึงจะจับคู่ลำดับตัวอักษร "b" ตั้งแต่ศูนย์ตัวขึ้นไป โดยจะเจออักษร "bb" ในสตริง "bbc" ที่อินเด็กซ์ 0
```js
var re = /b*/;
console.log(re.exec("bbc"));    // [ 'bb', index: 0, input: 'bbc', groups: undefined ]
```

ตัวอย่าง 6.21 ใช้ regex เป็น /p*/ หมายถึงจะจับคู่ลำดับตัวอักษร "p" ตั้งแต่ศูนย์ตัวขึ้นไป ในตัวอย่างนี้เป็นตริง "app" ก็จะถือว่าเจอสตริงว่าง ‘’ ที่อินเด็กซ์ 0 เพราะเวลา regex จับคู่ในสตริง ก็จะมองจากตัวอักษรซ้ายมือสุดไปขวามือ พอเจอ "a" ก่อนตัวอักษรอื่นๆ จึงเข้าใจว่า p มีแค่ศูนย์ตัว จะไม่มองหา p ที่อยู่ในอินเด็กซ์ 1 กับ 2 ดังนั้นการใช้ * จึงต้องระวังให้ดี อาจทำให้เข้าใจผิดได้
```js
var re = /p*/;
console.log(re.exec("app"));    // [ '', index: 0, input: 'app', groups: undefined ]
```

ตัวอย่าง 6.22 ใช้ regex เป็น /b?/ หมายถึงจะจับคู่ลำดับตัวอักษร "b" ตั้งแต่ศูนย์ตัว ถึง 1 ตัว โดยจะเจออักษร "b" ในสตริง "bed" ที่อินเด็กซ์ 0
```js
var re = /b?/;
console.log(re.exec("bed"));    // [ 'b', index: 0, input: 'bed', groups: undefined ]
```

ตัวอย่าง 6.23 ใช้ regex เป็น /b?/ หมายถึงจะจับคู่ลำดับตัวอักษร "b" ตั้งแต่ศูนย์ตัว ถึง 1 ตัว โดยจะเจออักษร "b" ในสตริง "bbc" ที่อินเด็กซ์ 0 (เจอ "b" ตัวแรกแล้ว ก็จะไม่ค้นหา "b" ตัวถัดไป)
```js
var re = /b?/;
console.log(re.exec("bbc"));    // [ 'b', index: 0, input: 'bbc', groups: undefined ]
```

ตัวอย่าง 6.24 ใช้ regex เป็น /p?/ หมายถึงจะจับคู่ลำดับตัวอักษร "p" ตั้งแต่ศูนย์ตัว ถึง 1 ตัว ในตัวอย่างนี้เป็นตริง "app" ก็จะถือว่าเจอสตริงว่าง ‘’ ที่อินเด็กซ์ 0 เพราะเวลา regex จับคู่ในสตริง ก็จะมองจากตัวอักษรซ้ายมือสุดไปขวามือ พอเจอ "a" ก่อนตัวอักษรอื่นๆ จึงเข้าใจว่า p มีแค่ศูนย์ตัว จะไม่มองหา p ที่อยู่ในอินเด็กซ์ 1 กับ 2 ดังนั้นการใช้ ? ก็เหมือน * จึงต้องระวังให้ดี อาจทำให้เข้าใจผิดได้
```js
var re = /p?/;
console.log(re.exec("app"));    // [ '', index: 0, input: 'app', groups: undefined ]
```

ตัวอย่าง 6.25 ใช้ regex เป็น /g{2}/ หมายถึงจะจับคู่ลำดับตัวอักษร "g" จำนวน 2 ตัว โดยจะเจออักษร "gg" ในสตริง "egg" ที่อินเด็กซ์ 1
```js
var re = /g{2}/;
console.log(re.exec("egg"));    // [ 'gg', index: 1, input: 'egg', groups: undefined ]
```

ตัวอย่าง 6.26 ใช้ regex เป็น /5{2}/ หมายถึงจะจับคู่ลำดับตัวเลข 5 จำนวน 2 ตัว โดยจะเจออักษร "55" ในสตริง "555" ที่อินเด็กซ์ 0 (เจอ 5 แค่สองตัว ไม่ใช่เจอ "555")
```js
var re = /5{2}/;
console.log(re.exec("555"));    // [ '55', index: 0, input: '555', groups: undefined ]
```

ตัวอย่าง 6.27 ใช้ regex เป็น /e{1,3}/ หมายถึงจะจับคู่ลำดับตัวอักษร "e" จำนวนอย่างน้อย 1 ตัว และมากสุด 3 ตัว โดยจะเจออักษร "ee" ในสตริง "deep" ที่อินเด็กซ์ 1 (เจอ "e" สองตัว)
```js
var re = /e{1,3}/;
console.log(re.exec("deep"));   // [ 'ee', index: 1, input: 'deep', groups: undefined ]
```

ตัวอย่าง 6.28 ใช้ regex เป็น /x{1,3}/ หมายถึงจะจับคู่ลำดับตัวอักษร "x" จำนวนอย่างน้อย 1 ตัว และมากสุด 3 ตัว โดยจะเจออักษร "xxx" ในสตริง "xxxx" ที่อินเด็กซ์ 0 (เจอ "x" แค่สามตัว ไม่ใช่เจอ "xxxx")
```js
var re = /x{1,3}/;
console.log(re.exec("xxxx"));   // [ 'xxx', index: 0, input: 'xxxx', groups: undefined ] 
```

ตัวอย่าง 6.29 ใช้ regex เป็น /a{2,}/ หมายถึงจะจับคู่ลำดับตัวอักษร "a" จำนวนอย่างน้อย 2 ตัว โดยจะเจออักษร "aaa" ในสตริง "zaaa" ที่อินเด็กซ์ 1 (เจอ "a" สามตัว)
```js
var re = /a{2,}/;
console.log(re.exec("zaaa"));    // [ 'aaa', index: 1, input: 'zaaa', groups: undefined ]
```

### การจับคู่แบบ assertions

ตัวอย่าง 6.30 ใช้ regex เป็น /^x/ หมายถึงจะจับคู่ตัวอักษร x จำนวน 1 ตัว ที่วางไว้ด้านหน้าสุด โดยจะเจอในสตริง "x-ray" ที่อินเด็กซ์ 0
```js
var re = /^x/;
console.log(re.exec("x-ray"));    // [ 'x', index: 0, input: 'x-ray', groups: undefined ]
```
ตัวอย่าง 6.31 ใช้ regex เป็น /r$/ หมายถึงจะจับคู่ตัวอักษร r จำนวน 1 ตัว ที่วางไว้ด้านท้ายสุด โดยจะเจอในสตริง "car" ที่อินเด็กซ์ 2
```js
var re = /r$/;
console.log(re.exec("car"));    // [ 'r', index: 2, input: 'car', groups: undefined ]
```

ตัวอย่าง 6.32 ใช้ regex เป็น /\bfa/ หมายถึงจะจับคู่ชุดตัวอักษร "fa" ที่วางไว้ด้านหน้าสุดของคำใดคำหนึ่ง โดยจะเจอ "fa" ภายในคำ "father" ที่อินเด็กซ์ 2 (สตริงต้นทางคือ "A father is")
```js
var re = /\bfa/;
console.log(re.exec("A father is"));  // [ 'fa', index: 2, input: 'A father is', groups: undefined ] 
```

ตัวอย่าง 6.33 ใช้ regex เป็น /\bth/ หมายถึงจะจับคู่ชุดตัวอักษร "th" ที่วางไว้ด้านหน้าสุดของคำใดคำหนึ่ง ซึ่งปรากฏว่าไม่เจอชุดอักษรใดที่ตรงเงื่อนไข (สตริงต้นทางคือ "A father is")
```js
var re = /\bth/;
console.log(re.exec("A father is"));  // null
```

ตัวอย่าง 6.34 ใช้ regex เป็น  /er\b/ หมายถึงจะจับคู่ชุดตัวอักษร "er" ที่วางไว้ด้านหลังสุดของคำใดคำหนึ่ง โดยจะเจอ "er" ภายในคำ "father" ที่อินเด็กซ์ 6 (สตริงต้นทางคือ "A father is")
```js
var re = /er\b/;
console.log(re.exec("A father is"));  // [ 'er', index: 6, input: 'A father is', groups: undefined ] 
```

ตัวอย่าง 6.35 ใช้ regex เป็น /th\b/ หมายถึงจะจับคู่ชุดตัวอักษร "th" ที่วางไว้ด้านหลังสุดของคำใดคำหนึ่ง ซึ่งปรากฏว่าไม่เจอชุดอักษรใดที่ตรงเงื่อนไข (สตริงต้นทางคือ "A father is")
```js
var re = /th\b/;
console.log(re.exec("A father is"));  // null
```

ตัวอย่าง 6.36 ใช้ regex เป็น /\Bfa/ หมายถึงจะจับคู่ชุดตัวอักษร "fa" ที่ไม่ได้วางไว้ด้านหน้าสุดของคำใดคำหนึ่ง ซึ่งปรากฏว่าไม่เจอชุดอักษรใดที่ตรงเงื่อนไข (สตริงต้นทางคือ "A father is")
```js
var re = /\Bfa/;
console.log(re.exec("A father is"));  // null
```

ตัวอย่าง 6.37 ใช้ regex เป็น /\Bth/ หมายถึงจะจับคู่ชุดตัวอักษร "th" ที่ไม่ได้วางไว้ด้านหน้าสุดของคำใดคำหนึ่ง โดยจะเจอ "th" ภายในคำ "father" ที่อินเด็กซ์ 4 (สตริงต้นทางคือ "A father is")
```js
var re = /\Bth/;
console.log(re.exec("A father is"));  // [ 'th', index: 4, input: 'A father is', groups: undefined ]  
```

ตัวอย่าง 6.38 ใช้ regex เป็น /\Ber/ หมายถึงจะจับคู่ชุดตัวอักษร "er" ที่ไม่ได้วางไว้ด้านหน้าสุดของคำใดคำหนึ่ง โดยจะเจอ "er" ภายในคำ "father" ที่อินเด็กซ์ 6 (สตริงต้นทางคือ "A father is")
```js
var re = /\Ber/;
console.log(re.exec("A father is"));  // [ 'er', index: 6, input: 'A father is', groups: undefined ]  
```

ตัวอย่าง 6.39 ใช้ regex เป็น /er\B/ หมายถึงจะจับคู่ชุดตัวอักษร "er" ที่ไม่ได้วางไว้ด้านหลังสุดของคำใดคำหนึ่ง ซึ่งปรากฏว่าไม่เจอชุดอักษรใดที่ตรงเงื่อนไข (สตริงต้นทางคือ "A father is")
```js
var re = /er\B/;
console.log(re.exec("A father is"));  // null
```

ตัวอย่าง 6.40 ใช้ regex เป็น /th\B/ หมายถึงจะจับคู่ชุดตัวอักษร "th" ที่ไม่ได้วางไว้ด้านหลังสุดของคำใดคำหนึ่ง โดยจะเจอ "th" ภายในคำ "father" ที่อินเด็กซ์ 4 (สตริงต้นทางคือ "A father is")

```js
var re = /th\B/;
console.log(re.exec("A father is"));  // [ 'th', index: 4, input: 'A father is', groups: undefined ]  
```

ตัวอย่าง 6.41 ใช้ regex เป็น /fa\B/ หมายถึงจะจับคู่ชุดตัวอักษร "fa" ที่ไม่ได้วางไว้ด้านหลังสุดของคำใดคำหนึ่ง โดยจะเจอ "fa" ภายในคำ "father" ที่อินเด็กซ์ 2 (สตริงต้นทางคือ "A father is")
```js
var re = /fa\B/;
console.log(re.exec("A father is"));  // [ 'fa', index: 2, input: 'A father is', groups: undefined ] 
```

1) วิธี lookahead assertion จะมีรูปแบบ x(?=y) ดังตัวอย่าง
ตัวอย่าง 6.42 ใช้ regex เป็น /Java(?=Script)/ หมายถึงจะจับคู่คำว่า "Java" แต่ต้องตาม ด้วยคำว่า "Script" ด้วยรูปแบบ Java แล้วมีรูปแบบ (?=Script) แปะท้าย จึงเจอ "Java" ที่อินเด็กซ์ 10
```js
let re = /Java(?=Script)/;
console.log(re.exec("This is a JavaScript book"));           
// [ 'Java', index: 10, input: 'This is a JavaScript book', groups: undefined ] 
```

ตัวอย่าง 6.43 ใช้ regex เป็น /[wW]atch(?=ed|ing)/ หมายถึงจะจับคู่คำว่า "watch" หรือ "Watch" แต่ต้องตามด้วย "ed" หรือ "ing" ด้วยรูปแบบ [wW]atch แล้วมีรูปแบบ (?=ed|ing) แปะท้าย จึงเจอ "watch" ที่อินเด็กซ์ 2
```js
let re = /[wW]atch(?=ed|ing)/;
console.log(re.exec("I watched TV")); 
// [ 'watch', index: 2, input: 'I watched TV', groups: undefined ]  
```
2) วิธี negative lookahead assertion จะมีรูปแบบ x(?!y) ดังตัวอย่าง
ตัวอย่าง 6.44 ใช้ regex เป็น /test_(?!js|txt)/ หมายถึงจะจับคู่คำว่า "test_" แล้วตามหลังด้วยรูปแบบ (?!js|txt) หรือก็คือต้องไม่ต่อท้ายด้วย "js" หรือ "txt" จึงเจอ "test_" ที่อินเด็กซ์ 17
```js
let  re = /test_(?!js|txt)/;
console.log(re.exec("test_js test_txt test_html")); 
// [ 'test_', index: 17, input: 'test_js test_txt test_html', groups: undefined ] 
```

1) วิธี lookbehind assertion จะมีรูปแบบ (?<=y)x 
ตัวอย่าง 6.45 ใช้ regex เป็น /(?<=Java)Script/ หมายถึงจะจับคู่คำว่า "Script" แต่ต้องขึ้นต้นตัวหน้าเป็น "Java" ด้วยรูปแบบ (?<=Java) และมีรูปแบบ Script แปะท้าย จึงเจอ "Script" ที่อินเด็กซ์ 14
```js
let re = /(?<=Java)Script/;
console.log(re.exec("This is a JavaScript book"));
// [ 'Script', index: 14, input: 'This is a JavaScript book', groups: undefined ]
```

ตัวอย่าง 6.46 ใช้ regex เป็น /(?<=Java)[a-zA-Z\s]+/ หมายถึงจะจับคู่คำด้วยรูปแบบ [a-zA-Z\s]+ แต่ต้องขึ้นต้นตัวหน้าเป็น "Java" ด้วยรูปแบบ (?<=Java) และมีรูปแบบ [a-zA-Z\s]+ แปะท้าย จึงเจอ "Script book" ที่อินเด็กซ์ 14

```js
let  re = /(?<=Java)[a-zA-Z\s]+/;
console.log(re.exec("This is a JavaScript book"));
// [ 'Script book', index: 14, input: 'This is a JavaScript book', groups: undefined ] 
```

2) วิธี negative lookbehind assertion จะมีรูปแบบ (?<!y)x ดังตัวอย่าง
ตัวอย่าง 6.47 ใช้ regex เป็น /(?<!test).js/ หมายถึงจะจับคู่ด้วยคำว่า ".js" ด้วยรูปแบบ .js แต่ต้องไม่ขึ้นต้นด้วยคำว่า "test" ด้วยรูปแบบ (?<!test) จึงเจอคำว่า ".js" ที่อินเด็กซ์
```js
let re = /(?<!test).js/;
console.log(re.exec("index.html run.js"));
// [ '.js', index: 14, input: 'index.html run.js', groups: undefined ] 
```

### การระบุตัวอักษรพิเศษที่จับคู่

ตัวอย่าง 6.48 ใช้ regex เป็น /\t/ หมายถึงจะจับคู่แท็บในสตริง ซึ่งแท็บก็จะเหมือนเป็นตัวอักษรหนึ่งตัว โดยจะค้นหาตัวแรกที่พบเจอ ซึ่งจะเจอแท็บครั้งแรกที่อินเด็กซ์ 1
```js
var re = /\t/;
console.log(re.exec("<	>"));    // [ '        ', index: 1, input: '<        >', groups: undefined ]  
```

ตัวอย่าง 6.49 ใช้ regex เป็น /\x41/ ซึ่งรหัส \x41 ก็คืออักษร "A" หมายถึงจะจับคู่อักษร "A" ในสตริง โดยจะค้นหาตัวแรกที่พบเจอ ซึ่งจะเจออักษร "A" ในสตริง "THAI" ที่อินเด็กซ์ 2
```js
var re = /\x41/;
console.log(re.exec("THAI"));     // [ 'A', index: 2, input: 'THAI', groups: undefined ] 
```

ตัวอย่าง 6.50 ใช้ regex เป็น /\u0E14/ ซึ่งรหัส \u0E14 ก็คืออักษร "ด" หมายถึงจะจับคู่อักษร "ด" ในสตริง โดยจะค้นหาตัวแรกที่พบเจอ ซึ่งจะเจออักษร "ด" ในสตริง "แดง" ที่อินเด็กซ์ 1
```js
var re = /\u0E14/;
console.log(re.exec("แดง"));     // [ 'ด', index: 1, input: 'แดง', groups: undefined ] 
```

ตัวอย่าง 6.51 ใช้ regex เป็น   /\+/, /\*/,/\?/,  /\\/, /\./ โดยต้องมีเครื่องหมาย \ วางนำหน้า เพื่อจับคู่อักษร  "+", "*", "?", "\", "." ไม่เช่นนั้นจะจับคู่ไม่ได้ เพราะอักษรพวกนี้ถูกใช้เป็นสัญลักษณ์หนึ่งภายใน regex จึงจับคู่โดยตรงไม่ได้
```js
console.log(/\+/.test("+"));            // true
console.log(/\*/.test("*"));             // true
console.log(/\?/.test("?"));             // true
console.log(/\\/.test("\x5C"));        // true  -- x5c คือค่า ASCII ของ "\"
console.log(/\./.test("."));              // true 
```

```js
var re = /./;
console.log(re.exec("dog"));    // [ 'd', index: 0, input: 'dog', groups: undefined ]
```

```js
var re = /.ox/;
console.log(re.exec("boxes"));    //[ 'box', index: 0, input: 'boxes', groups: undefined ] 
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
var re = / /;
console.log(re.exec("^ ^"));    // [ ' ', index: 1, input: '^ ^', groups: undefined ]
```

```js
var re = /\S/;
console.log(re.exec(" @"));    // [ '@', index: 1, input: ' @', groups: undefined ] 
```

```js
var re = /<p>.*<\/p>/;
console.log(re.exec("<div><p>@test</p></div>"));
// [ '<p>@test</p>', index: 5, input: '<div><p>@test</p></div>', groups: undefined ] 
```

```js
var re = /^\d\w{1,}/;
console.log(re.exec("1_log.txt"));  // [ '1_log', index: 0, input: '1_log.txt', groups: undefined ] 
```

### Unicode character properties

```js
var result = /\p{Script=Greek}+/u.test("μετά");
console.log(result);      // true
var result = /\p{Script=Thai}+/u.test("หนังสือไทย");
console.log(result);     // true
```

```js
var result = /\p{Uppercase_Letter}/u.test( "THAI" );
console.log(result);      // true
```

```js
var result = /\p{General_Category=Uppercase_Letter}/u.test( "THAI" );
console.log(result);      // true
```

```js
var str = "This is a book.";
var result = /\p{White_Space}/u.test( str );
console.log(result);         // true
var result = /\p{Lowercase_Letter}/u.test (str );
console.log(result);         // true
var result = /\p{Uppercase_Letter}/u.test (str );
console.log(result);         // true
```

### Capture groups

```js
var result = /(log)_(html)/.exec("save log_html.txt");
console.log(result.index);	                         // 5
console.log(result[0]);	                         // "log_html"
console.log(result[1]);	                         // "log"
console.log(result[2]);	                         // "html"
console.log(result.input);	                         // "save log_html.txt"
```

```js
var re = /file{2}/;
console.log(re.exec("filefile"));     // null
console.log(re.exec("filee"));       // [ 'filee', index: 0, input: 'filee', groups: undefined ] 
var re = /(file){2}/;
console.log(re.exec("filefile"));    // [ 'filefile', 'file', index: 0, input: 'filefile', groups: undefined ] 
```

```js
var re =  /(?:<p>)abc(?:<\/p>)/;
let result = re.exec("<p>abc</p>");    
console.log(result[0]);    // "<p>abc</p>"
console.log(result[1]);    // undefined
console.log(result[2]);    // undefined
console.log(result);       // [ '<p>abc</p>', index: 0, input: '<p>abc</p>', groups: undefined ] 
```

```js
let re = /([a-z]+).js/;
console.log(re.exec("test index.js"));
// [ 'index.js', 'index', index: 5, input: 'test index.js', groups: undefined ]  
```

```js
let re = /(?<filename>[a-z]+).js/;
let matchObj = re.exec("test index.js") 
console.log(matchObj);  
/* แสดงผลลัพธ์
[
  'index.js',
  'index',
  index: 5,
  input: 'test index.js',
  groups: { filename: 'index' } 
] */
console.log(matchObj .groups.filename);      // "index"
```

```js
var re = /bk(@)th(.>)com\2/;
console.log(re.exec("bk@th=>com=>mail"));     
// [ 'bk@th=>com=>', '@', '=>', index: 0, input: 'bk@th=>com=>mail', groups: undefined ]  
```

```js
var re = /talk(?<tense>ed|ing) & watch\k<tense>/;
console.log(re.exec("talked & watched"));     
// [ 'talked & watched', 'ed', index: 0, input: 'talked & watched', groups: { tense: 'ed' } ] 
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

### พร็อพเพอร์ตี้ flags
```js
var myRegex = /foo/i;
console.log(myRegex.source);     		// "foo"
console.log(myRegex.flags);      		// "i"
```

### แฟล็ก i
```js
var re = /thai/i;
console.log("I' am THAI".search(re));          // 6
```

### แฟล็ก  m

```js
var str = "I' am Thai.\nI live in Bangkok."
var re1 = /Thai.$/;
var re2 = /Thai.$/m;
console.log(str.search(re1));          // -1   -- หาไม่เจอ
console.log(str.search(re2));          // 6
```

```js
var str = "It's a good job.\nThe best show.";
var re1 = /^The/;
var re2 = /^The/m;
console.log(str.search(re1));          // -1   -- หาไม่เจอ
console.log(str.search(re2));          // 17
```

```js
let regex = /foo/m;
console.log(regex.multiline);          // true
```


### แฟล็ก g

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

### แฟล็ก u

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
console.log(result1.length);	// 6
// ถ้าไม่ใช้แฟล็ก u จะนับตัวอักษรผิด
var result2 =  "𠮷กขคง𤭢".match(/[\s\S]/g);
console.log(result2.length); 	// 8
```

```js
let regex = /foo/u;
console.log(regex.unicode);          // true
```

### แฟล็ก y
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
var  regex = /foo\d_?/;                             // ไม่มีแฟล็ก
var  regexG = /foo\d_?/g;		             // แฟล็ก g
var  regexY = /foo\d_?/y;		             // แฟลก y
regex.lastIndex = 1;
regexG.lastIndex = 1;
regexY.lastIndex = 1;
var result = regex.exec(str);
var resultG = regexG.exec(str);
var resultY = regexY.exec(str);
console.log(result[0]);   			 // "foo1_" 
console.log(resultG[0]);   		 // "foo2_"
console.log(resultY);   			 // มีค่าเป็น null เพราะค้นหาไม่เจอข้อความ
```

```js
var  myRegex = /foo+/y;
console.log(myRegex.sticky);     // true
myRegex.sticky = 1;  // ไม่สามารถแก้ไขค่าได้ มีไว้อ่านอย่างเดียว ถ้าอยู่ในโหมดสตริคท์จะเกิด TypeError
console.log(myRegex.sticky);     // true
```

### แฟล็ก s (dotAll)

```js
let regex = /./;
let result = regex.test("\n");
console.log(result);             // false
```

```js
let regex = /./s;
let result = regex.test("\n");
console.log(result);                    // true
```

```js
let regex = /./s;
console.log(regex.dotAll);          // true
```

### แฟล็ก d

```js
let matchObj = /bar/d.exec("foo bar");
console.log(matchObj)
/* แสดงผลลัพธ์เป็น
[
  'bar',
  index: 4,
  input: 'foo bar',
  groups: undefined,
  indices: [ [ 4, 7 ], groups: undefined ]
] */
console.log(matchObj.indices[0])               // [ 4, 7 ] -- จะเป็นตำแหน่งของคำว่า "bar"
```

```js
let matchObj = /(foo).(bar)/d.exec("0123foo_bar");
console.log(matchObj);	       
/* แสดงผลลัพธ์
[
  'foo_bar',
  'foo',
  'bar',
  index: 4,
  input: '0123foo_bar',
  groups: undefined,
  indices: [ [ 4, 11 ], [ 4, 7 ], [ 8, 11 ], groups: undefined ]
] */     
console.log(matchObj.indices[0])         // [ 4, 11 ]  -- จะเป็นตำแหน่งของคำว่า "foo_bar"
console.log(matchObj.indices[1])         // [ 4, 7 ]  -- จะเป็นตำแหน่งของคำว่า "foo"
console.log(matchObj.indices[2])         // [ 8, 11 ] -- จะเป็นตำแหน่งของคำว่า "bar"
```

```js
let matchObj = /(?<first>foo).(?<last>bar)/d.exec("0123foo_bar");
console.log(matchObj);	     
/* แสดงผลลัพธ์
[
  'foo_bar',
  'foo',
  'bar',
  index: 4,
  input: '0123foo_bar',
  groups: { first: 'foo', last: 'bar' },
  indices: [
    [ 4, 11 ],
    [ 4, 7 ],
    [ 8, 11 ],
    groups: { first: [ 4, 7 ], last: [ 8, 11 ] }
  ]
] */     
console.log(matchObj.indices.groups.first)         // [ 4, 7 ]
console.log(matchObj.indices.groups.last)         // [ 8, 11 ]
```

```js
let regex = /bar/d;
console.log(regex.hasIndices);          // true
```

### RegExp
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
var myRegex = new RegExp("foo", "y"); // จะเสมือนเขียน var myRegex = /foo/y;	
console.log(myRegex.exec("foo_abc"));  // [ 'foo', index: 0, input: 'foo_abc', groups: undefined ]
```