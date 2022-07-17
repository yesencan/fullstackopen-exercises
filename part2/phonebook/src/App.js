import { useState, useEffect } from 'react'
import axios from 'axios'
import Form from './components/Form'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterText, setFilterText] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => setPersons(response.data))
  }, [])
  
  const handleSubmit = event => {
    event.preventDefault()

    if (persons.some(e => e.name === newName)) {
      alert(`${newName} already exists in the phonebook!`)
      return
    }

    setPersons(persons.concat({name: newName, number:newNumber}))
    setNewName('')
    setNewNumber('')
  }

  const handleNameFormChange = event => {
    setNewName(event.target.value)
  }

  const handleNumberFormChange = event => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = event => {
    setFilterText(event.target.value)
  }

  const nameObj = {
    name: "name",
    value: newName,
    handler: handleNameFormChange,
  }

  const numberObj = {
    name: "number",
    value: newNumber,
    handler: handleNumberFormChange,
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <p>filter shown with <input value={filterText} onChange={handleFilterChange} /></p>
      <h2>add a new</h2>
      <Form handleSubmit={handleSubmit} nameObj={nameObj} numberObj={numberObj}/>
      <h2>Numbers</h2>
      <Persons persons={persons} filterBy={filterText}/>
    </div>
  )
}

export default App  