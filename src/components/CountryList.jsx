import CountryItem from "./CountryItem";
import styles from "./CountryList.module.css";
import Message from "./Message";
import Spinner from "./Spinner";
export default function CountryList({ cities, loading }) {
  if (loading) return <Spinner />;
  if (!cities.length)
    return <Message message="Add your first city by cliking on a city map" />;
  const contries = cities.reduce((arr, city) => {
    if (!arr.map((el) => el.country).includes(city.country))
      return [...arr, { country: city.country, emoji: city.emoji }];
    else return arr;
  }, []);
  return (
    <ul className={styles.countryList}>
      {contries.map((country) => (
        <CountryItem country={country} key={country.country}/>
      ))}
    </ul>
  );
}
