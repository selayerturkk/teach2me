import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Icon, Header, Button, Table } from "semantic-ui-react";
import { toast } from "react-toastify";

export default function UnitListPage() {
  const [unitList, setUnitList] = useState([]);

  function onDeleteUnit(unitId) {
    alert("Unit cannot be deleted until softdelete is implemented.");
    //     axios
    //       .delete("http://localhost:3000/unit/" + unitId)
    //       .then((res) => {
    //         getAllUnits();

    //         toast.success("Unit deleted", {
    //           position: "top-right",
    //           autoClose: 2000,
    //         });
    //         // getAllUnit();
    //       })
    //       .catch((err) => {
    //         toast.error("An error occured.", {
    //           position: "top-right",
    //           autoClose: 2000,
    //         });
    //       });
  }


  const getAllUnits = () => {
    axios.get("http://localhost:3000/unit").then((res) => {
      setUnitList(res.data);
    });
  };

  useEffect(() => {
    getAllUnits();
  }, []);

  return (
    <>
      <Header as="h2" floated="left">
        <Icon name="box" />
        Unit List
      </Header>

      <Header as="h2" floated="right">
        {/* Bu bir button ama ben bunun LINK olarak davranmasini istedigim icin as={Link} ekledim. Bu react-semantic-ui'in guclu bir ozelligi. Su
                Normal HTML yazdigimizda bir link vermek istegimizde nasil <a href="http://google.com">My Link</a> yaziyorsak, yaz
                React router ile <Link to="app.js'de tanimlanan routeslardan biri">My l=Mink</Link> olarak veriyoruz. */}
        <Button as={Link} to="/unit-create" color="violet">
          Add Unit
        </Button>

        <Button as={Link} to="/admin-home" color="violet">
        <Icon name="share" />
        </Button>

      </Header>



      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Unit No</Table.HeaderCell>
            <Table.HeaderCell>Unit Name</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {unitList.map((unit) => {
            return (
              <Table.Row>
                <Table.Cell>{unit.unitId}</Table.Cell>
                <Table.Cell>{unit.unitName}</Table.Cell>
                <Table.Cell textAlign="right" width="1">
                  <Button.Group size="mini">
                    {/* Edit dedigimiz ilgili ogrencisinin id'si ile birlikte daha once tanimladimiz route'a gidiyoruz. */}
                    <Button as={Link} to={"/unit-edit/" + unit._id}>
                      Edit
                    </Button>
                    <Button color="red" onClick={() => onDeleteUnit(unit._id)}>
                      Delete
                    </Button>
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
