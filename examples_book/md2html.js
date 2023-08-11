// npm install line-reader
// npm install bluebird
const Promise = require("bluebird");
const fs = Promise.promisifyAll(require('fs'));
const lineReader = require('line-reader');
const eachLine = Promise.promisify(lineReader.eachLine);


let isCode = false;
let lineCodes = "";
let count = 0;

function writeToHTML(allLines, fileName){
	let html = `<html lang="th">
	<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>${fileName}</title>
	<link rel="stylesheet" href="md.css">  
	<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous">
	<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js" integrity="sha384-HwwvtgBNo3bZJJLYd8oVXjrBZt8cqVSpeBNS5n7C8IVInixGAoxmnlMuBnhbgrkm" crossorigin="anonymous"></script>
	<script>		
	
		function toString(data) {
			if(data == null || data == undefined ) {
				return ""+ data;			
			} else if( typeof data === 'object'){
				
				if( data instanceof Array){
					let str = "[";
					for(const value of data) {
						str += ""+ toString(value) + ", ";
					}
					if("index" in data) str = str + "index: " + toString(data.index) + ", ";;
					if("input" in data) str = str + "input: " + toString(data.input) + ", ";;
					if("groups" in data) str = str + "groups: " + toString(data.groups) + ", ";;					
					return (str.length >1) ? str.slice(0, -2) + ']': '[]';		
				} else {
					let str = "{";
					for(const [key, value] of Object.entries(data)){
						str += ""+key+":"+ toString(value) + ", ";
					}
					return (str.length >1) ? str.slice(0, -2) + '}': '{}';					
				}
			
			} else if( typeof data === 'string'){
				return '"' +data + '"';				
				
			} else {
				return String(data);
			}
		}

		function escapeHtml(unsafe) {
			return unsafe
				.replaceAll(/&amp;/g, "&")
				.replaceAll(/&lt;/g, "<")
				.replaceAll(/&gt;/g, ">")
				.replaceAll(/&quot;/g, '"')
				.replaceAll(/&#039;/g, "'");
		}
			
		console.log = function(...data){
			let display = document.querySelector("#display");			
			for( d of data){
				if( typeof d !== 'string'){
					d = toString( d );
				}					
				display.innerHTML += d + " ";
			}
			display.innerHTML += "<br>";
		}
		
	</script>
	</head>
	<body>	
	
	<div class="left_menu">		
		<!-- Sidebar -->
		<div style="text-align:left; padding:20px; 3px;">			
			<a href="https://www.mebmarket.com/web/index.php?action=BookDetails&data=YToyOntzOjc6InVzZXJfaWQiO3M6NzoiMTcyNTQ4MyI7czo3OiJib29rX2lkIjtzOjY6IjE1Njg1NCI7fQ" target="_blank"><img src="https://cdn-local.mebmarket.com/meb/server1/156854/Thumbnail/book_detail_large.gif?9" width="80" height="100"><a/>
		</div>
		
        <ul>
          <li class="list-group-item"><a href="chapter03.html" class="text-reset">บทที่ 3</a></li>
          <li class="list-group-item"><a href="chapter04.html" class="text-reset">บทที่ 4</a></li>
          <li class="list-group-item"><a href="chapter05.html" class="text-reset">บทที่ 5</a></li>
          <li class="list-group-item"><a href="chapter06.html" class="text-reset">บทที่ 6</a></li>
		  <li class="list-group-item"><a href="chapter07.html" class="text-reset">บทที่ 7</a></li>
          <li class="list-group-item"><a href="chapter08.html" class="text-reset">บทที่ 8</a></li>
		  <li class="list-group-item"><a href="chapter09.html" class="text-reset">บทที่ 9</a></li>
          <li class="list-group-item"><a href="chapter10.html" class="text-reset">บทที่ 10</a></li>
          <li class="list-group-item"><a href="chapter11.html" class="text-reset">บทที่ 11</a></li>
		  <li class="list-group-item"><a href="chapter12.html" class="text-reset">บทที่ 12</a></li>
          <li class="list-group-item"><a href="chapter13.html" class="text-reset">บทที่ 13</a></li>
          <li class="list-group-item"><a href="chapter14.html" class="text-reset">บทที่ 14</a></li>
          <li class="list-group-item"><a href="chapter15.html" class="text-reset">บทที่ 15</a></li>
		  <li class="list-group-item"><a href="chapter16.html" class="text-reset">บทที่ 16</a></li>
		  <li class="list-group-item"><a href="chapter17.html" class="text-reset">บทที่ 17</a></li>
          <li class="list-group-item"><a href="chapter18.html" class="text-reset">บทที่ 18</a></li>
          <li class="list-group-item"><a href="chapter19.html" class="text-reset">บทที่ 19</a></li>
          <li class="list-group-item"><a href="chapter20.html" class="text-reset">บทที่ 20</a></li>
		  <li class="list-group-item"><a href="https://github.com/adminho/javascript/tree/master/examples_book/Appendix_B" class="text-reset" target="_blank">ภาคผนวก ข</a></li>
		  <li class="list-group-item"><a href="https://github.com/adminho/javascript/blob/master/examples_book/json.php" class="text-reset" target="_blank">ไฟล์ json.php</a></li>		  
        </ul>
			
	</div>
		
	<div class="main"> ${allLines} </div>
	<div id="displayArea" class="footer" style="visibility:hidden;">
	   <div id="display"></div>
	   <input class="clear_btn" type="submit" value="clear" onclick="clearDisplay(true)" >
	</div>
	
	<script>
		function clearDisplay(flag) {
			let display = document.querySelector("#display");	
			display.innerHTML = "";		
			let clearBtn = document.querySelector("#displayArea");			
			if(flag) {
				clearBtn.style.visibility  = "hidden";
			} else {
				clearBtn.style.visibility = "";
			}
		}
		function evalCode(btn, idTextArea) {
			clearDisplay(false);
			
			let textArea = document.querySelector(idTextArea);
			let codeTxt = textArea.value;
			codeTxt = escapeHtml(codeTxt);			
			
			if( codeTxt.includes("<html>")>0 ) {
				//codeTxt = codeTxt.replaceAll(/\\n/g,"");
				
				const link = document.createElement("a");
				const content = codeTxt;
				const file = new Blob([content], { type: 'text/plain' });
				link.href = URL.createObjectURL(file);
				link.download = "sample.html";
				link.click();
				URL.revokeObjectURL(link.href);		
				
			} else {
				
				try {
					console.log("++++ผลการรัน++++");					
					eval(codeTxt);	
					btn.value = "กดรันอีกครั้ง";
				} catch (e){
					console.log("<font color='yellow'>++++Error++++</font>");
					console.log( "<font color='yellow'>" + e.stack + "</font>");					
				}
			}
			textArea.classList.add("run_already");			
		}
	</script>
	</body></html>`;
	
    return fs.writeFile(`${fileName}.html`, html, function (err) {
		if (err) throw err;
		console.log(`${fileName}.html is Saved!`);
	}); 
	
}


async function genHTML(fileName){
  let allLines = "";
  let btnValue = "";
  
  return eachLine(`${fileName}.md`, function(line, last) {
  //line = line.trim();
    
  if(line.startsWith("```js") || line.startsWith("```html")){
	  isCode = true;	
	  count++;
	  if(line.startsWith("```js")){
		btnValue = "Run";
	  } else if(line.startsWith("```html")) {
		  btnValue = "Download HTML";
	  }
	  
  } else if(line.startsWith("```")){
	  isCode = false	  
	  //allLines += `<div id="code${count}" class="norun">${lineCodes}</div><input type="submit" value="Run" onclick="evalCode('#code${count}')">`;	  
	  const rows = lineCodes.split('\n').length;
	  
	  allLines += `<div>						
						<textarea class="showcode" id="code${count}" class="norun" rows=${rows}>${lineCodes}</textarea>
						<input class="run_btn" type="submit" value="${btnValue}" onclick="evalCode(this, '#code${count}')">						
				  </div>`;	  
	  	  
	  lineCodes = "";	  
  } else if(line.startsWith("#")) { 
	  line = line.replace(/#/g, "");	  
	  allLines += `<h3>${line}</h4>`;
	  
  } else if(line.startsWith("*") && !line.startsWith("*/")){
	  line = line.replace(/\*/g, "");
	  allLines += `<p class="describe">${line}</p>`;
  }
    
  if(isCode && !line.startsWith("```js") && !line.startsWith("```html")){
	  //lineCodes += `${line}<br>`;	  
	  lineCodes += `${line}\n`;
  }
  
  if(last) {	  
	writeToHTML(allLines, fileName);
  
    //console.log('\n\n-------------\nLast line printed.');
    //const used = process.memoryUsage().heapUsed / 1024 / 1024;
    //console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);

  }
  
})

}


let files = [ "chapter03", "chapter04","chapter05", "chapter06",  
"chapter07","chapter08","chapter09", "chapter10", "chapter11", "chapter12",  
"chapter13","chapter14","chapter15", "chapter16", "chapter17", 
"chapter18","chapter19","chapter20"];



//genHTML("chapter03");
//genHTML("chapter04");
//genHTML("chapter05");
//genHTML("chapter06");
//genHTML("chapter07");
//genHTML("chapter08");
//genHTML("chapter09");
//genHTML("chapter10");
//genHTML("chapter11");
//genHTML("chapter12");
//genHTML("chapter13");
//genHTML("chapter14");
//genHTML("chapter15");
//genHTML("chapter16");
//genHTML("chapter17");
//genHTML("chapter18");
//genHTML("chapter19");
//genHTML("chapter20");

genHTML("chapter03")
.then(() => genHTML("chapter04"))
.then(() => genHTML("chapter05"))
.then(() => genHTML("chapter06"))
.then(() => genHTML("chapter07"))
.then(() => genHTML("chapter08"))
.then(() => genHTML("chapter09"))
.then(() => genHTML("chapter10"))
.then(() => genHTML("chapter11"))
.then(() => genHTML("chapter12"))
.then(() => genHTML("chapter13"))
.then(() => genHTML("chapter14"))
.then(() => genHTML("chapter15"))
.then(() => genHTML("chapter16"))
.then(() => genHTML("chapter17"))
.then(() => genHTML("chapter18"))
.then(() => genHTML("chapter19"))
.then(() => genHTML("chapter20"))


async function countline(fileName){
	let count = 0;
	return eachLine(`${fileName}.md`, function(line, last) {
		line = line.trim();
    
		if(!line.startsWith("```") && !line.startsWith("#") && line != '' && !line.startsWith("*")){
			count++	  
		} 
  
		if(last) {	       
			console.log(`The ${fileName}.md has line of codes are ${count}`);			
		}
	});
}

let numLines= [];

files.forEach(function(fileName) {
	countline(fileName);
});

