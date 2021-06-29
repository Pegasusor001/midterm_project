/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const userQueries = require('../lib/user_queries');
const mapQueries = require('../lib/user_queries');
const pointQueries = require('../lib/user_queries');

module.exports = (db) => {
  router.get("/", (req, res) => {
    //userQueries.getUsers(db)
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
    //userQueries.getUsers(db)
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

