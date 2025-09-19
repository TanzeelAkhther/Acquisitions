import express from 'express';

import logger from '#config/logger.js'; // Import the configured logger
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express(); // Create an Express application
app.use(helmet()); // Use Helmet to enhance API security and it will be considered a middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

app.use(morgan('combined',{ stream: { write: (message) => logger.info(message.trim()) } }));

app.get('/', (req, res) => {
  logger.info('Hello from Acquisitions!');
  //
  res.status(200).send('Hello from Acquisitions API!'); // Define a route handler for the root UR
});

export default app; // Export the Express application for use in other modules
