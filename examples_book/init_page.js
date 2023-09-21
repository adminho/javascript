	let targetDiv = document.getElementById("main");
	let statusLoading = document.getElementById("statusLoading");	
	let bottomAds = document.getElementById("bottom-ads");
	bottomAds.style.display = "none";				

	let allLink = document.getElementsByClassName("link-chap");
	for(const link of allLink) {
		link.addEventListener('click', function(event) {					
			//if ( WURFL.form_factor === "Desktop") {
			if(  window.innerWidth >=768 ) {					
				event.preventDefault();
				document.title =  link.innerHTML;
				document.getElementById("headline").innerHTML = link.innerHTML;	
				statusLoading.style.display = "block";		
				bottomAds.style.display = "none";					
				includeHTML(link);
			}			
			
		});
		
		link.addEventListener('contextmenu', function(event) {
			event.preventDefault();			
		});
	}			
			
	function includeHTML(link) {		
		let options =  {
			headers: {
				'Cache-Control': 'no-cache'
				}
		};
		
		let file = link.href;
		fetch(file, options)
		.then( res => res.text())
		.then( text => { 
			targetDiv.innerHTML = text;		
			statusLoading.style.display = "none";	
			bottomAds.style.display = "block";	
			if(link.href.startsWith("test_js"))transferHTM('test_js');
		 }
		);
    }
   
	function selectLink(index) {		
		document.getElementsByClassName("link-chap")[index].click();
	}