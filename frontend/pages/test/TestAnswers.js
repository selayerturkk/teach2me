import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Card, Form, Button } from "semantic-ui-react";

export default function TestAnswers() {
  let params = useParams();
  const [test, setTest] = useState({});
  const navigate = useNavigate();

  const handleChange = (questionId, selectedChoice) => {
    //update testQuestions in test state with the updated question
    let newTestState = { ...test };
    newTestState.testQuestions.find((x) => x.id === questionId).studentAnswer =
      selectedChoice;
    setTest(newTestState);
  };

  function formOnSubmit() {
    let answersModelToPost = {
      testId: test._id,
      testQuestions: test.testQuestions.map((question) => {
        return {
          questionId: question.id,
          studentAnswer: question.studentAnswer,
        };
      }),
    };
    axios
      .post("http://localhost:3000/test-answer", answersModelToPost)
      .then((res) => {
        console.log(res.data);
        navigate("/test-result/" + test._id);
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
    axios.get(`http://localhost:3000/test/${params.id}`).then((res) => {
      console.log(res.data);
      setTest(res.data);
    });
  }, []);

  return (
    <>
      <h1>
        {test.testUnit?.unitName} - {test.testLevel}
      </h1>

      <Form onSubmit={formOnSubmit}>
        <Card.Group>
          {test.testQuestions?.map((question, index) => {
            return (
              <Card fluid color="red">
                <Card.Content>
                  <Card.Header>
                    {index + 1} - {question.questionText}
                  </Card.Header>
                  <Card.Description>
                    <Form.Group inline>
                      <Form.Radio
                        label={question.choiceOne}
                        value={"1"}
                        checked={question.studentAnswer == "1"}
                        onChange={() => handleChange(question.id, "1")}
                      />
                      <Form.Radio
                        label={question.choiceTwo}
                        value={"2"}
                        checked={question.studentAnswer == "2"}
                        onChange={() => handleChange(question.id, "2")}
                      />
                      <Form.Radio
                        label={question.choiceThree}
                        value={"3"}
                        checked={question.studentAnswer == "3"}
                        onChange={() => handleChange(question.id, "3")}
                      />
                      <Form.Radio
                        label={question.choiceFour}
                        value={"4"}
                        checked={question.studentAnswer == "4"}
                        onChange={() => handleChange(question.id, "4")}
                      />
                    </Form.Group>
                  </Card.Description>
                </Card.Content>
              </Card>
            );
          })}
        </Card.Group>

        <Button type="submit">Save the test and show results</Button>
      </Form>
    </>
  );
}
