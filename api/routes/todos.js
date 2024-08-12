var express = require('express');
var router = express.Router();
const ToDo = require("../models/ToDo.js");

/*  ToDo's   */
router.post("/create-todo", async (req, res) => {
  const todo = new ToDo({
    authorId: req.body.authorId,
    title: req.body.title,
    text: req.body.text,
    type: req.body.type
  })
  await todo.save()
  res.send(todo)
})

//Get All
router.get("/get-todos/:authorId", async (req, res) => {
	const todos = await ToDo.find({authorId: req.params.authorId})
	res.send(todos)
})

//Get specific
router.get("/get-todos/:_id", async (req, res) => {
  try{
    const todo = await ToDo.findOne({_id: req.params._id})
  } catch {
    res.status(404)
    res.send({error: "Did not Work!"})
  }
})

router.patch("/update-todo/:_id", async (req, res) => {
	try {
		const todo = await ToDo.findOne({ authorId: req.params._id })

		if (req.body.title) {
			todo.title = req.body.title
		}

		if (req.body.text) {
			todo.text = req.body.text
		}

    if (req.body.type) {
      todo.type = req.body.type
    }

		await todo.save()
		res.send(todo)
	} catch {
		res.status(404)
		res.send({ error: "Post doesn't exist!" })
	}
})

router.delete("/delete-todo/:_id", async (req, res) => {
	try {
		await ToDo.deleteOne({ _id: req.params._id })
		res.status(204).send()
	} catch {
		res.status(404)
		res.send({ error: "Post doesn't exist!" })
	}
})

router.delete("/delete-todos/:authorId", async (req, res) => {
  try {
    await ToDo.deleteMany({authorId: req.params.authorId})
    res.status(204).send()
  } catch {
    res.status(404)
    res.send({ error: "Post doesn't exist!" })
  }
})

module.exports = router;
