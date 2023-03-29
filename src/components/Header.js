import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header>
      {/* Add your header content, such as a navigation menu or a logo */}
      <h1>estate-hub</h1>

      <p>
        Scope: The app will allow users to create and manage real estate properties. Users will be able to create listings, add photos and videos, and manage tenant information. The app will also allow users to collect rent and manage payments.
        Stakeholders: The app will be used by real estate agents, property managers, and tenants.
      </p>

      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/nothing-here">Nothing Here</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}