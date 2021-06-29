
// const setMapDatabase = function(query) {
//   const mapDatabaseFromDB = {
//     map1: {
//       id: 1,
//       title: "London",
//       maps_url: 1,
//       url: 'https://api.maptiler.com/maps/basic/{z}/{x}/{y}.png?key=UwQIUxGO3h6myKklxZEq',
//       attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
//       userID: 1,
//       coordinate: [51.505, -0.09],
//       marker: {
//         'marker1': [51.505, -0.09],
//         'marker2': [51.605, -0.11]
//       }
//     }
//   };
// }

// module.exports = setMapDatabase;

const mapDatabase = {
  map1: {
    id: 1,
    title: "London",
    maps_url: 1,
    url: 'https://api.maptiler.com/maps/basic/{z}/{x}/{y}.png?key=UwQIUxGO3h6myKklxZEq',
    attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>',
    userID: 1,
    coordinate: [51.505, -0.09],
    marker: {
      'marker1': [51.505, -0.09],
      'marker2': [51.605, -0.11]
    }
  }
};



let map = L.map('map').setView(mapDatabase.map1.coordinate, 13);

let regular = L.tileLayer(`${mapDatabase.map1.url}`, {
  attribution: `${mapDatabase.map1.attribution}`
})
regular.addTo(map);

// google street
let googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
  maxZoom: 20,
  subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
});

//google satellite
let googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
  maxZoom: 20,
  subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
});


var myIcon = L.icon({
        iconUrl: 'img/red_marker.png',
        iconSize: [40, 40],
});
var singleMarker = L.marker(mapDatabase.map1.marker['marker1'], { icon: myIcon, draggable: true });
var popup = singleMarker.bindPopup('This is the Nepal. ' + singleMarker.getLatLng()).openPopup()
popup.addTo(map);

var secondMarker = L.marker(mapDatabase.map1.marker['marker2'], { icon: myIcon, draggable: true });

console.log(singleMarker.toGeoJSON())


var baseMaps = {
  "Regular": regular,
  'Google Street': googleStreets,
  "Google Satellite": googleSat,
};

var overlayMaps = {
  "First Marker": singleMarker,
  'Second Marker': secondMarker,
}

L.control.layers(baseMaps, overlayMaps, { collapsed: true }).addTo(map);

map.on('mouseover', function () {
  console.log('your mouse is over the map')
});

map.on('mousemove', function (e) {
  document.getElementsByClassName('coordinate')[0].innerHTML = 'lat: ' + e.latlng.lat + 'lng: ' + e.latlng.lng;
  console.log('lat: ' + e.latlng.lat, 'lng: ' + e.latlng.lng)
});
