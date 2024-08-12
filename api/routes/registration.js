var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const User = require("../models/User.js")

router.post('/register', async (req, res) => {
  var password = req.body.password
  var email = req.body.email
  try{
      User.findOne({email: req.body.email.email}, function(err, user) {
        console.log(req.body.email)
        console.log(user)
        if(!user){
          bcrypt.genSalt(saltRounds, async function(err, salt) {
            bcrypt.hash(password.password.toString(), salt, async function(err, hash) {
              const user = new User({
                email: email.email.toString(),
                password: hash
              })
              await user.save()
              res.send(user)   
            });
          });
        } else {
          res.send({error: "User already registered", errorAvailable: true})
        }
      })
  }catch{
    res.status(404)
    res.send({error: "Did not Work!"})
  }
});

module.exports = router;