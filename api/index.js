'use strict';

// MODULES
const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors'); // module to format the json response
const dotenv = require('dotenv').config();

// CONSTANTS
const port = 2814;
const base_url = 'http://localhost:2814/api';

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

// Entry route
app.use('/api/v1/', routes.auth );

// Routing
app.use('/api/v1/spells', routes.spells);
app.use('/api/v1/schools', routes.schools);
app.use('/api/v1/meta_schools', routes.meta_schools);
app.use('/api/v1/variables', routes.variables);
app.use('/api/v1/ingredients', routes.ingredients);
app.use('/api/v1/users', routes.users);