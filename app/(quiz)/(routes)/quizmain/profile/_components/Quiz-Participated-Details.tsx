import DetailCard from "./DetailCard";
import { getParticipatedQuizzesForCurrentUser } from "@/server-action/quiz";
import { redirect } from "next/navigation";
import { currentProfile } from "@/lib/current-profile";
import  Image from "next/image" 

const QuizParticipatedDetails = async () => {
  const profile = await currentProfile();

  if (!profile) {
    return redirect("/sign-in");
  }

  const quizzes = await getParticipatedQuizzesForCurrentUser();
  console.log(quizzes.length);

  // Check if there are no quizzes or all quizzes have no participations
  if (!quizzes || quizzes.every((quiz) => quiz.participantsCount === 0)) {
    return (
      <div className="flex-center flex-col mb-10">
        <Image
          src="/nothing.svg"
          className="w-1/2"
          alt="No quizzes"
          width={100}
          height={100}
        />
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-slate-800 font-heading dark:text-slate-200">
            No Quizzes
          </h2>
          <p className="text-slate-600 dark:text-slate-300 font-normal">
            You have not participated in any quiz yet.
          </p>
          </div>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 grid-cols-1 gap-4 px-2 py-2 rounded-md w-full">
      {quizzes.map((quiz) => (
        <DetailCard
          key={quiz?.uniqueCode}
          title={quiz?.title}
          description={quiz?.description}
          thumbnail={quiz?.thumbnail}
          dayNumber={quiz?.dayNumber}
          questions={quiz?.questionsCount}
          level={quiz?.level}
          uniqueCode={quiz?.uniqueCode}
          participation={quiz?.participantsCount}
        />
      ))}
    </div>
  );
};

export default QuizParticipatedDetails;
