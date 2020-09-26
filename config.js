require("dotenv").config();


const SECRET_KEY = process.env.SECRET_KEY || 'my little secret key';
const BCRYPT_WORK_FACTOR = (process.env.NODE_ENV === 'test') ? 1 : 12;


// const DB_URI = (process.env.NODE_ENV === "test")
//   ? "postgresql:///messagely_test"
//   : "postgresql:///messagely";



// // const BCRYPT_WORK_FACTOR = 12;


module.exports = {
//   DB_URI,
  SECRET_KEY,
  BCRYPT_WORK_FACTOR,
};