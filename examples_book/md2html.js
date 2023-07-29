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
	let html = `<html>
	<head><link rel="stylesheet" href="md.css">
	<script>		
	
		function toString(data) {
			if( typeof data === 'object'){
				
				if( data instanceof Array){
					let str = "[";
					for(const value of data) {
						str += ""+ toString(value) + ", ";
					}				
					return str.slice(0, -2) + ']';		
				} else {
					let str = "{";
					for(const [key, value] of Object.entries(data)){
						str += ""+key+":"+ toString(value) + ", ";
					}				
					return str.slice(0, -2) + '}';
				}
			
			} else if( typeof data === 'string'){
				return "'"+data+"'";				
				
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
		
		let console = {};
		console.log = function(...data){
			let display = document.querySelector("#display");			
			for( d of data){
				display.innerHTML += toString( d ) + " ";
			}
			display.innerHTML += "<br>";
		}
		
	</script>
	</head>
	<body>	
	<div class="main"> ${allLines} </div>
	<div id="displayArea" class="footer" style="visibility:hidden;">
	   <div id="display"></div>
	   <input  type="submit" value="Clear" onclick="clearDisplay(true)" >
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
		function evalCode(idDev) {
			clearDisplay(false);
			
			let div = document.querySelector(idDev);
			let codeTxt = div.innerHTML;
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
				} catch (e){
					console.log("++++Error++++");
					console.log( e.stack);					
				}
			}
			div.classList.add("run");
			return false;
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
  line = line.trim();
    
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
	  const rows = lineCodes.trim().split('\n').length;
	  
	  allLines += `<div>
						<form>
						<textarea id="code${count}" class="norun" rows=${rows+1}>${lineCodes}</textarea>
						<input type="submit" value="${btnValue}" onclick="return evalCode('#code${count}')">
						</form>
				  </div>`;	  
	  	  
	  lineCodes = "";	  
  } else if(line.startsWith("#")){
	  line = line.replace(/#/g, "");
	  allLines += `<h3>${line}</h3>`;
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


let files = [ "Chapter03", "Chapter05", "Chapter08", 
"Chapter09", "Chapter11", "Chapter12", "Chapter13", 
"Chapter15", "Chapter16", "Chapter17"];




genHTML("Chapter05");
genHTML("Chapter08");
genHTML("Chapter09");
genHTML("Chapter11");
genHTML("Chapter12");
genHTML("Chapter13");
genHTML("Chapter15");
genHTML("Chapter16");
genHTML("Chapter17");
genHTML("Chapter18");


async function countline(fileName){
	let count = 0;
	return new Promise( resovle => {
	eachLine(`${fileName}.md`, function(line, last) {
		line = line.trim();
    
		if(!line.startsWith("```") && !line.startsWith("#") && line != '' && !line.startsWith("*")){
			count++	  
		} 
  
		if(last) {	  
     
    //console.log('\n\n-------------\n');
    //const used = process.memoryUsage().heapUsed / 1024 / 1024;
    //console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);
	//console.log('\n\n-------------\n.');
			console.log(`The ${fileName}.md has line of codes are ${count}`);
			resovle(count);
		}
	})
	});

}

