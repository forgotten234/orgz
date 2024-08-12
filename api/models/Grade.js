const mongoose = require("mongoose")

const gradeSchema = mongoose.Schema({
  authorId: String, //equals Account Id
  nameCredits: String,
  nameGrades: String,
  credits: Number,
  grade: Number
})

module.exports = mongoose.model("Grade", gradeSchema)
