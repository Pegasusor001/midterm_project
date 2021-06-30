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
    </article>`
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
    $('main').html('<p>search information</p>')
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
