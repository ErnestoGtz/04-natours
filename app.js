const fs = require('fs');
const express = require('express');

const app = express();

// app.get('/', (req, res) => {
//   res
//     .status(200)
//     .json({ message: 'Hello from the server-side!', app: 'Natours' });
// });

// app.post('/', (req, res) => {
//   res
//     .status(200)
//     .json({ message: 'You cant post to this endpoint!!', app: 'Natours' });
// });

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'Success',
    results: tours.length,
    data: {
      tours,
    },
  });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});