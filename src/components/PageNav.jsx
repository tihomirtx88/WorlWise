import { NavLink } from "react-router-dom";
import styles from './PageNav.module.css';

export default function PageNav(){
    return(
        <nav style={styles}>
            <ul>
                <li>
                    <NavLink to="/">Home</NavLink>
                </li>
                <li>
                    <NavLink to="'/product">Product</NavLink>
                </li>
                <li>
                    <NavLink to="/pracing">Pricing</NavLink>
                </li>
            </ul>
        </nav>
    );
}