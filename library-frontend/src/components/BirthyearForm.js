import React, { useState } from 'react';

const BirthyearForm = (props) => {
  const [name, setName] = useState('');
  const [birthyear, setBirthyear] = useState('');

  const submit = async (event) => {
    event.preventDefault();
    
    console.log('set birth year');
    // createBook({
    //   variables: { title, author, published: Number(published), genres },
    // });

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