"use client"
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { BrainCircuit, Code2, Sunrise, Timer } from "lucide-react";
import { IconBadge } from "@/components/Global/icon-badge";
import Alert from "@/components/Global/alert";
import { useRouter } from "next/navigation";

interface CourseCardProps {
  uniqueCode: string;
  title: string;
  thumbnail: string;
  dayNumber: number;
  questions: number;
  startTime: Date;
  level: string;
}

export const CourseCard = ({
  uniqueCode,
  title,
  thumbnail,
  dayNumber,
  questions,
  startTime,
  level
}: CourseCardProps) => {
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [quizStatus, setQuizStatus] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const now = new Date();
    const endTime = new Date(startTime);
    const timeDiff = endTime.getTime() - now.getTime();

    if (timeDiff < 0) {
      setQuizStatus("Quiz Ended");
      setIsMounted(true);
    } else if (timeDiff > 0 && timeDiff <= 86400000) {
      setQuizStatus("Start Quiz");
      setIsMounted(true);
    } else {
      const hoursLeft = Math.floor(timeDiff / 3600000);
      setQuizStatus(`Coming Soon.`);
      setIsMounted(true);
    }

    setTimeLeft(timeDiff);
  }, [startTime]);

  // Update the timer every second
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1000);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  const formatTimeLeft = () => {
    const hours = Math.floor(timeLeft / 3600000);
    const minutes = Math.floor((timeLeft % 3600000) / 60000);
    const seconds = Math.floor((timeLeft % 60000) / 1000);

    if (timeLeft <= 0) {
      return '00 h 00 m 00 s';
    }

    return `${hours} h ${minutes} m ${seconds} s`;
  };

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <div className="group hover:shadow-sm transition overflow-hidden border rounded-lg p-3 h-full">
        <div className="relative w-full aspect-video rounded-md overflow-hidden">
          <Image fill className="object-cover" alt={title} src={thumbnail} />
        </div>
        <div className="flex flex-col pt-2">
          <div className="text-lg md:text-base flex flex-row justify-between w-full font-medium group-hover:text-sky-700 transition line-clamp-2">
            {title}
          </div>
          <p className="text-xs text-muted-foreground">
            Number Of Day - {dayNumber}
          </p>
          <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
            <div className="flex items-center gap-x-1 text-slate-500">
              <IconBadge size="sm" icon={Code2} variant={"level"} />
              <span>{level}</span>
            </div>
          </div>
          <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
            <div className="flex items-center gap-x-1 text-slate-500">
              <IconBadge size="sm" icon={BrainCircuit} variant={"success"} />
              <span>
                {questions} {questions === 1 ? "Question" : "Questions"}
              </span>
            </div>
          </div>
          <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
            <div className="flex items-center gap-x-1 text-slate-500">
              <IconBadge size="sm" icon={Sunrise} variant={"warning"} />
              <span>Day-{dayNumber}</span>
            </div>
          </div>
          <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
            <div className="flex items-center gap-x-1 text-slate-500">
              <IconBadge size="sm" icon={Timer} variant={"timer"} />
              <span>Ends-in {formatTimeLeft()}</span>
            </div>
          </div>
          {quizStatus === "Quiz Ended" ? (
            <Alert
              triggertext="Quiz Ended"
              title="Quiz Ended🥇"
              description="The quiz has ended. You can no longer take the quiz."
              classNames="bg-red-500 text-white py-1 px-3 rounded-md"
            />

          ) : quizStatus === "Start Quiz" ? (
            <button onClick={() => router.push(`/quizmain/quizzes/${uniqueCode}`)} className="bg-emerald-400 hover:bg-emerald-600 text-white py-1 px-3 rounded-md flex-1">
              Start Quiz
            </button>
          ) : (
            <button
              disabled
              className="bg-slate-400 text-white py-1 disabled:cursor-not-allowed px-3 rounded-md">
              {quizStatus}
            </button>
          )}
        </div>
      </div>
    </>
  );
};
