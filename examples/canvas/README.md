# Convas example

Example codes for using convas to draw pricture over anther picture

```
grayImg.onload = () => {	
	console.log("....loading first image");							
				
	ribbonImg.onload = () => {
		console.log("....loading second image");	
				
		let canvas = document.createElement('canvas');							
		let canvasContext = canvas.getContext("2d");
		canvas.width = grayImg.width;
		canvas.height = grayImg.height;				
							
		console.log("....drawing the ribbon on the gray image");			
		canvasContext.drawImage(grayImg, 0, 0);		            // Draw first picture
		canvasContext.drawImage(ribbonImg, xRibbon, yRibbon); 	// Draw second picture over the first one
				
		// ....to do something
	};							
			
	ribbonImg.src = ribbonSrc;				
};			
```

__Credit: pictures of ribbon__

* https://blackribbon.nuuneoi.com/
* https://www.facebook.com/jibbazee/posts/10153967020642895

and 'I borrowed some code from'
* http://www.ajaxblender.com/howto-convert-image-to-grayscale-using-javascript.html	
