import mongoose from 'mongoose';
import timestamps from 'mongoose-timestamp';

const Schema = mongoose.Schema;

const schema = new Schema({
  discord_id: String, // id (snowflake) of the user
  stripe_customer: String,
  payout_email: String
});

schema.plugin(timestamps);

// set up a mongoose model and pass it using module.exports
const model = mongoose.model('User', schema);

export default model;
