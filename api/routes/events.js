var express = require('express');
var router = express.Router();
const Event = require("../models/Event.js")
/* Events */
router.post("/create-event", async (req, res) => {
  const eve = new Event({
    authorId: req.body.authorId,
    title: req.body.title,
    information: req.body.text,
    type: req.body.type,
    location: req.body.location,
    date: req.body.date
  })
  await eve.save()
  res.send(eve)
})

//Get All
/*
router.get("/get-events", async (req, res) => {
	const eves = await Event.find()
	res.send(eves)
})*/

//Get from one account
router.get("/get-events/:authorId", async (req, res) => {
  const eves = await Event.find({authorId: req.params.authorId})
  res.send(eves)
})

//Get specific
router.get("/get-events/:_id", async (req, res) => {
  try{
    const eve = await Event.findOne({_id: req.params._id})
  } catch {
    res.status(404)
    res.send({error: "Did not Work!"})
  }
})

router.patch("/update-event/:_id", async (req, res) => {
	try {
		var eve = await Event.findOne({ _id: req.params._id })

		if (req.body.title) {
			eve.title = req.body.title
		}

		if (req.body.information) {
			eve.information = req.body.information
		}

    if (req.body.type) {
      eve.type = req.body.type
    }

    if (req.body.location) {
      eve.location = req.body.location
    }

    if (req.body.date) {
      eve.date = req.body.date
    }

		await eve.save()
		res.send(eve)
	} catch {
		res.status(404)
		res.send({ error: "Post doesn't exist!" })
	}
})

router.delete("/delete-event/:_id", async (req, res) => {
	try {
		await Event.deleteOne({ _id: req.params._id })
		res.status(204).send()
	} catch {
		res.status(404)
		res.send({ error: "Post doesn't exist!" })
	}
})

router.delete("/delete-events/:authorId", async (req, res) => {
  try {
    await Event.deleteMany({authorId: req.params.authorId})
    res.status(204).send()
  } catch {
    res.status(404)
    res.send({ error: "Post doesn't exist!" })
  }
})

module.exports = router;
