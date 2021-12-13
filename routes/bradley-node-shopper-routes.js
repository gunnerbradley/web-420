// /*
// ============================================
// ; Title:  bradley-shopper-routes.js
// ; Author: Gunner Bradley
// ; Date:   04 December 2021
// ; Description: api routes file for the assignments in WEB 420 RESTful APIs
// ;===========================================
// */

const Customer = require("../models/bradley-customer");

const express = require("express");

const router = express.Router();

/*
 * createCustomer
 * @openapi
 * /api/customer:
 *   post:
 *     tags:
 *       - customer
 *     name: createCustomer
 *     summary: Creates a new customer document
 *     requestBody:
 *       description: customer information
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - firstName
 *               - lastName
 *               - userName
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *                userName:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Customer added to MongoDB Atlas
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
router.post('/customers', async(req, res) => {
    try {
        const newCustomer = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            userName: req.body.userName
        }

        await Customer.create(newCustomer, (err, customer) => {
            if (err) {
                console.log(err);
                res.status(501).send({'message': `MongoDB Exception: ${err}`})
            } else {
                console.log(customer);
                res.json(customer);
            }
        })
    } catch (err) {
        console.log(err);
        res.status(500).send({'message': `Server Exception: ${err.message}`})
    }
})



/**
 * createInvoiceByUserName
 * @openapi
 * /api/customer/:username/invoices:
 *   post:
 *     tags:
 *       - customer
 *     name: createInvoiceByUserName
 *     summary: Creates a new Invoice By UserName document
 *     requestBody:
 *       description: customer information
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *              - userName
 *              - subtotal
                - tax
                - dateCreated
                - lineItems
 *             properties:
 *               userName:
 *                 type: string
 *               tax:
 *                 type: number
 *                dateCreated:
 *                 type: number
 *                lineItems:
 *                  type: number
 *                
 *     responses:
 *       '200':
 *         description: invoice added to MongoDB Atlas
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
router.post('/customers/:username/invoices', async(req, res) => {
   
   try {
        Customer.findOne({'userName': req.body.userName}, (err, user) => {
            if (err) {
                console.log(err);
                res.status(501).send({
                    'message': `MongoDB Exception: ${err}`
                })
            } else if (user){

                const newInvoice = {
                    subtotal: req.body.subtotal,
                    tax: req.body.tax,
                    dateCreated: req.body.dateCreated,
                    lineItems: req.body.lineItems
                }

                user.invoices.push(newInvoice);
                Customer.save(user);                

            } else if (!user) {
                console.log('Invalid userName');
                res.status(401).send({ 'message': `Invalid username`})   
            }
        })
    } catch (err) {
        console.log(err);
        res.status(500).send({'message': `Server Exception: ${err}`})
    }
})



/**
findAllInvoicesByUserName
 * @openapi
 * /api/customer/:username/invoices:
 *   get:
 *     tags:
 *       - Customers
 *     description:  API for returning a customer document
 *     summary: returns a customer document
 *     parameters:
 *       - name: username
 *         in: path
 *         required: true
 *         description: customer document username
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Customers document
 *       '500':
 *         description: Server exception
 *       '501':
 *         description: MongoDB Exception
 */
router.get('/customers/:username/invoices', async(req, res) => {
    try {
        Composer.findOne({'userName': req.params.username}, (err, customerById) => {
            if (err) {
                console.log(err);
                res.status(500).send({
                    'message': `MongoDB Exception: ${err}`
                })
            } else {
                console.log(customerById.invoices);
                res.json(customerById.invoices);
            }
        })
    } catch (err) {
        console.log(err);
        res.status(500).send({
            'message': `Server Exception: ${err.message}`
        })
    }
})



module.exports = router;
