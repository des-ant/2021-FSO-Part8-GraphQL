/* eslint-disable quotes, no-console, import/no-extraneous-dependencies,
no-underscore-dangle, consistent-return, function-paren-newline */

const {
  UserInputError,
  AuthenticationError,
} = require("apollo-server");
const jwt = require("jsonwebtoken");
const { PubSub } = require('graphql-subscriptions');

const Book = require("./models/book");
const Author = require("./models/author");
const User = require("./models/user");

const JWT_SECRET = 'NEED_HERE_A_SECRET_KEY';
const pubsub = new PubSub();

module.exports = {
  Query: {
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async () => Book.find({}).populate('author'),
    allAuthors: async () => Author.find({}),
    me: async (root, args, context) => context.currentUser,
    allGenres: async () => {
      const books = await Book.find({});
      const genres = [];
      books.forEach((b) => (
        b.genres.forEach((g) => (
          !genres.includes(g) && genres.push(g)
        ))
      ));
      const sortedGenres = genres.sort();
      return sortedGenres;
    },
    filterBooks: async (root, args) => {
      if (!args.genre) {
        return Book.find({}).populate('author');
      }
      return Book.find({})
        .elemMatch('genres', { $eq: args.genre })
        .populate('author');
    },
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const { currentUser } = context;

      if (!currentUser) {
        throw new AuthenticationError("not authenticated");
      }

      let author;
      // Find matching author by name in database
      author = await Author.findOne({ name: args.author });

      if (!author) {
        author = new Author({ name: args.author, born: null });
        try {
          await author.save();
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          });
        }
      }

      const book = new Book({ ...args, author });

      try {
        await book.save();
        // Update associated book properties in author
        author.books = author.books.concat(book);
        author.bookCount += 1;
        await author.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }

      pubsub.publish('BOOK_ADDED', { bookAdded: book });

      return book;
    },
    editAuthor: async (root, args, context) => {
      const { currentUser } = context;

      if (!currentUser) {
        throw new AuthenticationError("not authenticated");
      }

      const author = await Author.findOne({ name: args.name });
      author.born = args.setBornTo;

      try {
        await author.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }

      return author;
    },
    addAuthor: async (root, args, context) => {
      const { currentUser } = context;

      if (!currentUser) {
        throw new AuthenticationError("not authenticated");
      }

      const author = new Author({ ...args });

      try {
        return author.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
    },
    createUser: async (root, args) => {
      const user = new User({ ...args });

      try {
        return user.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== 'secret') {
        throw new UserInputError("wrong credentials");
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, JWT_SECRET) };
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED']),
    },
  },
};
