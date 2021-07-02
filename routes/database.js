/// Users
const getUserWithEmail = function(db, email) {
  return db
  .query(`SELECT * FROM users where email = $1`, [email])
  .then((result) => {
    return result.rows[0];
  })
  .catch((err) => {
    console.log(err.message);
  });
}
exports.getUserWithEmail = getUserWithEmail;


const getUserWithId = function(db, id) {
  return db
  .query(`SELECT * FROM users where id = $1`, [id])
  .then((result) => {
    return result.rows[0];
  })
  .catch((err) => {
    console.log(err.message);
  });
}
exports.getUserWithId = getUserWithId;


 const addUser =  function(db, user) {
  return db
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
const getMapsbyUserId = function(db, id) {
  return db
  .query(`SELECT * FROM maps where user_id = $1`, [id])
  .then((result) => {
    return result.rows;
  })
  .catch((err) => {
    console.log(err.message);
  });
}
exports.getMapsbyUserId= getMapsbyUserId;

const getMapbyMapId = function(db, id) {
  return db
  .query(`SELECT * FROM maps where id = $1`, [id])
  .then((result) => {
    return result.rows;
  })
  .catch((err) => {
    console.log(err.message);
  });
}
exports.getMapbyMapId= getMapbyMapId;

const addMap = (db, map) => {
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

  return db
  .query(queryString, queryParams)
  .then((result) => {
    return result.rows;
  })
  .catch((err) => {
    return err;
  });
}
exports.addMap = addMap;

const deleteMap = (db, id) => {
  return db
  .query(`DELETE FROM maps WHERE id = $1`, [id])
  .then((result) => {
    return result.rows;
  })
  .catch((err) => {
    return err;
  });
}
exports.deleteMap = deleteMap;


// points
const getPointsbyUserId = function(db, userId, mapId) {
  return db
  .query(`SELECT * FROM points where user_id = $1 AND map_id = $2`, [userId, mapId])
  .then((result) => {
    return result.rows;
  })
  .catch((err) => {
    console.log(err.message);
  });
}
exports.getPointsbyUserId = getPointsbyUserId;

const addPoint = (db, point) => {
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

  return db
  .query(queryString, queryParams)
  .then((result) => {
    return result.rows;
  })
  .catch((err) => {
    return err;
  });
}
exports.addPoint = addPoint;

