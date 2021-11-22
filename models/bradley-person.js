// /*
// ============================================
// ; Title:  bradley-person.js
// ; Author: Gunner Bradley
// ; Date:   21 November 2021
// ; Description: schema routes file for the assignments in WEB 420 RESTful APIs
// ;===========================================
// */
const mongoose = require('mongoose'); //import mongoose

 let Schema = mongoose.Schema;

  //role db schema
  const roleSchema = new Schema({
    text:  String,
  });


  //dependent db schema
  const dependentSchema = new Schema({
    firstName:  String,
    lastName: String,
  });

 //Person db schema
  const personSchema = new Schema({
    firstName:  String,
    lastName: String,
    roles: [roleSchema], //document array
    dependents: [dependentSchema], //document arrays
    birthDate: String

  }, {collection: 'people'});


// Export the Person model
module.exports = mongoose.model('Person', personSchema);