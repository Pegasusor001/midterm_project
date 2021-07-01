module.exports = function(router, database) {

  router.get('/newmap', (req, res) => {
    database.addMap(req.query, 20)
    //.then(properties => res.send({properties}))
    .then()
    .catch(e => {
      console.error(e);
      res.send(e)
    });
  });

  router.get('/reservations', (req, res) => {
    database.getAllReservations(userId)
    //.then(reservations => res.send({reservations}))
    .then()
    .catch(e => {
      console.error(e);
      res.send(e)
    });
  });

}
