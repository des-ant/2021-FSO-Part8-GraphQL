import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import BookList from './BookList';

import { ALL_BOOKS, ALL_GENRES } from '../queries';

const Books = (props) => {
  const bookResult = useQuery(ALL_BOOKS);
  const genreResult = useQuery(ALL_GENRES);
  const [books, setBooks] = useState([]);
  const [genres, setGenres] = useState([]);
  const [filter, setFilter] = useState(null);

  useEffect(() => {
    if (bookResult.data) {
      setBooks(bookResult.data.allBooks);
    }
  }, [bookResult.data]); // eslint-disable-line

  useEffect(() => {
    if (genreResult.data) {
      setGenres(genreResult.data.allGenres);
    }
  }, [genreResult.data]); // eslint-disable-line
  
  if (!props.show) {
    return null;
  }

  if (bookResult.loading || genreResult.loading) {
    return <div>loading...</div>;
  }

  const filterGenre = (event) => {
    event.preventDefault();
    setFilter(event.target.value);
  };

  const resetFilter = (event) => {
    event.preventDefault();
    setFilter(null);
  };

  const booksToShow = (filter !== null)
    ? books.filter(b => b.genres.includes(filter))
    : books;

  return (
    <div>
      <h2>books</h2>
      {filter && <p>in genre <b>{filter}</b></p>}
      
      <BookList books={booksToShow} />

      <div>
        {genres.map(g =>
          <button
            key={g}
            value={g}
            onClick={filterGenre}
          >
            {g}
          </button>
        )}
        <button onClick={resetFilter}>all genres</button>
      </div>
    </div>
  );
};

export default Books;