const mongoose = require('mongoose')

const reqString = {
  type: String,
  required: true,
}

const banSchema = mongoose.Schema(
  {
    UserID: reqString,
    StaffID: reqString,
    GuildID: reqString,
    Reason: reqString,
    Expires: {
      type: Date,
      required: false,
    },
    Current: {
      type: Boolean,
      required: true,
    },
  }
)

module.exports = mongoose.model('bans', banSchema)