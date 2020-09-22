import React, { useState, useEffect } from 'react'
import gql from 'graphql-tag'
import { useQuery, useMutation } from '@apollo/react-hooks'
import PetsList from '../components/PetsList'
import NewPetModal from '../components/NewPetModal'
import Loader from '../components/Loader'

const ALL_PETS = gql`
  query myQuery {
    pets {
      id
      name
      type
      img
    }
  }
`

export default function Pets() {
  const [modal, setModal] = useState(false)
  const { data, loading, error } = useQuery(ALL_PETS)

  useEffect(() => {
    console.log('hello from Pets')
  }, [modal])

  const onSubmit = (input) => {
    // work here
    setModal(false)
  }

  if (loading) {
    return <Loader />
  }

  if (error) {
    return <p>Error</p>
  }

  // conditional react render
  if (modal) {
    return <NewPetModal onSubmit={onSubmit} onCancel={() => setModal(false)} />
  }

  return (
    <div className='page pets-page'>
      <section>
        <div className='row between-xs middle-xs'>
          <div className='col-xs-10'>
            <h1>Pets</h1>
          </div>

          <div className='col-xs-2'>
            <button onClick={() => setModal(true)}>new pet</button>
          </div>
        </div>
      </section>
      <section>
        <PetsList pets={data.pets} />
      </section>
    </div>
  )
}
