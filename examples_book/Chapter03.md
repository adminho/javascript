
# บทที่ 3 ทบทวนประโยคคำสั่งเบื้องต้น

## บล็อก
```js
{
    var a = 2;	// ประโยคคำสั่ง 1
    a++;		 // ประโยคคำสั่ง 2
    console.log(a);  // ประโยคคำสั่ง 3	 
}
```

```js
if (true) {
    var a = 2;	// ประโยคคำสั่ง 1
    a++;		 // ประโยคคำสั่ง 2
    console.log(a);  // ประโยคคำสั่ง 3
}
```

## ประโยคคำสั่ง while
```js
var i = 0;
while (i < 3) {
  console.log(i);
  i++;
}
/* แสดงผลลัพธ์
0
1
2 */
```

## ประโยคคำสั่ง do …while
```js
var i = 0;
do{  
  console.log(i);
  i++;
} while (i < 3);
/* แสดงผลลัพธ์
0
1
2 */
```

## ประโยคคำสั่ง for 
```js
for(var i=0; i<3; i++){
  console.log(i);
}
/* แสดงผลลัพธ์
0
1
2 */
```

## ประโยคคำสั่ง continue
```js
for(var i=0; i<3; i++){
  if(i<=1){
	continue;	// ข้ามประโยคคำสั่งที่เหลือ ไปทำงานรอบถัดไปแทน
  }
  console.log(i);
}
// แสดงผลลัพธ์
// 2
```

## ประโยคคำสั่ง break
```js
for(var i=0; i<3; i++){
  if(i==2){
	break;
  }
  console.log(i);
}
/* แสดงผลลัพธ์
0
1 */
```

## ประโยคคำสั่ง label
```js
outer: for(var i=0; i < 2; i++)	{	// บรรทัด a
       console.log("i: ", i);
 	for (var j=0; j < 3; j++ ) {	
        	if ( j == 1){
          		continue outer;	// บรรทัด b
       	}
       	console.log("j: ", j);
	}// สิ้นสุดประโยคคำสั่ง for
} // สิ้นสุดประโยคคำสตั่ง for ที่ได้ติดฉลาก outer: for
/* แสดงผลลัพธ์
"i:  0"
"j:  0"
"i:  1"
"j:  0" */
```

```js
outer: while(true){					// บรรทัด a
    for (var i=0; i < 3; i++ ) {	
             if ( i == 1){
                break outer;			// บรรทัด b
             }
          console.log("i: ", i);
   }// สิ้นสุดประโยคคำสั่ง for
}// สิ้นสุดประโยคคำสั่ง while
// แสดงผลลัพธ์
// "i:  0"
outer: while(true){					// บรรทัด a
    for (var i=0; i < 3; i++ ) {	
             if ( i == 1){
                break outer;			// บรรทัด b
             }
          console.log("i: ", i);
   }// สิ้นสุดประโยคคำสั่ง for
}// สิ้นสุดประโยคคำสั่ง while
// แสดงผลลัพธ์
// "i:  0"
```

## ประโยคคำสั่ง if
```js
// var i = 1;
// var i = 2;
// var i = 3;

if(i == 1)
console.log("if statement");
else if(i == 2) 
	console.log("else if statement");
else 
	console.log("else statement");
```

## ประโยคคำสั่ง switch
```js
// var i = 1;
// var i = 2;
// var i = 3;
switch (i) {
  case 1:
    console.log("case1");		// ถ้า i มีค่าเป็น 1 ก็จะมาทำประโยคนี้
    break;				// ออกจากประโยค switch
  case 2:
    console.log("case2");		// ถ้า i มีค่าเป็น 2 ก็จะมาทำประโยคนี้
    break;				// ออกจากประโยค switch
  default:
    console.log("case_default"); // ถ้า i ไม่ใช่ 1 กับ 2 ก็จะมาทำประโยคนี้

}
```

```js
switch (1) {
  case 1:
    console.log("case1");	
  case 2:
    console.log("case2");	
  default:
    console.log("case_default"); 
}
/* แสดงผลลัพธ์เป็น
"case1"
"case2"
"case_default" */
```

```js
switch (1) {
  case 1:
  case 2:
  default:
    console.log("case_default"); 
}
// แสดงผลลัพธ์เป็น
// "case_default"
```

## โอเปอเรเตอร์แบบเงื่อนไข 
```js
// var condition = true;
// var condition = false;
var value = condition ? "foo" : "bar";
console.log(value);		// "foo" หรือ  "bar"
```

```js
// var condition = true;
// var condition = false;
var value;
if(condition){
value = "foo";
} else {
	value = "bar";
}
console.log(value);	// "foo" หรือ  "bar"
```

## ปการจัดการความผิดพลาด 
```js
throw "Error";   		// โยน exception เป็นชนิดข้อมูลสตริง
throw 100;       		// โยน exception เป็นชนิดข้อมูลตัวเลข
throw true;      		// โยน exception เป็นชนิดข้อมูลบูลีน
throw new Object(); 	// โยน exception เป็นชนิดข้อมูลอ็อบเจ็กต์
throw new Error("Error")   // โยน exception เป็นชนิดข้อมูลอ็อบเจ็กต์
```

```js
console.log(x); 		// ReferenceError
```

```js
new Error(["ข้อความ error"])
```

```js
throw new SyntaxError ("Syntax error");
```

## ประโยคคำสั่งจัดการความผิดพลาด
```js
try {
  console.log(x);			// บรรทัด a
      x++;					// บรรทัด b
} catch (e) {
  console.log(typeof e);   	// "object"
  console.log(e.message);        	// "x is not defined" 
  console.log(e.name);           	// "ReferenceError"  
}
console.log("Last statement");	// บรรทัด c
/* แสดงผลลัพธ์เป็น
"object"
"x is not defined"
"ReferenceError"
"Last statement" */
```

```js
try {
throw 42;		// โยน exception ออกมาเอง
console.log(42);	// เส้นทางการทำงานของโปรแกรมจะมาไม่ถึง
} catch (e) {
  	console.log(e); 	// 42
}
console.log("Last statment");
/* แสดงผลลัพธ์
42
"Last statment" */
```

```js
try {
console.log(x);		// บรรทัด a
} catch (e){
  	console.log(e.message); 	// "x is not defined"
} finally {
	console.log("finally");	
}
console.log("Last statement");	
/* แสดงผลลัพธ์
"x is not defined" 
"finally";
"Last statement" */
```

```js
try {
console.log("no error");	
} catch (e){
  	console.error(e.message); 	
} finally{
	console.log("finally");	
}
console.log("Last statement ");		
/* แสดงผลลัพธ์
"no error" 
"finally";
"Last statement" */
```

```js
function foo(){
try {
 	return "foo";
} finally{
		console.log("finally");
}
} 
console.log(foo()); 
/* แสดงผลลัพธ์
"finally";
"foo"; */
```
