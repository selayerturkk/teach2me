//test helllloooo

const express = require("express");
const app = express();

//Modelleri import ediyoruz.
const User = require("./models/user");
const Unit = require("./models/unit");
const Question = require("./models/question");
const Test = require("./models/test");
const Answer = require("./models/answer");

//Database connection
const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://admin:Admin123!@cluster0.e5ksi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
);
const db = mongoose.connection;
db.on("error", (err) => {
  console.log(err);
});

//Network hatalari icin kullanılan kod
const cors = require("cors");
app.use(cors());

//Gelen json formatındaki verileri okunabilir hale getirmek
const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.post("/login", async (req, res) => {
  let email = req.body.email;
  let passWord = req.body.passWord;
    let user = await User.findOne({ email: email, passWord: passWord });
    if (user) {
      res.status(200).send({ userId: user._id,role:user.role,firstName:user.firstName,lastName:user.lastName });
    } else {
      res.status(403).send();
    }
});

//Get all users
app.get("/user", async (req, res) => {
  console.log("_Request", req);
  try {
    // kontrol için console.log("user db ye gidiyorum")
    const userList = await User.find(); //databaseden find ile tüm user kayıtlarını çekiyor
    //console.log("HELLO", userList);
    res.send(userList);
  } catch (err) {
    res.status(404).send();
  }
});

//Get user by Id-(Primary Key)
app.get("/user/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id); // id parametre olarak gönderiliyor
    res.send(user);
  } catch (err) {
    res.status(404).send();
  }
});

//Post user (yeni kayıt yazmak için database'e post kullanılıyor)
app.post("/user", async (req, res) => {
  //eğerki userid boş geldiyse böyle bir şey olamaz diye mesaj veriyor (&& ile diğerlerini de ekle)
  if (!req.body.userId) {
    res.status(404).send(JSON.stringify({ message: "User Id reuqired!" }));
  } else {
    // json formatında gelenleri bir nevi birer parametreye dönüştürüp okunabilir hale getirmek için req.ody.userId diyoruz
    const userList = new User({
      userId: req.body.userId,
      email: req.body.email,
      passWord: req.body.passWord,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      role: req.body.role,
    });
    try {
      const savedStudent = await userList.save(); //save ile database'e yazıyoruz <3
      res.json(savedStudent);
    } catch (err) {
      res.json({ message: err });
    }
  }
});

//Put user by Id-(Primary Key) (updatelemek)
app.put("/user/:id", async (req, res) => {
  //user id ile geliniyor, databse vs. json
  try {
    const updatedUser = await User.findById(req.params.id);
    updatedUser.userId = req.body.userId;
    updatedUser.email = req.body.email;
    updatedUser.passWord = req.body.passWord;
    updatedUser.firstName = req.body.firstName;
    updatedUser.lastName = req.body.lastName;
    updatedUser.role = req.body.role;

    await updatedUser.save();
    res.json(updatedUser);
  } catch (err) {
    res.json({ message: err });
    res.status(404).send();
  }
});

//Delete user by Id-(Primary Key)
app.delete("/user/:id", async (req, res) => {
  try {
    const deletedUser = await User.remove({ _id: req.params.id });
    res.json(deletedUser);
  } catch (err) {
    res.json({ message: err });
    res.status(404).send();
  }
});

//Get all Units
app.get("/unit", async (req, res) => {
  try {
    const unitList = await Unit.find();
    res.send(unitList);
  } catch (err) {
    res.json({ message: err });
    res.status(404).send();
  }
});

//Get unit by Id-(Primary Key)
app.get("/unit/:id", async (req, res) => {
  try {
    const unit = await Unit.findById(req.params.id);
    res.send(unit);
  } catch (err) {
    res.status(404).send();
  }
});

//Post unit (yeni kayıt yazmak için database'e post kullanılıyor)
app.post("/unit", async (req, res) => {
  //eğerki userid boş geldiyse böyle bir şey olamaz diye mesaj veriyor (&& ile diğerlerini de ekle)
  if (!req.body.unitId) {
    res.status(404).send(JSON.stringify({ message: "Unit Id reuqired!" }));
  } else {
    // json formatında gelenleri bir nevi birer parametreye dönüştürüp okunabilir hale getirmek için req.ody.userId diyoruz
    const unit = new Unit({
      unitId: req.body.unitId,
      unitName: req.body.unitName,
    });
    try {
      const savedUnit = await unit.save(); //save ile database'e yazıyoruz <3
      res.json(savedUnit);
    } catch (err) {
      res.json({ message: err });
    }
  }
});

//Put unit by Id-(Primary Key) (updatelemek)
app.put("/unit/:id", async (req, res) => {
  //user id ile geliniyor, databse vs. json
  try {
    const updatedUnit = await Unit.findById(req.params.id);
    updatedUnit.unitId = req.body.unitId;
    updatedUnit.unitName = req.body.unitName;

    await updatedUnit.save();
    res.json(updatedUnit);
  } catch (err) {
    res.json({ message: err });
    res.status(404).send();
  }
});

//Delete unit by Id-(Primary Key)
app.delete("/unit/:id", async (req, res) => {
  try {
    const deletedUnit = await Unit.remove({ _id: req.params.id });
    res.json(deletedUnit);
  } catch (err) {
    res.json({ message: err });
    res.status(404).send();
  }
});

//Get all questions
app.get("/question", async (req, res) => {
  try {
    const questionList = await Question.find().populate("questionUnit");
    res.send(questionList);
  } catch (err) {
    res.status(404).send();
  }
});

//Post question (yeni kayıt yazmak için database'e post kullanılıyor)
app.post("/question", async (req, res) => {
  //eğerki userid boş geldiyse böyle bir şey olamaz diye mesaj veriyor (&& ile diğerlerini de ekle)
  if (!req.body.questionId) {
    res.status(404).send(JSON.stringify({ message: "Question Id reuqired!" }));
  } else {
    // json formatında gelenleri bir nevi birer parametreye dönüştürüp okunabilir hale getirmek için req.ody.userId diyoruz
    const question = new Question({
      questionId: req.body.questionId,
      questionText: req.body.questionText,
      questionLevel: req.body.questionLevel,
      questionUnit: req.body.questionUnit,
      choiceOne: req.body.choiceOne,
      choiceTwo: req.body.choiceTwo,
      choiceThree: req.body.choiceThree,
      choiceFour: req.body.choiceFour,
      rightAnswer: req.body.rightAnswer,
    });
    try {
      const savedQuestion = await question.save(); //save ile database'e yazıyoruz <3
      res.json(savedQuestion);
    } catch (err) {
      res.json({ message: err });
    }
  }
});

//Delete question by Id-(Primary Key)
app.delete("/question/:id", async (req, res) => {
  try {
    const deletedQuestion = await Question.remove({ _id: req.params.id });
    res.json(deletedQuestion);
  } catch (err) {
    res.json({ message: err });
    res.status(404).send();
  }
});

app.get("/test/:id", async (req, res) => {
  try {
    const test = await Test.findById(req.params.id).populate("testUnit");
    res.send(test);
  } catch (err) {
    res.status(404).send();
  }
});

//Get all tests per student :TODO
app.get("/tests", async (req, res) => {
  console.log(req.query)
  let testList = [];
  try {
    if(req.query.user){
      //just get the tests of the user
      testList = await Test.find({user: req.query.user}).populate("testUnit");
    }else{
      //get all tests
       testList = await Test.find().populate("user").populate("testUnit");
       console.log(testList);

    }
    res.send(testList);
  } catch (err) {
    res.status(404).send();
  }
});

app.post("/test", async (req, res) => {
  //Get random 2 questions which unit is equal to req.body.unitId and questionLevel is equal to req.body.questionLevel
  const questionList = await Question.find({
    questionUnit: req.body.testUnit,
    questionLevel: req.body.testLevel,
  }).limit(2);

  //convert questionList to array
  const questionArray = questionList.map((question) => {
    return {
      questionId: question.questionId,
      id: question._id,
      questionText: question.questionText,
      questionLevel: question.questionLevel,
      questionUnit: question.questionUnit,
      choiceOne: question.choiceOne,
      choiceTwo: question.choiceTwo,
      choiceThree: question.choiceThree,
      choiceFour: question.choiceFour,
      rightAnswer: question.rightAnswer,
      studentAnswer: "",
    };
  });

  console.log("questionList: " + questionArray);

  //Create new test and add questions to it

  const test = new Test({
    startDate: new Date(),
    testUnit: req.body.testUnit,
    testLevel: req.body.testLevel,
    testQuestions: questionArray,
    user:req.body.user
  });
  try {
    const savedTest = await test.save();
    res.json(savedTest);
  } catch (err) {
    res.json({ message: err });
  }
});

app.post("/test-answer", async (req, res) => {
  console.log("Here");
  //Get random 2 questions which unit is equal to req.body.unitId and questionLevel is equal to req.body.questionLevel
  //1:Find the test
  const test = await Test.findById(req.body.testId);

  //2:Update result
  const testQuestions = test.testQuestions;
  req.body.testQuestions.forEach((answeredQuestion) => {
    test.testQuestions.forEach((question) => {
      if (question.id == answeredQuestion.questionId) {
        question.studentAnswer = answeredQuestion.studentAnswer;
      }
    });
  });
  try {
    test.testStatus = "completed";
    test.endDate = new Date();
    test.markModified("testQuestions");
    const umut = await test.save();
    res.json(umut);
  } catch (error) {
    console.log(error);
  }
});

//Open port and listen
app.listen(3000, () => console.log("Server 3000 started"));
