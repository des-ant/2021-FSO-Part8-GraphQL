import { gql } from '@apollo/client';

export const ALL_AUTHORS = gql`
  query getAllAuthors {
    allAuthors {
      name
      born
      id
      bookCount
    }
  }
`;

export const ALL_BOOKS = gql`
  query getAllBooks {
    allBooks {
      title
      published
      id
      author {
        name
        born
        id
        bookCount
      }
      genres
    }
  }
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
      genres
      title
      published
      author {
        name
        born
        bookCount
        id
      }
      id
    }
  }
`;