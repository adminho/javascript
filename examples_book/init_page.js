	let targetDiv = document.getElementById("main");
	let statusLoading = document.getElementById("statusLoading");	
	let bottomAds = document.getElementById("bottom-ads");
	let healineDiv = document.getElementById("headline")
	bottomAds.style.display = "none";				

	let allLink = document.getElementsByClassName("link-chap");
	for(const link of allLink) {
		link.addEventListener('click', function(event) {					
			//if ( WURFL.form_factor === "Desktop") {		     
			if(  window.innerWidth >=768 ) {					
				event.preventDefault();								
				includeHTML(link);
			} else {
				let str =link.href.split("chapter")[1];
				let no = str.replace(".html", "");						
				link.href = `chapter.php?no=${parseInt(no)}`;							
			}			
			
		});
		
		link.addEventListener('contextmenu', function(event) {
			event.preventDefault();			
		});
	}			
			
	function includeHTML(link) {		
		document.title =  link.innerHTML;
		healineDiv.innerHTML = link.innerHTML;	
		statusLoading.style.display = "block";		
		bottomAds.style.display = "none";	
				
		let options =  {
			headers: {
				'Cache-Control': 'no-cache'
				}
		};
		
		let file = link.href;
		fetch(file, options)
		.then( res => res.text())		
		.then( text => { 
			if(text.includes("404")){
				targetDiv.innerHTML = '<h1>Not found page</h1>';		
			} else {
				targetDiv.innerHTML = text;		
			}
			statusLoading.style.display = "none";	
			bottomAds.style.display = "block";	
			//if(link.href.startsWith("test_js"))transferHTM('test_js');
		 }
		)
		.catch( err => {
			targetDiv.innerHTML = 'Not found page';		
			statusLoading.style.display = "none";	
			bottomAds.style.display = "block";				
		});
    }
 
   /*
	function selectLink(index) {		
		document.getElementsByClassName("link-chap")[index].click();
	}*/