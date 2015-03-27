 var mapOptions ={
          center:new google.maps.LatLng(45.348247,-75.756086),
          zoom:14,
          mapTypeId: google.maps.MapTypeId.TERRIAN
			}

    var map =new google.maps.Map(document.getElementById("theMap"), mapOptions);    

    google.maps.event.addListener(map, 'dblclick', one);

	google.maps.event.addListener(map, 'dragend', function(ev){
		map.setZoom(3);
		var lat = (Math.random() * 180) - 90;		
		var lng = (Math.random() * 360) - 180;		
		var LL = new google.maps.LatLng(lat, lng);
		map.panTo( LL );
		map.setZoom(12);
	});

google.maps.event.addDomListener(window, 'load', initialize);

