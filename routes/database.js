const { Pool } = require('pg');

const pool = new Pool({
  user: 'jilinus',
  password: '123',
  host: 'localhost',
  database: 'midterm'
});

// const user = {email: 'Kobe@email.com', name: 'Kobe'}
// const map = {
//   user_id: 1,
//   title: 'test',
//   start_latitude: 51,
//   start_longitude: 0,
//   description: 'this is test',
// }
// const point = {
//   user_id: 1,
//   map_id: 1,
//   title: 'test',
//   start_latitude: 51,
//   start_longitude: 0,
//   description: 'this is test',
// }

/// Users
const getUserWithEmail = function(email) {
  return pool
  .query(`SELECT * FROM users where email = $1`, [email])
  .then((result) => {
    return result.rows[0];
  })
  .catch((err) => {
    console.log(err.message);
  });
}
exports.getUserWithEmail = getUserWithEmail;


const getUserWithId = function(id) {
  return pool
  .query(`SELECT * FROM users where id = $1`, [id])
  .then((result) => {
    return result.rows[0];
  })
  .catch((err) => {
    console.log(err.message);
  });
}
exports.getUserWithId = getUserWithId;


 const addUser =  function(user) {
  return pool
  .query(`INSERT INTO users (
    email, name)
    VALUES (
    $1, $2) RETURNING *;`, [user.email, user.name])
  .then((result) => {
    return result.rows[0];
  })
  .catch((err) => {
    console.log(err.message);
  });
}
exports.addUser = addUser;


//maps
const getMapsbyUserId = function(id) {
  return pool
  .query(`SELECT * FROM maps where user_id = $1`, [id])
  .then((result) => {
    return result.rows;
  })
  .catch((err) => {
    console.log(err.message);
  });
}
exports.getMapsbyUserId= getMapsbyUserId;

const getMapbyMapId = function(id) {
  return pool
  .query(`SELECT * FROM maps where id = $1`, [id])
  .then((result) => {
    return result.rows;
  })
  .catch((err) => {
    console.log(err.message);
  });
}
exports.getMapbyMapId= getMapbyMapId;

const addMap = (map) => {
  let queryParams = [
    map.user_id,
    map.title,
    map.is_public,
    map.is_favourite,
    map.image_url,
    map.start_latitude,
    map.start_longitude,
    map.description
  ]

  console.log(queryParams);
  let queryString = `INSERT INTO maps (user_id, title, is_public, is_favourite, image_url, start_latitude, start_longitude, description)
  VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`;

  return pool
  .query(queryString, queryParams)
  .then((result) => {
    return result.rows;
  })
  .catch((err) => {
    return err;
  });
}
exports.addMap = addMap;

// points
const getPointsbyUserId = function(userId, mapId) {
  return pool
  .query(`SELECT * FROM points where user_id = $1 AND map_id = $2`, [userId, mapId])
  .then((result) => {
    return result.rows;
  })
  .catch((err) => {
    console.log(err.message);
  });
}
exports.getPointsbyUserId = getPointsbyUserId;

const addPoint = (point) => {
  let queryParams = [
    point.user_id,
    point.map_id,
    point.address,
    point.latitude,
    point.longitude,
    point.title,
    point.description,
    point.image_url,
  ]

  let queryString = `INSERT INTO points (user_id, map_id, address, latitude, longitude, title, description, image_url)
  VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`;

  return pool
  .query(queryString, queryParams)
  .then((result) => {
    return result.rows;
  })
  .catch((err) => {
    return err;
  });
}
exports.addPoint = addPoint;

