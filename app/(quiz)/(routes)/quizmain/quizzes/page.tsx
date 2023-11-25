import React from 'react';
import { isUserVerified } from '@/server-action/hackathon';
import { redirect } from 'next/navigation';
import { CourseCard } from './_components/quiz-card';
import { getQuiz } from '@/server-action/quiz';
import ViewRuleBtn from './_components/view-rule-btn';


const Quizzes = async () => {
  const isVerified = await isUserVerified();
  if (!isVerified) {
    return redirect("/QuizEnter");
  }

  const quiz = await getQuiz();



  return (
    <>
    <div className='flex-center flex-col gap-2'>
      <ViewRuleBtn/>
    </div>
    <section className='p-6 space-y-4'>
      {quiz.length === 0 ? (
        <div className='flex-center'>
          <p className='justify-center items-center flex '>Nothing to show🔥</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
          {quiz.map((quiz) => (
            <CourseCard
              key={quiz.uniqueCode}
              title={quiz.title}
              thumbnail={quiz.thumbnail}
              dayNumber={quiz.dayNumber}
              // @ts-ignore
              questions={quiz.questions}
              startTime={quiz.startDate}
              endTime={quiz.endDate}
              level={quiz.level}
              uniqueCode={quiz.uniqueCode}
            />
          ))}
        </div>
      )}
    </section>
    </>
  );
}

export default Quizzes;
