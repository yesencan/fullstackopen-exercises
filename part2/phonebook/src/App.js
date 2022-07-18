import { useState, useEffect } from 'react'
import axios from 'axios'
import Form from './components/Form'
import numberService from './services/numbers'
import Persons from './components/Persons'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterText, setFilterText] = useState('')

  useEffect(() => {
    numberService
      .getAll()
      .then(response => setPersons(response))
  }, [])
  
  const handleSubmit = event => {
    event.preventDefault()

    if (persons.some(e => e.name === newName)) {
      if(window.confirm(`${newName} is already added to phonebook, replace?`)) {
        const person = persons.find(p => p.name === newName)
        const updatedP = {...person, number:newNumber}

        numberService.update(person.id, updatedP)
                     .then(response => {
                      setPersons(persons.map(person => person.id !== updatedP.id ? person : updatedP))
                    })
      }
      return
    }

    const newEntry = {
      name: newName,
      number: newNumber
    }
    numberService
      .create(newEntry)
      .then(response => setPersons(persons.concat(response)))
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

  const handleDelete = (name, id) => {
    if (window.confirm(`Delete ${name}?`)) {
      numberService.deleteNumber(id)
        .then(() => setPersons(persons.filter(person => person.id !== id)))
    }
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
      <Persons persons={persons} filterBy={filterText} handleDelete={handleDelete} />
    </div>
  )
}

export default App  