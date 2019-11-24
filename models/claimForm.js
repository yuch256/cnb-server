const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let claimFormSchema = new Schema({
  name: String,
  gend: String,
  IDcard: String,
  money: String,
  phone: String,
  birth: String,
  type: String,
  address: String,
  bill: String,                 // 账单
  invoice: String,              // 发票
  siteimg: String,              // 现场图片
}, { versionKey: false });

// Model creation
module.exports = mongoose.model('claimForm', claimFormSchema);
