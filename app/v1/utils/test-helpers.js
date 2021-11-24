require('../../../config');
const Database = require('../../../database');
const dbConfig = require('../../../config/database');

let db;

module.exports = class TestHelpers 
{

    static async startDb () {
        db = new Database('test', dbConfig);
        await db.connect();
        return db;
    }

    static async stopDb () {
        await db.disconnect();
    }

    static async sync () {
        await db.sync({force: true});
    }

}