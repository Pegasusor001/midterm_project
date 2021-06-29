const userDatabase = {
  test: {
    id: 1,
    email: 'test@gmail.com',
    password: '$2b$10$0SCB.oPikTAGVp2uMdQLAuHmfUNFuQQI./bJRnYCCAPHLzt7FMi/e'
  },
};

const mapDatabase = {
  map1: { id: 1, title: "Canada", maps_url: 1, userID: 1 }
};

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  return Promise.resolve(userDatabase.test);
}
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  return Promise.resolve(userDatabase.test);
}
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {
  return Promise.resolve(user);
}
exports.addUser = addUser;


/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllMaps = function() {
  return Promise.resolve(mapDatabase.map1);
}
exports.getAllMaps = getAllMaps;


/**
 * Add a map to the database
 * @param {{}} map An object containing all of the map details.
 * @return {Promise<{}>} A promise to the map.
 */
const addMap = function(map) {
  return Promise.resolve(mapDatabase.map1);
}
exports.addMap = addMap;
