const bcrypt = require('bcrypt');
const { BCRYPT_WORK_FACTOR, SECRET_KEY } = require('../config');
const db = require("../model/helper");


class User {

    static async register(username, password) {
        let hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);
        let sql = `
            INSERT INTO users (username, password)
            VALUES ('${username}', '${hashedPassword}')
        `;

        let rc = 'ok';
        try {
            await db(sql);
        } catch (err) {
            rc = err;
        }

        return rc;
    }

    /**
     * Return true if username/password are valid, false otherwise
     */

    static async authenticate(username, password) {
        let results = await db(`SELECT password FROM users WHERE username = '${username}'`);
        if (results.data.length === 0) {
            return false;
        } else {
            return await bcrypt.compare(password, results.data[0].password);
        }
    }

}

module.exports = User;