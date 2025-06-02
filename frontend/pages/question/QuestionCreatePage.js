import { Icon, Header, Button, Form, Dropdown } from "semantic-ui-react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function QuestionCreatePage() {
  const [questionId, setQuestionId] = useState(""); //değişen şeyleri state olarak tanımlıyoruz (controlled component)
  const [questionText, setQuestionText] = useState("");
  const [questionLevel, setQuestionLevel] = useState("easy");
  const [choiceOne, setChoiceOne] = useState("");
  const [choiceTwo, setChoiceTwo] = useState("");
  const [choiceThree, setChoiceThree] = useState("");
  const [choiceFour, setChoiceFour] = useState("");
  const [rightAnswer, setRightAnswer] = useState("");
  const [questionUnit, setQuestionUnit] = useState([]);
  const [unitList, setUnitList] = useState([]);

  const navigate = useNavigate();
  function formOnSubmit() {
    axios
      .post("http://localhost:3000/question", {
        questionId: questionId,
        questionText: questionText,
        questionLevel: questionLevel,
        questionUnit: questionUnit,
        choiceOne: choiceOne,
        choiceTwo: choiceTwo,
        choiceThree: choiceThree,
        choiceFour: choiceFour,
        rightAnswer: rightAnswer,
      })
      .then((res) => {
        toast.success("Question added.", {
          position: "top-right",
          autoClose: 2000,
        });
        navigate("/questions");
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
    axios.get("http://localhost:3000/unit").then((res) => {
      setUnitList(res.data);
    });
  }, []);

  return (
    <>
      <Header as="h2" floated="left">
        <Icon name="question circle outline" />
        Create New Question
      </Header>

      <Header as="h2" floated="right">
        <Button as={Link} to="/questions" color="violet">
          <Icon name="share" />
        </Button>
      </Header>

      {/* CSS:position:static vermemiz gerekiyor burada react-semantic-ui'da ufak bir hata. */}
      <Form style={{ position: "static" }} onSubmit={formOnSubmit}>
        <Form.Field>
          <label> Question No</label>
          <input
            placeholder="Question No"
            value={questionId}
            onChange={(e) => setQuestionId(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label> Unit</label>
          <Dropdown
            placeholder="Select Unit for Question"
            search
            selection
            value={questionUnit}
            onChange={(e, { value }) => {
              console.log(value);
              setQuestionUnit(value);
            }}
            options={unitList.map((unit) => {
              return {
                key: unit._id,
                text: unit.unitName,
                value: unit._id,
              };
            })}
          />
        </Form.Field>
        <Form.Field>
          <label> Question Level</label>
          <Dropdown
            placeholder="Level"
            search
            selection
            value={questionLevel}
            onChange={(e, { value }) => {
              console.log(value);
              setQuestionLevel(value);
            }}
            options={[
              { key: 1, text: "Easy", value: "easy" },
              { key: 2, text: "Medium", value: "medium" },
              { key: 3, text: "Hard", value: "hard" },
            ]}
          />
        </Form.Field>
        <Form.Field>
          <label> Question Text</label>
          <input
            placeholder="Question Text"
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
          />
        </Form.Field>

        <Form.Field>
          <label> Choice One</label>
          <input
            placeholder="Choice One"
            value={choiceOne}
            onChange={(e) => setChoiceOne(e.target.value)}
          />
        </Form.Field>

        <Form.Field>
          <label> Choice Two</label>
          <input
            placeholder="Choice Two"
            value={choiceTwo}
            onChange={(e) => setChoiceTwo(e.target.value)}
          />
        </Form.Field>

        <Form.Field>
          <label> Choice Three</label>
          <input
            placeholder="Choice Three"
            value={choiceThree}
            onChange={(e) => setChoiceThree(e.target.value)}
          />
        </Form.Field>

        <Form.Field>
          <label> Choice Four</label>
          <input
            placeholder="Choice Four"
            value={choiceFour}
            onChange={(e) => setChoiceFour(e.target.value)}
          />
        </Form.Field>

        <Form.Field>
          <label> Right Answer</label>
          <input
            placeholder="Right Answer"
            value={rightAnswer}
            onChange={(e) => setRightAnswer(e.target.value)}
          />
        </Form.Field>

        <Button type="submit">Save Question</Button>
      </Form>
    </>
  );
}
