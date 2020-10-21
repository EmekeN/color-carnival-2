require("dotenv").config({ path: `${__dirname}/../.env` });
const redis = require("redis");
let client =
  (process.env.NODE_ENV === "production")
    ? redis.createClient({
        url: process.env.REDIS_URL,
      })
    : redis.createClient({
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT),
        password: process.env.REDIS_PASS,
      });

client.on("connect", () => {
  console.log("Connected to Redis Server");
});


module.exports = {
  client
};
