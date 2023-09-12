		let resultAreaId = "";	
				
		function toString(data) {
			if(data == null || data == undefined ) {
				return ""+ data;				
						
			} else if (data instanceof Map) {
				let str = `Map(${data.size}) { `;
				for(const [key, value] of data.entries()){
						str += `'${key}' => ${toString(value)}, `;
				}
				
				return (str != `Map(${data.size}) { ` ) ? str.slice(0, -2) + ' }': `Map(${data.size}) {}`;	
				
			} else if( data instanceof Array){
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
					
			} else if( typeof data === 'object'){				
				
				
				if( data.toString().includes("Arguments")){		
					let str = "[Arguments] { ";		
					
					for(const [key, value] of Object.entries(data)){
						str += `'${key}': ${toString(value)}, `;
					}
					
					for(const sym of Object.getOwnPropertySymbols(data)){ // get properties of Symbol
						//str += `${sym.toString()}: ${toString(data[sym])}, `;
					}
					
					return (str != "[Arguments] { " ) ? str.slice(0, -2) + " }": "[Arguments] {}";	
					
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
				
						
			} else if( typeof data === 'string'){
				return `'${data}'`;				
				
			} else if(typeof data == 'bigint') {
				return `${data}n`;	
				
			} else {				
				return String(data); // recursive
				
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
			
		console.log = function(...data){
			let display = document.querySelector(resultAreaId);			
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
				
				if(d.startsWith('#')){
					d = d.substring(1);	 // เมื่อเจอ # นำหน้า ต้องการให้สตริง html มันทำงานในเว็บเบราเซอร์ 				
				} else {
					d = decodeHtml(d);   // ไม่ต้องการให้สตริง html ทำงานในเว็บเบราเซอร์
				}
								
				display.innerHTML += d + " ";
			}
			display.innerHTML += "<br>";
		}
		
		function clearDisplay(displayAreaId, textAreaId=undefined) {
			let display = document.querySelector(displayAreaId);	
			display.innerHTML = "";	
			
			if(textAreaId){
				let textCodeArea = document.querySelector(textAreaId);
				textCodeArea.classList.remove("run-already");
				textCodeArea.classList.add("notrun");						
			}
		}

		function runCodeBtn(countTarget) {
			resultAreaId = `#displayResult${countTarget}`;
			clearDisplay(resultAreaId);
									
			let textCodeArea = document.querySelector(`#codeArea${countTarget}`);
			let codeTxt = textCodeArea.value;				
						
			if( codeTxt.includes("<html>")>0 ) {
				const link = document.createElement("a");
				const content = codeTxt;
				const file = new Blob([content], { type: 'text/plain' });
				link.href = URL.createObjectURL(file);
				link.download = "sample.html";
				link.click();
				URL.revokeObjectURL(link.href);
			} else {				
				try {
					console.log("#<font color='lightgreen'>ผลการรัน:</font>");	
					codeTxt = codeTxt.replaceAll(/-false/g, "'@negzero'"); // fix bugs ถ้าเป็นเลข -false ต้องแสดง -0 เลยต้องแทนด้วย '@negzero'					
					//codeTxt = codeTxt.replaceAll(/-0.(?<!\,)$/g, "'@negzero'"); // fix bugs ถ้าเป็นเลข -0 ต้องแสดง -0 เลยต้องแทนด้วย '@negzero'										
					//fix bugs ถ้าเป็นเลข -0 ต้องแสดง -0 เลยต้องแทนด้วย '@negzero' 
					// ทั้งนี้ยังแก้ปัญหาเช่น -0.56 ไม่ได้เลยต้องค้นหา -0, แทน เฉพาะตัวอย่างบทที่ 2									
					codeTxt = codeTxt.replaceAll(/-0,/g, "'@negzero',"); 
					arguments = "@not_use_Arguments"; // fixbugs ในบทที่ 10 เรื่อง arguments ในฟังก์ชั่นลูกศร				
					eval(codeTxt);						
				} catch (e){
					console.log("#<font color='orange'>++++Error++++</font>");	
					console.log("#<font color='orange'>Uncaught " + e + "</font>");
					if(e.stack) {
						console.log("#<font color='orange'>" + e.stack + "</font>");					
					} 
				}
			}
			textCodeArea.classList.add("run-already");
			//btn.value = "Run again";
		}