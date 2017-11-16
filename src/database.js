// TODO: start databases
import { Database, Model } from 'mongorito';
import timestamps from 'mongorito-timestamps';

let db;

export class User extends Model {}
export class Cart extends Model {}

export async function initDb() {
  db = new Database(process.env.MONGO_URL || 'mongodb://api:gang123@ds163745.mlab.com:63745/cartbot');

  await db.connect();

  db.use(timestamps());

  db.register(User);
  db.register(Cart);
}

export async function saveCart(email, password) {

}
