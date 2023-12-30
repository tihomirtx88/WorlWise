import { NavLink } from "react-router-dom";
import styles from './PageNav.module.css';

export default function PageNav(){
    return(
        <nav className={styles.nav}>
            <ul>         
                <li>
                    <NavLink to="'/product">Product</NavLink>
                </li>
                <li>
                    <NavLink to="/pracing">Pricing</NavLink>
                </li>
                <li>
                    <NavLink className={styles.ctaLink} to="/login">Login</NavLink>
                </li>
            </ul>
        </nav>
    );
}