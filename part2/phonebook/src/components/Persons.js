import Person from './Person';

const Persons = ({ persons, filterBy }) => {
  return persons.filter(person => person.name.toLowerCase().includes(filterBy.toLowerCase())).map(
    person => <Person key={person.name} name={person.name} number={person.number} />);
};

export default Persons