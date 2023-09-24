function isBeginCode(line){
	if(line.startsWith("```js") || line.startsWith("```html") || line.startsWith("```module") || line.startsWith("```run.module")) {
		return true;
	}	
	return false;
}
  
function genHTMLfromMDFile(content) {
  allLineArray = content.split("\n");
  
  let isAreaCode = false;
  let lineCodes = "";
  let count = 0;

  let headline = "";
  let allLines = "";
  let btnValue = "";
  
allLineArray.forEach( (line) =>  {
		
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