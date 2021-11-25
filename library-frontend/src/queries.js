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