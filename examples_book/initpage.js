	let targetDiv = document.getElementById("main");
	let statusLoading = document.getElementById("statusLoading");	
	let bottomAds = document.getElementById("bottom-ads");
	let healineDiv = document.getElementById("headline");
	let mainMenu = document.getElementById("main-menu");
		
	function isDesktop(){
		//if ( WURFL.form_factor === "Desktop") {		     
		if(  window.innerWidth >=768 ) {		
			return true;				
		} 
		return false;		
	}

	let allLink = document.getElementsByClassName("link-chap");
	for(const link of allLink) {
		link.addEventListener('click', function(event) {	
			event.preventDefault();	
			let file = link.href;		
			includeHTML(link);		
		});
		
		link.addEventListener('contextmenu', function(event) {
			event.preventDefault();			
		});
	}			
				
	function showMenu() {
		mainMenu.style.display = "block";			
	}
	
	function includeHTML(link) {		    
		if(!link){
			throw new Error(`Not have a link`);
		}
		
		document.title =  link.innerHTML;
				healineDiv.innerHTML = `โค้ด${link.innerHTML}`;	
				statusLoading.style.display = "block";		
				bottomAds.style.display = "none";	

		let options =  {
			mode: 'no-cors',
			cache: "no-cache",				
		};
		
		//let currentLocation =  window.location.protocol + "//" + window.location.host + "/" + window.location.pathname;
		//let tmp = link.href.split('/');
		//let fileLink = tmp[tmp.length-1];
		//let url = `https://raw.githubusercontent.com/adminho/javascript/master/examples_book/${fileLink}`;		
		//alert(url);
		let url = link.href;
		fetch(url, options)
		.then( res => res.text())		
		.then( text => { 
			statusLoading.style.display = "none";
			if(text.includes("404")){
				targetDiv.innerHTML = '<h1>Not found page</h1>';		
			} else {
				allLineArray = text.split("\n");
				targetDiv.innerHTML = genHTMLfromArray(allLineArray);		
				bottomAds.style.display = "block";	
			}
						
			if(  !isDesktop()) {					
				mainMenu.style.display = "none";	
			}
			
		 }
		)
		.catch( err => {
			targetDiv.innerHTML = 'Not found page';		
			statusLoading.style.display = "none";	
			bottomAds.style.display = "block";				
		});
    }
 
   	includeHTML(document.getElementsByClassName("link-chap")[1]); // select default link
	
	window.resize = function(){		
		alert();
		!isDesktop?mainMenu.style.display = "block":mainMenu.style.display = "none";
	}