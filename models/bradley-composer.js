// /*
// ============================================
// ; Title:  bradley-composer-routes.js
// ; Author: Gunner Bradley
// ; Date:   14 November 2021
// ; Description: schema routes file for the assignments in WEB 420 RESTful APIs
// ;===========================================
// */
const mongoose = require('mongoose'); //import mongoose

 let Schema = mongoose.Schema;

  //composer db schema
  const composerSchema = new Schema({
    firstName:  String,
    lastName: String,
  }, {collection: 'composers'});

let Composer = mongoose.model("Composer", composerSchema);

// Export the User model
module.exports = Composer;
