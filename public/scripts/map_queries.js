//Adding map function
const addMap = (db, userID, map) => {

  return db
    .query(`INSERT INTO maps(user_id, title, is_public, is_favourite)
            VALUES($1, $2, $3, $4) RETURNING *`, [userID, map.title, map.is_public, map.is_favourite])
    .then((result) => {
      return result.rows;
    })

    .catch((err) => {
      return err;
    });
}
module.exports = addMap;
