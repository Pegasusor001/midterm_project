$(document).ready(function() {
  $('.my_maps').on('click', function(event){
    event.preventDefault();
    $('main').append(
    `<article class="myMap_listing">
      <section class="myMaps-preview_image">
        <img src='https://www.google.com/search?q=map&sxsrf=ALeKk03BkEOasTb0S97wAb8Wfj11KtFNtQ:1624842477747&source=lnms&tbm=isch&sa=X&ved=2ahUKEwj9sc71kbnxAhXQ0p4KHSzgAd0Q_AUoAnoECAEQBQ&biw=1440&bih=679#imgrc=YAE5kjD8I51L8M'>
      </section>
      <section class="myMaps_details">
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
    $('main').append('<p>map information</p>')
  })

  $('.search').on('click', function(event){
    event.preventDefault();
    $('main').append('<p>search information</p>')
  })

  $('.my_profile').on('click', function(event){
    event.preventDefault();
    $('main').append('<p>Profile</p>')
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
