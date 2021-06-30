/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const userQueries = require('../public/scripts/user_queries');
const mapQueries = require('../public/scripts/map_queries');
const pointQueries = require('../public/scripts/point_queries');

module.exports = (db) => {
  router.get("/", (req, res) => {
    console.log(req.body);
    db.query("SELECT * FROM users;")
      .then(data => {
        const users = data.rows;
        res.json({ users });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.get("/:id", (req, res) => {
    db.query("SELECT * FROM users WHERE id = $1;", [req.params.id])
      .then(data => {
        const users = data.rows;
        res.json({ users });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.post("/", (req, res) => {
    const user = req.body;
    userQueries.addUser(db, user)
    .then(user => {
      if (!user) {
        res.send({error: "error"});
        return;
      }
      req.session.userID = user.id;
    });
  });

  return router;
};

