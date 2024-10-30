// import React, { useState, useEffect, useRef } from "react";
// import "./chatbot.scss";
// // import Popup from 'reactjs-popup';
// import Button from 'react-bootstrap/Button'
// import 'reactjs-popup/dist/index.css';
// import DownloadIcon from '@mui/icons-material/Download';
// import VerifiedIcon from '@mui/icons-material/Verified';


// interface ChatbotProps {
//   layerId: string;
//   setLayerId: React.Dispatch<React.SetStateAction<string>>;
//   sessionId: string;
//   setSessionId: React.Dispatch<React.SetStateAction<string>>;
// }

// interface Question {
//   id: string;
//   order: number;
//   type: string;
//   text: string;
//   note?: string;
//   acceptedValues?: Record<string, string>;
//   conditions?: string[];
// }


// const API_URL = process.env.URL
// console.log(API_URL)

// const Chatbot: React.FC<ChatbotProps> = ({ layerId, setLayerId, sessionId, setSessionId }) => {
//   const [start, setStart] = useState<boolean>(true);
//   const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
//   const [previousQuestions, setPreviousQuestions] = useState<Array<{ question: Question, response: string }>>([]);
//   const [userResponses, setUserResponses] = useState<Record<string, string>>({});
//   const [userInput, setUserInput] = useState<string>("");
//   const messageEndRef = useRef<HTMLDivElement>(null);
//   const chatboxRef = useRef<HTMLDivElement>(null);
//   const [tempLayerId, setTempLayerId] = useState<string>("");
//   const [interviewComplete, setInterviewComplete] = useState<boolean>(false);
//   const [showPopup, setShowPopup] = useState<boolean>(false);
//   const [showEndConfirmation, setShowEndConfirmation] = useState<boolean>(false);
//   const [endquestion, setEndquestion] = useState<string>("");
//   const [endquestion1, setEndquestion1] = useState<string>("");
//   const fetchFirstQuestion = async () => {
//     try {
//       console.log(`${API_URL}/start_interview`)
//       const response = await fetch(`${API_URL}/start_interview`, { method: "GET" });
//       const responseData = await response.json();

//       if (!response.ok) {
//         alert("Error fetching data: " + JSON.stringify(responseData));
//         throw new Error("Failed to fetch data");
//       }

//       if (responseData) {
//         setCurrentQuestion(responseData.question); // Assuming responseData is a question object
//         setStart(false);
//       } else {
//         setStart(false); // Set start to false regardless of responseData length (modify as needed)
//       }
//     } catch (error: any) {
//       console.error("Error fetching data:", error.message);
//     }
//   };

//   useEffect(() => {
//     if (!start) {
//       scrollToBottom();
//     }
//   }, [currentQuestion, start]);

//   const scrollToBottom = () => {
//     if (messageEndRef.current) {
//       messageEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
//     }

//     if (chatboxRef.current) {
//       chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
//     }
//   };

//   const handleStartClick = () => {
//     if (tempLayerId.trim() === "") {
//       alert("Please enter a Layer ID");
//       return;
//     }
//     setLayerId(tempLayerId);
//     const newSessionId = generateSessionId();
//     setSessionId(newSessionId);
//     fetchFirstQuestion();
//   };

//   const generateSessionId = (): string => {
//     return Math.random().toString(36).substr(2, 9);
//   };

//   const fetchNextQuestion = async (questionId: string, answer: string) => {
//     try {
//       const response = await fetch(`${API_URL}/next_question`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
//         body: JSON.stringify({
//           question_id: questionId,
//           answer: answer,
//           lawyerId: layerId,
//           sessionId: sessionId,
//         }),
//       });

//       const responseData = await response.json();
//       console.log(responseData);
//       if (!response.ok) {
//         throw new Error("Failed to fetch next question");
//       }
//       return responseData;
//     } catch (error: any) {
//       console.error("Error fetching next question:", error.message);
//       return null;
//     }
//   };

//   const handleNextQuestion = async () => {
//     if (!currentQuestion) return;

//     const answer = userInput;
//     setUserResponses((prevResponses) => ({
//       ...prevResponses,
//       [currentQuestion.id]: answer,
//     }));
//     setUserInput("");

//     const responseData = await fetchNextQuestion(currentQuestion.id, answer);

//     if (responseData) {
//       if (responseData.confirm_end){
//         setShowEndConfirmation(true)

//         setEndquestion(responseData.question.text)
        
//       }
//       else if (responseData.message === "Interview complete") {
//         setPreviousQuestions((prev) => [...prev, { question: currentQuestion, response: answer }]);
//         setCurrentQuestion(responseData.question);
//         setStart(false);
//         setShowPopup(true);
//         setInterviewComplete(true)
        

//       } else {
//         setPreviousQuestions((prev) => [...prev, { question: currentQuestion, response: answer }]);
//         setCurrentQuestion(responseData.question);
//         setStart(false);
//       }
//     } else {
//       setStart(false); // Set start to false regardless of responseData length (modify as needed)
//     }
//   };

//   const handleKeyPress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === "Enter") {
//       await handleNextQuestion();
//     }
  
//   };

//   const handleDownload = () => {
//     const url = `${API_URL}/download/${layerId}/${sessionId}`;
//     const link = document.createElement("a");
//     link.href = url;
//     link.setAttribute("download", `${layerId}_${sessionId}.json`);
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   const closePopup = () => {
//     setShowPopup(!showPopup);
//   }; 

 
  
//   const handleConfirmEnd = async () => {
//     try {
//       const response = await fetch(`${API_URL}/confirm_end_interview`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
//         body: JSON.stringify({
//           sessionId: sessionId,
//           confirm: true
//         }),
        
//       }); 
//       setEndquestion1(endquestion)
      
      
//       const responseData = await response.json();
      
//       if (responseData.message === "Interview will be ended") {
//         // setInterviewComplete(true);
//         // setShowPopup(true);
//       }
//     } catch (error: any) {
//       console.error("Error confirming end interview:", error.message);
//     } finally {
//       setShowEndConfirmation(false);
//       setInterviewComplete(true);
//       setShowPopup(true);
//     }
//   };
  
//   const handleCancelEnd = async () => {
//     try {
//       const response = await fetch(`${API_URL}/confirm_end_interview`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
//         body: JSON.stringify({
//           sessionId: sessionId,
//           confirm: false
//         }),
//       });
//       await handleNextQuestion();
      
      
//     } catch (error: any) {
//       console.error("Error canceling end interview:", error.message);
//     } finally {
//       setShowEndConfirmation(false);
//     }
//   };
  

//   return (
//     <div className="chatbot-layout">
//       {start ? (
//         <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "89vh" }}>
//           <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
//             <div>
//               <span style={{ fontSize: "30px" }}>To start the Chatbot, click on the start button</span>
//             </div>
//             <div className="lawyerid-input">
//               <input
//                 type="text"
//                 placeholder="Enter Lawyer ID..."
//                 style={{ height: "50px", width: "240px", fontSize: "25px", color: "#000000", fontFamily: "Arial", backgroundColor: "#FFF", borderRadius: "20px", marginBottom: "20px" }}
//                 value={tempLayerId}
//                 onChange={(e) => setTempLayerId(e.target.value)}
//               />
//             </div>
//             <div>
//               <button
//                 style={{ height: "50px", width: "100px", fontSize: "25px", color: "#000000", fontFamily: "Arial", backgroundColor: "#ABCECF", borderRadius: "20px" }}
//                 onClick={handleStartClick}
//               >
//                 Start
//               </button>
//             </div>
//           </div>
//         </div>
//       ) : (
//         <div className="chatbot-container">
//           <div className="chatbox" ref={chatboxRef}>
//             {/* Render Previous Questions */}
//             {previousQuestions.map((item, index) => (
//               <div key={index} className="message-container">
//                 <div className="question">
//                   <span className="UserName">Question</span>
//                   <p className="UserName-question">
//                     {item.question.text != null &&
//                       item.question.text.split("\n").map((line, index) => (
//                         <p key={index} dangerouslySetInnerHTML={{ __html: line }} />
//                       ))}
//                     {item.question.note != null && item.question.note && (
//                       <div className="note">
//                         {item.question.note.split("\n").map((line, index) => (
//                           <p key={index} dangerouslySetInnerHTML={{ __html: line }} />
//                         ))}
//                       </div>
//                     )} 
                    
//                   </p>
                  
//                 </div>
//                 {item.response && (
//                   <div className="response">
//                     <span className="UserName">User Response</span>
//                     <p className="UserName-response">{item.response}</p>
//                   </div>
//                 )}
//               </div>
//             ))}

//             {/* Render Current Question */}
//             {currentQuestion && (
//               <div key={currentQuestion.id} className="message-container">
//                 <div className="question">
//                   <span className="UserName">Question</span>
//                   <p className="UserName-question">
//                     {currentQuestion.text != null &&
//                       currentQuestion.text.split("\n").map((line, index) => (
//                         <p key={index} dangerouslySetInnerHTML={{ __html: line }} />
//                       ))}
//                     {currentQuestion.note != null && currentQuestion.note && (
//                       <div className="note">
//                         {currentQuestion.note.split("\n").map((line, index) => (
//                           <p key={index} dangerouslySetInnerHTML={{ __html: line }} />
//                         ))} 
                        
                        
//                       </div>
                      
//                     )}
                   
//                   </p> 
                  
                  
//                 </div>
//                 {userResponses[currentQuestion.id] && (
//                   <div className="response">
//                     <span className="UserName-re-he">User Response</span>
//                     <p className="UserName-response">{userResponses[currentQuestion.id]}</p>
//                   </div>
//                 )}
//               </div>
//             )} 
            
            
//           </div>
//           {currentQuestion && !interviewComplete && (
//             <div className="input-container">
//               <input
//                 type="text"
//                 placeholder="Type your response..."
//                 value={userInput}
//                 onChange={(e) => setUserInput(e.target.value)}
//                 onKeyDown={handleKeyPress}
//               />
//             </div>
//           )}

// {/* <p className="UserName-question">{endquestion1}</p> */}
//           {/* endInterview Pop up */}
          
//           {showEndConfirmation && (
//             <div className="popup-overlay">
//               <div className="popup-content">
//                 <button className="close-button" onClick={closePopup}>
//                   &times;
//                 </button>
//                 <div className="EndConfirmation-p">
//                 <p>"We have determined you are not a UK resident, is this correct?"</p>
//               <Button  variant="primary" onClick={handleConfirmEnd}>Yes</Button>
//               <Button  variant="info" onClick={handleCancelEnd}>No</Button>
//                 </div>
                
//               </div>
//             </div>
//           )}

//             {/* download pop up */}
//           {showPopup && interviewComplete&& (
//             <div className="popup-overlay">
//               <div className="popup-content">
//                 <button className="close-button" onClick={closePopup}>
//                   &times;
//                 </button>
//                 <span> <h3>Interview completed </h3> <div className="Verification"><VerifiedIcon/></div></span>
//                 <span> <h5>Thank you!</h5></span>
//                 <Button variant="success" className="download-button" onClick={handleDownload}> <DownloadIcon /></Button>{' '}
//               </div>
//             </div>
//           )}

//           {interviewComplete && (
//             <div className="download-info">
//               {/* <span className="download-info-text">Interview completed</span> */}
//               <Button variant="outline-success" onClick={closePopup}> Download Responses</Button>{' '}
//             </div>
//           )}

            
//           <div ref={messageEndRef} />
//         </div>
//       )}
//     </div>
//   );
// };

// export default Chatbot;
