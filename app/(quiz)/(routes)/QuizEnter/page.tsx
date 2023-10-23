import QuizLobbyEnter from '@/components/Quiz/quiz-code-lobby'
import { currentProfile } from '@/lib/current-profile'
import { redirect } from 'next/navigation';
import React from 'react'

const QuizEnter = async () => {
  const profile = await currentProfile();
  if (!profile) return (
    redirect("/sign-in")
  )
  return (
    <>
      <QuizLobbyEnter />
    </>
  )
}

export default QuizEnter