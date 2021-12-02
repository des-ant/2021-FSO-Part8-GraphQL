import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import BookList from './BookList';

import { GET_USER, ALL_BOOKS } from '../queries';

const Recommendations = ({ show }) => {
  const userResult = useQuery(GET_USER);
  const bookResult = useQuery(ALL_BOOKS);
  const [user, setUser] = useState(null);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    if (userResult.data) {
      setUser(userResult.data.me);
    }
  }, [userResult]); // eslint-disable-line

  useEffect(() => {
    if (bookResult.data) {
      setBooks(bookResult.data.allBooks);
    }
  }, [bookResult]); // eslint-disable-line

  if (!show) {
    return null;
  }

  if (userResult.loading || bookResult.loading) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favorite genre <b>{user.favoriteGenre}</b></p>
      <BookList books={books.filter(b => b.genres.includes(user.favoriteGenre))} />
    </div>
  );
};

export default Recommendations;