import { useEffect, useState } from "react";
import "./App.css";
import questions from "./questions.json";
import QuestionCard from "./components/QuestionCard";
import FinishScreen from "./components/FinishScreen";

function App() {
  const [number, setNumber] = useState(1);
  const [result, setResult] = useState("");
  const [scores, setScores] = useState({
    currentScore: 0,
    totalScore: 100,
  });
  const [answered, setAnswered] = useState(false);
  const [finish,setFinish]=useState(false)
  useEffect(() => {
    if (answered) {
      if (result === "Correct!") {
        setScores((prevScores) => ({
          ...prevScores,
          currentScore: Math.min(prevScores.currentScore + 5, 100),
        }));
      } else if (result === "Sorry!") {
        setScores((prevScores) => ({
          ...prevScores,
          totalScore: Math.max(prevScores.totalScore - 5, 0),
        }));
      }
    }
  }, [answered, result]);
  const handleNextQuestion = () => {
    if (result !== "") {
      setNumber((prev) => (prev + 1 === 21 ? prev : prev + 1));
      setResult("");
      setAnswered(false);
    }
  };
  const handleAnswer = () => {
    setResult("Correct!");
    setAnswered(true);
  };
  const handleWrongAnswer = () => {
    setResult("Sorry!");
    setAnswered(true);
  };
  const image = (
    <img
      className="h-[12px] w-[12px] flex "
      src="https://upload.wikimedia.org/wikipedia/commons/b/bf/A_Black_Star.png"
      alt="black star"
    />
  );
const handleFinish = ()=>{
setFinish(true)
} 

  return (
    <div className="px-4 lg:px-0">
      {finish===false ?   <div className="relative mx-auto  max-w-xl rounded-lg top-[100px] bg-slate-400  min-h-[700px]">
        <QuestionCard settNumber={number} />
        <div className= {`p-10  left-12 top-10  `}>
          <h4 className="text-4xl ">Question {number} of 20</h4>
          <h6 className="text-md    text-slate-500 ">
            {decodeURIComponent(questions[number - 1].category)}
          </h6>
          <div className="flex">
            {decodeURIComponent(questions[number - 1].difficulty) === "easy" &&
              image}
            {decodeURIComponent(questions[number - 1].difficulty) ===
              "hard" && (
              <>
                {image}
                {image}
                {image}
              </>
            )}
            {decodeURIComponent(questions[number - 1].difficulty) ===
              "medium" && (
              <>
                {image}
                {image}
              </>
            )}
          </div>
        </div>
        <div className={` top-20 mx-auto px-4  `} >
          <h5 className="text-xl">
            {decodeURIComponent(questions[number - 1].question)}
          </h5>
        </div>
        <div className={`space-y-6  `}>
          <div className="flex mt-40 justify-around  ">
            <button
              className={`${
                result === "Correct!"
                  ? "border-slate-100 border bg-slate-950 text-white"
                  : "bg-slate-100 border border-slate-950 text-black"
              } ${
                decodeURIComponent(questions[number - 1].question) &&
                "bg-slate-100 border border-slate-950 text-black"
              }   w-40 h-12 rounded-lg`}
              onClick={() => {
                handleAnswer();
              }}
              disabled={answered || result === "Correct!"}
            >
              {" "}
              {decodeURIComponent(questions[number - 1].correct_answer)}
            </button>
            <button
              className="bg-slate-100 border border-slate-950 w-40 rounded-lg"
              onClick={() => {
                handleWrongAnswer();
              }}
              disabled={answered || result === "Sorry!"}
            >
              {decodeURIComponent(questions[number - 1].incorrect_answers[0])}
            </button>
          </div>
          <div className="flex justify-around">
            {questions[number - 1].incorrect_answers[1] && (
              <button
                className="bg-slate-100 w-40 border border-slate-950 rounded-lg"
                onClick={() => {
                  handleWrongAnswer();
                }}
                disabled={answered || result === "Sorry!"}
              >
                {decodeURIComponent(questions[number - 1].incorrect_answers[1])}
              </button>
            )}
            {questions[number - 1].incorrect_answers[2] && (
              <button
                className="bg-slate-100 w-40 h-12 border border-slate-950   rounded-lg"
                onClick={() => {
                  handleWrongAnswer();
                }}
                disabled={answered || result === "Sorry!"}
              >
                {decodeURIComponent(questions[number - 1].incorrect_answers[2])}
              </button>
            )}
          </div>
          <div className="space-y-5  flex-col px-4  justify-items-center">
            <div
              className={`  text-2xl ${
                result === "Correct!" ? "text-green-700" : "text-red-600"
              }`}
            >
              {result}
            </div>
            <div>
              <button
                className={` ${
                  number === 20
                    ? null
                    : "bg-white relative  p-1 rounded-lg border border-slate-950"
                } `}
                onClick={() => {
                  handleNextQuestion();
                }}
              >
                {number === 20 ? null : "Next Question"}
              </button>
            </div>
          </div>
        </div>
        <div className={`flex-col w-full px-4 pt-20 bottom-5   `}>
          <div className=" flex justify-between">
            <h6 className="text-sm mr-24 ">Score: {scores.currentScore}%</h6>
            <h6 className="text-sm">Max Score: {scores.totalScore}%</h6>
          </div>
          <div className="bg-white border-2 rounded-lg  border-black">
            <div
              style={{ maxWidth: `${scores.totalScore}%` }}
              className={`bg-black   lg:max-w-full  h-[24px] z-50 rounded-lg`}
            >
              <div
                style={{ maxWidth: `${scores.currentScore}%` }}
                className="bg-[red] w-full h-full z-30  rounded-lg"
              ></div>
            </div>
          </div>
        </div>
        <button onClick={()=>handleFinish()} className="border border-neutral-950 rounded-lg p-1 mb-1 flex mx-auto mt-2 " >Finish</button>
      </div> :       
      <FinishScreen/>
}
    
    </div>
  );
}

export default App;
