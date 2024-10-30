import Footer from "../components/Footer/footer";
import Header from "../components/Header/header";
import Content from "../components/content/content";
import Sidebar from "../components/Sidebar/sideBar";
import { useState } from "react";

const DefaultLayout = () => {
  const [lawyerId, setLawyerId] = useState<string>("");
  const [sessionId, setSessionId] = useState<string>("");
  const [questioncount,setQuestioncount]= useState<number>(0);

  return (
    <div className="wrapper">
        <Sidebar lawyerId={lawyerId} setLawyerId={setLawyerId} sessionId={sessionId} setSessionId={setSessionId} questioncount={questioncount}/>
        <div className="right-container">
          <Header />
          <div className="views">
            <Content lawyerId={lawyerId} setLawyerId={setLawyerId} sessionId={sessionId} setSessionId={setSessionId} setQuestioncount={setQuestioncount}/>
          </div>
          <Footer />
        </div>
      </div>
  );
};

export default DefaultLayout;
