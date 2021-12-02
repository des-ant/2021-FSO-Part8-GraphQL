import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';

import { GET_USER } from '../queries';

const Recommendations = ({ show, books }) => {
  const userResult = useQuery(GET_USER);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (userResult.data) {
      setUser(userResult.data.me);
    }
  }, [userResult]); // eslint-disable-line

  if (!show) {
    return null;
  }

  if (userResult.loading) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favorite genre <b>{user.favoriteGenre}</b></p>
    </div>
  );
};

export default Recommendations;