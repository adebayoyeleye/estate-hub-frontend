import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Button from "../../common/form/Button";
import Input from "../../common/form/Input";

export default function CreateAccountPage({ createAccount }) {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();


  function handleAccountCreation() {
    const response = createAccount(username, password);
    if (response === 'Account Creation Success') {
      navigate("/home");
    }
    else {
      setError(response);
      setUsername("");
      setPassword("");
      setConfirmPassword("");
    }
  }
  return (
    <div>
      <h1>Register Page</h1>
      {error && (<p data-cy="error">{error}</p>)}
      <Input data-cy="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      <Input data-cy="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Input data-cy="confirm-password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
      <Button data-cy="create-account" buttonText={"Create Account"} onClick={handleAccountCreation} /> <p><span>Already have an account? </span><Link to="/login" data-cy="login">Login</Link></p>
    </div>
  );
}