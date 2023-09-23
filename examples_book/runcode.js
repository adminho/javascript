let __resultAreaId__ = undefined;	

function toString(data) {
	if(data == null || data == undefined ) {
	return ""+ data;
						
	} else if (data instanceof Map) {
		let name = data.toString().split(/\s/g)[1].slice(0,-1);
		let strBegin = `${name}(${data.size}) { `;
				
		let str = strBegin;
		for(const [key, value] of data.entries()){
			str += `${toString(key)} => ${toString(value)}, `;
		}
				
		return (str != strBegin ) ? str.slice(0, -2) + ' }': `${strBegin}}`;
				
	} else if(data instanceof Set) {
		let name = data.toString().split(/\s/g)[1].slice(0,-1);
		let strBegin = `${name}(${data.size}) { `;
				
		let str = strBegin;
		for(const [key, value] of data.entries()){
			str += `${toString(value)}, `;
		}
				
		return (str != strBegin ) ? str.slice(0, -2) + ' }': `${strBegin}}`;
				
	} else if( data instanceof Array){				
		if(data.length>0 && !(0 in data)) {
			return `[ <${data.length} empty  items> ]`;					
		}
				
		let str = "[ ";
		for(const value of data) {
			str += ""+ toString(value) + ", ";
		}
				
		if("index" in data) str = str + `index: ${toString(data.index)}, `;
		if("input" in data) str = str + `input: ${toString(data.input)}, `;
		if("groups" in data) str = str + `groups: ${toString(data.groups)}, `;					
		return (str.length >2) ? str.slice(0, -2) + ' ]': '[]';	
					
	} else if( data instanceof Date){	
		return data.toString();
					
	} else if( data instanceof Window){	
		return `Window`;
		
	} else if( typeof data === 'string'){
		return `'${data}'`;				
				
	} else if(typeof data == 'bigint') {
		return `${data}n`;	
				
	} else if( typeof data === 'object'){
		let stringTag =  data[Symbol.toStringTag];
		if( stringTag == "Float32Array" || stringTag == "Int32Array" || stringTag == "Uint8Array"){			
			let arraString = data.toString().replaceAll(/\,/g, ", ");				
			return `${stringTag}(${data.length}) [ ${arraString} ]`;
				
		} else if( data.toString().includes("Arguments")){						
			//let str = `Arguments(${data.length}) { `	
			let strBegin = "[Arguments] { ";
			let str = strBegin;	
					
			for(const [key, value] of Object.entries(data)){
				str += `'${key}': ${toString(value)}, `;
			}
					
			for(const sym of Object.getOwnPropertySymbols(data)){ // get properties of Symbol
				str += `${sym.toString()}: ${toString(data[sym])}, `;
			}
					
			return (str != strBegin ) ? str.slice(0, -2) + ' }': `${strBegin}}`;
			//return (str != `Arguments(${data.length}) { ` ) ? str.slice(0, -2) + " }": `Arguments(${data.length}) {}`;	
					
		} else {
			let str = "{ ";
					
			for(const [key, value] of Object.entries(data)){						
				str += `${key}: ${toString(value)}, `;
			}	

			for(const sym of Object.getOwnPropertySymbols(data)){ // get properties of Symbol
				str += `[${sym.toString()}]: ${toString(data[sym])}, `;
			}
				
			return (str.length >2) ? str.slice(0, -2) + " }": "{}";	
		}	
				
	} else {				
		return String(data); // stop recursive		
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
		
function decodeHtml(str) {
	return str
		.replaceAll(/&/g, "&amp;")
		.replaceAll(/</g, "&lt;")
		.replaceAll(/>/g, "&gt;")
		.replaceAll(/"/g, '&quot;')
		.replaceAll(/'/g, "&#039;")
		.replaceAll(/\n/g,'<br>')
		.replaceAll(/\t/g, "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;")
		.replaceAll(/\s/g, "&nbsp;");				
		}
			
function dowloadfile(content){
	const link = document.createElement("a");			
	const file = new Blob([content], { type: 'text/plain' });
	link.href = URL.createObjectURL(file);
	link.download = "sample.html";
	link.click();
	URL.revokeObjectURL(link.href);	
}

const __old__console__ = console.log;		

console.log = function(...data){
	if(!__resultAreaId__) {
		return __old__console__(data);
	}
	
	let display = document.querySelector(__resultAreaId__);		
	if(!display) {
		return __old__console__(data);
	}
	
	for( let d of data){
		if( typeof d !== 'string'){					
			d = toString(d);					
		} 
		
		if(d == '@negzero'){ // fix bugs
			d = "-0";					
		} 
								
		if(d === "@not_use_Arguments"){ // fix bugs
			throw new ReferenceError("arguments is not defined");
		}
				
		if(d.startsWith('@html')){
			d = d.substring(5);	 // เมื่อเจอ @html นำหน้า เป็นการบอกว่าต้องการให้สตริง html มันทำงานในเว็บเบราเซอร์ 				
		} else {
			d = decodeHtml(d);   // ไม่ต้องการให้สตริง html ทำงานในเว็บเบราเซอร์
		}
								
		display.innerHTML += d + " ";
	}
	display.innerHTML += "<br>";
}
		
function clearDisplay(targetCount) {			
	let displayResult = document.querySelector(`#displayResult${targetCount}`);	
	displayResult.innerHTML = "";	
			
	let textCodeArea = document.querySelector(`#codeArea${targetCount}`);			
	if(textCodeArea.classList.contains("run-already")){				
		textCodeArea.classList.remove("run-already");
		textCodeArea.classList.add("notrun");						
	}
}

async function saveModule(codeText) {
	fetch('test_module/save_module.php', {
		method: "POST",
         headers: {
			'Accept': 'application/json, text/plain, */*',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			code: codeText
		})		
	})
	.then( response => response.text())
	.then( text => alert(text) )
	.catch(error => console.error('Error:', error)); 

}
JSON.stringify({ "id": 78912 })

function runCodeBtn(targetCount) {						
	clearDisplay(targetCount);
		
	__resultAreaId__ = `#displayResult${targetCount}`;						
	let textCodeArea = document.querySelector(`#codeArea${targetCount}`);
	let btn = document.querySelector(`#btn${targetCount}`);
	let myform = document.querySelector(`#form${targetCount}`);
	let codeTxt = textCodeArea.value;										
	
	if( codeTxt.includes("<html>")>0 && btn.value=="Open HTML" ) {		
		myform.action="display_html.php"
		myform.submit();		
		
	} else if( btn.value=="Import" ) {
		myform.action="test_module/import_module.php"
		myform.submit();				
		//saveModule(codeTxt);
		
	} else if( btn.value=="Run New Tab" ) {		
		myform.action="test_module/run_module.php"
		myform.submit();	
		
	} else {
				
		try {
			console.log("@html<font color='lightgreen'>ผลการรัน:</font>");	
			codeTxt = codeTxt.replaceAll(/-false/g, "'@negzero'"); // fix bugs ถ้าเป็นเลข -false ต้องแสดง -0 เลยต้องแทนด้วย '@negzero'					
			//codeTxt = codeTxt.replaceAll(/-0.(?<!\,)$/g, "'@negzero'"); // fix bugs ถ้าเป็นเลข -0 ต้องแสดง -0 เลยต้องแทนด้วย '@negzero'										
			//fix bugs ถ้าเป็นเลข -0 ต้องแสดง -0 เลยต้องแทนด้วย '@negzero' 
			// ทั้งนี้ยังแก้ปัญหาเช่น -0.56 ไม่ได้เลยต้องค้นหา -0, แทน เฉพาะตัวอย่างบทที่ 2	แต่ก็จะเกิดปัญหาบทที่ 15 ในตัวอย่าง array = [-0 , NaN, 1];								
			codeTxt = codeTxt.replaceAll(/-0,/g, "'@negzero',"); 
			arguments = "@not_use_Arguments"; // fixbugs ในบทที่ 10 เรื่อง arguments ในฟังก์ชั่นลูกศร				
			eval(codeTxt);						
		} catch (e){
			console.log("@html<font color='orange'>++++Error++++</font>");	
			console.log("@html<font color='orange'>Uncaught " + e + "</font>");
			if(e.stack) {
				console.log("@html<font color='orange'>" + e.stack + "</font>");					
			} 
		}				
				
	}
			
	textCodeArea.classList.add("run-already");
	//btn.value = "Run again";
	return false;
}