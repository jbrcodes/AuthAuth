require("dotenv").config();


const SECRET_KEY = process.env.SECRET_KEY || 'my little secret key';
const BCRYPT_WORK_FACTOR = (process.env.NODE_ENV === 'test') ? 1 : 12;


module.exports = {
  SECRET_KEY,
  BCRYPT_WORK_FACTOR
};