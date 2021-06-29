
const getPoints = (db) => {
  return db.query('SELECT * FROM points;')
  .then((response) => {
    return response.rows;
  });
}

module.exports = getPoints;
