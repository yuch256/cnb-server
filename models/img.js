const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let imgSchema = new Schema({
  name: String,
  path: String,
  size: String,
  type: String,
}, { versionKey: false });

// Model creation
module.exports = mongoose.model('Img', imgSchema);
