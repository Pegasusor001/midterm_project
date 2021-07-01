const addUser = (db, user) => {
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
