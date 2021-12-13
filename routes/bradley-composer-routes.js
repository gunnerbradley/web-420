// /*
// ============================================
// ; Title:  bradley-composer-routes.js
// ; Author: Gunner Bradley
// ; Date:   14 November 2021
// ; Description: api routes file for the assignments in WEB 420 RESTful APIs
// ;===========================================
// */
const Composer = require("../models/bradley-composer");

const express = require("express");

const router = express.Router();

/**
 * findAllComposers
 * @openapi
 * /api/composers:
 *   get:
 *     tags:
 *       - Composers
 *     description: API for returning a list of composers documents from MongoODB
 *     summary: return list of composers document
 *     responses:
 *       '200':
 *         description: Array of composers
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
router.get('/composers', async(req, res) => {
    try {
        Composer.find({}, (err, composer) =>{
            if (err) {
                console.log(err);
                res.status(500).send({
                    'message': `MongoDB Exception: ${err}`
                })
            } else {
                console.log(composer);
                res.json(composer);
            }
        })
    } catch (err) {
        console.log(err);
        res.status(500).send({
            'message': `Server Exception: ${err.message}`
        })
    }
})


/**
 * findComposerById
 * @openapi
 * /api/Composers/{id}:
 *   get:
 *     tags:
 *       - Composers
 *     description:  API for returning a composer document
 *     summary: returns a composer document
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Composer document id
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Composer document
 *       '500':
 *         description: Server exception
 *       '501':
 *         description: MongoDB Exception
 */
router.get('/composers/:id', async(req, res) => {
    try {
        Composer.findOne({'_id': req.params.id}, (err, composerById) => {
            if (err) {
                console.log(err);
                res.status(500).send({
                    'message': `MongoDB Exception: ${err}`
                })
            } else {
                console.log(composerById);
                res.json(composerById);
            }
        })
    } catch (err) {
        console.log(err);
        res.status(500).send({
            'message': `Server Exception: ${err.message}`
        })
    }
})

/**
 * createComposer
 * @openapi
 * /api/composers:
 *   post:
 *     tags:
 *       - Composers
 *     name: createComposer
 *     summary: Creates a new Composer document
 *     requestBody:
 *       description: Composer information
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - firstName
 *               - lastName
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Composer added to MongoDB Atlas
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */
router.post('/composers', async(req, res) => {
    try {
        const newComposer = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
        }

        await Composer.create(newComposer, (err, composer) => {
            if (err) {
                console.log(err);
                res.status(501).send({'message': `MongoDB Exception: ${err}`})
            } else {
                console.log(composer);
                res.json(composer);
            }
        })
    } catch (err) {
        console.log(err);
        res.status(500).send({'message': `Server Exception: ${err.message}`})
    }
})


/**
 * updateComposerById
 * @openapi
 * /api/Composers/{id}:
 *   get:
 *     tags:
 *       - Composers
 *     description:  API for updating a composer document
 *     summary: updates a composer document
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Composer document id
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Composer updated
 *       '401':
 *         description: invalid ID
 *       '500':
 *         description: Server exception
 *       '501':
 *         description: MongoDB Exception
 */
router.put('/composers/:id', async(req, res) => {
    try {
        Composer.findOne({'_id': req.params.id}, (err, composer) => {
            if (err) {
                console.log(err);
                res.status(500).send({
                    'message': `MongoDB Exception: ${err}`
                })
            } else if (composer){
                const doc = composer;
                doc.firstName = req.body.firstName;
                doc.lastName = req.body.lastName;

                doc.save();


                res.status(200).send({
                'message': `Composer Updated`
                })
                
            } else if(!composerById){
                res.status(401).send({
                    'message': `Invalid Composer ID`
                })
            }
            
        })
    } catch (err) {
        console.log(err);
        res.status(500).send({
            'message': `Server Exception: ${err.message}`
        })
    }
})


/**
 * deleteComposerById
 * @openapi
 * /api/Composers/{id}:
 *   delete:
 *     tags:
 *       - Composers
 *     description:  API for deleting a composer document
 *     summary: deletes a composer document
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Composer document id
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Composer deleted
 *       '500':
 *         description: Server exception
 *       '501':
 *         description: MongoDB Exception
 */
router.delete('/composers/:id', async(req, res) => {
    try {
        Composer.findByIdAndDelete({'_id': req.params.id},  (err, composer) => {
            if (err){
                console.log(err)
            }
            else{
                res.status(200).send({
                'message': `Composer Deleted: ${composer}`
                })
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
