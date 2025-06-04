const pool = require('../db.js');
const bcrypt = require('bcrypt');

const saltRounds = 10;

async function createUser(name , email , password) {
    

    const hashedPassword = await bcrypt.hash(password,saltRounds);


    const query = `
    INSERT INTO users(name , email , password)
    VALUES($1,$2,$3)
    RETURNING id , name , email
    `;

    const values = [name , email , hashedPassword];
    const {rows} = await pool.query(query,values);
    return rows[0];
    
}

async function findUserByEmail(email) {
    const query = `
    SELECT * FROM users WHERE email = $1`;

    const {rows} = await pool.query(query,[email]);
    return rows[0];
    
}
module.exports = {
    createUser,
    findUserByEmail
};


