require('dotenv').config();
const Database = require('../database');

const dbConfig = require('../config/database');

(async () => {
    const db = new Database(process.env.NODE_ENV, dbConfig);
    db.connect();
    global.sequelize = db.getConnection();
})();
