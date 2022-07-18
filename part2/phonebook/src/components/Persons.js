import Person from './Person';

const Persons = ({ persons, filterBy, handleDelete }) => {
  const filtered = persons.filter(person => person.name.toLowerCase().includes(filterBy.toLowerCase()))
  return filtered.map(
    person => <Person 
                key={person.name} 
                name={person.name} 
                number={person.number} 
                handleDelete={()=>handleDelete(person.name,person.id)} />);
};

export default Persons