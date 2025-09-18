import app from './app.js';

const PORT = process.env.PORT || 3000; // Define the port to run the server

app.listen(PORT, () => {
  //start the server and listen on the defined port
  console.log(`Listening on http://localhost:${PORT}...`);
});
