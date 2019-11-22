const mongoose = require('./db');
const Schema = mongoose.Schema;

let ownerSchema = new Schema({
  usrname: String,
  pwd: String,
  realname: String,
  IDcard: String,
  phone: String,
  carNumber: String,
}, { versionKey: false });

/**
 * Methods
 */
ownerSchema.methods.speak = function () {
  var greeting = this.name ? "user name is " + this.name : "I don't have a name";
  console.log(greeting);
}

// Model creation
module.exports = mongoose.model('Owner', ownerSchema);
