var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const User = require("../models/User.js")

router.post('/login', function(req, res){
    try{
        User.findOne({email: req.body.email}, function(err, user) {
            if(!user){
                res.send({error: "User not found", errorAvailable: true})
            } else {
                if(bcrypt.compareSync(req.body.password, user.password)) res.send({"mail": user.email, "id": user._id, errorAvailable: false})
                else res.send({error: "Password don't match", errorAvailable: true})
            }
        })
      } catch {
        res.status(404)
        res.send({error: "Did not Work!"})
      }
  })

  module.exports = router;