import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { login } from './userSlice';
import { clearMessage } from "../../common/messageSlice";
import Button from "../../common/form/Button";
import Input from "../../common/form/Input";

export default function LoginPage() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoggedIn, isLoading } = useSelector((state) => state.user);
  const { message } = useSelector((state) => state.message);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/home");
    }
    dispatch(clearMessage());
  }, [dispatch, isLoggedIn, navigate]);

  function handleLogin() {
    dispatch(login({ username, password }));
  };

  return (
    <main>
      <h1>Login Page</h1>
      {message && (<p id="message" data-cy="error">{message}</p>)}
      {isLoading
        ? (<p>{"...loading"}</p>)
        : <div>
          <Input data-cy="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          <Input data-cy="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <Button data-cy="submit" buttonText={"Login"} onClick={handleLogin} /> <span>or </span><Link to="/create-account" data-cy="sign-up">Sign up</Link>
        </div>}
    </main>
  );
}