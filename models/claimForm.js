const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let claimFormSchema = new Schema({
  usr: String,
  name: String,
  gend: String,
  IDcard: String,
  money: String,
  insureNum: String,
  type: String,
  address: String,
  img: {
    bill: [
      {
        name: String,
        path: String,
        size: String,
        Type: String,
      }
    ],
    invoice: [
      {
        name: String,
        path: String,
        size: String,
        Type: String,
      }
    ]
  },
  date: {
    type: Date,
    default: Date.now
  },
}, { versionKey: false, });

// Model creation
module.exports = mongoose.model('ClaimForm', claimFormSchema);
