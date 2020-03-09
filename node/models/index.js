import config from 'config';
import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';

const basename = path.basename(module.filename);
const configDB = config.db;
const db = {};

const sequelize = new Sequelize(`postgres://${configDB.username}:${configDB.password}@${configDB.host}:${configDB.port}/${configDB.database}?ssl=true`);

fs.readdirSync(__dirname)
    .filter(file =>
        (file.indexOf('.') !== 0) &&
        (file !== 'index.js') &&
        (file !== basename) &&
        (file.slice(-3) === '.js'))
    .forEach(file => {
        const model = sequelize.import(path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
