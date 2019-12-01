const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let claimFormSchema = new Schema({
  usr: String,
  name: String,
  gend: String,
  IDcard: String,
  money: String,
  phone: String,
  insureNum: String,
  type: String,
  address: String,
  img: {
    invoice: [
      {
        name: String,
        path: String,
        size: String,
        Type: String,
      }
    ],
    site: [
      {
        name: String,
        path: String,
        size: String,
        Type: String,
      }
    ],
  },
  date: {
    type: Date,
    default: Date.now
  },
}, { versionKey: false, });

// Model creation
module.exports = mongoose.model('ClaimForm', claimFormSchema);
