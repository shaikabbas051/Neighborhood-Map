var marker, infowindow, content, map, markers = [];

function initMap(){
	
	map  = new google.maps.Map(document.getElementById('map'),{
		center: {lat: 17.385044,lng: 78.486671},
		zoom: 11
	});
	
	for(var i = 0; i < models.length; i++){
   		 var titles = models[i].name;
       	 var positions = models[i].location;
          //set marker
          marker = new google.maps.Marker({
            position: positions,
            title: titles,
            animation: google.maps.Animation.DROP
            });

          markers.push(marker);
          //marker.setMap(map);
         
          content = models[i].name;
          
          infowindow = new google.maps.InfoWindow({maxWidth: 200});
          
          marker.addListener('click',(function(marker,content){
              return function(){
              infowindow.setContent(content);
              infowindow.open(map,marker);};
            })(marker,content));
      }

       for(var i = 0; i < markers.length; i++){
      		markers[i].setMap(map);
      	}

	var viewModel = function(){
		var self = this;
		this.list = ko.observableArray();
		for(var i = 0; i < models.length; i++){
			this.list.push(models[i].name);
		};	
		this.showinfo = function(){
			
			infowindow.setContent(content);
			infowindow.open(map,marker[i]);
		};
	
	}
	ko.applyBindings(new viewModel());
}