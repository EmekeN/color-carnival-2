const redis = require("redis");
const {host, port, password, url} = require("./config");
const client = redis.createClient({
  host: host,
  port: port,
  password: password,
  // url: url,
});

client.on("connect", () => {
  console.log("Connected to Redis Server");
});

const mockUsers = [
  {
    id: "0",
    userName: "Oscar",
    pass: "123",
    isAunthenticated: false,
    wins: 0,
    losses: 0,
  },
  {
    id: "1",
    userName: "Roger",
    pass: "321",
    isAunthenticated: false,
    wins: 0,
    losses: 0,
  },
  {
    id: "2",
    userName: "Alexa",
    pass: "abc",
    isAunthenticated: false,
    wins: 0,
    losses: 0,
  },
  {
    id: "3",
    userName: "Rebecca",
    pass: "def",
    isAunthenticated: false,
    wins: 0,
    losses: 0,
  },
];

mockUsers.forEach((user) => {
  client.hmset(
    user.userName+user.pass,
    [
      "userName",
      user.userName,
      "pass",
      user.pass,
      "wins",
      user.wins.toString(),
      "losses",
      user.losses.toString(),
      "isAunthenticated",
      `${user.isAunthenticated}`,
    ],
    (err, reply) => {
      if (err) {
        console.log(`Writing to redis cache failed with error: ${err}`);
      } else {
        console.log(reply);
      }
    }
  );
});

client.hgetall("Oscar123", (err, reply) => {
  if (err) {
    console.log(`Writing to redis cache failed with error: ${err}`);
  } else {
    console.log(reply);
  }
})

client.hgetall("Roger321", (err, reply) => {
  if (err) {
    console.log(`Writing to redis cache failed with error: ${err}`);
  } else {
    console.log(reply);
  }
})

client.hgetall("sdrtsrt", (err, reply) => {
  if (err) {
    console.log(`Writing to redis cache failed with error: ${err}`);
  } else {
    console.log(reply);
  }
})



client.quit();
