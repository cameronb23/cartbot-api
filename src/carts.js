import express from 'express';
import { Cart } from './database';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const carts = await Cart.limit(20).find();

    return res.status(200).send(carts);
  } catch (e) {
    return res.status(500).send({
      success: false,
      message: 'Unable to fetch carts. Try again later.',
    });
  }
});

export default router;
