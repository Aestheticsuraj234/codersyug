import { differenceInSeconds } from "date-fns";
import DetailCard from "./DetailCard";
import { getParticipatedQuizzesForCurrentUser } from "@/server-action/quiz";
import { redirect } from "next/navigation";
import { currentProfile } from "@/lib/current-profile";

const QuizParticipatedDetails = async () => {
    const profile = await currentProfile();
  
    if (!profile) {
      return redirect("/sign-in");
    }
  
    const quizzes = await getParticipatedQuizzesForCurrentUser();
  
    return (
      <div className="grid md:grid-cols-2 grid-cols-1 gap-4 px-2 py-2 rounded-md w-full">
        {quizzes.map((quiz:any) => {
         
  
          return (
            <DetailCard
              key={quiz.uniqueCode}
              title={quiz.title}
              description={quiz.description}
              thumbnail={quiz.thumbnail}
              dayNumber={quiz.dayNumber}
              questions={quiz.questions}
            
              level={quiz.level}
              uniqueCode={quiz.uniqueCode}
              participation={quiz.participantsCount}
             
            />
          );
        })}
      </div>
    );
  };
  
  export default QuizParticipatedDetails;
  