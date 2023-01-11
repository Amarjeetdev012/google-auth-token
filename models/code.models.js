const mongoose = require('mongoose');

const codeSchema = new mongoose.Schema({
  access_token: {
    type: String,
  },
  scope: {
    type: String,
  },
  token_type: {
    type: String,
  },
  id_token: {
    type: String,
  },
  expiry_date: {
    type: Date,
  },
});

module.exports = new mongoose.model('code', codeSchema);
