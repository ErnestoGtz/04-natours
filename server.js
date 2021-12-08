const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
  console.log('Uncaught exception! 🧨 Shutting down');
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: './.env' });

const app = require('./app');

const db = process.env.DB_CON.replace('<PASSWORD>', process.env.DB_PASS);
mongoose
  .connect(db, {
    // useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
  })
  .then(() => console.log('DB is online'));

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});

process.on('unhandledRejection', (err) => {
  console.log('Unhandler rejection! 🧨 Shutting down');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
