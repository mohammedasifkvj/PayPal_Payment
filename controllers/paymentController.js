const axios = require('axios');

const createPayment = async (req, res) => {
  const paymentData = {
    intent: 'sale',
    payer: {
      payment_method: 'paypal',
    },
    transactions: [{
      amount: {
        total: '10.00',
        currency: 'USD',
      },
      description: 'Your purchase description',
    }],
    redirect_urls: {
      return_url: 'http://localhost:8003/payment/success',
      cancel_url: 'http://localhost:8003/payment/cancel',
    },
  };

  try {
    const response = await axios.post('https://api.sandbox.paypal.com/v1/payments/payment', paymentData, {
      auth: {
        username: process.env.PAYPAL_CLIENT_ID,
        password: process.env.PAYPAL_SECRET,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const approvalUrl = response.data.links.find(link => link.rel === 'approval_url').href;
    res.redirect(approvalUrl);
  } catch (error) {
    console.error('Error creating PayPal payment:', error);
    res.redirect('/payment/error');
  }
};

const executePayment = async (req, res) => {
  const paymentId = req.query.paymentId;
  const payerId = req.query.PayerID;

  try {
    const response = await axios.post(`https://api.sandbox.paypal.com/v1/payments/payment/${paymentId}/execute`, {
      payer_id: payerId,
    }, {
      auth: {
        username: process.env.PAYPAL_CLIENT_ID,
        password: process.env.PAYPAL_SECRET,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    });

    res.render('paymentSuccess', { payment: response.data });
  } catch (error) {
    console.error('Error executing PayPal payment:', error);
    res.redirect('/payment/error');
  }
};

module.exports = {
  createPayment,
  executePayment
};