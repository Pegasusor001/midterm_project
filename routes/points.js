/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
//const userQueries = require('../lib/user_queries');

module.exports = (db) => {
  router.get("/", (req, res) => {
    //userQueries.getUsers(db)
    db.query("SELECT * FROM points;")
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
  return router;
};

// module.exports = (db) => {
//   router.get("/:id", (req, res) => {
//     //userQueries.getUsers(db)
//     db.query("SELECT * FROM points WHERE id = $1;", [req.params.id])
//       .then(data => {
//         const users = data.rows;
//         res.json({ users });
//       })
//       .catch(err => {
//         res
//           .status(500)
//           .json({ error: err.message });
//       });
//   });
//   return router;
// };
