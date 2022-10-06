import express from 'express';
import passport from "passport";
import Users from '../../models/users.js';

const router = express.Router();

router.get('/login', (request, response) => {
  try {
    response.render('authentication/login')
  } catch (e) {
    response.status(500).json(e)
  }
})

router.get('/me',   (
  req, res, next
  ) => {
    if (!req.isAuthenticated()) {
      return res.redirect('/api/user/login')
    }
    next()
  },(
    request,
    response
  ) => {
    try {
      response.render('authentication/profile', {
        user: request.user,
      })
    } catch (e) {
      response.status(500).json(e)
    }
})

router.post('/login',
  passport.authenticate('local', { failureRedirect: '/api/user/login' }),
  (req, res) => {
    res.redirect('/api/user/me')
  })

router.get('/signup', (request, response) => {
  try {
    response.render('authentication/signin');
  } catch (e) {
    response.status(500).json(e)
  }
})

router.post('/signup', async (request, response) => {
  const { username, password, favorite = '' } = request.body;

  const newUser = new Users({
    username,
    password,
    favorite
  });

  try {
    await newUser.save();
    response.render('authentication/login')
  } catch (e) {
    console.log('e', e)
    response.render("authentication/signin");
  }
})

export default router;