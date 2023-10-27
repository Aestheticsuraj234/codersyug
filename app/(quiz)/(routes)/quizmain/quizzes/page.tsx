import React from 'react';
import { isUserVerified } from '@/server-action/hackathon';
import { redirect } from 'next/navigation';
import { CourseCard } from './_components/quiz-card';
import { getQuiz } from '@/server-action/quiz';

const sampleQuiz = [
  {
    uniqueCode: '2W9UqGJ8Mx2W2qEZgEmo6bAf9Ze-3d4a2a3a',
    title: 'Basic of Python',
    thumbnail: 'https://cloud.appwrite.io/v1/storage/buckets/64e6ef5650a3bc944e6f/files/6538aed9d44acfdcacdf/view?project=64d3707fc8db92bf44ff&mode=admin',
    description:"This is a basic quiz for python.",
    dayNumber: 1,
    questions: 10,
    startTime: new Date("2023-10-25"), // Set a different start date and time
    level: 'Beginner'
  },
  {
    uniqueCode: '2W9Q4uiXZIbom8zaacoaa9HU6sX-96770825',
    title: 'Advanced Python',
    thumbnail: 'https://cloud.appwrite.io/v1/storage/buckets/64e6ef5650a3bc944e6f/files/6538aed9d44acfdcacdf/view?project=64d3707fc8db92bf44ff&mode=admin',
    dayNumber: 2,
    description:"This is a basic quiz for python.",
    questions: 10,
    startTime: new Date("2023-10-26"), // Set a different start date and time
    level: 'Advanced'
  },
  {
    uniqueCode: '2W9Q4uiXZIbom8zaacoaa9HU6sX-96770823',
    title: 'Intermediate Python',
    thumbnail: 'https://cloud.appwrite.io/v1/storage/buckets/64e6ef5650a3bc944e6f/files/6538aed9d44acfdcacdf/view?project=64d3707fc8db92bf44ff&mode=admin',
    description:"This is a basic quiz for python.",
    dayNumber: 3,
    questions: 10,
    startTime: new Date("2023-10-27"), // Set a different start date and time
    level: 'Intermediate'
  },
  {
    uniqueCode: '2W9Q4uiXZIbom8zaacoaa9HU6sX-96770805',
    title: 'Python for Beginners',
    thumbnail: 'https://cloud.appwrite.io/v1/storage/buckets/64e6ef5650a3bc944e6f/files/6538aed9d44acfdcacdf/view?project=64d3707fc8db92bf44ff&mode=admin',
    dayNumber: 4,
    description:"This is a basic quiz for python.",
    questions: 10,
    startTime: new Date("2023-10-28"), // Set a different start date and time
    level: 'Beginner'
  },
  {
    uniqueCode: '2W9Q4uiXZIbom8oaacoaa9HU6sX-96770825',
    title: 'Basic of Html',
    thumbnail: 'https://cloud.appwrite.io/v1/storage/buckets/64e6ef5650a3bc944e6f/files/6538aed9d44acfdcacdf/view?project=64d3707fc8db92bf44ff&mode=admin',
    dayNumber: 5,
    description:"This is a basic quiz for python.",
    questions: 10,
    startTime: new Date("2023-10-29"), // Set a different start date and time
    level: 'Beginner'
  }
]

const Quizzes = async () => {
  const isVerified = await isUserVerified();
  if (!isVerified) {
    return (
      redirect("/QuizEnter")
    )
  }

  const quiz = await getQuiz();
  

  return (
    <section className='p-6 space-y-4'>
      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
        {quiz.map((quiz) => (
          <CourseCard
            key={quiz.uniqueCode}
            title={quiz.title}
            thumbnail={quiz.thumbnail}
            dayNumber={quiz.dayNumber}
            questions={quiz.questions.length}
            startTime={quiz.startDate}
            endTime = {quiz.endDate}
            level={quiz.level}
            uniqueCode={quiz.uniqueCode}
           
          />
        ))}
      </div>
    </section>
  )
}

export default Quizzes;
