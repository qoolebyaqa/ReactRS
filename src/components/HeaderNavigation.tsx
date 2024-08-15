import { NavLink } from "react-router-dom";
import { paths } from "../helpers";

function HeaderNavigation() {
  return ( <header>
    <nav style={{display: "flex", justifyContent: 'center'}}>
      <ul style={{display: "flex", gap: "20px"}}>
        {paths.map(link => {
          return (
            <li key={link.id}>
              <NavLink to={link.path} className="list-none">{link.description}</NavLink>
            </li>
          )
        })}
      </ul>
    </nav>
  </header> );
}

export default HeaderNavigation;