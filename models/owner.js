const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ownerSchema = new Schema({
  usr: String,
  email: String,
  pwd: String,
  salt: String,
  realname: String,
  IDcard: String,
  phone: String,
  carnum: String,
}, { versionKey: false });

/**
 * Methods: add to document (newUser.addUser())
 */
ownerSchema.methods.addUser = function () {
  var greeting = this.name ? `已添加用户 ${this.name}` : "I don't have a name?";
  console.log(greeting);
}

/**
 * Statics: add to model (User.whatThis())
 */
// or `userSchema.static('whatThis', function() {})`
ownerSchema.statics.whatThis = function () {
  console.log(this)
}

// Model creation
module.exports = mongoose.model('Owner', ownerSchema);
