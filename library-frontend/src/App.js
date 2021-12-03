
import React, { useState } from 'react';
import {
  useSubscription, useApolloClient
} from '@apollo/client';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import LoginForm from './components/LoginForm';
import Recommendations from './components/Recommendations';
import { BOOK_ADDED } from './queries';

const Notify = ({errorMessage}) => {
  if ( !errorMessage ) {
    return null;
  }
  return (
    <div style={{color: 'red'}}>
    {errorMessage}
    </div>
  );
};

const App = () => {
  const [page, setPage] = useState('authors');
  const [token, setToken] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const client = useApolloClient();

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      console.log(subscriptionData);
    }
  });

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
    setPage('login');
  };

  if (!token) {
    return (
      <div>
        <div>
          <button onClick={() => setPage('authors')}>authors</button>
          <button onClick={() => setPage('books')}>books</button>
          <button onClick={() => setPage('login')}>login</button>
        </div>

        <Notify errorMessage={errorMessage} />

        <Authors
          show={page === 'authors'}
          isLoggedIn={false}
        />

        <Books
          show={page === 'books'}
        />

        <LoginForm
          show={page === 'login'}
          setToken={setToken}
          setError={notify}
          setPage={setPage}
        />
      </div>
    );
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('recommend')} >recommend</button>
        <button onClick={logout}>logout</button>
      </div>

      <Notify errorMessage={errorMessage} />

      <Authors
        show={page === 'authors'}
        isLoggedIn={true}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
        setError={notify}
      />

      <Recommendations
        show={page === 'recommend'}
      />

    </div>
  );
};

export default App;