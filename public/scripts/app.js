
$(() => {

  // loadUsers();
  // loadMaps();
  // loadPoints();

});

const loadUsers = () => {
  $.ajax({
    method: "GET",
    url: "/users"
  })
    .then((data) =>  {
      renderUsers(data.users);
    });
}

const loadMaps = () => {
  $.ajax({
    method: "GET",
    url: "/maps"
  })
    .then((data) =>  {
      renderMaps(data.maps);
    });
}

const loadPoints = () => {
  $.ajax({
    method: "GET",
    url: "/points"
  })
    .then((data) =>  {
      renderPoints(data.points);
    });
}

const renderUsers = function(users) {
  const container = $("#user");
  for (user of users) {
    const item = $("<tr>").text(user.name);
    container.append(item);
  }
};

const renderPoints = function(points) {
  const container = $("#point-list");
  for (point of points) {
    const item = $("<tr>").text(point.title);
    container.append(item);
  }
};

const renderMaps = function(maps) {
  const container = $("#map-list");
  for (map of maps) {
    const item = $("<tr>").text(map.title);
    console.log(map.title);
    container.append(item);
  }
};

