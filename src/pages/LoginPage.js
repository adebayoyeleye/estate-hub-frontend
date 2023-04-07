import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Button from "../components/form/Button";
import Input from "../components/form/Input";

export default function LoginPage({ login }) {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();


  function handleLogin() {
    const response = login(username, password);
    if (response === 'Login Success') {
      navigate("/home");
    }
    else {
      setError(response);
      setUsername("");
      setPassword("");
    }
  }
  return (
    <div>
      <h1>Login Page</h1>
      {error && (<p data-cy="error">{error}</p>)}
      <Input data-cy="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      <Input data-cy="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button data-cy="submit" buttonText={"Login"} onClick={handleLogin} /> <p><span>or </span><Link to="/create-account" data-cy="sign-up">Sign up</Link></p>
    </div>
  );
}