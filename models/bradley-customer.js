// /*
// ============================================
// ; Title:  bradley-customer.js
// ; Author: Gunner Bradley
// ; Date:   05 December 2021
// ; Description: schema routes file for the assignments in WEB 420 RESTful APIs
// ;===========================================
// */
const mongoose = require('mongoose'); //import mongoose

 let Schema = mongoose.Schema;

  //lineItem db schema
  const lineItemSchema = new Schema({
    name:  String,
    price: Number,
    qunatity: Number
  });

//Invoice db schema
  const invoiceSchema = new Schema({
    subtotal: Number,
    tax: Number,
    dateCreated: String,
    dateShipped: String,
    lineItemSchema: [lineItemSchema], //lineItem array
  });

  //Customer db schema
  const customerSchema = new Schema({
    firstName: String,
    lastName: String,
    userName: String,
    invoices: [invoiceSchema] //invoice array
  }, {collection: 'customer'});

let Customer = mongoose.model("Customer", customerSchema);

// Export the Customer model
module.exports = Customer;
