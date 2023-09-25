	let targetDiv = document.getElementById("main");
	let statusLoading = document.getElementById("statusLoading");	
	let bottomAds = document.getElementById("bottom-ads");
	let rightAds = document.getElementById("right-ads"); 
	let headlineDiv = document.getElementById("headline");
	let mainMenu = document.getElementById("main-menu");	
		
	function isDesktop(){	
		//if(  window.innerWidth >=768 || WURFL.form_factor === "Desktop") {		
		if(  window.innerWidth >=768 ) {	
			return true;				
		} 
		return false;		
	}

    function initMenuEvent(func){
		let allLink = document.getElementsByClassName("link-chap");
		for(const link of allLink) {
			link.addEventListener('click', function(event) {
				if( !isDesktop()) {					
					mainMenu.style.display = "none";	
				}				
				event.preventDefault();	
				let file = link.href;		
				includeHTML(link);		
			});		
			link.addEventListener('contextmenu', function(event) {
				event.preventDefault();			
			});			
			link.convertToHTML = func;
		}			
	}
	
	async function bildHTML(div, html) {
		let options =  {			
			cache: "no-cache",				
		};		
		let res = await fetch(html, options)
		let content = await res.text();
		div.innerHTML = content;		
	}	
	
	async function createAdsRight(){
		
	}
	
	async function createAdsBottom(){
		
	}
	
	function showMenu() {
		mainMenu.style.display = "block";			
	}
	
	function includeHTML(link) {		    
		if(!link){
			throw new Error(`Not have a link`);
		}
		
		document.title =  link.innerHTML;
				headlineDiv.innerHTML = `โค้ด${link.innerHTML}`;	
				statusLoading.style.display = "block";		
				targetDiv.classList.add("blur");
				bottomAds.style.display = "none";

		let options =  {		
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
			targetDiv.classList.remove("blur");
			if(text.includes("404 Not Found")){
				targetDiv.innerHTML = '<h1>Not found page</h1>';		
			} else if (text.includes("Failed to open stream") || text.includes("Warning") ){
				targetDiv.innerHTML = '<h1>Failed to Connect</h1>';
			} else {				
				//targetDiv.innerHTML = genHTMLfromMDFile(text);		
				targetDiv.innerHTML = link.convertToHTML(text);		
				bottomAds.style.display = "block";					
			}			
		 }
		)
		.catch( err => {
			targetDiv.innerHTML = 'Not found page';		
			statusLoading.style.display = "none";
			targetDiv.classList.remove("blur");			
			bottomAds.style.display = "block";				
		});
    }
 
	function selectMenu(index){
		includeHTML(document.getElementsByClassName("link-chap")[index]); // select default link
	}
	
	window.onload = async function() {
		await bildHTML(mainMenu, "left_menu.html");	
		await bildHTML(bottomAds, "ads_bottom.html");	
		await bildHTML(rightAds, "ads_right.html");	
		//initMenuEvent(genHTMLfromIpynb);
		initMenuEvent(genHTMLfromMDFile);
		selectMenu(2);
	}
	
	window.resize = function(){				
		!isDesktop?mainMenu.style.display = "block":mainMenu.style.display = "none";
	}