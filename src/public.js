import express from 'express';
import uuid from 'uuid/v4';

import User from './models/user';
import { redisClient } from './database';

const router = express.Router();

router.get('/account', async (req, res) => {
  return res.status(200).send("Hello");
});

function saveToken(userId) {
  return new Promise((resolve, reject) => {
    const tok = uuid();
    redisClient.set(tok, userId.toString(), 'EX', 86400, (err, res) => {
      if (err) {
        console.log(err);
        return reject();
      }

      console.log(res);

      return resolve(tok);
    });
  })
}

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
router.post('/userToken', async (req, res) => {
  const apiKey = req.headers['x-api-key'];
  if (!apiKey) {
    return res.status(403).send({
      success: false,
      message: 'Unauthorized'
    });
  }

  const { DISCORD_TOKEN } = process.env;

  if (apiKey !== DISCORD_TOKEN) {
    return res.status(403).send({
      success: false,
      message: 'Unauthorized'
    });
  }

  if (!req.body.discord) {
    return res.status(500).send({
      success: false,
      message: 'Please include discord id'
    });
  }

  const { discord } = req.body;

  let user = await User.findOne({ discord_id: discord });

  if (!user) {
    user = new User({
      discord_id: discord
    });

    await user.save();
  }

  try {
    const tok = await saveToken(user._id);

    return res.status(200).send({
      token: tok
    });
  } catch (e) {
    console.log(e);
    return res.status(503).send({
      success: false,
      message: 'Unable to make tokens. Try again later'
    });
  }
});

export default router;
