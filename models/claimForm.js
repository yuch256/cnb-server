const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Img = require('./img');

let claimFormSchema = new Schema({
  usr: String,
  name: String,
  gend: String,
  IDcard: String,
  money: String,
  phone: String,
  birth: String,
  type: String,
  address: String,
  billimg: [{
    name: String,
    path: String,
    size: String,
    type: String,
  }],                 // 账单
  invoiceimg: [{ name: String, path: String, size: String, type: String }],              // 发票
  siteimg: [{ name: String, path: String, size: String, type: String }],                 // 现场图片
  date: String,
}, { versionKey: false, typeKey: '$type' });

// Model creation
module.exports = mongoose.model('ClaimForm', claimFormSchema);
