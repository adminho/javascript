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
    
  if(line.startsWith("```js") || line.startsWith("```html")){ // start codes
	  isCode = true;	
	  count++;
	  if(line.startsWith("```js")){
		btnValue = "Run";
	  } else if(line.startsWith("```html")) {
		  btnValue = "Open HTML";
	  }
	  
  } else if( isCode==true && line.startsWith("```")){ // reach to end of codes
	  isCode = false	  	  
	  const rows = lineCodes.split('\n').length-1;
	  
	  allLines += `<div>
					<form id="form${count}" style="margin:0px" action="display_html.php" method="POST" target="_blank">
						<label for="codeArea${count}"></label>					
						<textarea id="codeArea${count}" name="html" class="notrun" rows=${rows}>${lineCodes.slice(0,-1)}</textarea>					
					</form>						
					<div id="displayResult${count}" class="display-result"></div>
					<input class="run-btn" type="submit" value="${btnValue}" onclick="runCodeBtn(${count})">
					<input class="run-btn" type="submit" value="Clear" onclick="clearDisplay(${count})">
				  </div>`;	  
	  	  
	  lineCodes = "";
	  
  } else if(isCode==false) { // not codes
	  
	 if(line.startsWith("#")) { 
		line = line.replace(/#/g, "");	
		if(line.includes("โค้ดบทที่")) {
			headline = line;
		} else {
			allLines += `<h4>${line}</h4>`;
		}
		
	} else if(line.startsWith("*") && !line.startsWith("*/")){
		line = line.replace(/\*/g, "\u2022&nbsp;");
		allLines += `<p class="describe">${line}</p>`;
		
	} else if(line.startsWith("หมายเหตุ")){
		line = line.replace(/หมายเหตุ/g, "<font color='green'><strong>หมายเหตุ</strong></font>");
		allLines += `<p class="describe">${line}</p>`;
		
	} else {
		allLines += `<p class="describe">${line}</p>`;
	}
	
  }
    
  if(isCode && !line.startsWith("```js") && !line.startsWith("```html")){
	  line = line.replaceAll(/\$\$/g, "@-@"); // fix bugs กรณีที่ line มี $$ วางติดกันอยู่ในสตริง	  
	  lineCodes += `${line}\n`;	  
  }
  
  if(last) {	  
	// writeToHTML(headline, allLines, fileName);
	let html = templateHTML.replace("${headline}", headline)
			.replace("${allLines}", allLines)
			.replace("${fileName}", fileName);
			
	html = html.replaceAll(/@-@/g, "$$$"); // fix bugs
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

