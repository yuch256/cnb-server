const mongoose = require('./db');
const Schema = mongoose.Schema;

let userSchema = new Schema({
  name: String,
  age: String,
  IDcard: String,
});

/**
 * Methods
 */
userSchema.methods.speak = function () {
  var greeting = this.name ? "user name is " + this.name : "I don't have a name";
  console.log(greeting);
}

// Model creation
module.exports = mongoose.model('User', userSchema);
