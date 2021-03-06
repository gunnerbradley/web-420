// /*
// ============================================
// ; Title:  index.js
// ; Author: Gunner Bradley
// ; Date:   14 November 2021
// ; Description: Main server file for the assignments in WEB 420 RESTful APIs
// ;===========================================
// */
require('dotenv').config()
const express = require('express');
const http = require('http');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const mongoose = require('mongoose');
const composerAPI = require('./routes/bradley-composer-routes');
const personAPI = require('./routes/bradley-person-routes');
const userAPI = require('./routes/bradley-session-routes');
const customerAPI = require('./routes/bradley-node-shopper-routes');
const DB_USERNAME = process.env.DB_USERNAME
const DB_PASSWORD = process.env.DB_PASSWORD

let app = express();

app.set('port', process.env.PORT || 3000);

app.use(express.json());
app.use(express.urlencoded({'extended': true}));

/**
 * MongoDB Atlas connection string
 */
const conn = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.mlnw2.mongodb.net/web420DB?retryWrites=true&w=majority`;

mongoose.connect(conn, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(() => {
    console.log(`Connection to web420DB on MongoDB Atlas successful`);
}).catch(err => {
    console.log(`MongoDB Error: ${err.message}`);
})

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'WEB 420 RESTful APIs',
            version: '1.0.0',
        },
    },
    apis: ['./routes/*.js'], // files containing annotations for the OpenAPI Specification
};

const openapiSpecification = swaggerJsdoc(options);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openapiSpecification));
app.use("/api", composerAPI, personAPI, userAPI, customerAPI);



http.createServer(app).listen(app.get('port'), () => {
    console.log(`Application started and listening on port ${app.get('port')}`);
})
