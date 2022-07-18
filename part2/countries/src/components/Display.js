import { CountryLine } from './CountryLine';
import { CountryDisplay } from "./CountryDisplay";

export const Display = ({ countries, searchText, setSearchText }) => {
  const filtered = countries.filter(country => country.name.common
    .toLowerCase()
    .includes(searchText.toLowerCase()));
  if (filtered.length > 10) {
    return <div>too many matches</div>;
  }
  else if (filtered.length > 1) {
    return (
      filtered.map(country => <CountryLine country={country} setSearchText={setSearchText} key={country.cca2} />)
    );
  }
  else if (filtered.length === 1) {
    return <CountryDisplay country={filtered[0]} />;
  }
};
