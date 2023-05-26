import Button from "../../common/form/Button";
import Input from "../../common/form/Input";
import Select from "../../common/form/Select";

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