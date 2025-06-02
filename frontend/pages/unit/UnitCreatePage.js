import { Icon, Header, Button, Form } from "semantic-ui-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function UnitCreatePage() {
  const [unitId, setUnitId] = useState(""); //değişen şeyleri state olarak tanımlıyoruz (controlled component)
  const [unitName, setUnitName] = useState("");
  const navigate = useNavigate();

  function formOnSubmit() {
    axios
      .post("http://localhost:3000/unit", {
        unitId: unitId,
        unitName: unitName,
      })
      .then((res) => {
        navigate("/units");
        toast.success("Unit added.", {
          position: "top-right",
          autoClose: 2000,
        });
      })
      .catch((err) => {
        //TODO: Backend validation gerekli.
        toast.error("An error occured.", {
          position: "top-right",
          autoClose: 2000,
        });
      });
  }

  return (
    <>
      <Header as="h2" floated="left">
        <Icon name="box" />
        Create New Unit
      </Header>

      <Header as="h2" floated="right">
        <Button as={Link} to="/units" color="violet">
        <Icon name="share" />
        </Button>        
      </Header>

      {/* CSS:position:static vermemiz gerekiyor burada react-semantic-ui'da ufak bir hata. */}
      <Form style={{ position: "static" }} onSubmit={formOnSubmit}>
        <Form.Field>
          <label> Unit No</label>
          <input
            placeholder="Unit No"
            value={unitId}
            onChange={(e) => setUnitId(e.target.value)}
          />
        </Form.Field>

        <Form.Field>
          <label> Unit Name</label>
          <input
            placeholder="Unit Name"
            value={unitName}
            onChange={(e) => setUnitName(e.target.value)}
          />
        </Form.Field>

        <Button type="submit">Save Unit</Button>
      </Form>
    </>
  );
}
