import Sequelize from 'sequelize'

const database = 'smite'
const username = 'root'
const password = 'password'
const host = "localhost"

const sequelize = new Sequelize(database, username, password, {
    host: host,
    dialect: 'mysql',
    // operatorsAliases: 0,
    define: {
        timestamps: false // Don't create timestamp fields in database
    },
    // pool: { // Database system params, don't need to know
    //     max: 5,
    //     min: 0,
    //     acquire: 30000,
    //     idle: 10000
    // },
    timezone: "+08:00"
});

export {sequelize}

    // getConnection: function () {
    //   var conn = mysql.createConnection({
    //     host: 'localhost',
    //     port: 3306,
    //     user: 'root',
    //     password: 'password', //your own password
    //     database: 'smite',
    //     dateStrings: true
    //   });

    //   var conn = mysql.createConnection({
    //     host     : process.env.RDS_HOSTNAME,
    //     user     : process.env.RDS_USERNAME,
    //     password : process.env.RDS_PASSWORD,
    //     port     : process.env.RDS_PORT
    //   });

    //   return conn;
    // }

    

