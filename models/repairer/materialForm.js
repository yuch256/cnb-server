const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const materialFormSchema = new Schema({
  realname: { type: String, required: true },
  actmoney: { type: String, required: true },
  insureNum: { type: String, required: true },
  status: { type: String, required: true },
  carnum: { type: String, required: true },
  img: {
    invoice: [
      {
        name: String,
        path: String,
        size: String,
        Type: String
      }
    ]
  }
}, {
  versionKey: false,
  timestamps: true
});

module.exports = mongoose.model('MaterialForm', materialFormSchema);
