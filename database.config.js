
const { DB_NAME, DB_PASSWORD, DB_USER } = process.env

module.exports = {
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    server:"localhost",
    pool:{
        min:0,
        max:10,
        idleTimeoutMillis:30000
    },
    options:{
        trustServerCertificate: true
    }
}