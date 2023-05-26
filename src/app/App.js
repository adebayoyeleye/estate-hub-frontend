import { Routes, Route, Outlet } from "react-router-dom";
import HomePage from '../features/auth/HomePage';
import CreateAccountPage from "../features/auth/CreateAccountPage";
import LoginPage from "../features/auth/LoginPage";
import Header from "./Header";
import Footer from "./Footer";
import { createAccount } from "../services/auth";


import './App.css';
import { loginAsync } from "../features/auth/userSlice";

function App() {
  return (
    <div>
      {/* Routes nest inside one another. Nested route paths build upon
          parent route paths, and nested route elements render inside
          parent route elements. See the note about <Outlet> below. */}
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LoginPage login={loginAsync} />} />
          <Route path="create-account" element={<CreateAccountPage createAccount={createAccount} />} />
          <Route path="login" element={<LoginPage login={loginAsync} />} />
          <Route path="home" element={<HomePage />} />

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
      <Header />

      <hr />

      {/* An <Outlet> renders whatever child route is currently active,
          so you can think about this <Outlet> as a placeholder for
          the child routes we defined above. */}
      <Outlet />
      <Footer />
    </div>
  );
}


export default App;
