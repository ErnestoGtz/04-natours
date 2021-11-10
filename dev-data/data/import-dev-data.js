const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('../../models/tourModel');

dotenv.config({ path: './.env' });

const db = process.env.DB_CON.replace('<PASSWORD>', process.env.DB_PASS);
mongoose
  .connect(db, {
    // useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
  })
  .then(() => console.log('DB is online'));

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8')
);

//Import data into DB
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('Data successfully loaded!!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

//Delete all data from collection
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Data successfully deleted!!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
