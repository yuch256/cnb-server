const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const repairerSchema = new Schema({
  usr: { type: String, required: true, unique: true },
  pwd: { type: String, required: true },
  salt: { type: String, required: true },
  scope: { type: Number, default: 2 }
}, {
  versionKey: false,
  timestamps: true
});

module.exports = mongoose.model('Repairer', repairerSchema);
