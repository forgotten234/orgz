var express = require('express');
var router = express.Router();
const User = require("../models/User.js")
const saltRounds = 10;
const bcrypt = require('bcrypt');

router.patch("/update-user/:_id", async (req, res) => {
  try {
    const user = await User.findOne({_id: req.params._id })
    console.log(user)
    if(req.body.password) {
      bcrypt.genSalt(saltRounds, async function(err, salt) {
        bcrypt.hash(req.body.password, salt, async function(err, hash) {
          user.password = hash
          await user.save()
        })
      })
    }

    if(req.body.email){
      user.email = req.body.email
      await user.save()
    }


    res.send(user)
  } catch {
    res.status(404)
    res.send({error: "Did not Work!"})
  }
})

router.get("/get-users", async (req, res) => {
	const users = await User.find()
	res.send(users)
})

router.get("/get-users/:_id", async (req, res) => {
  try{
    const user = await User.findOne({_id: req.params._id})
  } catch {
    res.status(404)
    res.send({error: "Did not Work!"})
  }
})

module.exports = router;
