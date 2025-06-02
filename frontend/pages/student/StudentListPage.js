import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Icon, Header, Button, Table } from 'semantic-ui-react'
import { toast } from 'react-toastify';


export default function StudentListPage() {

    const [studentList, setStudentList] = useState([])


    function onDeleteStudent(studentId) {
        console.log("Student Primary Key: ", studentId)
        axios.delete("http://localhost:3000/user/" + studentId).then(res => {
            toast.success('User deleted', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            });
            getAllStudent();
        }).catch(err => {
            toast.error('An error occured.', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            });
        })
    }

    function getAllStudent() {
        axios.get('http://localhost:3000/user').then(res => { //backend get'imizi çağrıyor (axios'un bir özelliği)
            setStudentList(res.data)
        })
    }

    useEffect(() => {
        //Daha onceden fetch kullanmastik ama orada iki kez .then.then kullaniyoruz. 
        //JS dunyasinda GET POST PUT... requestleri atmak icin kullanilan bir kutuphane var. 
        // AXIOS -> 
        //npm install axios diyerek, projemize ekledim. Asagida basit bir get requestini gorebilirsiniz.
        getAllStudent()
    }, [])

    return (
        <>
            <Header as='h2' floated='left'>
                <Icon name="user outline" />
                Student List
            </Header>
            <Header as='h2' floated='right'>
                {/* Bu bir button ama ben bunun LINK olarak davranmasini istedigim icin as={Link} ekledim. Bu react-semantic-ui'in guclu bir ozelligi. Su
                Normal HTML yazdigimizda bir link vermek istegimizde nasil <a href="http://google.com">My Link</a> yaziyorsak, yaz
                React router ile <Link to="app.js'de tanimlanan routeslardan biri">My l=Mink</Link> olarak veriyoruz. */}
                <Button as={Link} to="/student-create" color='violet'>Add Student</Button>
                <Button as={Link} to="/admin-home" color="violet">
                    <Icon name="share" />
                </Button> 
            </Header>
            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Student No</Table.HeaderCell>
                        <Table.HeaderCell>First Name</Table.HeaderCell>
                        <Table.HeaderCell>Last Name</Table.HeaderCell>
                        <Table.HeaderCell></Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {studentList.map(student => {
                        return (
                            <Table.Row>
                                <Table.Cell>{student.userId}</Table.Cell>
                                <Table.Cell>{student.firstName}</Table.Cell>
                                <Table.Cell>{student.lastName}</Table.Cell>
                                <Table.Cell textAlign='right' width='1'>
                                    <Button.Group size="mini">
                                        {/* Edit dedigimiz ilgili ogrencisinin id'si ile birlikte daha once tanimladimiz route'a gidiyoruz. */}
                                        <Button as={Link} to={"/student-edit/" + student._id}>Edit</Button>
                                        <Button color="red" onClick={() => onDeleteStudent(student._id)}>Delete</Button>
                                    </Button.Group>
                                </Table.Cell>
                            </Table.Row>
                        )
                    })}
                </Table.Body>


            </Table>
        </>
    )
}