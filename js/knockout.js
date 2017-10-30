var markers = ko.observableArray();

function initMap(){
	//setup map
	map  = new google.maps.Map(document.getElementById('map'),{
		center: {lat: 17.385044,lng: 78.486671},
		zoom: 11,
		styles: styles
	});
	//call viewModel
	ko.applyBindings(new viewModel());
}//initMap function end

//viewModel
var viewModel = function(data){
	//create infowindow object
	var infowindow = new google.maps.InfoWindow({maxWidth: 200});
	//loop to itterate through marker
	for(var i = 0; i < models.length; i++){
		//declaring name and loation
	   	var titles = models[i].name;
	 	var positions = models[i].location;
		//marker object
		var marker = new google.maps.Marker({
	  		map: map,
			position: positions,
			title: titles,
			animation: google.maps.Animation.DROP
		});//marker end
		//push each marker in to markers array
		markers.push(marker);
		//show marker on map
		marker.setMap(map);
		//add event listener to marker ( call populateIndowindow function)  
		marker.addListener('click',populateInfowindow(marker));
	};//end of for loop

	//display list of items
	this.list = ko.observableArray();
	for(var i = 0; i < models.length; i++){
		this.list.push(models[i].name);
	};
	//show infowindow when list items are clicked
	this.showinfo = function(marker, infowindow){
		populateInfowindow(marker, infowindow);
	};
		
	function populateInfowindow(marker, infowindow){
		return function(){
			if(infowindow.marker != marker){
				infowindow.marker = marker;
				infowindow.setContent(marker.title);
				infowindow.open(map, marker);
			}
		};
	}//end populate window
}//viewModel end
	

 