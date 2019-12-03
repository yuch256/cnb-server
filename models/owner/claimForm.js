const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let claimFormSchema = new Schema({
  // usr: String,
  // name: String,
  // gend: String,
  // IDcard: String,
  // money: String,
  // phone: String,
  // insureNum: String,
  // type: String,
  // address: String,
  usr: { type: String, required: true },
  name: { type: String, required: true },
  gend: { type: String, required: true },
  IDcard: { type: String, required: true },
  reqmoney: { type: String, required: true },
  actmoney: { type: String },
  phone: { type: String, required: true },
  insureNum: { type: String, required: true, unique: true },
  type: { type: String, required: true },
  address: { type: String, required: true },
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
  process: {
    type: Number,
    default: 1,
  },
}, {
  versionKey: false,
  timestamps: true
});

// 使用unique会报警告
mongoose.set('useCreateIndex', true);

// Model creation
module.exports = mongoose.model('ClaimForm', claimFormSchema);
