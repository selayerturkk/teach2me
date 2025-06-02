import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Card, Form, Button, Icon, Header } from "semantic-ui-react";
import { Link, useNavigate } from "react-router-dom";

export default function TestResult() {
  let params = useParams();
  const [test, setTest] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:3000/test/${params.id}`).then((res) => {
      console.log(res.data);
      setTest(res.data);
    });
  }, []);


  return (
    <>
      {console.log("Rendered")}

      <Header as="h2" floated="left">
        <Icon name="list" />
        {test.testUnit?.unitName} - {test.testLevel}
      </Header>
      <Header as="h2" floated="right">
      <Button as={Link} to="/my-test-list" color="violet">
            <Icon name="share" />
        </Button>
      </Header>
 
      <Card.Group>
        {test.testQuestions?.map((question, index) => {
          return (
            <Card fluid color={
              question.rightAnswer === question.studentAnswer
                ? "green"
                : "red"
            }>
             

              <Card.Content>
                <Card.Header>
                  {index + 1} - {question.questionText}
                </Card.Header>
                <Card.Description>
                  <div>
                    {question.rightAnswer === "1" ? (
                      <Icon name="check circle outline" />
                    ) : (
                      <Icon name=" circle outline" />
                    )}
                    {question.studentAnswer === "1" ? (
                      <strong>{question.choiceOne}</strong>
                    ) : (
                      question.choiceOne
                    )}
                  </div>
                  <div>
                    {question.rightAnswer === "2" ? (
                      <Icon name="check circle outline" />
                    ) : (
                      <Icon name=" circle outline" />
                    )}
                    {question.studentAnswer === "2" ? (
                      <strong>{question.choiceTwo}</strong>
                    ) : (
                      question.choiceTwo
                    )}{" "}
                  </div>
                  <div>
                    {question.rightAnswer === "3" ? (
                      <Icon name="check circle outline" />
                    ) : (
                      <Icon name=" circle outline" />
                    )}
                    {question.studentAnswer === "3" ? (
                      <strong>{question.choiceThree}</strong>
                    ) : (
                      question.choiceThree
                    )}{" "}
                  </div>
                  <div>
                    {question.rightAnswer === "4" ? (
                      <Icon name="check circle outline" />
                    ) : (
                      <Icon name=" circle outline" />
                    )}
                    {question.studentAnswer === "4" ? (
                      <strong>{question.choiceFour}</strong>
                    ) : (
                      question.choiceFour
                    )}{" "}
                  </div>
                </Card.Description>
              </Card.Content>
            </Card>
          );
        })}
      </Card.Group>
    </>
  );
}
