import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Icon, Header, Button, Table } from 'semantic-ui-react'
import { toast } from 'react-toastify';


export default function QuestionListPage() {

    const [questionList, setQuestionList] = useState([])


    function onDeleteQuestion(questionId) {
        axios.delete("http://localhost:3000/question/" + questionId).then(res => {
            toast.success('Question deleted', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            });
            getAllQuestion()
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

    function getAllQuestion() {
        axios.get('http://localhost:3000/question').then(res => { //backend get'imizi çağrıyor (axios'un bir özelliği)
            setQuestionList(res.data)
        })
    }

    useEffect(() => {
        axios.get('http://localhost:3000/question').then(res => {
            setQuestionList(res.data)
        })
    }, [])


    return (
        <>
            <Header as='h2' floated='left'>
                <Icon name="question circle outline" />
                Question List
            </Header>
            <Header as='h2' floated='right'>
                {/* Bu bir button ama ben bunun LINK olarak davranmasini istedigim icin as={Link} ekledim. Bu react-semantic-ui'in guclu bir ozelligi. Su
                Normal HTML yazdigimizda bir link vermek istegimizde nasil <a href="http://google.com">My Link</a> yaziyorsak, yaz
                React router ile <Link to="app.js'de tanimlanan routeslardan biri">My l=Mink</Link> olarak veriyoruz. */}
                <Button as={Link} to="/question-create" color='violet'>Add Question</Button>
                <Button as={Link} to="/admin-home" color="violet">
                    <Icon name="share" />
                </Button>
            </Header>
            <Table>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Question No</Table.HeaderCell>
                        <Table.HeaderCell>Question Text</Table.HeaderCell>
                        <Table.HeaderCell>Level</Table.HeaderCell>
                        <Table.HeaderCell>Unit</Table.HeaderCell>

                        <Table.HeaderCell></Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

             
                <Table.Body>
                    {questionList.map(question => {
                        return (
                            <Table.Row>
                                <Table.Cell>{question.questionId}</Table.Cell>
                                <Table.Cell>{question.questionText}</Table.Cell>
                                <Table.Cell>{question.questionLevel}</Table.Cell>
                                <Table.Cell>{question.questionUnit?.unitName}</Table.Cell>
                                <Table.Cell textAlign='right' width='1'>
                                    <Button.Group size="mini">
                                        {/* Edit dedigimiz ilgili ogrencisinin id'si ile birlikte daha once tanimladimiz route'a gidiyoruz. */}
                                        <Button as={Link} to={"/question-edit/" + question._id}>Edit</Button>
                                        <Button color="red" onClick={() => onDeleteQuestion(question._id)}>Delete</Button>
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