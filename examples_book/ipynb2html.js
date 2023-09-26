	function toStrong(line){		
		let items = line.split("**");
		let newLine = "";
		items.forEach( (targetStr, index)=> {
			if(index == 0 || index == items.length-1){ 
				newLine += targetStr;
				return; 
			} 
		    
			let beforeIndex = line.indexOf(targetStr);
			let lastIndex = beforeIndex + targetStr.length;
		    if( line.slice(beforeIndex-2, beforeIndex) == "**" 
			    &&  line.slice(lastIndex, lastIndex+2) == "**") {
				newLine +=`<strong>${targetStr}</strong>`
				return;
			}				
			
		});
		return newLine;
	}
	
	function toALink(line){
		let items = line.split(" ");
		let newLine = "";
		if(!line.includes("http") || ( ( line.includes("src") || line.includes("href"))  && line.includes("<") && line.includes(">") )){
			return line; // skip
		}
		
		items.forEach( (targetStr)=> {
			if(targetStr.startsWith("http")){
				newLine += `<a href='${targetStr}' target='_blank'>${targetStr}</a> `;
			} else {
				newLine += `${targetStr} `;
			}			
			
		});
		return newLine.slice(0,-1);
	}
	
	function evalLine(line){
		line = toALink(line);	
		if(line.startsWith("###")){
			line = line.replaceAll(/[#\n]/g, "");
			line = `<h3>${line}</h3>`;
					
		} else if (line.startsWith("##")){
			line = line.replaceAll(/[#\n]/g, "");
			line = `<h2>${line}</h2>`;
						
		} else if (line.startsWith("#")){
			line = line.replaceAll(/[#\n]/g, "");
			line = `<h2>${line}</h2>`;												
						
		} else if (line.startsWith("---")){						
			line = "<hr>";												
						
		} else if (line.trimStart().startsWith("* ")){						
			line = line.replace(/\*\s{1,}/, "&nbsp;&nbsp;&nbsp;&#x2022;&nbsp;");		
						
		} else if (line.includes("<") && line.includes(">")){						
			line = line.replaceAll(/\n/g, "");
						
		}					
		//		
		line = toStrong(line);		
		return line;
	}
	
	function genHTMLfromIpynb(context){
		let ipynbJsonData = JSON.parse(context)
		let allLines ="";
		ipynbJsonData.cells.forEach( (cell)=> {		
			
			if(cell.cell_type == "markdown") {			
				if(cell.source[0].includes("How to use Colab?") ){return;} // skip
				
				let content =" ";
				cell.source.forEach( (line)=>{							
					content += evalLine(line);					
				});	

				content = content.replaceAll(/\n{1,}/g, "<br>");				
				allLines += `<div id='${cell.metadata.id}' class='describe-ipynb'>${content}</div>`;
				
			} else if (cell.cell_type =="code") {				
				let content = cell.source.join("");				
				allLines += `<textarea id="${cell.metadata.id}" class="notrun" rows=${cell.source.length}>${content}</textarea>`;
				
				if( cell.outputs.length > 0){
					let output = cell.outputs[0];		
					let content = "";					
					if( output.output_type == "execute_result"){					
						content = output.data["text/plain"].join("");	
					} else if ( output.output_type == "stream"){
						content = output["text"].join("");
					}					
					content = decodeHtml(content);
					allLines += `<span>Output (Colab/Jupyter Notebook/JupyterLab): </span><div id="displayResult${cell.metadata.id}" class="display-result-ipynb">${content}</div>`;
										
				}				
			}						
		});
			
		return allLines;
	}