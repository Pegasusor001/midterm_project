$(document).ready(function() {
  $('.my_maps').on('click', function(event){
    event.preventDefault();
    $('main').html(
    `<article class="myMaps_listing">
      <section class="myMaps_preview_image">
        <img src='https://upload.wikimedia.org/wikipedia/commons/a/aa/World_Map.jpg'>
      </section>
      <section class="myMaps_infor">
        <h3 class="myMaps_title">Map Title</h3>
        <ul class="myMaps_details">
          <li>Tag1: </li>
          <li>Tag2: </li>
          <li>Tag3: </li>
        </ul>
        <footer class="myMaps_footer">
          <div class="myMaps_support">support information</div>
        </footer>
      </section>
    </article>
    `
    )
  })

  $('.create_new').on('click', function(event){
    event.preventDefault();
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
    $('body').append(`
      <div id="map"></div>

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
      //console.log(data)
      results.clearLayers();
      for (var i = data.results.length - 1; i >= 0; i--) {
        results.addLayer(L.marker(data.results[i].latlng));
      }
    });

    let popup = L.popup();

    // write a function that will populate the popup element using methods from the popup object
    function onMapClick(e) {
      popup
      .setLatLng(e.latlng)
      //.setContent("You clicked the map at " + e.latlng.toString())
      L.marker(e.latlng).addTo(map)

    }

    // on click, run function to populate popup and open it on the map
    map.on('click', onMapClick);

    </script>
    `
    )
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




// $(() => {
//   $.ajax({
//     method: "GET",
//     url: "/api/users"
//   }).done((users) => {
//     for(user of users) {
//       $("<div>").text(user.name).appendTo($("body"));
//     }
//   });;
// });
