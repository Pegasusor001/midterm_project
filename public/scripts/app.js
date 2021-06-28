$(document).ready(function() {
  $('.createNew').on('click', function(event){
    event.preventDefault();
    $('main').append('<p>map information</p>')
  })

  $('.search').on('click', function(event){
    event.preventDefault();
    $('main').append('<p>search information</p>')
  })

  $('.myProfile').on('click', function(event){
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
