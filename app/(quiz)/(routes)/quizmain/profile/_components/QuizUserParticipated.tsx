import React from "react";

import QuizParticipatedDetails from "./Quiz-Participated-Details";

const QuizUserParticipated:React.FC<any> = () => {
  return (
    <div className="mt-10 w-full">
      <h1 className="text-2xl font-bold text-gray-700 dark:text-gray-50 mb-3">
        Quiz You are Currently Participated🥇🤘
      </h1>
      <QuizParticipatedDetails  />
    </div>
  );
};

export default QuizUserParticipated;
