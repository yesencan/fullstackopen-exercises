export const CountryLine = ({ country, setSearchText }) => {
  const buttonHandler = () => setSearchText(country.name.common);
  return <div>{country.name.common} <button onClick={buttonHandler}>show</button></div>;
};


