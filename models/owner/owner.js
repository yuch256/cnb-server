const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ownerSchema = new Schema({
  usr: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  pwd: { type: String, required: true },
  salt: { type: String, required: true },
  realname: { type: String, required: true },
  IDcard: { type: String, required: true, unique: true },
  phone: { type: String, required: true, unique: true },
  carnum: { type: String, required: true, unique: true },
  scope: { type: Number, default: 1 }
}, {
  versionKey: false,   //去掉版本锁 __v0
  timestamps: true     //自动管理修改时间
});

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
