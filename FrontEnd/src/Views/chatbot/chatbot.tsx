import React, { useState, useEffect } from 'react';

const API_URL = "https://your-api-url.com"; // Replace with actual API URL
const lawyerId = "your-lawyer-id"; // Replace with actual lawyerId from context or state
const sessionId = "your-session-id"; // Replace with actual sessionId from context or state

const InterviewComponent = () => {
  const [currentQuestion, setCurrentQuestion] = useState<any>(null);
  const [userInput, setUserInput] = useState<string>("");
  const [previousQuestions, setPreviousQuestions] = useState<any[]>([]);
  const [questionCount, setQuestioncount] = useState<number>(0);
  const [interviewComplete, setInterviewComplete] = useState<boolean>(false);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [confirmationMessage, setConfirmation_message] = useState<string | null>(null);
  const [showEndConfirmation, setShowEndConfirmation] = useState<boolean>(false);
  const [validInput, setValidInput] = useState<boolean>(false);
  const [userResponses, setUserResponses] = useState<any>({});
  const [start, setStart] = useState<boolean>(false);

  // Fetch GPT Response from API
  const fetchGptResponse = async (questionId: string, answer: string) => {
    try {
      const response = await fetch(`${API_URL}/gpt_response`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*", // Optional, depends on CORS config
        },
        body: JSON.stringify({
          question_id: questionId,
          answer: answer,
          lawyerId: lawyerId,
          sessionId: sessionId,
        }),
      });

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error("Failed to fetch GPT response");
      }
      return responseData;
    } catch (error: any) {
      console.error("Error fetching GPT response:", error.message);
      return null;
    }
  };

  // Handle fetching and displaying the next question
  const handleNextQuestion = async () => {
    if (!currentQuestion) return;

    const answer = userInput;
    setUserInput(""); // Clear input after submission

    const responseData = await fetchGptResponse(currentQuestion.id, answer);

    if (responseData) {
      if (responseData.question_count) {
        setQuestioncount(responseData.question_count);
      }

      if (responseData.Interview_complete) {
        setPreviousQuestions((prev) => [...prev, { question: currentQuestion, response: answer }]);
        setCurrentQuestion(responseData.question);
        setStart(false);
        setShowPopup(true);

        if (responseData.confirmation_message) {
          setConfirmation_message(responseData.confirmation_message);
          setShowEndConfirmation(true);
        } else {
          setInterviewComplete(true);
        }

        setUserResponses((prevResponses) => ({
          ...prevResponses,
          [currentQuestion.id]: answer,
        }));
      } else if (responseData.validInput) {
        setConfirmation_message(responseData.validInput);
        setPreviousQuestions((prev) => [...prev]);
        setValidInput(true);
        setShowPopup(true);
      } else {
        setUserResponses((prevResponses) => ({
          ...prevResponses,
          [currentQuestion.id]: answer,
        }));
        setPreviousQuestions((prev) => [...prev, { question: currentQuestion, response: answer }]);
        setCurrentQuestion(responseData.question);
        setStart(false);
      }
    } else {
      setStart(false);
    }
  };

  // Handle user input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  // Handle form submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleNextQuestion();
  };

  // Start or Resume the Interview
  const startInterview = () => {
    // Fetch the first question or resume from previous question
    setStart(true);
  };

  // UI: Interview Component
  return (
    <div>
      <h1>AI Lawyer Interview</h1>
      {interviewComplete ? (
        <div>
          <h2>Interview Complete</h2>
          {confirmationMessage && <p>{confirmationMessage}</p>}
        </div>
      ) : (
        <div>
          {start ? (
            <>
              <p>Question {questionCount}: {currentQuestion?.text}</p>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  value={userInput}
                  onChange={handleInputChange}
                  placeholder="Type your answer"
                />
                <button type="submit">Submit</button>
              </form>
            </>
          ) : (
            <button onClick={startInterview}>Start Interview</button>
          )}

          {showPopup && validInput && (
            <div className="popup">
              <p>{confirmationMessage}</p>
              <button onClick={() => setShowPopup(false)}>Close</button>
            </div>
          )}
        </div>
      )}

      <div>
        <h2>Previous Questions</h2>
        <ul>
          {previousQuestions.map((item, index) => (
            <li key={index}>
              <strong>Q:</strong> {item.question.text} <br />
              <strong>A:</strong> {item.response}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default InterviewComponent;
