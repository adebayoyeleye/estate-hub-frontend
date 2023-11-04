import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { register } from './userSlice';
import { clearMessage } from "../../common/messageSlice";
import Button from "../../common/form/Button";
import Input from "../../common/form/Input";

export default function CreateAccountPage() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoggedIn, isLoading } = useSelector((state) => state.user);
  const { message } = useSelector((state) => state.message);

  useEffect(() => {
    // if (isLoggedIn) {  // Should not be needed
    //   navigate("/home");
    // }
    dispatch(clearMessage());
  }, [dispatch, isLoggedIn, navigate]);

  function handleAccountCreation() {
    setIsSubmitted(true);
    dispatch(register({ username, password }));
    // navigate("/");
  };

  return (
    <main>
      <h1>Create Account Page</h1>
      {message && <p id="message" data-cy="error">{message}</p>}
      {isLoading ? (
        <p>{"...loading"}</p>
      ) : (
        !isSubmitted && (
          <div>
            <Input data-cy="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            <Input data-cy="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <Input data-cy="confirm-password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            <Button data-cy="create-account" buttonText={"Create Account"} onClick={handleAccountCreation} />
            <p>
              <span>Already have an account? </span>
              <Link to="/login" data-cy="login">Login</Link>
            </p>
          </div>
        )
      )}
    </main>
  );
}