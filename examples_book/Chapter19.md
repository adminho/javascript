# โค้ดบทที่ 19 การใช้งาน async กับ await

## ประกาศฟังก์ชั่นด้วย async

* กรณีที่ฟังก์ชันแบบ async รีเทิร์นพรอมิสที่เป็น fulfilled

```js
async function asyncFunc() { 
  return 123;                  // บรรทัดที่ 2      
}
```

* เสมือนเขียนดังนี้
```js
function asyncFunc() {                            // เสมือนเขียนฟังก์ชันปกติธรรมดา
  return new Promise( resolve => {          // จะรีเทิร์นพรอมิส
    resolve(123);                                      // จากประโยค return 123 เสมือนเรียก resolve(123)
  });
}
```

```js
async function asyncFunc() {
    return 123;                                        // 123 คือค่าที่ส่งไปให้ฟังก์ชั่นคอลแบ็คของ then()
}
asyncFunc()                                            // บรรทัด a
.then(x => console.log(x));                       // 123
```

```js
async function asyncFunc() {
    console.log("aysnc function");
    // บรรทัด 3 - จะเสมือนมีประโยค return undefined; 
}
```

```js
function asyncFunc() {                            // เสมือนเขียนฟังก์ชั่นปกติธรรมดา
  return new Promise( resolve => {           // จะรีเทิร์นพรอมิส
    console.log("aysnc function");             // โค้ดถูกห่ออยู่ในพรอมิสที่สร้างขึ้นมา
    resolve(undefined);                             // จะเสมือนมี resolve(undefined) ต่อท้าย                
  });
}
```

```js
async function asyncFunc() {
    console.log("aysnc function");               
    // บรรทัด 3 - จะเสมือนมีประโยค return undefined;  
}
asyncFunc()                                            // บรรทัด a -- เรียกฟังก์ชันให้ทำงาน
.then(x => console.log(x));	            // undefined
/* แสดงผลลัพธ์
"aysnc function"
undefined */
```

* กรณีที่ฟังก์ชันแบบ async รีเทิร์นพรอมิสที่เป็น rejected

```js
async function asyncFunc() {
    throw new Error("Problem!");  // error ที่ส่งไปให้ฟังก์ชั่นคอลแบ็คของ catch
}
```

* เสมือนเขียนดังนี้

```js
function asyncFunc() {
  return new Promise( (resolve, reject) => {
       reject( new Error("Problem!") ) ;
  });
}
```

```js
async function asyncFunc() {
    throw new Error("Problem!");  // error ที่ส่งไปให้ฟังก์ชั่นคอลแบ็คของ catch
}
asyncFunc()
.catch(err => console.log(err));    // Error: Problem!
```

```js
async function asyncFunc() {
    console.log("aysnc function()");              // บรรทัด a -- ซิงโครนัส 
    return 123;                                          // บรรทัด b 
}
console.log("Start");                                 // บรรทัด c -- ซิงโครนัส 
asyncFunc().                                            // บรรทัด d
then(x => console.log(`Resolved: ${x}`));     // บรรทัด e - อะซิงโครนัส
console.log("End"); 			 // บรรทัด f  - ซิงโครนัส
/* แสดงผลลัพธ์
"Start"
"aysnc function()"
"End"
"Resolved: 123" */
```

* เมื่อฟังก์ชันแบบ async รีเทิร์นพรอมิสออกมาโดยตรง

```js
async function asyncFunc() {
    return Promise.resolve(123);                 // บรรทัด a -- ส่งพรอมิสที่เป็น fulfilled ออกมา
}
asyncFunc()                                            // บรรทัด b
.then(x => console.log(x))                        // 123
```
	
```js
async function asyncFunc() {
    return Promise.reject(new Error('Problem!'));  // บรรทัด a ส่งพรอมิสที่เป็น rejected ออกมา
}
asyncFunc()                                             // บรรทัด b
.catch(err => console.error(err));                // Error: Problem!
```

* สรุป การรีเทิร์นของฟังก์ชั่นแบบ asyn ก็ใช้หลักเกณฑ์เดียวกันกับการ return ของพรอมิส

```js
async function asyncFunc() {
    return otherAsyncFunc();
}
```

```js
async function asyncFunc() {
    return await otherAsyncFunc();
}
```

## การใช้งาน await

```js
async function asyncFunc() {
   let result = await new Promise(resolve => resolve(123));   // บรรทัด a
   console.log(result);                                                       // บรรทัด b
}
asyncFunc();    // 123
```

```js
async function asyncFunc() {
   return new Promise( resolve => resolve(123) )
   .then( result => console.log(result) );  
}
asyncFunc();    // 123
```

```js
async function asyncFunc() {
    return await new Promise(resolve => resolve(123));          // return นำหน้า await
}
```

```js
async function asyncFunc() {                  
    // เสมือนเขียน
   let result = await new Promise(resolve => resolve(123));   // result = 123
   return result;  // รีเทิร์นพรอมิส พร้อมส่งค่า result = 123 ออกไป                                          
}

asyncFunc()    
.then( value => console.log(value))
// แสดงผลลัพธ์
// 123
```

```js
async function asyncFunc() {
  try {
    let result = await new Promise((resolve, reject) => reject("Error!"));  // บรรทัด a
   } catch (err) {                                          
    console.log(err);      // บรรทัด b
  }   
}
asyncFunc(); // "Error!"
```

```js
async function asyncFunc() {
  return new Promise((resolve, reject) => reject("Error!"))
  .catch(err => console.log(err));  
}
asyncFunc();   // "Error!"
```

```js
async function otherAsyncFunc(ms) {
   return new Promise (resolve =>                 
      setTimeout( () => {
            console.log("call otherAsyncFunc");      // บรรทัด a
            resolve("Time out");                           // บรรทัด b
     }
    , 1000)    // กำหนดระยะเวลาในการ timeout ไป 1000 ms หรือ 1 วินาที
  );
}
```

หมายเหตุ ถ้าจะรันโค้ดนี้ให้ก็อปปี้การประกาศ otherAsyncFunc() มาด้วย

```js
async function asyncFunc() {
  console.log("Start");                                      // บรรทัด a
  otherAsyncFunc();                                         // บรรทัด b
  console.log("End");                                       // บรรทัด c
}
asyncFunc();
/* แสดงผลลัพธ์
"Start"
"End"
"call otherAsyncFunc" */
```

หมายเหตุ ถ้าจะรันโค้ดนี้ให้ก็อปปี้การประกาศ otherAsyncFunc() มาด้วย

```js
async function asyncFunc() {
  console.log("Start");                              // บรรทัด a
  await otherAsyncFunc();                         // บรรทัด b
  console.log("End");                               // บรรทัด c
}
asyncFunc();
/* แสดงผลลัพธ์
"Start"
"call otherAsyncFunc"
"End" */
```

หมายเหตุ ถ้าจะรันโค้ดนี้ให้ก็อปปี้การประกาศ otherAsyncFunc() มาด้วย

```js
async function asyncFunc() {
  console.log("Start");                              // บรรทัด a
  let result = await otherAsyncFunc();        // บรรทัด a
  console.log(result);                                // บรรทัด b
}
asyncFunc();
/* แสดงผลลัพธ์
"Start"
"call otherAsyncFunc"
"Time out" */
```

* การใช้ awiat แบบเรียงต่อเนื่องกัน

```js
async function otherAsyncFunc(ms) { // ส่งค่าอากิวเมนต์เข้ามา
   return new Promise (
                 resolve =>  setTimeout(
                   () => resolve(`Time out: ${ms} ms`, ms )
                   ,ms )   // กำหนด timeout หน่วยเป็นมิลลิวินาที (millisecond)
             );
}
```

```js
async function asyncFunc() {
    let result1 = await otherAsyncFunc(1000);      // บรรทัด a -- รอพรอมมิสทำงานก่อน
    console.log(result1);
    let result2 = await otherAsyncFunc(2000);      // บรรทัด b -- รอพรอมมิสทำงานก่อน
    console.log(result2);
}
asyncFunc();                                                   // บรรทัด c
/* แสดงผลลัพธ์
Time out: 1000 ms
Time out: 2000 ms */
```

```js
function asyncFunc() {
    return otherAsyncFunc(1000)          	 // ทำงานก่อน
    .then(result1 => {
        console.log(result1);
        return otherAsyncFunc(2000);    	 // ทำงานทีหลัง
    })
    .then(result2 => {
       console.log(result2);
    });
}
asyncFunc();                                            // เรียกให้ทำงาน
```

* ประยุกต์ใช้งาน await ร่วมกับ Promise.all() เพื่อให้ฟังก์ชันทำงานคู่ขนาน

```js
async function asyncFunc() {
    let [result1, result2] = await Promise.all([
        otherAsyncFunc(1000),                     // บรรทัด a -- ทำงานคู่ขนานกัน
        otherAsyncFunc(2000),                     // บรรทัด b -- ทำงานคู่ขนานกัน
    ]);
    console.log(`${result1}, ${result2}`);        // บรรทัด c
}
asyncFunc();                                           // เรียกให้ทำงาน
// Time out: 1000 ms, Time out: 2000 ms
```

```js
function asyncFunc() {
    return Promise.all([
        otherAsyncFunc(1000),
        otherAsyncFunc(2000),
    ])
    .then( ([result1, result2]) => {
        console.log(`${result1}, ${result2}`);    
    });
}
asyncFunc();                                            // เรียกให้ทำงาน
```

* ตัวอย่างเปลี่ยนจากการเรียกเมธอด then() ต่อเนื่อง มาเป็น await จะสะดวกกว่า
* [ไฟล์ json.php](json.php)
	
```js
fetch("https://patanasongsivilai.com/example/json.php")     // บรรทัด a
.then( res =>  res.text())                            // บรรทัด b
.then( txt =>  console.log(txt) );                 // บรรทัด c
console.log("Hello");
// แสดงผลลัพธ์
// "Hello"
// {"name":"Somchai","age":30,"city":"Bangkok"}
```

```js
let res = await fetch("https://patanasongsivilai.com/example/json.php")  // บรรทัด a
let txt = await res.text()                           // บรรทัด b
console.log(txt)                                      // บรรทัด c
console.log("Hello");                              // บรรทัด d
// แสดงผลลัพธ์
// {"name":"Somchai","age":30,"city":"Bangkok"}
// "Hello"
```

```js
function myFunc() {                                     // ไม่มี async นำหน้า
    let result1 = await otherAsyncFunc(1000);   // "Error!"
}
```

```js
let result = await Promise.resolve("Success!");
console.log(result);      // "Success!"
```

```js
try {
     await Promise.reject("Error!");
} catch (error) {
      console.log(error);   // "Error!"
}  
```

```js
let result = await 123;
console.log(result)      // 123
```

```js
async function asyncFunc() {
    function innerFunc() {        
       return await otherAsyncFunc(1000);    // await อยู่ใต้ innerFunc() ไม่ได้  
    }
    innerFunc()
    .then(value => console.log(value))   
}
asyncFunc();  
```

```js
async function asyncFunc() {
    await function innerFunc() {        
       return await otherAsyncFunc(1000);    // await อยู่ใต้ innerFunc() ได้ 
    }
    innerFunc()
    .then(value => console.log(value))   
}
asyncFunc();   // Time out: 1000 ms
```

```js
async function foo() {
}
async function foo() {      // ประกาศชื่อ foo ซ้ำกันไม่ได้    
}
```

## Asynchronous iteration

```js
let asyncIterable = [1, 5, 10];
```

```js
asyncIterable[Symbol.asyncIterator]=createAsyncIterator;
```

```js
function createAsyncIterator() {
    let array = this;      // ในตัวอย่างนี้ this ชี้ไปยังอาร์เรย์ [1, 5, 10]
    let i =  0;              // เอาไว้นับจำนวนรอบเข้าถึงสมาชิกในอาร์เรย์
    return {  
        // ทุกครั้งที่เรียกใช้ next() ค่าของ i จะบวกเพิ่มเป็นหนึ่งทุกครั้ง
        next : function() {
                return new Promise( (resolve, reject) => {
	        // เมื่อเข้าถึงสมาชิกในอาร์เรย์ครบทุกตัว done จะมีค่าเป็น true
                  let done = (i >= array.length);    
	        // เข้าถึงสมาชิกในอาร์เรย์
	        let value = !done ? array[i++] : undefined;         		
                  // อ็อบเจ็กต์จะมีพร็อพเพอร์ตี้ value กับ done
                  let iteratorResult = { value, done };
                  resolve(iteratorResult);                                   // บรรทัด a
               });  // สิ้นสุดการประกาศพรอมิส
        }  // สิ้นสุดการประกาศฟังก์ชัน next()
     };    
}
```

```js
let asyncIterator = asyncIterable[Symbol.asyncIterator]();
```

```js
asyncIterator.next()                          // เรียก nex() ครั้งที่ 1
.then(function(iteratorResult ) {
  console.log(iteratorResult);            // { value: 1, done: false }
  return asyncIterator.next();            // เรียก nex() ครั้งที่ 2
})
.then(function(iteratorResult ) {
  console.log(iteratorResult);           // { value: 5, done: false }
  return asyncIterator.next();           // เรียก nex() ครั้งที่ 3
})
.then(function(iteratorResult ) {
  console.log(iteratorResult);          //  { value: 10, done: false }   
  return asyncIterator.next();           // เรียก nex() ครั้งที่ 4 ไม่มีสมาชิกให้เข้าถึง
})
.then(function(iteratorResult ) {
  console.log(iteratorResult);    
})
/* แสดงผลลัพธ์
{ value: 1, done: false }
{ value: 5, done: false }
{ value: 10, done: false }
{ value: undefined, done: true } 
*/
```

```js
let asyncIterator2 = asyncIterable[Symbol.asyncIterator]();
let obj1 = await asyncIterator2.next();
let obj2 = await asyncIterator2.next();
let obj3 = await asyncIterator2.next();
let obj4 = await asyncIterator2.next();
console.log(obj1);      // { value: 1, done: false }
console.log(obj2);       // { value: 5, done: false }
console.log(obj3);       // { value: 10, done: false }
console.log(obj4);       // { value: undefined, done: true }
```

## ประโยคคำสั่ง for ...await ...of

```js
for await (const x of asyncIterable) {
    console.log(x);
}
/* แสดงผลลัพธ์
1
5
10 */
```

```js
for await (const x of [1, 2, 3]) {
  console.log(x);
}
```

```js
let arr = [Promise.resolve("foo"), Promise.resolve("bar")];
for await (const item of arr) {
  console.log(item);
}
/* แสดงผลลัพธ์
"foo"
"bar" */
```

## Asynchronous generators


```js
async function* asynGenerator() {
  // ส่วนอินพุต
  let x = await myPromise;
  for await (const y of asyncIterable) {
    // ···
  }
  // ส่วนเอาท์พุต
  yield someValue;
  yield* otherAsyncGen();
}
```

```js
async function* asynGenerator () {
    yield 1;                                              // บรรทัด a
    yield 2;                                              // บรรทัด b
    yield 3;                                              // บรรทัด c
 }
let asyncIterable = asynGenerator();           // บรรทัด d
let asyncIterator = asyncIterable[Symbol.asyncIterator]();    // บรรทัด e
console.log(await asyncIterator.next());       // { value: 1, done: false }  
console.log(await asyncIterator.next());       // { value: 2, done: false }
console.log(await asyncIterator.next());       // { value: 3, done: false }
console.log(await asyncIterator.next());       // { value: undefined, done: true }
```

```js
for await(const i of asynGenerator()) {
      console.log(i)    // บรรทัด a
}
/* แสดงผลลัพธ์
1
2
3 */
```

```js
async function* asynGenerator () {
    yield Promise.resolve(1);                      // บรรทัด a
    yield Promise.resolve(2);                      // บรรทัด b
    yield Promise.resolve(3);                      // บรรทัด c
}
for await(const i of asynGenerator()) {
    console.log(i)                                      // บรรทัด d
 }
/* แสดงผลลัพธ์
1
2
3 */
```

```js
async function* otherAsynGenerator() {
    yield Promise.resolve(2); 
    yield Promise.resolve(3); 
}
async function* asynGenerator() {
    yield Promise.resolve(1);  
    yield  *otherAsynGenerator();            // บรรทัด a
    yield Promise.resolve(4);                  // บรรทัด c
} 
for await(const i of asynGenerator()) {
    console.log(i)                                        
 }
/* แสดงผลลัพธ์
1
2
3 
4 */
```
