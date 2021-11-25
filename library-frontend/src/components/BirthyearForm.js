import React, { useState } from 'react';
import { useMutation } from '@apollo/client';

import { EDIT_AUTHOR } from '../queries';

const BirthyearForm = (props) => {
  const [name, setName] = useState('');
  const [birthyear, setBirthyear] = useState('');

  const [ changeBirthyear ] = useMutation(EDIT_AUTHOR);

  const submit = async (event) => {
    event.preventDefault();
    
    changeBirthyear({ variables: { name, setBornTo: Number(birthyear) } });

    setName('');
    setBirthyear('');
  };

  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          name
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          born
          <input
            value={birthyear}
            onChange={({ target }) => setBirthyear(target.value)}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  );
};

export default BirthyearForm;