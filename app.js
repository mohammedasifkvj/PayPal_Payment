const express = require('express');
const bodyParser = require('body-parser');
const paymentRoutes = require('./routes/paymentRoutes');
require('dotenv').config();

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/payment', paymentRoutes);

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Server running http://127.0.0.1:${PORT}/payment`);
});