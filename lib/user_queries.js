const getUsers = (db) => {
  return db.query('SELECT * FROM users;')
  .then((response) => {
    return response.rows;
  });
}

module.exports = getUsers;
