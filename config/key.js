const dotenv = require("dotenv");
const path = require("path");
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const db = process.env.DB_CONN;
const port = process.env.PORT;

module.exports = {
  mongoURI: `${db}`,
  port: `${port}`,
};
