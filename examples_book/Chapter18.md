# โค้ดบทที่ 18 พรอมิส

## พรอมิสคืออะไร

```js
let promise = new Promise(  function (resolve, reject) {  
	console.log(typeof resolve);	 // บรรทัด a
	console.log(typeof reject);	 // บรรทัด b
	console.log("Promise");		 // บรรทัด c
 } );
console.log("Last statement");		 // บรรทัด d
/* แสดงผลลัพธ์เป็น
"function"
"function"
"Promise"
"Last statement" */
```

## เมธอด then()

```js
function asynCode(resolve, reject) {  
	setTimeout( function() {		 // บรรทัด a
		/* ซอร์สโค้ดอื่น ๆ */
		//...
    		resolve("success");	  // บรรทัด b -- แจ้งว่าพรอมิสทำงานสำเร็จ 
	}, 1000);				 // ดีเลย์ 1 วินาที
};
let promise = new Promise(asynCode);	 // บรรทัด c
promise.then( 
	function (value) {		 // บรรทัด d -- มอนิเตอร์พรอมิส กรณีที่มันทำงานสำเร็จ
          		console.log("Promise:", value);	
       	}
);
console.log("Last statement");		 // บรรทัด e
/* แสดงผลลัพธ์เป็น
"Last statement"
"Promise: success" */
```

```js
let asynCode = function (resolve, reject) { 
	console.log("Start a job");
	let condition; 
	/* ซอร์สโค้ดอะซิงโครนัส */
	//...
	if (condition) {
		resolve("success");	// บรรทัด a -- แจ้งว่าพรอมิสทำงานสำเร็จ
	} else {
    		reject("failed");		// บรรทัด b -- แจ้งว่าพรอมิสทำงานไม่สำเร็จ	
	}
};
let promise = new Promise(asynCode);
promise.then( 
	function (value) {      	            // บรรทัด c -- มอนิเตอร์พรอมิส กรณีที่มันทำงานสำเร็จ
		console.log("Promise:",value);	       		
	}, function (reason) {  	           // บรรทัด d -- มอนิเตอร์พรอมิส กรณีที่มันทำงานไม่สำเร็จ
          		console.log("Promise:", reason);	       
	}
);
console.log("Last statement");				
// แสดงผลลัพธ์เป็น
// "Start a job"
// "Last statement"
// "Promise: success" หรือ "Promise: failed"
```

## เมธอด cath()

```js
let promise = new Promise(  function (resolve, reject) {  
	// เมื่อทำงานไม่สำเร็จ
	console.log("Start a job");
	reject("failed");			 // บรรทัด a
});
promise.catch( function (reason){		// บรรทัด b
	console.log("Promise:", reason);	
});
console.log("Last statement");				
/* แสดงผลลัพธ์เป็น
"Start a job"
"Last statement"
"Promise: failed" */
```

```js
let promise = new Promise( function(resolve, reject) {
    console.log("Start a job");
    throw new Error("Error in promise");	 // บรรทัด a
});
promise.catch( function(error) {		 // บรรทัด b
    console.log(error.message);   			
} );
console.log("Last statement");	
/* แสดงผลลัพธ์เป็น
"Start a job"
"Last statement"
"Error in promise" */
```

```js
let promise = new Promise( function(resolve, reject) {
    try{
	console.log("Start a job");
	throw new Error("Error in promise");		
    } catch(error) {
	reject(error);
    }
});
promise.catch( function(error) {
    console.log(error.message);        	
} );
console.log("Last statement");
/* แสดงผลลัพธ์เป็น
"Start a job"
"Last statement"
"Error in promise" */
```

## ตำแหน่งการวาง then() กับ cath()

```js
let promise = new Promise( function(resolve, reject ) {
	// resolve("success");
	// reject("failed");
});
console.log("Line 1");			 // บรรทัดที่ 1
//...
console.log("Line 2000");		             // บรรทัดที่ 2000
promise.catch( function(reason) {	             // จะวาง catch() ไว้หลังจากสร้างพรอมิสตำแหน่งใดก็ได้
	console.log("Promise:", reason);	        	
} );
//...
console.log("Line 5000");		             // บรรทัดที่ 5000
promise.then( function(value) {	             // จะวาง then() ไว้หลังจากสร้างพรอมิสตำแหน่งใดก็ได้
	console.log("Promise:", value);	        	
} );
```

```js
let promise = new Promise( function(resolve, reject) {
          console.log("Start a job");
          resolve("success");
});
promise.then( function(value) {		
	console.log("Outer Promise:", value);	        	
	promise.then( function (value) {	
 		console.log("Inner Promise:", value);	       		
	});
} );
console.log("Last statement");
/* แสดงผลลัพธ์เป็น
"Start a job"
"Last statement"
"Outer Promise: success"
"Inner Promise: success" */
```

```js
let promise = new Promise( function(resolve, reject) {
	console.log("Start a job");
	reject("failed");
});
promise.catch( function(reason) {		
	console.log("Outer promise:", reason);	        	
	promise.catch( function (reason) {		
		console.log("Inner promise:", reason);	       		
	});
} );
console.log("Last statement");
/* แสดงผลลัพธ์เป็น
"Start a job"
"Last statement"
"Outer promise: failed"
"Inner promise: failed" */
```

## เรียก then() แบบต่อเนื่อง

```js
let p1 = new Promise( function(resolve, reject) {
    resolve("success");			 // บรรทัด a
});
let p2 = p1.then(  function(value) {
    console.log("Promise:", value);	// บรรทัด b
});
p2.then( function() {			 // บรรทัด c
    console.log("Finish");			
});
/* แสดงผลลัพธ์เป็น
"Promise: success"
"Finish" */
```

```js
let promise = new Promise(function(resolve, reject) {
    resolve("success");
});
promise.then(function(value) {	             // then() ตัวแรก
    console.log("Promise:", value);			
}).then(function() {			 // then() ตัวที่สอง ฟังก์ชั่นคอลแบ็คจะไม่มีพารามิเตอร์
    console.log("then1: finish");
}). then(function() {			 // then() ตัวที่สาม ฟังก์ชั่นคอลแบ็คจะไม่มีพารามิเตอร์
    console.log("then2: finish");
});
/* แสดงผลลัพธ์เป็น
"Promise: success"
"then1: finish" 
"then2: finish" */
```

## ดักจับ error แบบต่อเนื่อง

```js
let promise = new Promise (function(resolve, reject) {
    throw new Error("error1");		 // บรรทัด a
});
promise.catch( function(error) {	             // catch() ตัวแรก
    console.log("catch1:", error.message);    
    throw new Error("error2");		
}).catch( function(error) {		            // catch() ตัวที่สอง
    console.log("catch2:", error.message);     		
    throw new Error("error3");		
}).catch( function(error) {		            // catch() ตัวที่สาม
    console.log("catch3:", error.message);    	
});
/* แสดงผลลัพธ์
"catch1: error1
"catch2: error2"
"catch3: error3" */
```

```js
let promise = new Promise(function(resolve, reject) {
    throw new Error("Error");		
});
promise.catch( function(error) {           // ฟังก์ชั่นชั่นคอลแบ็คของ catch() ตัวแรก จะทำงาน
    console.log(error.message);    
}).catch( function() {		       // ฟังก์ชั่นชั่นคอลแบ็คของ catch() ตัวที่สอง ไม่ถูกเรียกให้ทำงาน
    console.log("Last error");     			
});
// แสดงผลลัพธ์
// "Error"
```

```js
let promise = new Promise(function(resolve, reject) {
    throw new Error("Error");		
});
promise.catch( function(error) {		
    console.log(error.message);
}).then( function(value) {			
    console.log("Last then");         			
});
/* แสดงผลลัพธ์
"Error"
"Last then" */
```

## ประโยค return

```js
let promise = new Promise(function(resolve, reject) {
    resolve("success");
});
promise.then(function(value) {	             // then() ตัวแรก
    console.log("then1:", value);
    return 2;				 // ส่ง 2 ไปให้กับฟังก์ชั่นคอลแบ็คของ then() ตัวถัดไป
}).then(function(value) {		             // ประกาศฟังก์ชั่นคอลแบ็คให้มีพารามิเตอร์
    console.log("then2:", value);
    return 3;				 // ส่ง 3 ไปให้กับฟังก์ชั่นคอลแบ็คของ then() ตัวถัดไป
}). then(function(value) {		             // ประกาศฟังก์ชั่นคอลแบ็คให้มีพารามิเตอร์
    console.log("then3:", value);
});
/* แสดงผลลัพธ์เป็น
"then1: success"
"then2: 2"
"then3: 3" */
```

## การใช้ then() ร่วมกับ catch()


```js
let promise = new Promise( function(resolve, reject) {	// บรรทัด a
     reject("Promise:");
});
promise.then( function(value) {		
     console.log(value, "success");    	 // ไม่ถูกเรียกให้ทำงาน
}).catch( function(reason) {		
     console.log(reason, "failed");    	 // ถูกเรียกให้ทำงาน
});
// แสดงผลลัพธ์
// "Promise: failed"
```

```js
let promise = new Promise( function(resolve, reject) {
     resolve("Promise:");
});
promise.catch( function(value) {		
     console.log(value, "failed");    	 // ไม่ถูกเรียกให้ทำงาน
}).then( function(reason) {		
     console.log(reason, "success");    	 // ถูกเรียกให้ทำงาน
});
// แสดงผลลัพธ์
// "Promise: success"
```

```js
let promise = new Promise(function(resolve, reject) {
	throw new Error("Error");
});
promise.catch(function(error) {		
	console.log(error.message); 
	return 1;	       // สามารถส่ง 1 ไปให้ฟังก์ชั่นคอลแบ็คของ then() ตัวถัดไปได้
}).then(function(value) {			
	console.log("then:", value);    		
	return 2;	      // ไม่สามารถส่ง 2 ไปให้ฟังก์ชั่นคอลแบ็คของ  catch() ตัวถัดไปได้
}).catch(function(error) {			
	console.log("catch:", error);   	// ไม่ถูกเรียกให้ทำงาน	
});
/* แสดงผลลัพธ์
"Error"
"then: 1" */
```

```js
let promise = new Promise(function(resolve, reject) {
	throw new Error("Error");
});
promise.catch( function(error) {		
	console.log(error.message); 
	return 1;   
}).then( function(value) {			
	console.log("then:", value);    		
	throw 2;
}).catch( function(value) {			
	console.log("catch:", value);    	 // ถูกเรียกให้ทำงานได้	
});
/* แสดงผลลัพธ์
"Error"
"then: 1"
"catch: 2" */
```

## รีเทิร์นพรอมิส

```js
let p1 = new Promise( function(resolve, reject) {
    resolve("promise1");				
});
let p2 = new Promise( function(resolve, reject) {
    resolve("promise2");			 // บรรทัด a
});
let p3 = p1.then( function(value) {
    console.log("First then:", value);     
    return p2;				 // บรรทัด b
});
p3.then( function(value) {		 // บรรทัด c
    console.log("Second then:", value);     
});
/* แสดงผลลัพธ์
"First then: promise1"
"Second then: promise2" */
```

```js
let p1 = new Promise( function(resolve, reject) {
    resolve("promise1");
});
let p2 = new Promise( function(resolve, reject) {
    resolve("promise2");
});
p1.then( function(value) {
    console.log("First then:", value);     
    return p2;
}).then( function(value) {
    console.log("Second then:", value);     
});
/* แสดงผลลัพธ์
"First then: promise1"
"Second then: promise2" */
```

```js
let p1 = new Promise( function(resolve, reject) {
    resolve("success");
});	
let p2 = new Promise( function(resolve, reject) {
    reject("failed");
});
p1.then( function(value) {
    console.log("then:",value);     
    return p2;					
}).catch( function(value) {		 // บรรทัด a	
    console.log("catch:", value);     			
});
/* แสดงผลลัพธ์
"then: success"
"catch: failed" */
```

```js
let p1 = new Promise( function(resolve, reject) {
    console.log("Promise1");
    resolve("Success1");
});
p1.then( function(value) {
    console.log("p1.then:", value);        	
    let p2 = new Promise( function(resolve, reject) {	     // บรรทัด a 
        console.log("Promise2");
        resolve("Success2");			
    });
    return p2;					
}).then(function(value) {
     console.log("p2.then:", value);         
});
/* แสดงผลลัพธ์
"Promise1"
"p1.then: Success1"
"Promise2"
"p2.then: Success2" */
```

## การสร้างพรอมิสที่มีสถานะ settled

```js
let promise = Promise.resolve("Promise is fulfilled");
/*ไม่ต้องเสียเวลาเขียนแบบนี้
let promise = new Promise(function(resolve, reject) {
	resolve("Promise is fulfilled");
}); */
promise.then(function(value) {
    console.log(value);        
});
// แสดงผลลัพธ์เป็น
// "Promise is fulfilled"
```

```js
let promise = Promise.reject("Promise is rejected");
/*ไม่ต้องเสียเวลาเขียนแบบนี้
let promise = new Promise(function(resolve, reject) {
	reject("Promise is rejected");
}); */
promise.catch(function(reason) {
    console.log(reason);        
});
// แสดงผลลัพธ์เป็น
// "Promise is rejected"
```

```js
let thenable = {
    then(resolve, reject) {
        resolve("fulfilled");
    }
};
```

```js
let thenable = {
    then (resolve, reject) {
        console.log("thenable");
        resolve("fulfilled");	// บรรทัด a -- จะส่งค่า "fulfilled" ไปให้ promise.then()
    }
};
let promise = Promise.resolve(thenable);
promise.then(function(value) {
    console.log("then:", value);                  // บรรทัด b
});
/* แสดงผลลัพธ์เป็น
"thenable"
"then: fulfilled" */
```

## เมธอด finally()

```js
Promise.resolve("fulfilled")                               // บรรทัด a
.then( result => console.log("then:", result) )      // บรรทัด b
.catch( result =>  console.log("catch:", result) )     
.finally( () => console.log("finally") );                 // บรรทัด c
/* แสดงผลลัพธ์
"then: fulfilled"
"finally" */
```

```js
Promise.reject("rejected")                                // บรรทัด a
.then( result => console.log("then:", result) )
.catch( result => console.log("catch:", result) )  // บรรทัด b
.finally( () => console.log("finally") );                // บรรทัด c
/* แสดงผลลัพธ์
"catch: rejected"
"finally" */
```

```js
Promise.resolve("fulfilled")                               // บรรทัด a
.finally( () => console.log("finally") )                  // บรรทัด b
.then( result => console.log("then:", result) )      // บรรทัด c
.catch( result =>  console.log("catch:", result) );     
/*
"finally"
"then: fulfilled" */
```

```js
Promise.reject("rejected")                                 // บรรทัด a
.finally( () => console.log("finally") )                  // บรรทัด b
.then( result => console.log("then:", result) )          
.catch( result =>  console.log("catch:", result) );  // บรรทัด c
/*
"finally"
"catch: rejected" */
```

```js
Promise.reject("rejected")                                // บรรทัด a
.finally( () => { 
    throw "error from finally";                           // บรรทัด b
} )      
.catch( error => console.log(error) );                  // บรรทัด c
// แสดงข้อความ
// "error from finally"
```

```js
Promise.resolve("fulfilled")                    
.finally( ( ) => { return 1 } )                       // เขียนย่อเป็น .finally( ( ) => 1  )  ก็ได้
.then( value => console.log(value));
// แสดงผลลัพธ์
// "fulfilled"
```

```js
Promise.resolve("fulfilled")                          
.finally( () => console.log("finally") )          // มีแค่ finally() อย่างเดียว
// แสดงผลลัพธ์
// "finally"
```

## Promise.all()

```js
let p1 = Promise.resolve("Promise1");
let p2 = Promise.resolve("Promise2");
let p3 = Promise.resolve("Promise3");
let p4 = Promise.all([p1, p2, p3]);         // มอนิเตอร์ p1, p2 และ p3 ที่มีสถานะเป็น fulfilled ทุกตัว
p4.then(function(value) {
  console.log(value);     
});
// แสดงผลลัพธ์เป็น
// [ 'Promise1', 'Promise2', 'Promise3' ]
```

```js
let p1 = new Promise(function(resolve, reject) {
    resolve("Promise1:");
});
let p2 = new Promise(function(resolve, reject) {   	
	setTimeout( function(){         
		reject("Promise2:"); 
	},   1000);		      // ดีเลย์ไป 1 วินาที
});
let p3 = Promise.reject("Promise3:");
let p4 = Promise.all([p1, p2, p3]);       // มอนิเตอร์เฉพาะ p3 เพราะมีสถานะเป็น rejected ก่อนตัวอื่น
p4.then(
    function(value) { console.log(value, "success"); }
    ,function(value) { console.log(value, "failed"); }
);
// แสดงผลลัพธ์เป็น
// "Promise3: failed"
```

## Promise.race()

```js
let p1 = new Promise( function(resolve, reject) {
	setTimeout( function() {  
		resolve("Promise1:"); 
	},   500); 	// ดีเลย์ 0.5 วินาที
});
let p2 = new Promise( function(resolve, reject) {
	setTimeout( function() {  
		resolve("Promise2:"); 
	},   1000);	// ดีเลย์ 1 วินาที
});
let p3 = Promise.reject("Promise3:");
let p4 = Promise.race([p1, p2, p3]); // มอนิเตอร์เฉพาะพรอมิส p3 เพราะมีสถานะเป็น settled ก่อนตัวอื่น
p4.then(
     function(value) { console.log(value, "success"); }
     ,function(value) { console.log(value, "failed"); }
);
// แสดงผลลัพธ์เป็น
// "Promise3: failed"
```

## Promise.allSettled()

```js
let p1 = Promise.resolve(123);
let p2 = Promise.reject(456); 
Promise.allSettled( [p1, p2] );
```

```js
let p1 = Promise.resolve(123);
let p2 = Promise.reject(456); 
Promise.allSettled( [p1, p2] )           // allSettled() รีเทิร์นพรอมิสที่เป็น fulfilled
.then( arr => console.log(arr) );       // ค่า fulfillment และ rejection ที่ถูกส่งมาเป็นอาร์เรย์

/* แสดงผลลัพธ์
[
  { status: 'fulfilled', value: 123 },
  { status: 'rejected', reason: 456 }
] */
```

```js
let p1 = Promise.resolve(123);
let p2 = new Promise( resolve => {
    throw "Error"                                      // บรรทัด a
});
Promise.allSettled( [p1, p2] )                     // บรรทัด b
.then( arr => console.log(arr)  )                  // บรรทัด c
.catch( err => console.log(err)  );                // บรรทัด d -- ไม่ถูกเรียกให้ทำงาน

/* แสดงผลลัพธ์
[
  { status: 'fulfilled', value: 123 },
  { status: 'rejected', reason: 'Error' }
] */
```

## Promise.any() กับ AggregateError

```js
let p1 = Promise.resolve(123);
let p2 = Promise.resolve(456); 
let p3 = Promise.reject(789); 
Promise.any([p1, p2, p3]);
```

```js
Promise.any([p1, p2, p3])                          // p1 เป็น fulfilled ก่อน p2 
.then(value=> console.log(value) );            // จะส่งค่า 123 ของ p1 มาให้ then()  
// แสดงผลลัพธ์
// 123
```

```js
let p1 = new Promise( (resolve) => setTimeout(resolve, 3000) );  // หลับไป 3 วินาที
let p2 = Promise.resolve(456);                   // ทำงานเสร็จก่อน p1
let p3 = Promise.reject(789); 
Promise.any([p1, p2, p3])                          // p2 เป็น fulfilled ก่อนตัวอื่น 
.then(value=> console.log(value) );            // จะส่งค่า 456 ของ p2 มาให้ then() 
// แสดงผลลัพธ์
// 456 
```

```js
let p1 = Promise.reject("Error 1");
let p2 = Promise.reject("Error 2"); 
let p3 = Promise.reject("Error 3"); 
Promise.any([p1, p2, p3])
.catch(aggregateError => console.log(aggregateError));
/* แสดงผลลัพธ์
[AggregateError: All promises were rejected] {
  [errors]: [ 'Error 1', 'Error 2', 'Error 3' ]
}
*/
```

```js
Promise.any([p1, p2, p3])
.catch(aggregateError => console.log(aggregateError.errors));  // เข้าถึงพร็อพเพอร์ตี้ errors
// แสดงผลลัพธ์
// [ 'Error 1', 'Error 2', 'Error 3' ]
```

## การประยุกต์ใช้งานพรอมิส
   
* ตัวอย่างที่ 1

```html
<!-- ไฟล์ชื่อ index.html-->
<!DOCTYPE html>
<html>
<head></head>
<body>
<h1 id="element1"></h1>
<h1 id="element2"></h1>
<script>
function sendAjaxMsg( url, message) {
    function asynCode(resolve, reject) {
	let request = new XMLHttpRequest();
	let element = document.querySelector("#element2");	
	request.onreadystatechange = function() {		// บรรทัด a
	     if (request.readyState == 4 && request.status== 200) {	
	            element.innerHTML="Get a message: " + request.responseText; 
	            resolve(request.responseText);	
	     } // สิ้นสุดประโยค if
	}; // สิ้นสุดการประกาศฟังก์ชั่น
	request.onerror = function (error) {		// บรรทัด b
	     let errorMsg = "Error status " + request.status;
	     element.innerHTML = errorMsg;
                 reject(errorMsg);				
           }; // สิ้นสุดการประกาศฟังก์ชั่น
           request.open("GET", `${url}?msg=${message}`, true);
           request.send();       			          // บรรทัด c	
    } // สิ้นสุดการประกาศฟังก์ชั่น asynCode
    return new Promise(asynCode);		         // บรรทัด d
 } // สิ้นสุดการประกาศฟังก์ชั่น sendAjaxMsg
let ajax = sendAjaxMsg("http://127.0.01:8001/message", "test promise")
document.querySelector("#element1").innerHTML = "Sending a message";  // บรรทัด e
function handle(value) { console.log(value); }
function errorHandle(errMsg) { console.log(`Error message: ${errMsg}`); }
ajax.then(handle, errorHandle)			        // บรรทัด f
</script>
</body>
</html>
```

* ตัวอย่างที่ 2

* [ไฟล์ json.php ประกอบเนื้อหา Fetch API](json.php)

```js
fetch("https://patanasongsivilai.com/example/json.php")     // บรรทัด a
.then( function (res) {                         // บรรทัด b
      return  res.text();                         // บรรทัด c
   }
)
.then( function (txt) {                         // บรรทัด d
     console.log(txt);                           // บรรทัด e
   } 
);
// แสดงผลลัพธ์
// {"name":"Somchai","age":30,"city":"Bangkok"}
```

```html
<!-- ไฟล์ชื่อ index.html-->
<!DOCTYPE html>
<html>
<head></head>
<body>
<h1 id="element1"></h1>
<h1 id="element2"></h1>
<script>
document.querySelector("#element1").innerHTML = "Sending a message"; 
let element = document.querySelector("#element2");	
fetch("http://127.0.01:8001/message?msg=test promise")
.then( function (res) { 
	return res.text();
})
.then( function (text) { 	
	element.innerHTML = "Get a message: " + text;
	console.log(text);
})
.catch( function (errMsg) {
	element.innerHTML = errorMsg;
	console.log(`Error message: ${errMsg}`) 		
});
</script>
</body>
</html>
```

* ตัวอย่างที่ 3

* [ไฟล์ json.txt](Chapter18/json.txt)

```js
function readJSONFile(fileName){
	function asynCode(resolve,reject) {
		let fs = require("fs");				// ใช้อ่านไฟล์
		fs.readFile(fileName, function(err, text) {	            // บรรทัด a
			if (err) {
				reject(err.message);		// บรรทัด b 
			} else {
				let obj = JSON.parse(text);
				let json = JSON.stringify(obj, null, 2);		
				resolve(json);			// บรรทัด c 
			} // สิ้นสุดประโยค if
		});
	} // สิ้นสุดการประกาศฟังก์ชั่น asynCode	
	return new Promise(asynCode);			           // บรรทัด d
} // สิ้นสุดการประกาศฟังก์ชั่น readJSONFile
let reader = readJSONFile("json.txt");		                      // อ่านไฟล์ json.text
console.log("Read a file");
function handle(value) { console.log(value); }
function errorHandle(errMsg) { console.log("Error message:", errMsg); }
reader.then(handle, errorHandle)		                                 // บรรทัด e
```

* ตัวอย่างที่ 4

```js
let iterator = generator();
iterator.next();	// เริ่มทำงาน
function *generator() {				
 	for(let i=0; i<5; i++) {		
 		let result = yield runService(i);		// บรรทัด a
		console.log("Message:" , result);
 	}	
}
function runService(data) {
	function aysnCode(resolve, reject) {
   		console.log("to do something:", data);	// บรรทัด b
		// การทำงานแบบอะซิงโครนัสอื่น ๆ
		// ...			
		setTimeout(function() {
			resolve(data);			// บรรทัด c
 		}
 	,1000);						// ดีเลย์ 1 วินาที
	}
	let promise = new Promise(aysnCode);		
 	promise.then(function(value) { 			// บรรทัด d
		let result = `service ${value} is success`;
		iterator.next(result);			
 	});	
}
```

## สไตล์การเขียนด้วยฟังก์ชั่นคอลแบ็ค

```js
Promise.resolve(123)
.then( function(value) {                   // บรรทัด a -- ฟังก์ชันคอลแบ็คแบบไร้ชื่อ ขึ้นต้นด้วย function 
         console.log(value);   
     }
);
// แสดงผลลัพธ์
// 123
Promise.reject("Error")
.catch(function (value) {
         console.log(value);                 // บรรทัด b -- ฟังก์ชันคอลแบ็คแบบไร้ชื่อ ขึ้นต้นด้วย function 
    } 
);
// แสดงผลลัพธ์
// "Error"
```

```js
Promise.resolve(123)
.then( (value) =>  console.log(value));   // บรรทัด a -- ฟังก์ชันคอลแบ็คเป็นฟังก์ชันลูกศร
// แสดงผลลัพธ์
// 123
Promise.reject("Error")
.catch( (value) =>  console.log(value));  // บรรทัด b - ฟังก์ชันคอลแบ็คเป็นฟังก์ชันลูกศร
// แสดงผลลัพธ์
// "Error"
```