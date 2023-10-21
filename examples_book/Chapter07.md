# โค้ดบทที่ 7  ทบทวน HTML DOM

## DOM คืออะไร
```html
<!DOCTYPE html>
<html>
            <head>
                        <title>"My title"<title>
            </head>
	<body>
		<h1>"My head 1"</h1>
		<h2>"My head 2"</h2>
	</body>
</html>
```

## การเข้าถึง element

```notrun
<!DOCTYPE html>
<html>
<head></head>
<body>
	<div id="div1">My div 1</div>
	<div id="div2">My div 2</div>
</body>
</html>
```

```html
<!DOCTYPE html>
<html>
<head></head>
<body>
	<div id="div1">My div 1</div>
	<div id="div2">My div 2</div>
	<script>
		let div1  = document.getElementById("div1");
		console.log(div1)
		let div2  = document.getElementById("div2");
		console.log(div2)		
	</script>
</body>
</html>
```

### ตัวอย่างการใช้งานอ็อบเจ็กต์ที่พบเจอ

```html
<!DOCTYPE html>
<html>
<head></head>
<body>
<div id="div1">
	<h1 id="h1">My head 1</h1>
	<div>My div 2</div>
</div>

<script>
let div  = document.getElementById("div1");
console.log(div.innerHTML)
</script>

<script>
let h1  = document.getElementById("h1");
console.log(h1.innerHTML)
</script>

</body>
</html>
```


```html
<!DOCTYPE html>
<html>
<head></head>
<body>
<h1 id="h1">My head 1</h1>
<p class="abc">My paragraph 1</p>
<p class="abc">My paragraph 2</p>
<p class="abc">My paragraph 3</p>
<p>My paragraph 4</p>

<script>
let div  = document.querySelector("#h1");
console.log(div.innerHTML)
</script>

<script>
let all_pTag  = document.querySelectorAll(".abc");
console.log(all_pTag)
</script>

</body>
</html>
```

### สิ่งที่ควรรู้ HTMLCollection

```html
<!DOCTYPE html>
<html>
<head></head>
<body>
<p id="p1">My First Paragraph 1</p>
<p id="p2">My First Paragraph 2</p>
<p id="p3">My First Paragraph 3</p>
<p name="p4">My First Paragraph 4</p>

<script>
let all_pTag = document.getElementsByTagName("p");
console.log("Total tags: " +all_pTag.length);
console.log(all_pTag.item(0));                            // <p> ตัวแรก
console.log(all_pTag.namedItem("p2"));             // <p> ตัวที่สอง
console.log(all_pTag.p3);                                  // <p> ตัวที่สาม
console.log(all_pTag["p4"]);                             // <p> ตัวที่สี่่
</script>

<script>
let all_pTag = document.getElementsByTagName("p")
for(let i=0; i<all_pTag.length; i++) {
  console.log(all_pTag.item(i));
}
</script>

<script>
let all_pTag = document.getElementsByTagName("p");
let allNodes = [...all_pTag];
for(let p of allNodes) {
       console.log(p);
}   
</script>

<script>
let all_pTag = document.querySelectorAll("p");
for(let p of all_pTag) {
       console.log(p);
 }   
</script>

</body>
</html>
```

### ตัวอย่างการเข้าถึง <from>...</form>

```html
<!DOCTYPE html>
<html>
<head></head>
<body>
<form name="myForm">
  <label for="email">email:</label><br>
  <input name="email" type="email"><br/>
  <label for="password">password:</label><br>
  <input name="password" type="password"><br/><br/>
  <button type="submit">Log in</button>
</form>

<script>
let elem1 = document.forms.myForm;
let elem2 = document.forms.namedItem("myForm");
console.log(elem1 === elem2);            // ได้ผลลัพธ์เป็น "true"
</script>

<script>
let elem1 = document.forms["myForm"];
let elem2 = document.forms.namedItem("myForm");
console.log(elem1 === elem2);            // ได้ผลลัพธ์เป็น "true"
</script>

<script>
let elem1 = document.forms[0];
let elem2 = document.forms.item(0);
console.log(elem1 === elem2);            // ได้ผลลัพธ์เป็น "true"
</script>

<script>
  let loginForm = document.forms.myForm; 
  loginForm.elements.email.placeholder = "mail@example.com";
  loginForm.elements.password.placeholder = "ป้อนรหัสผ่าน";
</script>

<script>
  let loginForm = document.forms.myForm; 
  loginForm.email.placeholder = "mail@example.com";
  loginForm.password.placeholder = "ป้อนรหัสผ่าน";
</script>

<script>
  let loginForm = document.getElementsByTagName("form").myForm;
  loginForm.email.placeholder = "mail@example.com";
  loginForm.password.placeholder = "ป้อนรหัสผ่าน";
</script>

</body>
</html>
```

```html
<!DOCTYPE html>
<html>
<head></head>
<body>
<form id="myForm" name="myForm">
  <label for="email">email:</label><br>
  <input name="email" type="email"><br/>
  <label for="password">password:</label><br>
  <input name="password" type="password"><br/><br/>
  <button type="submit">Log in</button>
</form>

<script>
  let loginForm = document.getElementById("myForm");
  // หรือจะใช้ 
  // let loginForm = document.querySelector("#myForm");
  loginForm.email.placeholder = "mail@example.com";
  loginForm.password.placeholder = "ป้อนรหัสผ่าน";
</script>

</body>
</html>
```

## การเข้าถึงแอตทริบิวต์ของ element

```html
<!DOCTYPE html>
<html>
<head></head>
<body>
<h1 id="target" >Hello World</h1>
<button  onclick="getAttr()">Get attribute</button>
<button  onclick="setAttr()">Set attribute</button>
<button  onclick="removeAttr()">Remove attribute</button>

<script>
function getAttr() {
    let id = document.getElementById("target").getAttribute("id"); 
    alert(id);
}

function setAttr() {
    document.getElementById("target").setAttribute("style", "color:red;"); 
}

function removeAttr() {
    document.getElementById("target").removeAttribute("style"); 
}
</script>

</body>
</html>
```


```html
<!DOCTYPE html>
<html>
<head></head>
<body>
<h1 id="target" >Hello World</h1>
<button  onclick="getAttr()">Get attribute</button>
<button  onclick="setAttr()">Set attribute</button>
<button  onclick="removeAttr()">Remove attribute</button>

<script>
function getAttr() {
    let id = document.getElementById("target").id; 
    alert(id);
}

function setAttr() {
    document.getElementById("target").style="color:red;";
}

function removeAttr() {
    document.getElementById("target").style="";  // ลบค่าเฉยๆ ไม่ได้ลบแอตทริบิวต์ออกไป
}
</script>

</body>
</html>
```


```html
<!DOCTYPE html>
<html>
<head></head>
<body>
<input id="target" type="text" id="myText" value="Some text..." >
<button  onclick="showValue()">Show value</button>

<script>
function showValue() {
     let val = document.getElementById("Show value").value;  
     alert(val);
}
</script>

</body>
</html>
```

### การเพิ่มและลบ element
### ตัวอย่างเพิ่มและลบ <p>...</p>

```html
<!DOCTYPE html>
<html>
<head></head>
<body>
<button onclick="addElement()">Add element</button>
<button onclick="deleteElement()">Delete element</button>

<script>
function addElement() {
  let tagP = document.createElement("P");
  tagP.innerHTML = "Hello World";
  document.body.appendChild(tagP);
}

function deleteElement() {
  let all_pTag = document.getElementsByTagName("p");
  let allNodes = [...all_pTag];
  for(let p of allNodes) {
       p.remove();
  }  
}
</script>

</body>
</html>
```

### ตัวอย่างเพิ่มและลบ <option>...</option> ใน select ของ HTML
```html
<!DOCTYPE html>
<html>
<head></head>
<body>
<select id="mySelect" size="8">
    <option>Apple</option>
    <option>Banana</option>
</select>
<br/><br/>
<input id="myInput" type="text">
<button type="button"onclick="insertOption()">Insert option</button>
<br/><br/>
<button type="button" onclick="deleteOption()">Delete option</button>	

<script>
function deleteOption() {
    let mySelect = document.getElementById("mySelect");
    mySelect.remove(mySelect.selectedIndex);
}
function insertOption() {
    let mySelect = document.getElementById("mySelect");
    let option = document.createElement("option");
    let myInput = document.getElementById("myInput"); 
    if (myInput.value !== '’) {      // เช็คว่า จะต้องไม่กรอกข้อความว่างเข้ามา
         option.text = myInput.value;  
         mySelect.add(option);
    }
}
</script>

</body>
</html>
```

## วิธีการแสดงเอาท์พุต

### แสดงเอาท์พุตด้วยวิธีแรก

```html
<!DOCTYPE html>
<html>
<body>
<h1>My First Web Page</h1>
<p>My First Paragraph</p>
<p id="demo"></p>
<script>
       document.getElementById("demo").innerHTML = 5 + 6;
</script>
</body>
</html>
```

### แสดงเอาท์พุตด้วยวิธีที่สอง

```html
<!DOCTYPE html>
<html>
<body>
<h1>My First Web Page</h1>
<p>My first paragraph</p>
<script>
     document.write(5 + 6);
</script>
</body>
</html>
```


```html
<!DOCTYPE html>
<html>
<head>
       <meta charset="UTF-8">
</head>
<body>
       <h1>My First Web Page</h1>
       <p>My first paragraph</p>
       <button type="button" onclick="document.write(5 + 6)">Try it</button> 
</body>
</html>
```

### แสดงเอาท์พุตด้วยวิธีที่สาม

```html
<!DOCTYPE html>
<html>
<body>
<script>
      window.alert(5 + 6);   // หรือจะเขียน alert(5 + 6);
</script>
</body>
</html>
```

## Event คืออะไร

```notrun
<!DOCTYPE html>
<html>
<body>
           <button>Click me</button>
</body>
</html>
```

### วิธีแรก HTML Event Attributes

```html
<!DOCTYPE html>
<html>
<body>
        <button onclick="this.textContent = 'Ooops!’">Click me</button>
</body>
</html>
```


```html
<!DOCTYPE html>
<html>
<body>
	<button onclick="changeText(this)">Click me</button>
	<script>
		function changeText(btn) { 
		    btn.textContent = 'Ooops!’;
		}
	</script>
</body>
</html>
```

```html
<!DOCTYPE html>
<html>
<body>
     <button id="btn" onclick="changeText()">Click me</button>                   
     <script>
	function changeText()  { 
	      document.getElementById("btn").textContent = "Ooops!";
	}
     </script>
</body>
</html>
```

### วิธีที่ 2 ใช้ HTML DOM กำหนดซอร์สโค้ดจัดการ event 

```html
<!DOCTYPE html>
<html>
<body>
     <button id="btn">Click me</button>
     <script>
            document.getElementById("btn").onclick = changeText;
            function changeText() { 
                   this.textContent = "Ooops!";
             }
     </script>
</body>
</html>
```

ตัวอย่างแรก แปะจาวาสคริปต์ไว้ที่แอตทริบิวต์ของ element ใน HTML ได้เลย
```html
<!DOCTYPE html>
<html>
<body>
<button onclick="this.textContent = 'Ooops!’" 
onmouseleave="alert('mouse leave');">Click me</button>
</body>
</html>
```

ตัวอย่างที่สอง จับแยกซอร์สโค้ดจาวาสคริปต์กับ HTML ออกจากกัน ไม่ต้องเรียกจาวาสคริปต์ใน element ของ HTML ดังนี้

```html
<!DOCTYPE html>
<html>
<body>
<button onclick="this.textContent = 'Ooops!’" 
onmouseleave="alert('mouse leave');">Click me</button>
</body>
</html>
```


```html
<!DOCTYPE html>
<html>
<body>
<button id="btn">Click me</button>
<script>
let btn = document.getElementById("btn");
btn.onclick = changeText;
btn.onmouseleave = showMsg;
function changeText() { 
    this.textContent = "Ooops!";
}
function showMsg() { 
    alert("mouse leave");
}
</script>
</body>
</html>
```

### วิธีที่ 3 ใช้ DOM EventListener

```html
<!DOCTYPE html>
<html>
<body>
<button id="btn">Click me</button>
<script>
let element = document.getElementById("myBtn");
element.addEventListener("click", 
     function( ) { 
          alert("Hello World!");
     }
);
</script>
</body>
</html>
```

```html
<!DOCTYPE html>
<html>
<body>
<p id="target"></p>
<button id="btn">Click me</button>
<script>
let btn = document.getElementById("btn");
function changeText() { 
    this.textContent = "Ooops!";
}
function showText() { 
    let h1 = document.getElementById("target");
    h1.innerHTML = "Hello World";
}
btn.addEventListener("click", changeText);         // บรรทัด a
btn.addEventListener("click", showText);            // บรรทัด b
</script>
</body>
</html>
```


```html
<!DOCTYPE html>
<html>
<body>
<p id="target"></p>
<button id="btn">Click me</button>
<script>
let btn = document.getElementById("btn");
btn.addEventListener("click", function() {           // บรรทัด a
    this.textContent = "Ooops!";
});  
btn.addEventListener("click", function() {           // บรรทัด b
    let h1 = document.getElementById("target");
    h1.innerHTML = "Hello World";
});    

</script>
</body>
</html>
```

```html
<!DOCTYPE html>
<html>
<body>
<p id="target"></p>
<button id="btn">Click me</button>
<script>
let btn = document.getElementById("btn");
btn.addEventListener("click",  () => {                  // บรรทัด a
    this.textContent = "Ooops!";
});  
btn.addEventListener("click", () => {                   // บรรทัด b
    let h1 = document.getElementById("target");
    h1.innerHTML = "Hello World";
});    
</script>
</body>
</html>
```

```html
<!DOCTYPE html>
<html>
<body>
<p id="target"></p>
<button id="btn">Click me</button>
<script>
let btn = document.getElementById("btn");
btn.addEventListener("click",  () => {                  // บรรทัด a
    this.textContent = "Ooops!";
});  
btn.addEventListener("click", () => {                   // บรรทัด b
    let h1 = document.getElementById("target");
    h1.innerHTML = "Hello World";
});    
</script>
</body>
</html>
```

```html
<html>
<head></head>
<body>
     <div>
	<form action="/action_page.php">
                 <input type="submit" value="Submit">
	</form>
     </div>
</body>
<html>
```