let mapboxTiles = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
      attribution: '<a href="http://www.mapbox.com/about/maps/" target="_blank">Terms &amp; Feedback</a>'
  });

const colour =

  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiYWV1bmRlcmhpbGwiLCJhIjoiY2txaDgwYnd0MDY3MjJ3bWxjeHE1eTNhdiJ9.rzZ7FRFi_3LIJELE4KXRmA'
});



map = L.map('map')
      .addLayer(mapboxTiles)
      .addLayer(colour)
      //layer.remove(crossRef)
      //.addLayer(geoJSON files)

      .setView([51.505, -0.09], 14) //need to make geolocation
      //.on("click", function(data) {
          //console.log(data)
          //json.stringify(data.latlng)
          //(data.latlng).push(mapDatabase)
      //})

let mapDatabase = {
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "properties": {
                "name": "Dunkin Donuts",
                "address": "1 Broadway #1, Cambridge, MA 02142",
                                "latitude": 42.362504,
                "longitude": -71.083372
            },
            "geometry": {
                "type": "Point",
                "coordinates": [-71.083372, 42.362504]
            }
        },
        {
            "type": "Feature",
            "properties": {
                "name": "Starbucks",
                "address": "6 Cambridge Center, Cambridge, MA 02142",
                                "latitude": 42.363884,
                "longitude": -71.087749
            },
            "geometry": {
                "type": "Point",
                "coordinates": [-71.087749, 42.363884]
            }
        }
    ]
};



//place the points by lat/lng on the map

L.geoJson(mapDatabase).addTo(map);

//bind the name of each location with pop-up

L.geoJson(mapDatabase, {
    onEachFeature: function (feature, layer) {
        layer.bindPopup(feature.properties.name);
    }
}).addTo(map);



//search the map

  let searchControl = L.esri.Geocoding.geosearch().addTo(map);

  let results = L.layerGroup().addTo(map);

  searchControl.on('results', function (data) {
    //console.log(data)
    results.clearLayers();
    for (var i = data.results.length - 1; i >= 0; i--) {
      results.addLayer(L.marker(data.results[i].latlng));
      console.log(data.results[i].properties.LongLabel)
    }
  });

let popup = L.popup();

//let activatePoints =

map.on('click', onMapClick);

let markerArray = [];

function onMapClick(e) {
        popup
        .setLatLng(e.latlng);
        //.setContent("You clicked the map at " + e.latlng.toString())
        marker = L.marker(e.latlng);

        map.addLayer(marker);
        //console.log(map.addLayer)
        markerArray.push(marker);
        const onMarkerClick = function(e) {

          console.log(e.latlng)
        }
        marker.on('click', onMarkerClick);
        console.log(e.latlng);
        //console.log(map)

}


//let crossRef = function(latlng) {




/*markersites.on('click', function(e) {
  if (!e.target) {
    map.removeLayer(e.target)
  }

}) */
/*function saveClick(e) {
  for (i = 0; i < markerArray.length; i++) {

  }

}*/

/*let clickEnabled = true;
map.on('keydown', function(e) {
console.log('key down', e.originalEvent.key)
  if (e.originalEvent.key === "s") {
    clickEnabled = !clickEnabled //toggles the swtich
    if (clickEnabled) {
      console.log("enabling click")

      map.on('click', saveClick)

    } else {
      console.log("disabled")
      map.off('click', saveClick)
    }
  }
}); */



let clickEnabled = true;
map.on('keydown', function(e) {
console.log('key down', e.originalEvent.key)
  if (e.originalEvent.key === " ") {
    clickEnabled = !clickEnabled //toggles the swtich
    if (clickEnabled) {
      console.log("enabling click")

      map.on('click', onMapClick)

    } else {
      console.log("disabled")
      map.off('click', onMapClick)
    }
  }
});

// write a function that will populate the popup element using methods from the popup object
/*function onMapClick(e) {
        popup
        .setLatLng(e.latlng)
        //.setContent("You clicked the map at " + e.latlng.toString())
        L.marker(e.latlng).addTo(map)

}

// on click, run function to populate popup and open it on the map
map.on('click', onMapClick); */




//marker1 = L.marker([51.505, -0.09]).addTo(map);
//marker2 = L.marker([51.5, -0.11]).addTo(map);
//marker3 = L.marker([51.5, -0.12]).addTo(map);


$(document).ready(function(){

})
