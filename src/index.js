const { ApolloServer, PubSub } = require('apollo-server-express');
const express = require('express'); //express를 불러오자
const db = require('./models');
const app = express(); //express를 쓰자
const http = require('http');
const port = 4000;
const subscription_endpoint =
  process.env.SUBSCRIPTION_ENDPOINT || '/subscriptions';

const schema = require('./graphql/schema');
// console.log(schema);

const pubsub = new PubSub();
pubsub.ee.setMaxListeners(99);

const server = new ApolloServer({
  schema,
  subscriptions: {
    path: subscription_endpoint,
  },
  context: ({ req, connection }) => {
    return {
      req,
      pubsub: pubsub,
    };
  },
});

server.applyMiddleware({ app });

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);
httpServer.timeout = 5000;

db.sequelize.sync().then(() => {
  httpServer.listen(port, () => {
    console.log(`server is running at http://localhost:${port}`);
    // console.log(`Subscription server running on ws://localhost:${port}`);
  });
});
