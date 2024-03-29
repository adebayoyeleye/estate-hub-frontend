import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header role="banner">
      {/* Add your header content, such as a navigation menu or a logo */}
      <h1 id="app-title">estate-hub</h1>

      <p id="app-description">
        Scope: The app will allow users to create and manage real estate properties. Users will be able to create listings, add photos and videos, and manage tenant information. The app will also allow users to collect rent and manage payments.
        Stakeholders: The app will be used by real estate agents, property managers, and tenants.
      </p>

      <nav role="navigation" aria-labelledby="main-nav">
        <ul id="main-nav">
          <li>
            <Link to="/" aria-label="Home Page">Home</Link>
          </li>
          <li>
            <Link to="/login" aria-label="Login Page">Login</Link>
          </li>
          <li>
            <Link to="/nothing-here" aria-label="Nothing Here Page">Nothing Here</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}