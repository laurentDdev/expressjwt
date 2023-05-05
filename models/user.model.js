const sql = require("mssql")
const {password} = require("../database.config");

const userModel = {
    getAll: async () => {
        try {

            const result = await sql.query `SELECT * FROM users`
            return result
        }catch (e) {
            console.log(e)
        }
    },
    create:async (data) => {
       try {
           const { email , firstname,lastname,hashedPassword } = data
           const pseudo = `${firstname.substring(0,3)}${lastname.substring(0,2)}`
           const result = await sql.query `INSERT INTO users (pseudo,firstname,lastname,email,password) VALUES (${pseudo},${firstname}, ${lastname},${email}, ${hashedPassword})`
           return result
       }catch (e) {
           console.log(e)
       }
    },
    saveJwt:async (data) => {
        try {
            const { id , jwt } = data
            const result = await sql.query `UPDATE users SET jwt = ${jwt} WHERE id = ${id}`
            return result
        }catch (e) {
            console.log(e)
        }
    },
    getByMail:async (email) => {
        try {
            const result = await sql.query `SELECT * FROM users WHERE email = ${email}`
            return result
        }catch (e) {
            console.log(e)
        }
    },
    removeJwt:async (email) => {
        try {
            const result = sql.query `UPDATE users SET jwt = null WHERE email = ${email}`
            return result
        }catch (e) {
            console.log(e)
        }
    },

    getById:async (id) => {
        try {
            const result = await sql.query `SELECT * FROM users WHERE id = ${id}`
            return result
        }catch (e) {
            console.log(e)
        }
    }
}

module.exports = userModel