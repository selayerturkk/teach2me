import React, { useState } from "react";
import { Button, Form, Grid, Header } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; //backend'e ulaşmak için kullanılan bir library

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [passWord, setPassWord] = useState("");
  const navigate = useNavigate();

  function onSubmitForm() {
    //submit butonuna basınca
    axios
      .post("http://localhost:3000/login", {
        //backend'e git
        email: email,
        passWord: passWord,
      })
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("user", JSON.stringify(res.data));
        navigate("/admin-homepage");
        window.location.reload();
      })  
      .catch((err) => {
        alert("Enter a vaild email or password.");
      });
  }

  return (
    // Basit bir form, burada GRID GRID.COLUMN react semantic ui tarafindan verilen layout componentleri. Islerimizi kolaylastiriyor.
    //Ayni sekilde <Header/> https://react.semantic-ui.com/ adresinde butun componentler var. Buradan bakarak kullabiliyoruz.
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="violet" textAlign="center">
          Welcome to Teach2Me
        </Header>
        <Form size="large" onSubmit={onSubmitForm}>
          <Form.Input
            icon="user"
            iconPosition="left"
            placeholder="E-mail address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Input
            icon="lock"
            iconPosition="left"
            placeholder="Password"
            type="password"
            value={passWord}
            onChange={(e) => setPassWord(e.target.value)}
          />
          <Button color="violet" fluid size="large" type="submit">
            Login
          </Button>
        </Form>
      </Grid.Column>
    </Grid>
  );
};

export default LoginPage;
