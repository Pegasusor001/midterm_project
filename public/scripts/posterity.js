$(document).ready(function() {

  $('').on('click', function(event){

  })

  $('.my_maps').on('click', function(event){
    event.preventDefault();
    $('main').html('');
    $.ajax({
      dataType: "json",
      url: 'http://localhost:8080/api/widgets/myMaps',
      method: "GET"
    })
    .then((result) => {
      for(let i of result){
        $('main').after(
        `<article class="myMaps_listing">
          <section class="myMaps_preview_image">
            <i class="fas fa-compass"></i>
          </section>
          <section class="myMaps_infor">
          <a href="/api/widgets/${i.id}" class="myMaps_title">Map Title ${i.id} </a>
          <ul class="myMaps_details">
            <li>${i.id}</li>
            <li>${i.title}</li>
            <li>${i.description} </li>
          </ul>

          <form method="POST" action="api/widgets/${i.id}/delete">
            <button class="delete_map">Delete</button>
          </form>

          <footer class="myMaps_footer">
            <div class="myMaps_support">support information</div>
          </footer>
        </section>
      </article>
      `)
      }
    })
    // )
  })


  $('.search').on('click', function(event){
    event.preventDefault();
    $('main').empty();
    $('main').html('');
    $('main').html(`
    <div id="map"></div>

    <form method="POST" action="/api/widgets/">
      <label for="global_map_lat">Latitude</label>
      <input id= "global_map_lat" name="global_map_lat">

      <label for="global_map_long">Longitude</label>
      <input id= "global_map_long" name="global_map_long">

      <label for="global_map_title">Title</label>
      <input type="text" id="global_map_title" name="global_map_title">

      <label for="global_map_description">Description</label>
      <input type="text" id="global_map_description" name="global_map_description">

      <button type="submit"> Create New </button>
    </form>


    <script type="text/javascript">
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
        .setView([51.505, -0.09], 4); //need to make geolocation

  let points = {
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
  L.geoJson(points).addTo(map);

  //bind the name of each location with pop-up
  L.geoJson(points, {
      onEachFeature: function (feature, layer) {
          layer.bindPopup(feature.properties.name);
      }
  }).addTo(map);



  //search the map
  let searchControl = L.esri.Geocoding.geosearch().addTo(map);

  let results = L.layerGroup().addTo(map);

  searchControl.on('results', function (data) {
    // console.log(data)
    // console.log(data.latlng.lat)
    // console.log(data.latlng.lng)


    results.clearLayers();
    for (var i = data.results.length - 1; i >= 0; i--) {
      results.addLayer(L.marker(data.results[i].latlng));
      const mapData = data.results[i];
      console.log(mapData.properties)
      console.log(mapData.properties)
      document.getElementById('global_map_lat').value = mapData.latlng.lat.toFixed(3);
      document.getElementById('global_map_long').value = mapData.latlng.lng.toFixed(3);
      document.getElementById('global_map_description').value = mapData.properties.LongLabel;
      document.getElementById('global_map_title').value = mapData.properties.ShortLabel;
    }
  });

    </script>
    `)
  })

})



