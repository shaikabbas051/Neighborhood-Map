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
	 	var type = models[i].type;
	 	var id = models[i].id;
		//marker object
		var marker = new google.maps.Marker({
	  		map: map,
			position: positions,
			type: type,
			title: titles,
			photo: '',
			id: id,
			rating: '',
			animation: google.maps.Animation.DROP
		});//marker end
		//push each marker in to markers array
		markers.push(marker);
		
	}//end of for loop

	//event listener for marker
	markers().forEach(function(marker) {
		marker.addListener('click', function() {
			populateInfoWindow(this, infowindow);
		});
	});

	//making ajax request for foursquare api
	markers().forEach(function(marker) {
		//declaring foursquare client id and secret
		var CLIENT_ID = "OLVWHYOR5EMW5JN00JANKRL0R314QJY2JB1QI1R4IDWLUL4J";
        var CLIENT_SECRET = "RVBWXZ5JXUVPOWQURKYJBYHB3RAHH0LYSE0HQRLLKXPOAD4C";
        $.ajax({
            method: 'GET',
            dataType: "json",
            url: "https://api.foursquare.com/v2/venues/" + marker.id + "?client_id="+ CLIENT_ID +"&client_secret="+ CLIENT_SECRET +"&v=20171101",
            success: function(data) {
                //var venue = data.response.venue;
                //call for photos
                var imgurl = data.response.venue.photos.groups[0].items[0];
                //call for ratings
                var ratingurl = data.response.venue;
                //check for prefix and suffix property, on successful return image
                if ( ((imgurl.hasOwnProperty('prefix')) && (imgurl.hasOwnProperty('suffix')))) {
                    marker.photo = imgurl.prefix + "200x100" + imgurl.suffix;
                } else {
                    marker.photo = 'Image not found';
                };
                //check for rating property
                if(ratingurl.hasOwnProperty('rating')){
                	marker.rating = ratingurl.rating + "/10";
                }else{
                	marker.rating = 'No ratings yet';
                };
            },
            //on error return this message
            error: function() {
                marker.photo = "Something went wrong";
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
		//storing the data in variables before displaying
		var placeName = '<strong style="font-size: 20px; font-family: Noto serif, serif">'+marker.title+'</strong>';
		var placeType = /*'<p style="font-family: Noto serif, serif">'+*/"Type: "+ '<strong style="font-size: 15px">' + marker.type + '</strong>'/* + '</p>'*/;
		var placeRating = "Ratings: "+ '<strong style="font-size: 15px">' +  marker.rating + '</strong>';
		var placeImage = "<img src="+marker.photo+">";
		//show this in infowindow
		infowindow.setContent( placeName + "<br>" + placeType + "<br>" + placeRating + "<br>" + placeImage);
		infowindow.open(map, marker);
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

 