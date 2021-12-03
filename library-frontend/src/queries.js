import { gql } from '@apollo/client';

const AUTHOR_DETAILS = gql`
  fragment AuthorDetails on Author {
    name
    born
    id
    bookCount
  }
`;

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    title
    published
    id
    author {
      ...AuthorDetails
    }
    genres
  }
  ${AUTHOR_DETAILS}
`;

export const ALL_AUTHORS = gql`
  query getAllAuthors {
    allAuthors {
      ...AuthorDetails
    }
  }
  ${AUTHOR_DETAILS}
`;

export const ALL_BOOKS = gql`
  query getAllBooks {
    allBooks {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`;

export const CREATE_BOOK = gql`
  mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
    addBook(
      title: $title,
      author: $author,
      published: $published,
      genres: $genres
    ) {
      title
      author {
        name
        born
        id
        bookCount
      }
      id
      published
      genres
    }
  }
`;

export const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $setBornTo: Int) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
      id
    }
  }
`;

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`;

export const ALL_GENRES = gql`
  query getAllGenres {
    allGenres
  }
`;

export const GET_USER = gql`
  query getUser {
    me {
      username,
      favoriteGenre,
      id,
    }
  }
`;

export const FILTER_BOOKS = gql`
  query filterBooksByGenre($genre: String) {
    filterBooks(genre: $genre) {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`;