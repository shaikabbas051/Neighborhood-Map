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
	},
	{
		name: 'Spanish Mosque',
		location: {lat: 17.443758,lng: 78.472292},
		type: 'mosque'
	},
	{
		name: 'Osman sagar',
		location: {lat: 17.376266,lng: 78.298864},
		type: 'park'
	},
	{
		name: 'Rajiv Gandhi International Airport',
		location: {lat: 17.240263,lng: 78.429385},
		type: 'airport'
	}
	];

var styles = [
          {
            "featureType": "landscape.natural.landcover",
            "elementType": "geometry.fill",
            "stylers": [
              {
                "color": "#bfffdf"
              }
            ]
          },
          {
            "featureType": "landscape.natural.terrain",
            "elementType": "geometry.fill",
            "stylers": [
              {
                "color": "#c5c5c5"
              }
            ]
          },
          {
            "featureType": "poi.park",
            "elementType": "geometry.fill",
            "stylers": [
              {
                "color": "#5ad35e"
              }
            ]
          },
          {
            "featureType": "road.arterial",
            "elementType": "geometry.fill",
            "stylers": [
              {
                "color": "#c0c0c0"
              }
            ]
          },
          {
            "featureType": "road.highway",
            "elementType": "geometry.fill",
            "stylers": [
              {
                "color": "#ffe706"
              },
              {
                "weight": 1
              }
            ]
          },
          {
            "featureType": "road.highway",
            "elementType": "geometry.stroke",
            "stylers": [
              {
                "color": "#ffe706"
              },
              {
                "weight": 0.5
              }
            ]
          },
          {
            "featureType": "road.highway",
            "elementType": "labels.text",
            "stylers": [
              {
                "color": "#8f8f47"
              }
            ]
          },
          {
            "featureType": "road.local",
            "elementType": "geometry.fill",
            "stylers": [
              {
                "color": "#ffffff"
              }
            ]
          },
          {
            "featureType": "water",
            "elementType": "geometry.fill",
            "stylers": [
              {
                "color": "#ceceff"
              }
            ]
          }
        ];