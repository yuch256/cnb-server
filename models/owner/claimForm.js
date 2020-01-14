const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let claimFormSchema = new Schema({
  usr: { type: String, required: true },
  name: { type: String, required: true },
  gend: { type: String, required: true },
  IDcard: { type: String, required: true },
  reqmoney: { type: String, required: true },                     // 申请理赔金额
  actmoney: { type: String },                                     // 实际理赔金额
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
  process: {                  // 理赔进度
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
