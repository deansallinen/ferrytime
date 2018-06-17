const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const app = express();
const { ApolloServer, gql } = require('apollo-server-express');
// const { RESTDataSource } = require('apollo-datasource-rest');
const controller = require('./server/controllers');

// class FerryTrackerAPI extends RESTDataSource {
//   baseURL = 'http://localhost:8080/api';

//   async getRoutes() {
//     return this.get(`/routes/`);
//   }
// }

const typeDefs = gql`
  type Query {
    routes: [Route]
    route(id: ID): Route
    sailing(id: ID): Sailing
    sailings: [Sailing]
  }

  type Route {
    id: ID
    route_name: String
    average_sailing: String
    sailings: [Sailing]
  }

  type Sailing {
    id: ID
    route_id: Int
    scheduled_departure: String
    actual_departure: String
    eta: String
    sailing_status: String
    vessel: String
  }
`;

const baseURL = `http://localhost:8080/api`;
const resolvers = {
  Query: {
    routes: () => {
      // return controller.getAllRoutes();
      return fetch(`${baseURL}/routes/`).then(res => res.json());
    },
    route: (parent, args, context) => {
      const { id } = args;
      return fetch(`${baseURL}/routes/${id}`).then(res => res.json());
    },
    sailings: (parent, args, context) => {
      // const { id } = parent;
      // return fetch(`${baseURL}/routes/${id}/sailings`).then(res => res.json());
      return fetch(`${baseURL}/sailings`).then(res => res.json());
    },
    sailing: (parent, args, context) => {
      const { id } = args;
      return fetch(`${baseURL}/sailings/${id}`).then(res => res.json());
    }
  },
  Route: {
    sailings: parent => {
      const { id } = parent;
      return fetch(`${baseURL}/routes/${id}/sailings`).then(res => res.json());
    }
  }
  // Sailing: {
  //   route: parent => {
  //     const { id } = parent;
  //     return fetch(`${baseURL}/sailings/${id}/route`).then(res => res.json());
  //   }
  // }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
  // dataSources: () => ({ ferryTracker: new FerryTrackerAPI() })
});

server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`🚀  Server ready at http://localhost:4000${server.graphqlPath}`)
);

app.use(bodyParser.json());
// app.use('/graphql', bodyParser.json(), graphqlExpress({ schema: typeDefs }));
// app.get('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

require('./server/routes')(app);
// const logger = require("morgan");

// const path = require("path");
// const fs = require("fs");
// const CronJob = require('cron').CronJob;

// var scraper = require("./server/scraper.js");

// new CronJob(
//   "1 * * * * *",
//   function() {
//     // scraper.scrape();
//     console.log("Message every minute");
//   },
//   null,
//   true,
//   "America/Vancouver"
// );

const PORT = process.env.PORT || 8080;

module.exports = app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}!`);
});
