import { Link } from 'react-router-dom';
import styles from './Cityitem.module.css';

const formatDate = (date) =>
new Intl.DateTimeFormat("en", {
   day: "numeric",
   month: "long",
   year: "numeric",
}).format(new Date(date));


export default function cityItem({city}){
    const {cityName, emoji, date} = city;

   return(
    <li>
       <Link 
        className={`${styles.cityItem}`}

        >
            <span className={styles.emoji}>{emoji}</span>
            <h3 className={styles.name}>{cityName}</h3>
            <time className={styles.date}>{formatDate(date)}</time>
            <button className={styles.deleteBtn}>&times;</button>
       </Link>
    </li>
   );
}