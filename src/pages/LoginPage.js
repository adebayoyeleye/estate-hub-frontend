import Input from "../components/form/Input";

export default function LoginPage(){
    return (
        <div>
          <h1>Login Page</h1>
          <Input data-cy="password" type="password" />
        </div>
      );
}