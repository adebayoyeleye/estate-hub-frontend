import Button from "../components/form/Button";
import Input from "../components/form/Input";
import Select from "../components/form/Select";

export default function HomePage(){
    return (
        <div>
          <h1>Home Page</h1>
          <Input name={"Input Field"} type={"text"}/>
          <Select name={"select"} options={["Lagos", "Los Angeles", "New Jack City"]} />
          <Button buttonText={"Click Me"}/>
        </div>
      );
}