import express from 'express';
import Cart from './models/cart';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const carts = await Cart.find({}, { login: 0 }).limit(25).exec();

    return res.status(200).send(carts);
  } catch (e) {
    console.log(e);
    return res.status(500).send({
      success: false,
      message: 'Unable to fetch carts. Try again later.',
    });
  }
});

export default router;
