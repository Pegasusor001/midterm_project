const leafletUrl = 'https://api.maptiler.com/maps/basic/{z}/{x}/{y}.png?key=UwQIUxGO3h6myKklxZEq';
const leafletAttribution = '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>';
const googleStreetsUrl = 'http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}';
const googleSatUrl = 'http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}';

const mapDatabase = {
  map1: {
    id: 1,
    userID: 1,
    title: "London",
    coordinate: [51.505, -0.09],
    marker: {
      'marker1': [51.505, -0.09],
      'marker2': [51.605, -0.11],
      'marker3': [51.405, -0.12],
    },
    is_public: true,
    description: 'xx',
    image: 'url',
  }
};

const pointDatabase = {
  'marker1': {
    map_id: 1,
    title: 'shop1',
    coordinate: [51.505, -0.09],
    description: 'this is shop1'
  },
  'marker2': {
    map_id: 1,
    title: 'shop1',
    coordinate: [51.405, -0.19],
    description: 'this is shop2'
  },
  'marker3': {
    map_id: 1,
    title: 'shop1',
    coordinate: [51.405, 0.01],
    description: 'this is shop3'
  }
}


let exportCoordinate;

// initialize the map
let map = L.map('map').setView(mapDatabase.map1.coordinate, 13);

//regular map
let regular = L.tileLayer(`${leafletUrl}`, {
  attribution: `${leafletAttribution}`
})
regular.addTo(map);
// google street
let googleStreets = L.tileLayer(googleStreetsUrl, {
  maxZoom: 20,
  subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
});
//google satellite
let googleSat = L.tileLayer(googleSatUrl, {
  maxZoom: 20,
  subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
});

// mark icons of user database
var myIcon = L.icon({
  iconUrl: '/scripts/img/red_marker.png',
  iconSize: [40, 40],
});


//  display the pins in my database
for (let marker in pointDatabase) {
  var singleMarker = L.marker(pointDatabase[marker].coordinate, { icon: myIcon, draggable: false});
  var popup = singleMarker.bindPopup(pointDatabase[marker].title + ': ' + pointDatabase[marker].description).openPopup()
  popup.addTo(map);
}

// set up layers
var baseMaps = {
  "Regular": regular,
  'Google Street': googleStreets,
  "Google Satellite": googleSat,
};
var overlayMaps = {};

L.control.layers(baseMaps, overlayMaps, { collapsed: true }).addTo(map);


var marker;
map.on('click', function(e) {
    if(marker)
        map.removeLayer(marker);
    marker = L.marker(e.latlng).addTo(map);
    exportCoordinate = e.latlng;

    document.getElementById('lat').value = e.latlng.lat.toFixed(3);
    document.getElementById('lat1').value = e.latlng.lat.toFixed(3);
    document.getElementById('long').value = e.latlng.lng.toFixed(3);
    document.getElementById('long1').value = e.latlng.lng.toFixed(3);
});
