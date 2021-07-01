/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into api/widgets,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */


const express = require('express');
const bodyParser = require("body-parser");
const router  = express.Router();
const cookieSession = require('cookie-session');
const bcrypt = require('bcrypt');

router.use(cookieSession({
  name: 'userId',
  keys: ['key1', 'key2']
}));

module.exports = (database) => {
  router.get("/", (req, res) => {
    res.render('global_map');
  });

  router.post("/", (req, res) => {
    const start_latitude = req.body.global_map_lat;
    const start_longitude = req.body.global_map_long;
    const title = req.body.global_map_title;
    const description = req.body.global_map_description;
    const user_id = req.session.user.id;
    const is_favourite = req.body.global_map_is_favourite;

    console.log(req.body)
    console.log(is_favourite);

    const map = {
      start_latitude,
      start_longitude,
      title,
      description,
      user_id,
      is_favourite
    }

    database.addMap(map)
    .then(result => {
      if (!result) {
        res.send({error: "error"});
        return;
      }
      res.send('map added')
    })
    .catch(e => res.send(e));
  });

  router.get('/myMaps', (req, res) => {
    user_id = req.session.user.id;
    database.getMapsbyUserId(user_id)
    .then((result) => {
      res.json(result);
    })
    // res.send('maps added')

  })

  router.get("/test", (req, res) => {
    const mapId = req.params.mapId;
    const userId = req.session.user.id;
    const startCoordinates = [];
    const templateVars = {};

    res.json({
      startCoordinates,
      mapId
    }, 200)
  });

  router.get("/:mapId", (req, res) => {
    const mapId = req.params.mapId;
    const userId = req.session.user.id;
    const startCoordinates = [];
    const templateVars = {};

    database.getMapbyMapId(mapId)
    .then((result) => {
      startCoordinates.push(result[0].start_latitude, result[0].start_longitude);
      database.getPointsbyUserId(userId, mapId)
      .then((result) => {
        templateVars.point = result;
        templateVars.startCoordinates = startCoordinates;
        templateVars.mapId = mapId

          res.render('leaflet', templateVars);
        })
      })

  });

  router.post("/:id/delete", (req, res) => {
    const map_id = req.params.id;
    console.log('on delete...........', map_id)
    database.deleteMap(map_id)
    .then(result => {
      if (!result) {
        res.send({error: "error"});
        return;
      }
      res.redirect("/?page=myMap")
    })
    .catch(e => res.send(e));

  });


  router.post("/:mapId", (req, res) => {
    const latitude = req.body.pointLat;
    const longitude = req.body.pointLong;
    const title = req.body.pointTitle;
    const description = req.body.pointDescription;
    const is_favourite = req.body.point_is_favourite
    const map_id = req.params.mapId;
    const user_id = req.session.user.id;

    console.log(is_favourite)

    const point = {
      latitude,
      longitude,
      title,
      description,
      is_favourite,
      map_id,
      user_id
    }

    database.addPoint(point)
    .then(result => {
      if (!result) {
        res.send({error: "error"});
        return;
      }
      console.log(result)
      res.redirect(`http://localhost:8030/api/widgets/${map_id}`)
    })
    .catch(e => res.send(e));
  });
  return router;
};
