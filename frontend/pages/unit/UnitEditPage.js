import axios from "axios";
import { useEffect, useState } from "react";
import { Icon, Header, Button, Form, Label } from "semantic-ui-react"; //componentleri burdan alıyor
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function UnitEditPage() {
  let params = useParams(); //unit id yi kullanmak için
  const [unitId, setUnitId] = useState(""); //değişen şeyleri state olarak tanımlıyoruz (control component)
  const [unitName, setUnitName] = useState("");

  const navigate = useNavigate();
  function onSubmitForm() {
    axios
      .put("http://localhost:3000/unit/" + params.id, {
        unitId: unitId,
        unitName: unitName,
      })
      .then((res) => {
        navigate("/units");
        toast.success("Unit updated.", {
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

  useEffect(() => {
    //Ilgili ogrenci bilgilerini serverdan aliyoruz. Buraya sadece ID geliyor.${params.id}
    axios.get(`http://localhost:3000/unit/${params.id}`).then((res) => {
      setUnitId(res.data.unitId);
      setUnitName(res.data.unitName);
    });
  }, []); // en sona boş array koyuyoruz ki tek defa dönsün

  return (
    <>
      <Header as="h2" floated="left">
        <Icon name="box" />
        Edit Unit:
      </Header>
      <Header as="h2" floated="right">
        <Button as={Link} to="/units" color="violet">
          <Icon name="share" />
        </Button>  
      </Header>

      {/* CSS:position:static vermemiz gerekiyor burada react-semantic-ui'da ufak bir hata. */}
      <Form style={{ position: "static" }} onSubmit={onSubmitForm}>
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
