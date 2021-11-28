// /*
// ============================================
// ; Title:  bradley-user.js
// ; Author: Gunner Bradley
// ; Date:   27 November 2021
// ; Description: schema routes file for the assignments in WEB 420 RESTful APIs
// ;===========================================
// */
const mongoose = require('mongoose'); //import mongoose

 let Schema = mongoose.Schema;

 //User db schema
  const userSchema = new Schema({
     userName: String,
    password: String,
    emailAddress: Array

  }, {collection: 'users'});


// Export the Person model
module.exports = mongoose.model('User', userSchema);