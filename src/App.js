import { useState } from "react";
import "./App.css";
import questions from "./questions.json";
function App() {
  const [number, setNumber] = useState(1);
  const [result, setResult] = useState("");
  const [progressBar, setProgressBar] = useState(5);
  const [totalScore, setTotalScore] = useState(100);
  const [score, setScore] = useState(0);

  const handleNextQuestion = () => {
    setNumber((prev) => (prev + 1 === 21 ? prev : prev + 1));

    setProgressBar((prev) => {
      Math.min(prev + 5, 100);
    });
    setResult("");
  };

  const handleAnswer = () => {
    if (result === "Correct!") {
      setScore((prev) => Math.min(prev + 5, 100));
    }
  };

  const handleWrongAnswer = () => {
    if (result === "Sorry!") {
      setTotalScore((prev) => Math.max(prev - 5, 0));
    }
  };
  const image = (
    <img
      className="h-[12px] w-[12px] flex fill "
      src="https://upload.wikimedia.org/wikipedia/commons/b/bf/A_Black_Star.png"
    alt="black star"
    />
  );

  console.log(progressBar);
  return (
   
      <div className="relative 2xl:left-[650px] xl:left-[650px] lg:left-[650px] md:left-[300px] sm:w-[500px] md:w-[500px] lg:w-[500px]   xl:w-[600px]  2xl:w-[600px]  3xl:w-[600px] 3xl:left-[650px]  rounded-lg top-[100px] bg-slate-400  h-[700px]">
        <div className="bg-gray-600 w-full h-[20px]">
          <div className={`bg-black w-[${progressBar}%] h-[20px]`}></div>
        </div>
        <div className="flex-col relative  left-12 top-10">
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

        <div className="relative top-20 md:left-10 left-20 h-[80px]  w-[450px]">
          <h5 className="text-xl">
            {decodeURIComponent(questions[number - 1].question)}
          </h5>
        </div>
        <div className="space-y-6">
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
                setResult("Correct!");
                handleAnswer();
              }}
            >
              {" "}
              {decodeURIComponent(questions[number - 1].correct_answer)}
            </button>
            <button
              className="bg-slate-100 border border-slate-950 w-40 rounded-lg"
              onClick={() => {
                setResult("Sorry!");
                handleWrongAnswer();
              }}
            >
              {decodeURIComponent(questions[number - 1].incorrect_answers[0])}
            </button>
          </div>
          <div className="flex justify-around">
            <button
              className="bg-slate-100 w-40 border border-slate-950 rounded-lg"
              onClick={() => {
                setResult("Sorry!");
                handleWrongAnswer();
              }}
            >
              {questions[number - 1].incorrect_answers[1]
                ? decodeURIComponent(questions[number - 1].incorrect_answers[1])
                : ""}
            </button>
            <button
              className="bg-slate-100 w-40 h-12 border border-slate-950   rounded-lg"
              onClick={() => {
                setResult("Sorry!");
                handleWrongAnswer();
              }}
            >
              {questions[number - 1].incorrect_answers[2]
                ? decodeURIComponent(questions[number - 1].incorrect_answers[2])
                : ""}
            </button>
          </div>
          <div className="space-y-5 absolute  xm:left-48 sm:left-48  md:left-48    lg:left-60 xl:left-60  2xl:left-60 3xl:left-60  flex-col  justify-items-center">
            <div
              className={` ml-2 text-2xl ${
                result === "Correct!" ? "text-green-700" : "text-red-600"
              }`}
            >
              {result}
            </div>
            <div>
              <button
                className="bg-white relative  p-1 rounded-lg border border-slate-950"
                onClick={() => {
                  handleNextQuestion();
                }}
              >
                Next question
              </button>
            </div>
          </div>
        </div>
        <div className="flex-col absolute bottom-5 sm:left-7 md:left-9  lg:left-9 xl:left-16 2xl:left-16 3xl:left-16 ">
          <div className=" flex justify-between">
            <h6 className="text-sm mr-24 ">
              Score: {result === "Correct!" ? score + 5 : score}%
            </h6>
            <h6 className="text-sm">Max Score: {totalScore}%</h6>
          </div>
          <div className="bg-black  w-[440px]  h-[24px] rounded-lg"></div>
        </div>
      </div>
    
  );
}

export default App;
