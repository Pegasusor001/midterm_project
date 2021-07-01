const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);
db.connect();

//USER AND MAP QUERIES

const getUserByEmail = (email) => { // takes a string as an argument

  // options.owner_id
  return db
    .query('SELECT * FROM users WHERE email = $1', [email])
    .then((result) => {
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
}
exports.getUserByEmail = getUserByEmail;

const getMapsByUser = (user) => { // takes a user object as an argument
  return db
    .query(`SELECT * FROM maps WHERE user_id = `, [user.id])
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      return err;
    });
}
exports.getMapsByUser = getMapsByUser;

//UPDATE AND INSERT QUERIES

const addUser = (user) => { // takes a user object as an argument
  return db
    .query(`INSERT INTO users(name, email)
            VALUES($1, $2) RETURNING *`, [user.name, user.email])
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      return err;
    });
}
exports.addUser = addUser;

const addPoint = (points) => { // takes a point object as an argument

  let addParams = [];
  let qString = "";
  let insString = "";

  for (point in points) {
    addParams.push(points[point]);
    insString += point + ",";
    qString += `$${addParams.length},`;
  }

  insertString = `INSERT INTO points (${insString.slice(0,-1)}) VALUES (${qString.slice(0,-1)}) RETURNING *`;

  return db
    .query(insertString, addParams)
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
}
exports.addPoint = addPoint;

const addMap = (mapValues) => {

  let addParams = [];
  let qString = "";
  let insString = "";

  for (mapValue in mapValues) {
    addParams.push(mapValues[mapValue]);
    insString += point + ",";
    qString += `$${addParams.length},`;
  }

  insertString = `INSERT INTO maps (${insString.slice(0,-1)}) VALUES (${qString.slice(0,-1)}) RETURNING *`;

  return db
    .query(insertString, addParams)
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
}
exports.addPoint = addMap;
