const mongoose = require("mongoose")

const workloadSchema = mongoose.Schema({
  authorId: String, //equals Account Id
  modul: String,
  workload: Number
})

module.exports = mongoose.model("Workload", workloadSchema)
