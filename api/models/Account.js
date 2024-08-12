const mongoose = require("mongoose")

const accountSchema = mongoose.Schema({
  account: String,
  authorId: String, //equals every id other schemas
  password: String
})

module.exports = mongoose.model("Account", accountSchema)
