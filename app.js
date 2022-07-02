const fs = require('fs');
const express = require('express');
const e = require('express');

const app = express();

app.use(express.json());

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`))

app.get('/api/v1/tours', (req, res) => {
   res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours
    }
   })
})

app.get('/api/v1/tours/:id', (req, res) => {
  const id = req.params.id * 1;
  const tour = tours.find(el => el.id === id);
  res.status(200).json({
   status: 'success',
   data: {
     tour
   }
  })
})

app.post('/api/v1/tours', (req, res) => {

  const newID = tours[tours.length - 1].id + 1;

  const newTour = object.assign({ id: newID }, req.body);

  tours.push(newTour);

  fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
        res.status(201).json({
          status: 'success',
          data: {
            tour: newTour
          }
        })
  })
})



const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
