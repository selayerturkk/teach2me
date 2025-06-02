import { Icon, Header, Button, Form } from "semantic-ui-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function StudentCreatePage() {
  const [userId, setUserId] = useState(""); //değişen şeyleri state olarak tanımlıyoruz (controlled component)
  const [email, setEmail] = useState("");
  const [passWord, setPassWord] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const navigate = useNavigate();

  function formOnSubmit() {
    axios
      .post("http://localhost:3000/user", {
        userId: userId,
        email: email,
        passWord: passWord,
        firstName: firstName,
        lastName: lastName,
        role: "student",
      })
      .then((res) => {
        navigate("/students");
        toast.success("User added.", {
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
        <Icon name="user outline" />
        Create New Student
      </Header>
      <Header as="h2" floated="right">
      <Button as={Link} to="/students" color="violet">
          <Icon name="share" />
        </Button> 
      </Header>

      {/* CSS:position:static vermemiz gerekiyor burada react-semantic-ui'da ufak bir hata. */}
      <Form style={{ position: "static" }} onSubmit={formOnSubmit}>
       
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
          <label> First Name</label>
          <input
            placeholder="Student First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Form.Field>
       
        <Form.Field>
          <label> Last Name</label>
          <input
            placeholder="Student Last Name"
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
    </>
  );
}
