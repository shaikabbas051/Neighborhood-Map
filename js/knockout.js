var markers = ko.observableArray();//Global Variable

function initMap(){
	//setup map
	map  = new google.maps.Map(document.getElementById('map'),{
		center: {lat: 17.385044,lng: 78.486671},
		zoom: 11,
		styles: styles
		
	});
	//call viewModel
	ko.applyBindings(new viewModel());
}//end initMap function

//viewModel
var viewModel = function(data){
	
	//create infowindow object
	var infowindow = new google.maps.InfoWindow({maxWidth: 200});
	//loop to itterate through marker
	for(var i = 0; i < models.length; i++){
		//declaring name and loation
	   	var titles = models[i].name;
	 	var positions = models[i].location;
	 	var description = models[i].description;
	 	var id = models[i].id;
		//marker object
		var marker = new google.maps.Marker({
	  		map: map,
			position: positions,
			description: description,
			title: titles,
			id: id,
			timing: '',
			animation: google.maps.Animation.DROP
		});//marker end
		//push each marker in to markers array
		markers.push(marker);
		markers().forEach(function(marker) {
			marker.addListener('click', function() {
				populateInfoWindow(this, infowindow);
			});
		});
	}//end of for loop
	markers().forEach(function(marker){
		$.ajax({
			method: 'GET',
            dataType: "json",
            url: "https://api.foursquare.com/v2/venues/" + marker.id + "?client_id=OLVWHYOR5EMW5JN00JANKRL0R314QJY2JB1QI1R4IDWLUL4J&client_secret=RVBWXZ5JXUVPOWQURKYJBYHB3RAHH0LYSE0HQRLLKXPOAD4C&v=20171101",
            success: function(data){
            	var venue = data.response.venue;
            	return marker.timing = data.response.venue.hours.timeframes[0].open[0].start;
            },
            error: function(){
            	return marker.timing = "something went wrong";
            }
		});
	});
	
	//when listItems are clicked, show infowindow of associated marker
	this.showInfowindow = function(marker) {
        populateInfoWindow(marker, infowindow);
    };
	
	//set infowindow when click event made on marker or on listItems
	function populateInfoWindow(marker, infowindow){
		//bounce when marker or listitems are clicked
		marker.setAnimation(google.maps.Animation.BOUNCE);
		setTimeout(function() {
            marker.setAnimation(null);
        }, 1400);
		//show infowindow when marker or listitems are clicked
		if(infowindow.marker != marker){
			infowindow.marker = marker;
			infowindow.setContent('<strong style="font-size: 20px; font-family: Noto serif, serif">'+marker.title+'</strong>' + '<br>' + '<p style="font-family: Noto serif, serif">'+marker.description+'</p>' + '<br>' + marker.timing);
			infowindow.open(map, marker);
		}
	}//end populate window

	//observe the input text
	this.findPlace = ko.observable("");
	//all markers visible default
    this.filterSearch=function(){
        if(this.findPlace().lenth===0){
            markers().forEach(function(marker) {
                marker.setVisible(true);
            });
        }
    };
    //display the list items and markers accordingly with search input
    this.listItems = ko.computed(function() {
        var filter = this.findPlace().toLowerCase();
        if (!filter) {
            markers().forEach(function(marker){
				marker.setVisible(true);
			});
            return markers();

        } else {
        	infowindow.close();//when input text entered close previous infowindow
            return ko.utils.arrayFilter(markers(), function(item) {
                var match = item.title.toLowerCase().indexOf(filter) > -1;//locate for the input text
                item.setVisible(match);
                return match;
            });
        }
    }, this);
};//end viewModel
function errorMessage(){
	alert("Can't load Google Map");
};

 