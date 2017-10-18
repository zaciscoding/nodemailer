// Setup for nodemailer npm module, should use email of recipient user, and that users email password.

const express = require('express')
const router = express.Router()
const nodemailer = require('nodemailer')

router.get('/contact', function (req, res, next) {
  res.render('contact', {
    pageTitle: 'Contact',
    pageId: 'contact',
    msg: null,
    err: null
  })
})

router.post('/contactform', function (req, res, next) {
  let transporter = nodemailer.createTransport({

    host: 'SMTP',
    service: 'servicegoeshere/example*gmail',
    port: 587,
    secure: false,
    auth: {
      user: 'emailgoeshere',
      pass: 'passwordgoeshere'
    }
  })

  var mailOpts = {
    from: req.body.name + '&lt' + req.body.email + '&gt',
    to: 'who is getting email',
    subject: 'title',
    text: req.body.message + req.body.email }

  transporter.sendMail(mailOpts, function (error, response) {
    if (error) {
      res.render('contact', {
        pageTitle: 'Contact',
        pageId: 'contact',
        msg: null,
        err: 'Error Occurred: message was not sent.'})
    } else {
      console.log(' message has been sent')
      res.render('contact', {
        pageTitle: 'Contact',
        pageId: 'contact',
        msg: 'Success.',
        err: null })
    }
  })
})
module.exports = router
