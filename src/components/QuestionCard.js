import React, { useEffect, useState } from 'react'


const QuestionCard = ({settNumber}) => {
  const [progressBar, setProgressBar] = useState(29);
  

  useEffect(() => {
    setProgressBar((prev) => Math.min(prev + 29, 600));
  
  }, [settNumber]);
  return (
  
     <div className="bg-gray-600 max-w-2xl h-[20px]">
        <div style={{ maxWidth: `${progressBar}px`, height: '20px' }} className={`bg-black  h-[20px] transition-width duration-75 ease-in-out `}></div>
      </div>
  
 
   
  )
}

export default QuestionCard
