const dotenv = require('dotenv');
dotenv.config({ path: './.env' });

const app = require('./app');

//console.log(app.get('env'));
// console.log(process.env);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
