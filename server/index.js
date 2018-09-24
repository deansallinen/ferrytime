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
    route(id: ID): Route
    allRoutes: [Route]
    allSailings: [Sailing]
  }

  type Mutation {
    createSailing(input: SailingInput): Sailing
    createRoute(input: RouteInput): Route
    updateRoute(input: RouteInput): Route
    updateSailing(input: SailingInput): Sailing
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
    route: Route
    routeId: String
    scheduledDeparture: String
    actualDeparture: String
    eta: String
    sailingStatus: String
    vessel: String
  }

  input SailingInput {
    routeId: String
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
    route: (parent, args, context) => {
      return Route.findOne({ _id: args.id });
    },
    allRoutes: (parent, args, context) => {
      return Route.find({});
    },
    allSailings: (parent, args, context) => {
      return Sailing.find({});
    }
  },
  Mutation: {
    createRoute: (parent, args, context) => {
      const route = new Route({ ...args.input });
      return route.save();
    },
    updateRoute: (parent, args, context) => {
      return Route.findOneAndUpdate(
        { routeName: args.input.routeName }, // condition
        { ...args.input }, // payload
        { upsert: true } // options
      );
    },
    createSailing: (parent, args, context) => {
      const sailing = new Sailing({ ...args.input });
      return sailing.save();
    },
    updateSailing: (parent, args, context) => {
      return Sailing.findOneAndUpdate(
        {
          routeId: args.input.routeId,
          scheduledDeparture: args.input.scheduledDeparture
        }, // condition
        { ...args.input }, // payload
        { upsert: true } // options
      );
    }
  },
  Route: {
    sailings: (parent, args, context) => {
      return Sailing.find({ routeId: parent.id });
    }
  },
  Sailing: {
    route: (parent, args, context) => {
      return Route.findOne({ _id: parent.routeId });
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
