// /*
// ============================================
// ; Title:  bradley-session-routes.js
// ; Author: Gunner Bradley
// ; Date:   121 November 2021
// ; Description: api routes file for the assignments in WEB 420 RESTful APIs
// ;===========================================
// */

const User = require("../models/bradley-user");

const express = require("express");

const bcrypt = require("bcryptjs");

const router = express.Router();

const saltRounds = 10;

/**
 * signup
 * @openapi
 * /api/users:
 *   post:
 *     tags:
 *       - Users
 *     name: signup
 *     description: Creates a new user document for users Database
 *     summary: Creates a new user document
 *     requestBody:
 *       description: User data
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - userName
 *               - password
 *               - emailAddress 
 *             properties:
 *              userName:
 *                 type: string
 *              password:
 *                 type: string
 *              emailAddress:
 *                  type: array
 *                  items:
 *                      character: string
 * 
 *     responses:
 *       '200':
 *         description: User created
 *       '401':
 *         description: Username Already in use
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */

router.post('/signup', async(req, res) => {
    try {
        User.findOne({'userName': req.body.userName}, (err, userN) => {
            if (err) {
                console.log(err);
                res.status(501).send({
                    'message': `MongoDB Exception: Issue with findOne - ${err}`
                })
            } else {
                if (!userN) {
                    let hashedPassword = bcrypt.hashSync(req.body.password, saltRounds); // salt/hash the password
                    const newRegisteredUser = {
                        userName: req.body.userName,
                        password: hashedPassword,
                        emailAddress: req.body.emailAddress
                    };

                    User.create(newRegisteredUser, (err, user) => {
                        if (err) {
                            console.log(err);
                            res.status(501).send({
                                'message': `MongoDB Exception: Issue with creating User - ${err}`
                            })
                        } else {
                            console.log(user);
                            res.json(user);
                            res.status(200).send({'message': 'User Created'})
                        }
                    })
                
                } else if (userN) {
                    console.log('Username Already in use');
                    res.status(401).send({
                        'message': `Username Already in use`
                    })
                }
            }
        })
    } catch (err) {
        console.log(err);
        res.status(500).send({
            'message': `Server Exception: ${err}`
        })
    }
})




/**
 * login
 * @openapi
 * /api/users:
 *   post:
 *     tags:
 *       - Users
 *     name: signup
 *     description: login a user
 *     summary: login a user 
 *     requestBody:
 *       description: login data
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - userName
 *               - password
 *             properties:
 *              userName:
 *                 type: string
 *              password:
 *                 type: string
 * 
 *     responses:
 *       '200':
 *         description: User logged in
 *       '401':
 *         description: Invalid username and/or password
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */

router.post('/login', async(req, res) => {
    try {
        User.findOne({'userName': req.body.userName}, (err, user) => {
            if (err) {
                console.log(err);
                res.status(501).send({
                    'message': `MongoDB Exception: ${err}`
                })
            } else {
                if (user) {
                    let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
                    if (passwordIsValid) {
                        console.log('User logged in');
                        res.status(200).send({
                            'message': 'User logged in'
                        })
                    } else {
                        console.log('Password is incorrect');
                        res.status(401).send({
                            'message': `Invalid passId or password`
                        })
                    }
                } else if (!user) {
                    console.log('Invalid userName');
                    res.status(401).send({
                        'message': `Invalid username`
                    })
                }
            }
        })
    } catch (e) {
        console.log(e);
        res.status(500).send({
            'message': `Server Exception: ${e}`
        })
    }
})



module.exports = router;