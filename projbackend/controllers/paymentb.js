const braintree = require("braintree");

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId:   'tz8vppg23bdxfqj7',
  publicKey:    'rj9qmrhpscb58vcz',
  privateKey:   '17728d41da571dd7283c4e27bace5002'
});

exports.getToken = (req, res) => {
    gateway.clientToken.generate({}, (err, response) => {
        if(err){
            res.status(500).json(err);
        }
        else{
            res.send(response);
        }
      });
};

exports.processPayment = (req, res) => {
    let nonceFromTheClient = req.body.paymentMethodNonce
    let amountFromTheClient = req.body.amount
    gateway.transaction.sale({
        amount: amountFromTheClient,
        paymentMethodNonce: nonceFromTheClient,
        options: {
          submitForSettlement: true
        }
      }, (err, result) => {
          if(err){
              res.status(500).json(err);
          }
          else{
              res.json(result);
          }
      });
}