
require("dotenv").config({path:`${__dirname}/../.env`});
// console.log(`Directory: ${__dirname}`)
// console.log(`Process env: ${process.env.NODE_ENV}`)

// console.log(`Config Host: ${process.env.REDIS_HOST}`)
// console.log(`Config Port: ${process.env.REDIS_PORT}`)

module.exports = {
  host: process.env.REDIS_HOST || "127.0.0.1",
  port: parseInt(process.env.REDIS_PORT) || 6379,
  password: process.env.REDIS_PASS || "",
  url: process.env.REDIS_URL,
};
