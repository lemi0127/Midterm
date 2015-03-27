var pages = [];
var numLinks = 0;
var numPages = 0;

document.addEventListener("DOMContentLoaded", function(){
	//device ready listener
	pages = document.querySelectorAll('[data-role="page"]');	
	numPages = pages.length;
	var links = document.querySelectorAll('[data-role="pagelink"]');
	numLinks = links.length;
	for(var i=0;i<numLinks; i++){
		links[i].addEventListener("click", handleNav, false);	
	}
	loadPage(null);
});

function handleNav(ev){
	ev.preventDefault();
	var href = ev.target.href;
	var parts = href.split("#");
	loadPage( parts[1] );	
  return false;
}

function loadPage( url ){
	if(url == null){
		pages[0].style.display = 'block'; 
		history.replaceState(null, null, "#map");	
	}else{
    for(var i=0; i < numPages; i++){
      pages[i].className = "hidden";
      if(pages[i].id == url){
        pages[i].className = "show";
        history.pushState(null, "#" + url);
        setTimeout(addDispatch, 50, i);
      }
    }
    for(var t=0; t < numLinks; t++){
      links[t].className = "";
      if(links[t].href == location.href){
        links[t].className = "activetab";
      }
    }	
  } 
}

function handlePageShow(ev){
  ev.target.className = "activetab";
    
    if (ev.target.id == "map")
 {
  var parameters = {maximumAge: 0, timeout: 10000, enableHighAccuracy:true};
  if (navigator.geolocation){
	  if (status.innerHTML == ""){
			status.innerHTML = "Loading the map...";			       document.getElementById("theMap").appendChild(status); 
				  		} else {
                            status.innerHTML  = "Loading the map...";
}
				  	
 if(ev.currentTarget.id=="contacts"){
        checkContacts();
    }
};

function addDispatch(num){
  pages[num].dispatchEvent(pageshow);
};
