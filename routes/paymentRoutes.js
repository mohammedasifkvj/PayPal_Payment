const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

// Route to render the payment page
router.get('/', (req, res) => {
  res.render('payment');
});

router.post('/create', paymentController.createPayment);
router.get('/success', paymentController.executePayment);
router.get('/cancel', (req, res) => res.send('Payment cancelled'));
router.get('/error', (req, res) => res.send('Error processing payment'));

module.exports = router;

