const mongoose = require("mongoose")

const toDoSchema = mongoose.Schema({
  authorId: String, //equals Account Id
  title: String,
  text: String,
  type: String
})

module.exports = mongoose.model("ToDo", toDoSchema)
