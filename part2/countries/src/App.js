import axios from 'axios'
import { useState, useEffect } from 'react'
import { Display } from './components/Display'

const App = () => {
  const [countries, setCountries] = useState([])
  const [searchText, setSearchText] = useState('')
  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then((response) => setCountries(response.data))
  }, [])
  
  const handleSearchChange = event => {
    setSearchText(event.target.value)
  }
  return (
    <div>
      <p>find countries <input value={searchText} onChange={handleSearchChange}/></p>
      <Display countries={countries} searchText={searchText} setSearchText={setSearchText}/>
    </div>
  )
}

export default App;
