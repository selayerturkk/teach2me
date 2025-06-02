import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Icon, Header, Button, Table } from "semantic-ui-react";
import { toast } from "react-toastify";
import moment from "moment";

export default function AllTestList() {
  const [testList, setTestList] = useState([]);

  function getAllTestList() {
    axios.get("http://localhost:3000/tests").then((res) => {
      //backend get'imizi çağrıyor (axios'un bir özelliği)
      setTestList(res.data);
    });
  }

  useEffect(() => {
    //Daha onceden fetch kullanmastik ama orada iki kez .then.then kullaniyoruz.
    //JS dunyasinda GET POST PUT... requestleri atmak icin kullanilan bir kutuphane var.
    // AXIOS ->
    //npm install axios diyerek, projemize ekledim. Asagida basit bir get requestini gorebilirsiniz.
    getAllTestList();
  }, []);

  return (
    <>
      <Header as="h2" floated="left">
        <Icon name="list" />
        Test List
      </Header>
      <Header as="h2" floated="right">
        {/* Bu bir button ama ben bunun LINK olarak davranmasini istedigim icin as={Link} ekledim. Bu react-semantic-ui'in guclu bir ozelligi. Su
                Normal HTML yazdigimizda bir link vermek istegimizde nasil <a href="http://google.com">My Link</a> yaziyorsak, yaz
                React router ile <Link to="app.js'de tanimlanan routeslardan biri">My l=Mink</Link> olarak veriyoruz. */}
          <Button as={Link} to="/admin-home" color="violet">
            <Icon name="share" />
          </Button>
      </Header>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Test No</Table.HeaderCell>
            <Table.HeaderCell>Student</Table.HeaderCell>
            <Table.HeaderCell>Unit</Table.HeaderCell>
            <Table.HeaderCell>Level</Table.HeaderCell>
            <Table.HeaderCell>Start Date</Table.HeaderCell>
            <Table.HeaderCell>End Date</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {testList.map((test) => {
            return (
              <Table.Row>
                <Table.Cell>{test._id}</Table.Cell>
                <Table.Cell>{test.user.firstName + " " + test.user.lastName}</Table.Cell>
                <Table.Cell>{test.testUnit.unitName }</Table.Cell>
                <Table.Cell>{test.testLevel}</Table.Cell>

                <Table.Cell>
                  {moment(test.startDate).format("MMMM Do YYYY, h:mm:ss a")}
                </Table.Cell>
                <Table.Cell>
                  {test.endDate &&
                    moment(test.endDate).format("MMMM Do YYYY, h:mm:ss a")}
                </Table.Cell>
                <Table.Cell>{test.testStatus}</Table.Cell>
                <Table.Cell textAlign="right" width="1">
                  <Button.Group size="mini">
                    {/* Edit dedigimiz ilgili ogrencisinin id'si ile birlikte daha once tanimladimiz route'a gidiyoruz. */}
                    {test.testStatus === "ongoing" ? (
                      <Button as={Link} to={"/test-answers/" + test._id}>
                        Continue
                      </Button>
                    ) : (
                      <Button as={Link} to={"/test-result/" + test._id}>
                        Results
                      </Button>
                    )}
                  </Button.Group>
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </>
  );
}
