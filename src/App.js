import { Routes, Route, Outlet } from "react-router-dom";
import HomePage from './pages/HomePage';
import CreateAccountPage from "./pages/CreateAccountPage";
import LoginPage from "./pages/LoginPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { createAccount, login } from "./services/auth";


import './App.css';

function App() {
  return (
    <div>
      {/* Routes nest inside one another. Nested route paths build upon
          parent route paths, and nested route elements render inside
          parent route elements. See the note about <Outlet> below. */}
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LoginPage login={login} />} />
          <Route path="create-account" element={<CreateAccountPage createAccount={createAccount} />} />
          <Route path="login" element={<LoginPage login={login} />} />
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
