import React, { useState } from 'react'
import { useMutation } from '@apollo/client'

import { ALL_PERSONS, CREATE_PERSON } from '../queries'

const PersonForm = ({ setError }) => {
  const [name, setName] = useState('asd'+Math.random())
  const [phone, setPhone] = useState('dd')
  const [street, setStreet] = useState('d')
  const [city, setCity] = useState('asfas')

  const [ createPerson ] = useMutation(CREATE_PERSON, {
    refetchQueries: [  {query: ALL_PERSONS} ],
    onError: (error) => {
      setError(error.graphQLErrors[0].message)
    }
  })

  const submit = async (event) => {
    event.preventDefault()

    createPerson({
      variables: { name, phone, street, city },
      
    })

    setName('')
    setPhone('')
    setStreet('')
    setCity('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={submit}>
        <div>
          name <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          phone <input
            value={phone}
            onChange={({ target }) => setPhone(target.value)}
          />
        </div>
        <div>
          street <input
            value={street}
            onChange={({ target }) => setStreet(target.value)}
          />
        </div>
        <div>
          city <input
            value={city}
            onChange={({ target }) => setCity(target.value)}
          />
        </div>
        <button type='submit'>add!</button>
      </form>
    </div>
  )
}

export default PersonForm