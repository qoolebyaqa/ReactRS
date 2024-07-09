import { NavLink } from "react-router-dom";

function HeaderNavigation() {
  return ( <header>
      <nav>
        <ul style={{display: "flex", justifyContent: "center", gap: "50px"}}>
          <li><NavLink to='/ReactRS'>Go to Main</NavLink></li>
          <li><NavLink to='/ReactRS/greeting'>Go to greeting</NavLink></li>
        </ul>
      </nav>
    </header> );
}

export default HeaderNavigation;