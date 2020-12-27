'use strict';

// MODULES
const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors'); // module to format the json response
const dotenv = require('dotenv').config();

// Creates instances of database connections
const connection = require('./database/bookshelf');
const db = connection.db;

// CONSTANTS
const port = 2814;

// Import routes
const routes = require('./routes');

// Builds app w/ express
let app = express();
app.use(bodyParser.json({ limit: '10kb' }));
app.use(cors({
  origin: [
      "http://localhost:8080",
  ],
  credentials: true,
}));
app.use(morgan('dev'));
app.use(helmet());

// Server
app.listen(port, () => console.log(`App listening on port ${port}`));

// TEMP Auth guard
const authguard = (req, res, next) => {
    // if (req.headers.auracle_key !== process.env.API_KEY_PUBLIC) {
    //     return res.status(401).send('The API key is either missing or incorrect.');
    // } else {
        next();
    // }
}

// Routing
app.use('/api/spells', authguard, routes.spells);
app.use('/api/schools', authguard, routes.schools);
app.use('/api/meta_schools', authguard, routes.meta_schools);
app.use('/api/variables', authguard, routes.variables);
app.use('/api/ingredients', authguard, routes.ingredients);
app.use('/api/users', authguard, routes.users);
