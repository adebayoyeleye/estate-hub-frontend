import { Routes, Route, Outlet, Link } from "react-router-dom";
import HomePage from './pages/HomePage';
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";


import './App.css';

function App() {
  return (
    <div>
    <h1>Basic Example</h1>

    <p>
      This example demonstrates some of the core features of React Router
      including nested <code>&lt;Route&gt;</code>s,{" "}
      <code>&lt;Outlet&gt;</code>s, <code>&lt;Link&gt;</code>s, and using a
      "*" route (aka "splat route") to render a "not found" page when someone
      visits an unrecognized URL.
    </p>

    {/* Routes nest inside one another. Nested route paths build upon
          parent route paths, and nested route elements render inside
          parent route elements. See the note about <Outlet> below. */}
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="dashboard" element={<DashboardPage />} />

        {/* Using path="*"" means "match anything", so this route
              acts like a catch-all for URLs that we don't have explicit
              routes for. */}
        <Route path="*" element={<HomePage />} />
      </Route>
    </Routes>
  </div>
  );
}


function Layout() {
  return (
    <div>
      {/* A "layout route" is a good place to put markup you want to
          share across all the pages on your site, like navigation. */}
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

      <hr />

      {/* An <Outlet> renders whatever child route is currently active,
          so you can think about this <Outlet> as a placeholder for
          the child routes we defined above. */}
      <Outlet />
    </div>
  );
}


export default App;
