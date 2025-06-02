import React from 'react'
import { Button, Form, Grid, Header, Input, Icon } from 'semantic-ui-react'
import { Link, useNavigate } from "react-router-dom";

const StudentHomePage = () => {

  const navigate = useNavigate();

  function onLogout() {
    localStorage.setItem("user", null);
    navigate("/");
    window.location.reload();
  }


  return (

  // Basit bir form, burada GRID GRID.COLUMN react semantic ui tarafindan verilen layout componentleri. Islerimizi kolaylastiriyor. 
  //Ayni sekilde <Header/> https://react.semantic-ui.com/ adresinde butun componentler var. Buradan bakarak kullabiliyoruz.
  <>


  <Grid textAlign='center' style={{ height: '10vh' }} verticalAlign='right'>
  <Grid.Row>
    <Grid.Column >
      <Button.Group vertical size='massive'style={{margin:20}}  >
          <Button icon onClick={onLogout}>
            <Icon name='shutdown' />
          </Button>
      </Button.Group>
    </Grid.Column>
    </Grid.Row>
    </Grid>
  
  <Grid textAlign='center' style={{ height: '50vh' }} verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 1000 }}>
    <Button.Group vertical size='massive'style={{margin:20}}  >
        <Button style={{margin:20}} color='violet' fluid size='large' as={Link} to="/test-create">Take a test</Button>
        <Button  style={{margin:20}} color='violet' fluid size='large' as={Link} to="/my-test-list"> See the test results </Button>
     </Button.Group>
    </Grid.Column>
  </Grid>

  </>
);
};
export default StudentHomePage