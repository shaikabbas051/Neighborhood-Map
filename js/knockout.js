var models = [
	{
		name: 'Charminar',
		location: {lat: 17.361564,lng: 78.474665},
		type: 'establishment'
	},
	{
		name: 'Wonderla',
		location: {lat: 17.217318,lng: 78.529179},
		type: 'amusement_park'
	},
	{
		name: 'Nehru Zoological Park',
		location: {lat: 17.351243,lng: 78.449687},
		type: 'zoo'
	},
	{
		name: 'Golconda Fort',
		location: {lat: 17.383309,lng: 78.401053},
		type: 'establishment'
	},
	{
		name: 'Osmania University',
		location: {lat: 17.410843,lng: 78.528171},
		type: 'university'
	},
	{
		name: 'Birla Mandir',
		location: {lat: 17.406237,lng: 78.469060},
		type: 'hindu_temple'
	}
	];

function initMap(){

	var map  = new google.maps.Map(document.getElementById('map'),{
		center: {lat: 17.385044,lng: 78.486671},
		zoom: 13
	});
	/*for(var i = 0; i < models.length; i++){
		var marker = new google.maps.Marker({
			position: models[i].location,
			title: models[i].name,
			animation: google.maps.Animation.DROP
		})
		var infowindow = new google.maps.InfoWindow({maxWidth: 200});
          var content = models[i].name;
          marker.addListener('click',(function(map, marker, content){
              return function(){
	              infowindow.setContent(content);
	              infowindow.open(map,marker);
	          };
            })(map, marker, content));
	}*/
	ko.applyBindings(new viewModel());
}

var viewModel = function(data){
	for(var i = 0; i < models.length; i++){
	this.list = ko.observableArray();
	this.list.push(models[i].name);
}
}
