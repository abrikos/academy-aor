const passport = require('../passport');
const md5 = require("md5");
const moment = require("moment/moment");
const mailer = require('../mailer');

module.exports = function (app) {
  const {db} = app.locals;
  //db.token.findOne({name:'14c74cd8e1298a68a26b60da43583c4f'})    .populate('user')    .then(console.log)


  app.post('/api/auth/login', passport.authenticate)

  app.post('/api/user/signup', async (req, res) => {
    try {
      const {email, password, passwordConfirm} = req.body
      if (password !== passwordConfirm) throw {message: 'Passwords do not match'}
      const user = await db.user.create({email,password})
      const token = await db.token.create({user})
      res.cookie(passport.cookieName, token.name)
      res.send(token.name);
    } catch (e) {
      app.locals.errorLogger(e, res)
    }
  })

  app.post('/api/auth/logout', passport.logout);

  app.get('/api/auth/user', passport.isLogged, async (req, res) => {
    const {user} = res.locals;
    res.send(passport.adaptUser(user))
  })

  app.post('/api/auth/refresh', async (req, res) => {
    try {
      const {refresh_token} = req.body;
      console.log('Auth Refresh called', req.body)
      const token = await db.token.findOne({refresh_token})
      await token.refresh()
      res.send(token.access_token)
    } catch (e) {
      app.locals.errorLogger(e, res)
    }
  })


  app.get('/api/user/list', async (req, res) => {
    const list = await db.user.find()
    res.send(list)
  })

  app.get('/api/user/confirm-reset/:code', async (req, res) => {
    try {
      const user = await db.user.findOne({resetCode: req.params.code})
      if (!user) throw {message: 'Wrong reset code'}
      const passwd = user.password = md5(moment().unix()).substr(0, 5)
      user.save()
      user.resetCode = '';
      mailer.sendMail({
        from: process.env.MAIL_USER,
        to: user.email,
        subject: 'New password',
        text: passwd
      })
      res.redirect('/user/reset-password-done')
    } catch (e) {
      app.locals.errorLogger(e, res)
    }
  })

  app.post('/api/user/reset-password', async (req, res) => {
    const {email} = req.body;
    try {
      const found = await db.user.findOne({email})
      if (!found) throw {message: 'Wrong email'}
      found.resetCode = md5(moment().unix());
      found.save()
      const site = 'https://' + req.get('host') + '/api/user/confirm-reset/' + found.resetCode
      mailer.sendMail({
        from: process.env.MAIL_USER,
        to: email,
        subject: 'Reset password',
        text: `To confirm password reset please visit: ${site}`
      })
      const {user} = res.locals;
      res.sendStatus(200)
    } catch (e) {
      app.locals.errorLogger(e, res)
    }
  })

  app.post('/api/user/update', passport.isLogged, async (req, res) => {
    const {user} = res.locals;
    const {password, passwordConfirm} = req.body;
    if (password && passwordConfirm === password) {
      user.password = password
    }
    for(const field of user.fields){
      user[field.name] = req.body[field.name]
    }
    await user.save()
    res.send(user);
  })

}
