import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import stripePackage from 'stripe';
import path from 'path';

import { initDb, initRedis } from './database';

// routes
import publicRoutes from './public';
import cartRoutes from './carts';
import userRoutes from './users';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', publicRoutes);
app.use('/users', userRoutes);
app.use('/carts', cartRoutes);

app.set('views', path.join(__dirname + '/static'));
app.set('view engine', 'ejs');

app.get('/payment', (req, res) => {
  if(!req.query.userToken) {
    return res.status(503).send("Bad request");
  }
  res.render('payment', {
    userToken: req.query.userToken
  });
});

export let stripe;

async function start() {
  stripe = stripePackage(process.env.STRIPE_TOKEN);

  await initDb();
  await initRedis();

  app.listen(process.env.PORT || 3000, () => console.log(`Server listening on ${process.env.PORT || 3000}`));
}
start();
