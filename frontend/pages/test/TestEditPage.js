import axios from "axios"
import { useEffect, useState } from "react"
import { Icon, Header, Button, Form, Label } from 'semantic-ui-react' //componentleri burdan alıyor
import { Link, useParams } from "react-router-dom";
import { toast } from 'react-toastify';


export default function TestEditPage() {
    let params = useParams(); //user id yi kullanmak için
    const [testId, setTestId] = useState(""); //değişen şeyleri state olarak tanımlıyoruz (controlled component)
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    function onSubmitForm() {

        axios.put("http://localhost:3000/test/" + params.id, {
            "testId": testId,
            "startDate": startDate,
            "endDate": endDate
        }).then(res => {
            //Notify User
            toast.success('Test updated.', {
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
        axios.get(`http://localhost:3000/test/${params.id}`).then(res => {
            setTestId(res.data.testId)
            setStartDate(res.data.startDate)
            setEndDate(res.data.endDate)

        })
    }, []) // en sona boş array koyuyoruz ki tek defa dönsün



    return (
        <>
            <Header as='h2' floated='left'>
                <Icon name="test outline" />
                Edit Test:
            </Header>
            <Header as='h2' floated='right'>
                <Button primary as={Link} to="/test">Back</Button>
            </Header>

            {/* CSS:position:static vermemiz gerekiyor burada react-semantic-ui'da ufak bir hata. */}
            <Form style={{ position: 'static' }} onSubmit={formOnSubmit}>
                
                <Form.Field>
                    <label> Test No</label>
                    <input placeholder='Test No' value={testId} onChange={e => setTestId(e.target.value)} />
                </Form.Field>
                
                <Form.Field>
                    <label> Start Date</label>
                    <input placeholder='Start Date' value={startDate} onChange={e => setStartDate(e.target.value)} />
                </Form.Field>

                <Form.Field>
                    <label> End Date</label>
                    <input placeholder='End Date' value={endDate} onChange={e => setEndDate(e.target.value)} />
                </Form.Field>

                <Button type='submit' >Save Test</Button>
            </Form>
        </>
    )
}