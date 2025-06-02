import axios from "axios"
import { useEffect, useState } from "react"
import { Icon, Header, Button, Form, Label } from 'semantic-ui-react' //componentleri burdan alıyor
import { Link, useParams } from "react-router-dom";
import { toast } from 'react-toastify';


export default function QuestionEditPage() {
    let params = useParams(); //user id yi kullanmak için
    const [questionId, setQuestionId] = useState(""); //değişen şeyleri state olarak tanımlıyoruz (controlled component)
    const [questionText, setQuestionText] = useState("");
    const [choiceOne, setChoiceOne] = useState("");
    const [choiceTwo, setChoiceTwo] = useState("");
    const [choiceThree, setChoiceThree] = useState("");
    const [choiceFour, setChoiceFour] = useState("");
    const [rightAnswer, setRightAnswer] = useState("");

    function onSubmitForm() {

        axios.put("http://localhost:3000/question/" + params.id, {
            "questionId": questionId,
            "questionText": questionText,
            "choiceOne": choiceOne,
            "choiceTwo": choiceTwo,
            "choiceThree": choiceThree,
            "choiceFour": choiceFour,
            "rightAnswer": rightAnswer,
            "role": "student" //hardcoded
        }).then(res => {
            //Notify User
            toast.success('Question updated.', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            });
        }).catch(err => {
            //TODO: Backend validation gerekli.
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

    useEffect(() => {
        //Ilgili ogrenci bilgilerini serverdan aliyoruz. Buraya sadece ID geliyor.${params.id}
        axios.get(`http://localhost:3000/question/${params.id}`).then(res => {
            setQuestionId(res.data.questionId)
            setQuestionText(res.data.questionText)
            setChoiceOne(res.data.choiceOne)
            setChoiceTwo(res.data.choiceTwo)
            setChoiceThree(res.data.choiceThree)
            setChoiceFour(res.data.choiceFour)
            setRightAnswer(res.data.rightAnswer)
        })
    }, []) // en sona boş array koyuyoruz ki tek defa dönsün



    return (
        <>
            <Header as='h2' floated='left'>
                <Icon name="question circle outline" />
                Edit Question:
            </Header>
            <Header as='h2' floated='right'>
                <Button as={Link} to="/questions" color="violet">
                    <Icon name="share" />
                </Button> 
            </Header>

            {/* CSS:position:static vermemiz gerekiyor burada react-semantic-ui'da ufak bir hata. */}
            <Form style={{ position: 'static' }} onSubmit={onSubmitForm}>
            <Form.Field>
                    <label> Question No</label>
                    <input placeholder='Question No' value={questionId} onChange={e => setQuestionId(e.target.value)} />
                </Form.Field>
                
                <Form.Field>
                    <label> Question Text</label>
                    <input placeholder="Question Text" value={questionText} onChange={(e) => setQuestionText(e.target.value)} />
                </Form.Field>
                

                <Form.Field>
                    <label> Choice One</label>
                    <input 
                    placeholder='Choice One' 
                    value={choiceOne} 
                    onChange={(e) => setChoiceOne(e.target.value)} />
                </Form.Field>

                <Form.Field>
                    <label> Choice Two</label>
                    <input placeholder='Choice Two' value={choiceTwo} onChange={e => setChoiceTwo(e.target.value)} />
                </Form.Field>

                <Form.Field>
                    <label> Choice Three</label>
                    <input placeholder='Choice Three' value={choiceThree} onChange={e => setChoiceThree(e.target.value)} />
                </Form.Field>

                <Form.Field>
                    <label> Choice Four</label>
                    <input placeholder='Choice Four' value={choiceFour} onChange={e => setChoiceFour(e.target.value)} />
                </Form.Field>

                <Form.Field>
                    <label> Right Answer</label>
                    <input placeholder='Right Answer' value={rightAnswer} onChange={e => setRightAnswer(e.target.value)} />
                </Form.Field>


                <Button type='submit' >Save Question</Button>
            </Form>
        </>
    )
}