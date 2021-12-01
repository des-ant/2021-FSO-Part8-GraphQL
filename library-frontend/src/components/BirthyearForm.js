import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import Select from 'react-select';

import { EDIT_AUTHOR } from '../queries';
import { ALL_AUTHORS } from '../queries';

const BirthyearForm = (props) => {
  const [birthyear, setBirthyear] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);

  const [ changeBirthyear ] = useMutation(EDIT_AUTHOR);
  const result = useQuery(ALL_AUTHORS);

  if (result.loading) {
    return <div>loading birth year form...</div>;
  }

  const authors = result.data.allAuthors;

  const options = authors.map(a => ({ value: a.name, label: a.name }));

  const submit = async (event) => {
    event.preventDefault();

    changeBirthyear({
      variables: {
        name: selectedOption.value,
        setBornTo: birthyear.length > 0 ? Number(birthyear) : null
      }
    });

    setSelectedOption(null);
    setBirthyear('');
  };

  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <Select
          value={selectedOption}
          onChange={setSelectedOption}
          options={options}
        />
        <div>
          born
          <input
            value={birthyear}
            onChange={({ target }) => setBirthyear(target.value)}
          />
        </div>
        <button type='submit' disabled={selectedOption === null}>update author</button>
      </form>
    </div>
  );
};

export default BirthyearForm;