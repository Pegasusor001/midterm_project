/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */


const express = require('express');
const router  = express.Router();
const cookieSession = require('cookie-session');
const bcrypt = require('bcrypt');

router.use(cookieSession({
  name: 'userId',
  keys: ['key1', 'key2']
}));

module.exports = (database) => {
  router.get("/:mapId", (req, res) => {
    const mapId = req.params.mapId;
    const templateVars = {
      mapId,
    };
    res.render('leaflet', templateVars);
  });

  router.post("/:mapId", (req, res) => {
    const latitude = req.body.pointLat;
    const longitude = req.body.pointLong;
    const title = req.body.pointTitle;
    const description = req.body.pointDescription;
    const map_id = req.params.mapId;
    const user_id = req.session.user.id;

    const point = {
      latitude,
      longitude,
      title,
      description,
      map_id,
      user_id
    }

    console.log(point)
    database.addPoint(point)
    .then(result => {
      if (!result) {
        res.send({error: "error"});
        return;
      }
      console.log(result)
      res.send('map added')
    })
    .catch(e => res.send(e));
  });

  return router;
};
