const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const app = express();
app.use(bodyParser.json());
//enable CORS
app.use(cors());
///

// Dummy data for initial calculations
let calculations = [];

// Endpoint to get the list of calculations
app.get('/api/history', (req, res) => {
  res.json(calculations);
});

// Endpoint to add a new calculation
app.post('/api/calculate', (req, res) => {
  const { operation, num1, num2 } = req.body;
  let result;
  
  switch (operation) {
    case '+':
      result = num1 + num2;
      break;
    case '-':
      result = num1 - num2;
      break;
    case '*':
      result = num1 * num2;
      break;
    case '/':
      result = num1 / num2;
      break;
    default:
      result = 'Invalid operation';
  }
  const calculation = {
    operation,
    num1,
    num2,
    result,
  };
  calculations.push(calculation);

  res.json({ result });
});

// Endpoint to delete a calculation
app.delete('/api/history/:id', (req, res) => {
  const { id } = req.params;
  calculations.splice(id, 1);

  res.sendStatus(200);
});

///
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
