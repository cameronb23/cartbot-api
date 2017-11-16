import mongoose from 'mongoose';
import timestamps from 'mongoose-timestamp';

const Schema = mongoose.Schema;

const schema = new Schema({
  pid: String,
  price: Number,
  size: String,
  login: {
    email: String,
    password: String
  }
});

schema.plugin(timestamps);

// set up a mongoose model and pass it using module.exports
const model = mongoose.model('Cart', schema);

export default model;
