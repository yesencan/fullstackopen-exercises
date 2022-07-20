import { useState, useEffect } from 'react'
import Form from './components/Form'
import numberService from './services/numbers'
import Persons from './components/Persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterText, setFilterText] = useState('')
  const [notiText, setNotiText] = useState(null)
  const [notiClass, setNotiClass] = useState('success')
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
                    }).catch(error => {
                      setNotiClass('error')
                      setNotiText(error.response.data.error)
                      setTimeout(()=>setNotiText(null), 5000)
                    })
        setNotiClass('success')
        setNotiText(`Number for ${newName} succesfully changed`)
        setTimeout(()=>setNotiText(null), 5000)
        setNewName("")
        setNewNumber("")
      }
      return
    }

    const newEntry = {
      name: newName,
      number: newNumber
    }
    numberService
      .create(newEntry)
      .then(response => {
        setNotiClass('success')
        setNotiText(`Added ${newName}`)
        setTimeout(()=>setNotiText(null), 5000)
        setNewName("")
        setNewNumber("")
        return setPersons(persons.concat(response))
      })
      .catch(error => {
        setNotiClass('error')
        setNotiText(error.response.data.error)
        setTimeout(()=>setNotiText(null), 5000)
      })
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
      setNotiText(`Deleted ${name}`)
      setTimeout(() => {setNotiText(null)}, 5000)
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
      <h1>Phonebook</h1>
      <Notification className={notiClass} message={notiText}/>
      <p>filter shown with <input value={filterText} onChange={handleFilterChange} /></p>
      <h2>add a new</h2>
      <Form handleSubmit={handleSubmit} nameObj={nameObj} numberObj={numberObj}/>
      <h2>Numbers</h2>
      <Persons persons={persons} filterBy={filterText} handleDelete={handleDelete} />
    </div>
  )
}

export default App  