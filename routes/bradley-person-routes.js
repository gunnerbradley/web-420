// /*
// ============================================
// ; Title:  bradley-person-routes.js
// ; Author: Gunner Bradley
// ; Date:   121 November 2021
// ; Description: api routes file for the assignments in WEB 420 RESTful APIs
// ;===========================================
// */

const Person = require("../models/bradley-person");

const express = require("express");

const router = express.Router();

/**
 * findAllPersons
 * @openapi
 * /api/persons:
 *   get:
 *     tags:
 *       - Person
 *     description: returns all persons documents
 *     summary: returns an array of persons in JSON format.
 *     responses:
 *       '200':
 *         description: Array of persons
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */

router.get('/persons', async (req, res) => {
  try {
    Person.find({}, (err, persons) => {
      if (err) {
        console.log(err);
        res.status(501).send({message: `MongoDB Exception: ${err}`});

      } else {
        console.log(persons);
        res.json(persons);
      }
    });

  } catch (err) {
    console.log(err);
    res.status(500).send({ message: `Server Exception: ${err.message}`});
  }
});

/**
 * createPerson
 * @openapi
 * /api/persons:
 *   post:
 *     tags:
 *       - Person
 *     name: createPerson
 *     description: Creates a new person document for persons Database
 *     summary: Creates a new person document
 *     requestBody:
 *       description: Person data
 *       content:
 *         application/json:
 *           schema:
 *             required:
 *               - firstName
 *               - lastName
 *               - roles
 *               - dependents
 *               - birthDate
 *             properties:
 *              firstName:
 *                 type: string
 *              lastName:
 *                 type: string
 *              roles:
 *                  type: array
 *                  items:
 *                      type: object
 *                      properties:
 *                          text:
 *                              type: string
 *              dependents:
 *                  type: array
 *                  items:
 *                      type: object
 *                      properties:
 *                          firstName:
 *                              type: string
 *                          lastName:
 *                              type: string
 *              birthDate:
 *                  type: string
 * 
 *     responses:
 *       '200':
 *         description: Person created
 *       '500':
 *         description: Server Exception
 *       '501':
 *         description: MongoDB Exception
 */

router.post('/persons', async (req, res) => {
  try {
    const newPerson = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      roles: req.body.roles,
      dependents: req.body.dependents,
      birthDate: req.body.birthDate,
    };

    await Person.create(newPerson, (err, person) => {
      if (err) {
        console.log(err);
        res.status(501).send({ message: `MongoDB Exception: ${err}`});

      } else {
        console.log(person);
        res.json(person);
      }
    });

  } catch (err) {
    console.log(err);
    res.status(500).send({ message: `Server Exception: ${err}`});
  }
});

module.exports = router;