function initMap(){
	var map = new google.maps.Map(document.getElementById('map'),{
		center: {lat: 17.405044,lng: 78.586671},
		zoom: 12
	});
	var request = {
		location: {lat: 17.385044,lng: 78.486671},
		radius: 5000,
		type: ['courthouse']
	};
	var placesService = new google.maps.places.PlacesService(map);
	placesService.nearbySearch(request, callback);

	function callback(results, status){
		if(status === "OK"){
			for (var i = 0; i < results.length; i++){
				createmarker(results[i]);
				document.getElementById('items').write = results[i].name;
			}
		}else{"we could not find location due to "+ status}
	}
	var infowindow = new google.maps.InfoWindow();

	function createmarker(place){
		
		var location = place.geometry.location;
		var marker = new google.maps.Marker({
			position: location,
			animation: google.maps.Animation.DROP,
			title: place.name,
			map: map
		});
		marker.addListener('click', function (){
			infowindow.open(map,marker);
			infowindow.setContent(place.name);
		});
	} 
};
