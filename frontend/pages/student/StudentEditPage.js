import axios from "axios";
import { useEffect, useState } from "react";
import { Icon, Header, Button, Form, Label } from "semantic-ui-react"; //componentleri burdan alıyor
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function StudentEditPage() {
  let params = useParams(); //user id yi kullanmak için
  const [userId, setUserId] = useState(""); //değişen şeyleri state olarak tanımlıyoruz (control component)
  const [email, setEmail] = useState("");
  const [passWord, setPassWord] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const navigate = useNavigate();

  function onSubmitForm() {
    axios
      .put("http://localhost:3000/user/" + params.id, {
        userId: userId,
        email: email,
        passWord: passWord,
        firstName: firstName,
        lastName: lastName,
        role: "student",
      })
      .then((res) => {
        navigate("/students");
        toast.success("Student updated.", {
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
    axios.get(`http://localhost:3000/user/${params.id}`).then((res) => {
      setUserId(res.data.userId);
      setEmail(res.data.email);
      setFirstName(res.data.firstName);
      setLastName(res.data.lastName);
      setPassWord(res.data.passWord);
    });
  }, []); // en sona boş array koyuyoruz ki tek defa dönsün

  return (
    <>
      <Header as="h2" floated="left">
        <Icon name="user outline" />
        Edit Student:{firstName + " " + lastName}
      </Header>
      <Header as="h2" floated="right">
      <Button as={Link} to="/students" color="violet">
          <Icon name="share" />
        </Button> 
      </Header>

      {/* CSS:position:static vermemiz gerekiyor burada react-semantic-ui'da ufak bir hata. */}
      <Form style={{ position: "static" }} onSubmit={onSubmitForm}>
        <Form.Field>
          <label> Student No</label>
          <input
            placeholder="Student No"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
        </Form.Field>

        <Form.Field>
          <label> Email</label>
          <input
            placeholder="Student Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Field>

        <Form.Field>
          <label>First Name</label>
          <input
            placeholder="Student First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Form.Field>

        <Form.Field>
          <label> Last Name</label>
          <input
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </Form.Field>

        <Form.Field>
          <label> Password</label>
          <input
            placeholder="Student Password"
            value={passWord}
            onChange={(e) => setPassWord(e.target.value)}
          />
        </Form.Field>

        <Button type="submit">Save Student</Button>
      </Form>
      {/* <Button animated onClick={()=>setFirstName("goksel")}> 
                <Button.Content visible>Change Name</Button.Content>
                <Button.Content hidden>
                    <Icon name='arrow right' />
                    </Button.Content>
            </Button> */}
    </>
  );
}
