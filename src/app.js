import express from 'express';

const app = express(); // Create an Express application

app.get('/', (req, res) => {
  //
  res.status(200).send('Hello from Acquisitions API!'); // Define a route handler for the root UR
});

export default app; // Export the Express application for use in other modules
