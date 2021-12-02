import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';

import { ALL_BOOKS, ALL_GENRES } from '../queries';

const Books = (props) => {
  const bookResult = useQuery(ALL_BOOKS);
  const genreResult = useQuery(ALL_GENRES);
  const [books, setBooks] = useState([]);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    if (bookResult.data) {
      setBooks(bookResult.data.allBooks);
    }
  }, [bookResult]); // eslint-disable-line

  useEffect(() => {
    if (genreResult.data) {
      setGenres(genreResult.data.allGenres);
    }
  }, [genreResult]); // eslint-disable-line

  if (!props.show) {
    return null;
  }

  if (bookResult.loading || genreResult.loading) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(b =>
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <div>
        {genres.map(g =>
          <button key={g}>{g}</button>
        )}
        <button>all genres</button>
      </div>
    </div>
  );
};

export default Books;