require('dotenv').config();
//const{dbUsername,dbPassword,dbName,dbHost} = require('../../env')

module.exports = {
   development : {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging : false
   },
   test: {
    username: "",
    password: "",
    database: "",
    host: "127.0.0.1",
    dialect: "postgres"
   },
   production:{
    username: "",
    password: "",
    database: "",
    host: "127.0.0.1",
    dialect: "postgres"
   }
};