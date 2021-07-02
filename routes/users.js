/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
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

module.exports = (db, database) => {
  router.get("/login", (req, res) => {
    res.render("login.ejs");
  });

  router.get("/register", (req, res) => {
    res.render("register.ejs");
  });

  router.post('/login', (req, res) => {
    const {email, password} = req.body;
    database.getUserWithEmail(db, email)
      .then(user => {
        if (!user) {
          res.send({error: 'This user doesn\'t exist'})
          return;
        }
        req.session.user = user;
        res.redirect(302, '/')
      })
      .catch(e => res.send(e));
  })

  router.post('/logout', (req, res) => {
    req.session = null;
    res.redirect(302, '/')
  });

  router.post('/register', (req, res) => {
    const user = req.body;
    database.addUser(db, user)
    .then(user => {
      if (!user) {
        res.send({error: "error"});
        return;
      }
      req.session.user = user;
      res.redirect(302, '/');
    })
    .catch(e => res.send(e));
  });

  return router;
};
