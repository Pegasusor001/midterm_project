const addPoint = (db, userID, point) => {
  return db
    .query(`INSERT INTO points(user_id, map_id, address, latitude, longitude, title, descrption)
            VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *`, [userID, point.mapID, point.address, point.latitude, point.longitude, point.title, point.description])
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      return err;
    });
}
module.exports = addPoint;
