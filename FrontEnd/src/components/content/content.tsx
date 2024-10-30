import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import "./Content.scss";
import Chatbot from "../../Views/chatbot/chatbot.tsx";

interface ContentProps {
  lawyerId: string;
  setLawyerId: React.Dispatch<React.SetStateAction<string>>;
  sessionId: string;
  setSessionId: React.Dispatch<React.SetStateAction<string>>;
  setQuestioncount: React.Dispatch<React.SetStateAction<number>>;
}


const Content: React.FC<ContentProps> = ({ lawyerId, setLawyerId, sessionId, setSessionId ,setQuestioncount}) => {
  return (
    <Suspense
        fallback={
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            <div className="loader">
              <div className="circle"></div>
              <div className="circle"></div>
              <div className="circle"></div>
              <div className="circle"></div>
            </div>
          </div>
        }
      >
        <Routes>
          <Route>
            <Route path="/" element={<Chatbot  lawyerId={lawyerId} setLawyerId={setLawyerId} sessionId={sessionId} setSessionId={setSessionId} setQuestioncount={setQuestioncount}/>} />
          </Route>
        </Routes>
      </Suspense>
  );
};

export default Content;
