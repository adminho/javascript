// npm install line-reader
// npm install bluebird
/*
const Promise = require("bluebird");
const fs = Promise.promisifyAll(require('fs'));
const lineReader = require('line-reader');
const eachLine = Promise.promisify(lineReader.eachLine);
*/

/*async function genHTML(fileName){
  let isAreaCode = false;
  let lineCodes = "";
  let count = 0;

  let headline = "";
  let allLines = "";
  let btnValue = "";
    
  return eachLine(`${fileName}.md`, function(line, last) {
    
  if(isBeginCode(line)){ // start codes
	  isAreaCode = true;	
	  count++;
	  if(line.startsWith("```js")){
		btnValue = "Run";
	  } else if(line.startsWith("```html")) {
		  btnValue = "Open HTML";
	  } else if(line.startsWith("```module")){
		  btnValue = "Import";					  
	  } else if(line.startsWith("```run.module")) {
		  btnValue = "Run New Tab";
	  }
	  
  } else if( isAreaCode==true && line.startsWith("```")){ // reach to end of codes
	  isAreaCode = false	  	  
	  const rows = lineCodes.split('\n').length-1;
	  let clearBtnHTML = "";
	  if ( btnValue == "Run") {
		  clearBtnHTML = `<input class="run-btn" type="submit" value="Clear" onclick="clearDisplay(${count})">`;	  
	  }
	  allLines += `<div>
					<form id="form${count}" style="margin:0px" method="POST" target="_blank">
						<label for="codeArea${count}"></label>					
						<textarea id="codeArea${count}" name="code" class="notrun" rows=${rows}>${lineCodes.slice(0,-1)}</textarea>						
					</form>						
					<div id="displayResult${count}" class="display-result"></div>
					<input class="run-btn" type="submit" id="btn${count}" value="${btnValue}" onclick="runCodeBtn(${count})">
					${clearBtnHTML}
				  </div>`;	  
	  	  
	  lineCodes = "";
	  
  } else if(isAreaCode==false) { // not codes
	  
	 if(line.startsWith("#")) { 
		line = line.replace(/#/g, "");	
		if(line.includes("โค้ดบทที่")) {
			headline = line;
		} else {
			allLines += `<h4>${line}</h4>`;
		}
*/		
//	} else if(line.startsWith("*") && !line.startsWith("*/")){ 
//		line = line.replace(/\*/g, "\u2022&nbsp;"); // show a bullet
/*		allLines += `<p class="describe">${line}</p>`;
		
	} else if(line.startsWith("หมายเหตุ")){
		line = line.replace(/หมายเหตุ/g, "<font color='green'><strong>หมายเหตุ</strong></font>");
		allLines += `<p class="describe">${line}</p>`;
		
	} else if(line.startsWith("----")){		
		allLines += `<hr>`;
		
	} else {
		allLines += `<p class="describe">${line}</p>`;
	}
	
  }
    
  if(isAreaCode && !line.startsWith("```js") && !isBeginCode(line)){
	  line = line.replaceAll(/\$\$/g, "@-@"); // fix bugs กรณีที่ line มี $$ วางติดกันอยู่ในสตริง เพื่อไม่ให้มันทำงาน	(ในบทที่ 11 เรื่องเทมเพลตสตริง)
	  lineCodes += `${line}\n`;	  
  }
  
  if(last) {	  	
	/*let html = templateHTML.replace("${headline}", headline)
			.replace("${allLines}", allLines)
			.replace("${fileName}", fileName);*/			
/*	let html = allLines;		
	html = html.replaceAll(/@-@/g, "$$$"); // fix bugs	
    fs.writeFile(`${fileName}.html`, html, function (err) {
		if (err) throw err;
		console.log(`${fileName}.html is Saved!`);
	});	
  }
  
});
}*/

let files = [ "chapter02", "chapter03", "chapter04","chapter05", "chapter06",  
"chapter07","chapter08","chapter09", "chapter10", "chapter11", "chapter12",  
"chapter13","chapter14","chapter15", "chapter16", "chapter17", 
"chapter18","chapter19","chapter20"];

/*(async () => {
	for await (const f of files) {
      //genHTML(f);
    } 
})();*/

function isBeginCode(line){
	if(line.startsWith("```js") || line.startsWith("```html") || line.startsWith("```module") || line.startsWith("```run.module")) {
		return true;
	}	
	return false;
}

async function getArrayFromFile(fileName){
  let allLines = [];
  
  return new Promise( resolve => {
	eachLine(`${fileName}.md`, function(line, last) {
	  if(line.trim() !== ''){
		allLines.push(line);
		
	  }
	  if(last) {		  
		  resolve(allLines);		  
	  }
	})
  
  });
  
}

function writeHTML(fileName, html){
    fs.writeFile(`${fileName}.html`, html, function (err) {
		if (err) throw err;
		console.log(`${fileName}.html is Saved!`);
	});	
}
  
function genHTMLfromArray(arrayMdFiles) {
  	
  let isAreaCode = false;
  let lineCodes = "";
  let count = 0;

  let headline = "";
  let allLines = "";
  let btnValue = "";
  
arrayMdFiles.forEach( (line) =>  {
		
  if(isBeginCode(line)){ // start codes
	  isAreaCode = true;	
	  count++;
	  if(line.startsWith("```js")){
		btnValue = "Run";
	  } else if(line.startsWith("```html")) {
		  btnValue = "Open HTML";
	  } else if(line.startsWith("```module")){
		  btnValue = "Import";					  
	  } else if(line.startsWith("```run.module")) {
		  btnValue = "Run New Tab";
	  }
	  
  } else if( isAreaCode==true && line.startsWith("```")){ // reach to end of codes
	  isAreaCode = false	  	  
	  lineCodes = lineCodes.slice(0,-2);
	  const rows = lineCodes.split('\r\n').length;
	  console.log(lineCodes);
	  
	  let clearBtnHTML = "";
	  if ( btnValue == "Run") {
		  clearBtnHTML = `<input class="run-btn" type="submit" value="Clear" onclick="clearDisplay(${count})">`;	  
	  }
	  allLines += `<div>
					<form id="form${count}" style="margin:0px" method="POST" target="_blank">
						<label for="codeArea${count}"></label>					
						<textarea id="codeArea${count}" name="code" class="notrun" rows=${rows}>${lineCodes}</textarea>						
					</form>						
					<div id="displayResult${count}" class="display-result"></div>
					<input class="run-btn" type="submit" id="btn${count}" value="${btnValue}" onclick="runCodeBtn(${count})">
					${clearBtnHTML}
				  </div>`;	  
	  	  
	  lineCodes = "";
	  
  } else if( isAreaCode==true && !isBeginCode(line) && !line.startsWith("```") ){ // ยังอยู่ในโค้ด
	  line = line.replaceAll(/\$\$/g, "@-@"); // fix bugs กรณีที่ line มี $$ วางติดกันอยู่ในสตริง เพื่อไม่ให้มันทำงาน	(ในบทที่ 11 เรื่องเทมเพลตสตริง)
	  lineCodes += `${line}\n`;	  
	  
  } else if(isAreaCode==false) { // not codes
	  
	 if(line.startsWith("#")) { 
		line = line.replace(/#/g, "");	
		if(line.includes("โค้ดบทที่")) {
			headline = line;
		} else {
			allLines += `<h4>${line}</h4>`;
		}
		
	} else if(line.startsWith("*") && !line.startsWith("*/")){
		line = line.replace(/\*/g, "\u2022&nbsp;"); // show a bullet
		allLines += `<p class="describe">${line}</p>`;
		
	} else if(line.startsWith("หมายเหตุ")){
		line = line.replace(/หมายเหตุ/g, "<font color='green'><strong>หมายเหตุ</strong></font>");
		allLines += `<p class="describe">${line}</p>`;
		
	} else if(line.startsWith("----")){		
		allLines += `<hr>`;
		
	} else {
		allLines += `<p class="describe">${line}</p>`;
	}
	
  } 
 
  
});	 // end for each loop
		
	let html = allLines;		
	html = html.replaceAll(/@-@/g, "$$$"); // fix bugs	   
	return html;
}

/*

for (const fileName of files) {
	getArrayFromFile(fileName).then(  allLine => {
		let html = genHTMLfromArray(allLine);
		writeHTML(fileName, "<!-genereat code-->" + html);		
	});
      
} */

/* 
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
	//countline(fileName);
});
*/