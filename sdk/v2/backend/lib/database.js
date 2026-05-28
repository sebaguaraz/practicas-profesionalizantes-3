const { DatabaseSync } = require('node:sqlite');
const { resolve } = require('node:path');
const config = require('./config.js');

const dbPath = resolve(__dirname, "..", config.database.path);
const db = new DatabaseSync(dbPath);

module.exports = { db };