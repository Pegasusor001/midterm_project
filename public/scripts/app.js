const loadUsers = () => {
  // fetch the users
  $.get('/users')
    .then((users) => {
       return users;
    });
}

const loadMaps = () => {
  // fetch the maps
  $.get('/maps')
  .then((maps) => {
     return maps;
  });
}

const loadPoints = () => {
  // fetch the maps
  $.get('/points')
  .then((points) => {
     return points;
  });
}

const loadPointsByUserID = () => {
  // fetch points by user
  $.get('/points/id')
  .then((points) => {
     return points[0];
  });
}

const createUserRow = function(user) {
  const userName = user["name"];
  const $user = $(
    `<tr>${userName}</tr>`
  );
  return $user;
};

const renderUser = function (users) {
  $("#users").html("");
  for (const user in users) {
    //Create an article element for each tweet
    const $userElement = createUserRow(users[user]);
    console.log($userElement);
    $("#users").append($userElement);
  }
};

$(() => {

  const mapUsers = loadUsers();
  console.log(mapUsers);
  renderUser(mapUsers);
  // const maps = loadMaps();
  // const points = loadPoints();


});
