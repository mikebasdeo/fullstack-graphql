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

const ADD_PET = gql`
  mutation CreatePet($newPet: NewPetInput!) {
    addPet(input: $newPet) {
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
  const [addPet, newPet] = useMutation(ADD_PET, {
    update(cache, { data: { addPet } }) {
      const data = cache.readQuery({ query: ALL_PETS })

      cache.writeQuery({
        query: ALL_PETS,
        data: { pets: [addPet, ...data.pets] },
      })
    },
  })

  useEffect(() => {
    console.log('hello from Pets')
  }, [modal])

  const onSubmit = (input) => {
    console.log(`input${JSON.stringify(input, null, 2)}`)
    // const { name, type } = input
    // work here
    setModal(false)
    addPet({
      variables: { newPet: input },
      optimisticResponse: {
        __typename: 'Mutation',
        addPet: {
          __typename: 'Pet',
          id: Math.floor(Math.random() * 1000) + '',
          name: input.name,
          type: input.type,
          img: 'https://via.placeholder.com/300',
        },
      },
    })
  }

  if (loading) {
    return <Loader />
  }

  if (error || newPet.error) {
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
