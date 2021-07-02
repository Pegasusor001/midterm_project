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

module.exports = (db, database) => {
  router.get("/", (req, res) => {
    res.render('global_map');
  });

  router.post("/", (req, res) => {
    const start_latitude = req.body.global_map_lat;
    const start_longitude = req.body.global_map_long;
    const title = req.body.global_map_title;
    const description = req.body.global_map_description;
    const user_id = req.session.user.id;

    const map = {
      start_latitude,
      start_longitude,
      title,
      description,
      user_id
    }

    database.addMap(db, map)
    .then(result => {
      if (!result) {
        res.send({error: "error"});
        return;
      }
      res.redirect("/");
    })
    .catch(e => res.send(e));
  });

  router.get('/myMaps', (req, res) => {
    user_id = req.session.user.id;
    if (user_id) {
      database.getMapsbyUserId(db, user_id)
      .then((result) => {
        res.json(result);
      });
    }
  });

  // router.get("/:mapId", (req, res) => {
  //   const mapId = req.params.mapId;
  //   const templateVars = {
  //     mapId,
  //   };
  //   res.render('leaflet', templateVars);
  // });

  router.get("/:mapId", (req, res) => {
    const mapId = req.params.mapId;
    const userId = req.session.user.id;
    const startCoordinates = [];
    const templateVars = {};

    database.getMapbyMapId(db, mapId)
    .then((result) => {
      startCoordinates.push(result[0].start_latitude, result[0].start_longitude);
      database.getPointsbyUserId(db, userId, mapId)
      .then((result) => {
        templateVars.point = result;
        templateVars.startCoordinates = startCoordinates;
        templateVars.mapId = mapId

          res.render('leaflet', templateVars);
        })
      })
  });

  router.post("/:id/delete", (req,res) => {
    const map_id = req.params.id;
    console.log(map_id);
    database.deleteMap(db,map_id)
    .then(result => {
      if (!result) {
        res.send({error:"error"});
        return;
      }
      res.redirect("/")
    })
    .catch(e => res.send(e))
  });

  router.post("/:mapId", (req, res) => {
    const latitude = req.body.pointLat;
    const longitude = req.body.pointLong;
    const title = req.body.pointTitle;
    const description = req.body.pointDescription;
    const map_id = req.params.mapId;
    console.log(map_id)
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
    database.addPoint(db, point)
    .then(result => {
      if (!result) {
        res.send({error: "error"});
        return;
      }
      console.log(result)
      res.redirect("/");
    })
    .catch(e => res.send(e));
  });

  return router;
};
