import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { selectUser } from './userSlice'
import Button from "../../common/form/Button";
import Input from "../../common/form/Input";

export default function LoginPage({ login }) {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  async function handleLogin() {
    await dispatch(login(username, password));
    setPassword("************************");
  }
  useEffect(() => {
    if (user.message === 'Login Success') {
      navigate("/home");
    }
  });

  return (
    <div>
      <h1>Login Page</h1>
      {user.message && (<p data-cy="error">{user.message}</p>)}
      <Input data-cy="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      <Input data-cy="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <Button data-cy="submit" buttonText={"Login"} onClick={handleLogin} /> <span>or </span><Link to="/create-account" data-cy="sign-up">Sign up</Link>
    </div>
  );
}