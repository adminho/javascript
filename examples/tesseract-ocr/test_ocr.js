// First, must install the tesseract.js package with commands
// > npm install tesseract.js --save
// Then, command run on Node.js
// > node tes_ocr.js
let Tesseract = require('tesseract.js')
let fs = require('fs')

function getMessage(imgObj,langValue='eng'){
	Tesseract.recognize(imgObj, {
		lang: langValue    
	})
	.then(function(result){	
		console.log("\n....Read the image success....");
		console.log("+++++++++++++++++++++++++++++++++++++++");				
		console.log(result.text);
		console.log("+++++++++++++++++++++++++++++++++++++++");						
	})
	.catch(function(err){
		console.log("Read the image failed");		
	});	
}

function detectImage(imgObj){
	Tesseract.detect(imgObj)
	.then(function(result){
		console.log("\n....Detect the image success....");
		console.log("Script: ",result.script)				
	}).catch(function(err){
		console.log("....Detect the image failed....")
		console.log(err)
	});		
}

fs.readFile('example.PNG', function (err, imgObj) {
  if (err) throw err;  
  detectImage(imgObj)  
  getMessage(imgObj,'eng')
});