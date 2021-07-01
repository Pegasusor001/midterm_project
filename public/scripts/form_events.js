const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const getDB = function() {
  const { Pool } = require('pg');
  const dbParams = require('./lib/db.js');
  const mdb = new Pool(dbParams);
  mdb.connect();
  return mdb;
}

const getMapByID = function(id) {
  return getDB().query(`SELECT * FROM maps WHERE id = $1`, [id])
  .then((result) => {
    if(!result) {
      return null;
    }
    return result.rows[0];
  })
  .catch((err) => {
    console.error(err);
  })
 };

 const getUserByEmail = function(email) {
  return getDB().query(`SELECT * FROM users WHERE email = $1`, [email])
  .then((result) => {
    if(!result) {
      return null;
    }
    return result.rows[0];
  })
  .catch((err) => {
    console.error(err);
  })
 };


$(document).ready(function() {

  //user-map
  //email-lookup

  $("#user-lookup").click(function(event) {

    event.preventDefault();
    const queryEmail = $("#user-form").serialize();
    const formValues = $("#user-form").serializeArray();
    const textAreaString = formValues[0]["value"];

    if(textAreaString) {
      console.log(getUserByEmail(textAreaString));
    }

  });

  $("#map-lookup").click(function(event) {

    event.preventDefault();
    const queryMap = $("#map-form").serialize();
    const formValues = $("#map-form").serializeArray();
    const textAreaString = formValues[0]["value"];

    if(textAreaString) {
      getMapByID(textAreaString);
    }

  });

});
