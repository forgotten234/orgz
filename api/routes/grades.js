var express = require('express');
var router = express.Router();
const Grade = require("../models/Grade.js");

/*  Grades's   */
router.post("/create-grade", async (req, res) => {
  const grade = new Grade({
    authorId: req.body.authorId,
    nameCredits: req.body.nameCredits,
    nameGrades: req.body.nameGrades,
    credits: req.body.credits,
    grade: req.body.grade
  })
  await grade.save()
  res.send(grade)
})

//Get All
router.get("/get-grades", async (req, res) => {
	const grades = await Grade.find()
	res.send(grades)
})

//Get specific
router.get("/get-grades/:authorId", async (req, res) => {
  try{
    const grades = await Grade.find({authorId: req.params.authorId})
    res.send(grades)
  } catch {
    res.status(404)
    res.send({error: "Did not Work!"})
  }
})

router.delete("/delete-grade/:_id", async (req, res) => {
	try {
		await Grade.deleteOne({ _id: req.params._id })
		res.status(204).send()
	} catch {
		res.status(404)
		res.send({ error: "Post doesn't exist!" })
	}
})

router.delete("/delete-grades/:authorId", async (req, res) => {
  try {
    await Grade.deleteMany({authorId: req.params.authorId})
    res.status(204).send()
  } catch {
    res.status(404)
    res.send({ error: "Post doesn't exist!" })
  }
})

module.exports = router;
