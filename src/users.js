import express from 'express';

import User from './models/user';
import { stripe } from './index';
import { redisClient } from './database';

const router = express.Router();

function validateToken(token) {
  console.log(token);
  return new Promise((resolve, reject) => {
    redisClient.get(token, (err, reply) => {
      if (err) {
        console.log(err);
        return reject();
      }

      console.log(reply);

      if(reply) {
        redisClient.del(token, err => {
          if (err) {
            console.log(err);
            return reject();
          }
        });
        return resolve(reply);
      }

      return resolve(null);
    });
  })
}

router.post('/updatePayment', async (req, res) => {
  if (!req.body.userToken || !req.body.paymentToken || !req.body.email) {
    return res.status(503).send({
      success: false,
      message: 'Invalid request.'
    });
  }

  const { userToken, email, paymentToken } = req.body;

  const userId = await validateToken(userToken);

  if (!userId) {
    return res.status(503).send({
      success: false,
      message: 'Invalid user token.'
    });
  }

  try {
    const customer = await stripe.customers.create({
      email,
      source: paymentToken
    });

    const user = await User.findOne({ _id: userId });

    if (!user) {
      return res.status(500).send({
        success: false,
        message: 'User not found'
      });
    }

    user.stripe_customer = customer.id;

    await user.save();

    return res.status(200).send({
      success: true,
      message: 'Payment details updated successfully'
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send({
      success: false,
      message: 'Unable to process request'
    })
  }
});

export default router;
