import { Icon, Header, Button, Form, Dropdown } from "semantic-ui-react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function TestCreatePage() {
  const [unitList, setUnitList] = useState([]);
  const [testLevel, setTestLevel] = useState("easy");
  const [testUnit, setTestUnit] = useState({});

  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  function formOnSubmit() {
    axios
      .post("http://localhost:3000/test", {
        testUnit: testUnit,
        testLevel: testLevel,
        user:user.userId
      })
      .then((res) => {
        console.log("Res", res.data);
        navigate("/test-answers/" + res.data._id);
      })
      .catch((err) => {
        //TODO: Backend validation gerekli.
        toast.error("An error occured.", {
          position: "top-right",
          autoClose: 2000,
        });
      });
  }
  useEffect(() => {
    axios.get("http://localhost:3000/unit").then((res) => {
      setUnitList(res.data);
    });
  }, []);
  return (
    <>
      <Header as="h2" floated="left">
        <Icon name="list" />
        Take a test !
      </Header>
      <Header as="h2" floated="right">
        <Button as={Link} to="/*" color="violet">
            <Icon name="share" />
        </Button>
      </Header>
      <Form style={{ position: "static" }} onSubmit={formOnSubmit}>
        <Form.Field>
          <label> Unit</label>
          <Dropdown
            placeholder="Select Unit for Question"
            search
            selection
            value={testUnit}
            onChange={(e, { value }) => {
              setTestUnit(value);
            }}
            options={unitList.map((unit) => {
              return {
                key: unit._id,
                text: unit.unitName,
                value: unit._id,
              };
            })}
          />
        </Form.Field>
        <Form.Field>
          <label> Test Level</label>
          <Dropdown
            placeholder="Level"
            search
            selection
            value={testLevel}
            onChange={(e, { value }) => {
              setTestLevel(value);
            }}
            options={[
              { key: 1, text: "Easy", value: "easy" },
              { key: 2, text: "Medium", value: "medium" },
              { key: 3, text: "Hard", value: "hard" },
            ]}
          />
        </Form.Field>

        <Button type="submit">Start</Button>
      </Form>
    </>
  );
}
