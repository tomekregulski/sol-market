require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db.config');

connectDB();

console.log('mongo: ', process.env.MONGO_URI);

const app = express();

app.use(express.json());
app.use(cors());

app.use('/v1', require('./routes/v1/index'));

const PORT = process.env.PORT || 5678;

const server = app.listen(PORT, () =>
  console.log(`server is listening on port ${PORT}`)
);

// eslint-disable-next-line no-unused-vars
process.on('unhandledRejection', (err, promise) => {
  console.log(`Logged Error: ${err.message}`);
  server.close(() => process.exit(1));
});
