$(document).ready(function() {
  const fetchMyMap = function () {
    $.ajax({
      dataType: "json",
      url: 'api/widgets/myMaps',
      method: "GET"
    })
    .then((result) => {
      $('main').empty();
      $('main').html('');
      for(let i of result){
        $('main').append(
        `<article class="myMaps_listing">
          <section class="myMaps_preview_image">
          <img src='https://upload.wikimedia.org/wikipedia/commons/a/aa/World_Map.jpg'>
          </section>
          <section class="myMaps_infor">
          <a href="/api/widgets/${i.id}" class="myMaps_title">${i.title}</a>
          <ul class="myMaps_details">
            <li>Title: ${i.title}</li>
            <li>Description: ${i.description} </li>
            <li>Latitude: ${i.start_latitude}  </li>
            <li>Longitude: ${i.start_longitude} </li>
          </ul>

          <form method="POST" action="api/widgets/${i.id}/delete">
            <button class="delete_map">Delete</button>
          </form>

        </section>
      </article>
      `)
      }
    })
  }

  const fetchNewMap = function() {
    return newMap = `
    <div id="map"></div>
    <div class="create_new_map">
    <form method="POST" action="/api/widgets/">
      <label for="global_map_lat">Latitude</label>
      <input id= "global_map_lat" name="global_map_lat">

      <label for="global_map_long">Longitude</label>
      <input id= "global_map_long" name="global_map_long">

      <label for="global_map_title">Title</label>
      <input type="text" id="global_map_title" name="global_map_title">

      <label for="global_map_description">Description</label>
      <input type="text" id="global_map_description" name="global_map_description">

      <div>
      <label for="global_map_is_favourite"> favourite </label> <nobr>
      <input type="checkbox" id="global_map_is_favourite" name="global_map_is_favourite">
      </div>

      <button type="submit"> Create New </button>
    </form>
    </div>


    <script>
    let mapboxTiles = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
        attribution: '<a href="http://www.mapbox.com/about/maps/" target="_blank">Terms &amp; Feedback</a>'
    });

    const colour =
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery ?? <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiYWV1bmRlcmhpbGwiLCJhIjoiY2txaDgwYnd0MDY3MjJ3bWxjeHE1eTNhdiJ9.rzZ7FRFi_3LIJELE4KXRmA'
  });

  map = L.map('map')
        .addLayer(mapboxTiles)
        .addLayer(colour)
        .setView([51.505, -0.09], 14); //need to make geolocation



  //search the map
  let searchControl = L.esri.Geocoding.geosearch().addTo(map);
  let results = L.layerGroup().addTo(map);

  searchControl.on('results', function (data) {
    results.clearLayers();
    for (var i = data.results.length - 1; i >= 0; i--) {
      results.addLayer(L.marker(data.results[i].latlng));
      const mapData = data.results[i];
      document.getElementById('global_map_lat').value = mapData.latlng.lat.toFixed(3);
      document.getElementById('global_map_long').value = mapData.latlng.lng.toFixed(3);
      document.getElementById('global_map_description').value = mapData.properties.LongLabel;
      document.getElementById('global_map_title').value = mapData.properties.ShortLabel;
    }
  });

  map.on('click', onMapClick);
  let marker;
  function onMapClick(e) {
    if(marker)
    map.removeLayer(marker);
    marker = L.marker(e.latlng).addTo(map);
    document.getElementById('global_map_lat').value = e.latlng.lat.toFixed(3);
    document.getElementById('global_map_long').value = e.latlng.lng.toFixed(3);
  }

    </script>
      `;
  }

  const pathName = window.location.href;
  if (pathName === 'http://localhost:8030/?page=myMap'){
    fetchMyMap();
  }

  $.ajax({
    url: "http://localhost:8030/api/widgets/test",
    method: "GET",
    dataType: "JSON",
    success: function(data, status, XHR) {
      console.log(data)
    }
  })

  $('.my_maps').on('click', function(event){
    event.preventDefault();
    $('main').empty();
    $('main').html('');
    fetchMyMap();
  })

  $('.create_new').on('click', function(event){
    event.preventDefault();
    $('main').empty();
    $('main').html('');
    $('main').html(`
    <form action="/api/widgets/" method="post">
      <div class='map_create_new'>
        <div class='map_infor_input'>
          <div class="map_title">
            <label>Map Title</label>
            <input name="map_title"/>
          </div>

          <div class="map_new_latitude">
            <label>Latitude</label>
            <input name="map_new_latitude"/>
          </div>

          <div class="map_new_longitude">
            <label>Longitude</label>
            <input name="map_new_longitude"/>
          </div>

          <div class="map_new_user_email">
            <label>Your Email Address</label>
            <input name="map_new_user_email"/>
          </div>
        </div>

        <div class="password_submit">
            <button>Create</button>
        </div>
      </div>
    </form>
    `)
  })

  $('.search').on('click', function(event){
    event.preventDefault();
    $('main').empty();
    $('main').html('');
    $('main').html(fetchNewMap());
  })

  $('.my_profile').on('click', function(event){
    event.preventDefault();
    $('main').html(`
    <form action="/api/users/password" method="post">
      <div class='password_reset'>
        <div class='password_input'>
          <div class="password_email">
            <label>Email Address</label>
            <input type="email" name="email"/>
          </div>

          <div class="password_new">
            <label>New Password</label>
            <input name="password_new"/>
          </div>

          <div class="password_confirm">
            <label>Confirm Your Password</label>
            <input name="password_confirm"/>
          </div>
        </div>

        <div class="password_submit">
            <button>Submit</button>
        </div>
      </div>
    </form>
    `)
  })
})



