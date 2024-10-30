import React from "react";
import "./Sidebar.scss";
interface SidebarProps {
  lawyerId: string;
  setLawyerId: React.Dispatch<React.SetStateAction<string>>;
  sessionId: string;
  setSessionId: React.Dispatch<React.SetStateAction<string>>;
  questioncount: number;
  
}

const Sidebar: React.FC<SidebarProps> = ({ lawyerId, sessionId,questioncount }) => {
  return (
    <div className="sidebarContainer">
      {lawyerId &&
      <div className="sidebar">
      <div className="sidebar-id">
        <div className={`layer-id ${lawyerId ? 'both-present' : ''}`}><b>lawyer_Id: </b> {lawyerId}</div>
        <div className={`session-id ${sessionId ? 'both-present' : ''}`}><b>Session_Id: </b>{sessionId}</div>
        <div className={`session-id ${sessionId ? 'both-present' : ''}`}><b>Question_state: </b>{questioncount}</div>
      </div>
    </div>}
      
      <img
        src="AI Legal Assistant without BG.png"
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "100px",
          height: "250px",
          marginLeft: "30px"
        }}

        alt="Logo"
      />
    </div>
  );
};

export default Sidebar;
