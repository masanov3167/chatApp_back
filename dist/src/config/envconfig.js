"use strict";
require("dotenv").config();
module.exports = {
    db_host: process.env.PG_HOST,
    db_name: process.env.PG_DATABASE_NAME,
    db_user: process.env.PG_USERNAME,
    db_pass: process.env.PG_PASSWORD,
    jwt_secret_key: process.env.JWT_SECRET_KEY,
};
