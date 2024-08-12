var express = require('express');
var router = express.Router();
const Workload = require("../models/Workload.js");

/*  Grades's   */
router.post("/create-workload", async (req, res) => {
  const workload = new Workload({
    authorId: req.body.authorId,
    modul: req.body.modul,
    workload: req.body.workload
  })
  await workload.save()
  res.send(workload)
})

//Get All
router.get("/get-workloads/:authorId", async (req, res) => {
	try {
		const workloads = await Workload.find({authorId: req.params.authorId})
		res.send(workloads)
	}catch{
		res.status(404)
		res.send({error: "Did not Work!"})
	}
})

//Get specific
router.get("/get-workload/:_id", async (req, res) => {
  try{
    const workload = await Workload.findOne({_id: req.params._id})
  } catch {
    res.status(404)
    res.send({error: "Did not Work!"})
  }
})

router.patch("/update-workload/:_id", async (req, res) => {
	try {
		const workload = await Workload.findOne({ _id: req.params._id })

		if (req.body.modul) {
			workload.modul = req.body.modul
		}

		if (req.body.workload) {
			workload.workload = req.body.workload
		}

		await workload.save()
		res.send(workload)
	} catch {
		res.status(404)
		res.send({ error: "Post doesn't exist!" })
	}
})

router.delete("/delete-workload/:_id", async (req, res) => {
	try {
		await Workload.deleteOne({ _id: req.params._id })
		res.status(204).send()
	} catch {
		res.status(404)
		res.send({ error: "Post doesn't exist!" })
	}
})

router.delete("/delete-workloads/:authorId", async (req, res) => {
  try {
    await Workload.deleteMany({authorId: req.params.authorId})
    res.status(204).send()
  } catch {
    res.status(404)
    res.send({ error: "Post doesn't exist!" })
  }
})

module.exports = router;
