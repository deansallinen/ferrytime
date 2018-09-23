// server.js

const Koa = require('koa');
const { ApolloServer, gql } = require('apollo-server-koa');
const mongoose = require('mongoose');
const { Route, Sailing } = require('./models');
const { USER, PASS } = require('./secrets');

const URI = `mongodb://${USER}:${PASS}@ds064198.mlab.com:64198/ferrytracker`;

mongoose.connect(
  URI,
  { useNewUrlParser: true }
);

// Schema
const typeDefs = gql`
  type Query {
    routes(id: ID): [Route]
    sailings(id: ID): [Sailing]
  }

  type Mutation {
    createSailing(input: SailingInput): Sailing
    createRoute(input: RouteInput): Route
  }

  type Route {
    id: ID
    routeName: String
    averageSailing: String
    sailings: [Sailing]
  }

  input RouteInput {
    routeName: String
    averageSailing: String
  }

  type Sailing {
    id: ID
    routeId: Int
    scheduledDeparture: String
    actualDeparture: String
    eta: String
    sailingStatus: String
    vessel: String
  }

  input SailingInput {
    routeId: Int
    scheduledDeparture: String
    actualDeparture: String
    eta: String
    sailingStatus: String
    vessel: String
  }
`;

// Resolver functions
const resolvers = {
  Query: {
    routes: (parent, args, context) => {
      return Route.find({ _id: args.id });
    },
    sailings: (parent, args, context) => {
      return Sailing.find({ _id: args.id });
    }
  },
  Mutation: {
    createRoute: (parent, args, context) => {
      const route = new Route({
        routeName: args.input.routeName,
        averageSailing: args.input.averageSailing
      });
      return route.save();
    },
    createSailing: (parent, args, context) => {
      return Sailing.save();
    }
  }
};

// To show cursor in graphql playground
const playground = {
  settings: {
    'editor.cursorShape': 'line'
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground
});

const app = new Koa();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`🚀  Server ready at http://localhost:4000${server.graphqlPath}`)
);
