import { Routes, Route } from "react-router-dom";
import { Container } from "semantic-ui-react";
import LoginPage from "./pages/LoginPage";
import AdminHomePage from "./pages/AdminHomePage";
import StudentCreatePage from "./pages/student/StudentCreatePage";
import StudentEditPage from "./pages/student/StudentEditPage";
import StudentListPage from "./pages/student/StudentListPage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UnitListPage from "./pages/unit/UnitListPage";
import UnitCreatePage from "./pages/unit/UnitCreatePage";
import UnitEditPage from "./pages/unit/UnitEditPage";
import QuestionListPage from "./pages/question/QuestionListPage";
import QuestionCreatePage from "./pages/question/QuestionCreatePage";
import QuestionEditPage from "./pages/question/QuestionEditPage";
import TestCreatePage from "./pages/test/TestCreatePage";
import MyTestList from "./pages/test/MyTestList";
import TestAnswers from "./pages/test/TestAnswers";
import StudentHomePage from "./pages/StudentHomePage";
import TestResult from "./pages/test/TestResult";
import AllTestList from "./pages/test/AllTestList";

function App() {
  const loggedUser = JSON.parse(localStorage.getItem("user"));
  return (
    //Container sadece react-semantic-ui ile gelen bir UI elementi. Arka tarafta bir DIV olusturuyor sabit genislikte.
    <Container style={{ marginTop: "7em" }}>
      <ToastContainer />
      {/* https://reactrouter.com/ kullanmak zorundayiz. React icin yazilmis olan routin kutuphanesi
      Asagidaki gibi, ruoutler tanimlaniyor. URL kisminda /students yazarsak, su elementi cagir olarak basit bir kurgusu var. 
      En alttak route ise, tanimli olmayan butun URL ler icin login sayfasina gitmesi icin. 
      :exact-> path'de yazan adresin tam olarak match etmesini sagliyoruz. yani /stu yazinca gitmesini engellemek icin. 
      eger bir path'te bir parametre varsa /:id olarak burada setliyoruz. Ilgili saydaga 
          let params = useParams();
      olarak parametreleri alabiliyoruz. 
      */}
      <Routes>
        {!loggedUser ? (
          <>
            <Route path="*" element={<LoginPage />} />
          </>
        ) : (
          loggedUser.role === "teacher" ? 
          <>
            <Route exact path="/admin-home" element={<AdminHomePage />} />
            <Route exact path="/students" element={<StudentListPage />} />
            <Route exact path="/student-create" element={<StudentCreatePage />} />
            <Route exact path="/student-edit/:id" element={<StudentEditPage />} />
            <Route exact path="/units" element={<UnitListPage />} />
            <Route exact path="/unit-create" element={<UnitCreatePage />} />
            <Route exact path="/unit-edit/:id" element={<UnitEditPage />} />
            <Route exact path="/questions" element={<QuestionListPage />} />
            <Route exact path="/question-create" element={<QuestionCreatePage />} />
            <Route exact path="/question-edit/:id" element={<QuestionEditPage />} />
            <Route exact path="/all-test-list" element={<AllTestList />} />
            <Route exact path="/test-result/:id" element={<TestResult />} />

            <Route exact path="/*" element={<AdminHomePage />} />
          </>:
          <>
           <Route exact path="/test-create" element={<TestCreatePage />} />
            <Route exact path="/my-test-list" element={<MyTestList />} />
            <Route exact path="/test-answers/:id" element={<TestAnswers />} />
            <Route exact path="/test-result/:id" element={<TestResult />} />
            <Route exact path="/*" element={<StudentHomePage />} />
         </>
         )
        }
      
      
    

      </Routes>
    </Container>
  );
}

export default App;
