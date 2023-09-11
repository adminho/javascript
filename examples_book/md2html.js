// npm install line-reader
// npm install bluebird
const Promise = require("bluebird");
const fs = Promise.promisifyAll(require('fs'));
const lineReader = require('line-reader');
const eachLine = Promise.promisify(lineReader.eachLine);


let templateHTML = "";
try {
   templateHTML = fs.readFileSync('template.html', { encoding: 'utf8' });   
} catch (err) {
   console.log(err);
}

/*function writeToHTML(headline, allLines, fileName){
    let html = templateHTML.replace("${headline}", headline)
			.replace("${allLines}", allLines)
			.replace("${fileName}", fileName);
    return fs.writeFile(`${fileName}.html`, html, function (err) {
		if (err) throw err;
		console.log(`${fileName}.html is Saved!`);
	}); 	
}*/

async function genHTML(fileName){
  let isCode = false;
  let lineCodes = "";
  let count = 0;

  let headline = "";
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
	  const rows = lineCodes.split('\n').length-1;
	  
	  allLines += `<div><label for="codeArea${count}"></label>					
						<textarea id="codeArea${count}" class="notrun" rows=${rows}>${lineCodes.slice(0,-1)}</textarea>
						<div id="displayResult${count}" class="display-result"></div>
						<input class="run-btn" type="submit" value="${btnValue}" onclick="runCodeBtn(${count})">
						<input class="run-btn" type="submit" value="Clear" onclick="clearDisplay('#displayResult${count}', '#codeArea${count}')">						
				  </div>`;	  
	  	  
	  lineCodes = "";	  
  } else if(line.startsWith("#")) { 
	  line = line.replace(/#/g, "");	
	  if(line.includes("โค้ดบทที่")) {
		  headline = line;
	  } else {
		allLines += `<h4>${line}</h4>`;
	  }
	  
  } else if(line.startsWith("*") && !line.startsWith("*/")){
	  line = line.replace(/\*/g, "");
	  allLines += `<p class="describe">${line}</p>`;
  }
    
  if(isCode && !line.startsWith("```js") && !line.startsWith("```html")){
	  lineCodes += `${line}\n`;
  }
  
  if(last) {	  
	// writeToHTML(headline, allLines, fileName);
	let html = templateHTML.replace("${headline}", headline)
			.replace("${allLines}", allLines)
			.replace("${fileName}", fileName);
    fs.writeFile(`${fileName}.html`, html, function (err) {
		if (err) throw err;
		console.log(`${fileName}.html is Saved!`);
	});	
  }
  
})

}


let files = [ "chapter02", "chapter03", "chapter04","chapter05", "chapter06",  
"chapter07","chapter08","chapter09", "chapter10", "chapter11", "chapter12",  
"chapter13","chapter14","chapter15", "chapter16", "chapter17", 
"chapter18","chapter19","chapter20"];

(async () => {
	for await (const f of files) {
      genHTML(f);
    } 
})();

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


/*
genHTML("chapter02")
.then(() => genHTML("chapter03"))
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
*/

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

