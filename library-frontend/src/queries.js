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
      author
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
      author
      id
      published
      genres
    }
  }
`;