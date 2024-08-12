const mongoose = require("mongoose")

const eventSchema = mongoose.Schema({
  authorId: String, //equals Account Id
  title: String,
  information: String,
  type: String,
  location: String,
  date: String
})

module.exports = mongoose.model("Event", eventSchema)
