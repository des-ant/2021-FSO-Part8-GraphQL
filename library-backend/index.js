/* eslint-disable quotes, no-console, import/no-extraneous-dependencies,
no-underscore-dangle, consistent-return, function-paren-newline */

const { ApolloServer } = require("apollo-server");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const typeDefs = require("./schema");
const resolvers = require("./resolvers");
const User = require("./models/user");
const { MONGODB_URI } = require("./utils/config");

const JWT_SECRET = 'NEED_HERE_A_SECRET_KEY';

console.log("connecting to", MONGODB_URI);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message);
  });

mongoose.set('debug', true);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET,
      );
      const currentUser = await User.findById(decodedToken.id);
      return { currentUser };
    }
  },
});

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`);
  console.log(`Subscriptions ready at ${subscriptionsUrl}`);
});
