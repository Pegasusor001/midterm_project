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

router.use(cookieSession({                // router.use(cookieParser() is replaced by sookieSession for encryption.
  name: 'userId',
  keys: ['key1', 'key2']
}));


module.exports = (database) => {
  router.get("/login", (req, res) => {
    res.render("login.ejs");
  });

  router.get("/register", (req, res) => {
    res.render("register.ejs");
  });


  const login =  function(email, password) {
    return database.getUserWithEmail(email)
    .then(user => {
      if (bcrypt.compareSync(password, user.password)) {
        return user;
      }
      return null;
    });
  }

  router.post('/login', (req, res) => {
    const {email, password} = req.body;
    login(email, password)
      .then(user => {
        console.log(user)
        if (!user) {
          res.send({error: 'error'})
          return;
        }
        req.session.userId = user.id;
        res.redirect(302, '/')
      })
      .catch(e => res.send(e));
  })

  router.post('/logout', (req, res) => {
    req.session.userId = null;
    res.redirect(302, '/')
  });

  router.post('/register', (req, res) => {
    const user = req.body;
    user.password = bcrypt.hashSync(user.password, 12);
    database.addUser(user)
    .then(user => {
      if (!user) {
        res.send({error: "error"});
        return;
      }
      req.session.userId = user.id;
      res.redirect(302, '/');
    })
    .catch(e => res.send(e));
  });

  return router;
};
