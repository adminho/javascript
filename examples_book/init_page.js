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
				let file = link.href;		
				includeHTML(link);
			} else {
				let str =link.href.split("chapter")[1];
				let no = str.replace(".html", "");						
				link.href = `chapter.php?no=${parseInt(no)-1}`;							
			}			
			
		});
		
		link.addEventListener('contextmenu', function(event) {
			event.preventDefault();			
		});
	}			
			
	function includeHTML(link) {	
	    
		if(!link){
			throw new Error(`Not have a link`);
		}
		
		document.title =  link.innerHTML;
				healineDiv.innerHTML = link.innerHTML;	
				statusLoading.style.display = "block";		
				bottomAds.style.display = "none";	
		
		let options =  {
			headers: {
				'Cache-Control': 'no-cache'
				}
		};
				
		fetch(link.href, options)
		.then( res => res.text())		
		.then( text => { 
			statusLoading.style.display = "none";
			if(text.includes("404")){
				targetDiv.innerHTML = '<h1>Not found page</h1>';		
			} else {
				targetDiv.innerHTML = text;		
				bottomAds.style.display = "block";	
			}
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