
const getMaps = (db) => {
  return db.query('SELECT * FROM maps;')
  .then((response) => {
    return response.rows;
  });
}

module.exports = getMaps;
