let map = L.map('map').setView([51.505, -0.09], 13);

let regular = L.tileLayer('https://api.maptiler.com/maps/basic/{z}/{x}/{y}.png?key=UwQIUxGO3h6myKklxZEq', {
  attribution: `<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>`
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
var singleMarker = L.marker([28.3949, 84.1240], { icon: myIcon, draggable: true });
var popup = singleMarker.bindPopup('This is the Nepal. ' + singleMarker.getLatLng()).openPopup()
popup.addTo(map);

var secondMarker = L.marker([29.3949, 83.1240], { icon: myIcon, draggable: true });

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
