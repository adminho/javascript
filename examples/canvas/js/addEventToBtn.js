const drawer = new DrawingState("preview", "draw-img"); // const ไวยากรณ์ใหม่ใน ES6

// อัพโหลดรูปภาพ และแสดงออกมา
$('#upload').change(function(){
	// this is a uploaded file.
	let imgObj = document.querySelector('#preview');
	let uploadedFile = this;	
	let file = uploadedFile.files[0];

	if (file.files && file.files[0]) {				
		console.log("No found uploaded file");				
		imgObj.src = "src/img/no-imgae-uploadfile.png"; 
		return;
	}
				
	let reader  = new FileReader();
	reader.addEventListener("load", function (e) {
		imgObj.src = reader.result;			// show the uploaded file.
		drawer.drawImage();		
	}, false);

	if (file) {
		console.log("....Upload a file -> OK!");
		reader.readAsDataURL(file);
	}

	$('#btn-control').show();
	$('#pic-result-area').show();		
});

// Switch buttons
function turnOffCreatImg(){
	$('#createImg').hide();
	$('#clearImg').show();
}

function turnOnCreatImg(){
	$('#createImg').show();		
	$('#clearImg').hide();	
}

$('input:radio[name=display]').change(function(){
	switch(this.value){
		case "gray":
			drawer.setGrayDrawing();
			$('#ribbon-disp').hide();
			break;
		case "ribbon":		
			drawer.setRibbonDrawing();
			$('#ribbon-disp').show();
			break;		
		case "gray_ribbon":
			drawer.setGrayRibbonDrawing();
			$('#ribbon-disp').show();
			break;
		default:
	}	

	drawer.drawImage();	
	turnOffCreatImg();
});	

$('input:radio[name=ribbon_style]').change(function(){		
	drawer.setRibbionStyle(this.value);		// Now, stye are "black_ribbon_1" and "black_ribbon_2"
	drawer.setTopLeftRibbon();	
	drawer.drawImage();	
	turnOffCreatImg();
	
	//fix bug only
	let e = $('input:radio[name=ribbon]');
	let temp = e.html();	
	temp = e.empty();
	e.html(temp);	
});	

$('input:radio[name=ribbon]').change(function(){	
	switch(this.value){
		case "top_left":			
			drawer.setTopLeftRibbon();
			break;
		case "top_right":		
			drawer.setTopRightRibbon();
			break;
		case "bottom_left":
			drawer.setBottomLeftRibbon();			
			break;
		case "bottom_right":
			drawer.setBottomRightRibbon();
			break;
		default:
	}	
	
	drawer.drawImage();	
	turnOffCreatImg();	
});	

// กดสร้างรูปภาพ
$('#createImg').click(function(){
	drawer.drawImage();		
	turnOffCreatImg();	
});		

// กดลบรูปภาพ
$('#clearImg').click(function(){
	drawer.clearImage();
	turnOnCreatImg();
});		