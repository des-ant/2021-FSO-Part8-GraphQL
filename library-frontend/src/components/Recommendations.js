import React, { useEffect, useState } from 'react';
import { useQuery, useLazyQuery } from '@apollo/client';
import BookList from './BookList';

import { GET_USER, FILTER_BOOKS } from '../queries';

const Recommendations = ({ show }) => {
  const userResult = useQuery(GET_USER);
  const [user, setUser] = useState(null);
  const [books, setBooks] = useState([]);
  const [filterBooks, filterResult] = useLazyQuery(FILTER_BOOKS);

  useEffect(() => {
    if (userResult.data) {
      setUser(userResult.data.me);
      filterBooks({ variables: { genre: userResult.data.me.favoriteGenre } });
    }
  }, [userResult.data]); // eslint-disable-line

  useEffect(() => {
    if (filterResult.data) {
      setBooks(filterResult.data.filterBooks);
    }
  }, [filterResult.data]);

  if (!show) {
    return null;
  }

  if (userResult.loading || filterResult.loading) {
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