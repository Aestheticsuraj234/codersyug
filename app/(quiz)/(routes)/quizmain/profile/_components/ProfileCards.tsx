import React from "react";
import { IconBadge } from "@/components/Global/icon-badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Activity, Award, BatteryFull, CheckSquare, Timer, Trophy } from "lucide-react";
import {
  GetNumberQuizParticipated,
  GetNumberQuestionAttempted,
} from "@/server-action/quiz-profile";

const ProfileCards: React.FC<any> = async ({ participation }) => {
  const NumberQuizAttempted = await GetNumberQuizParticipated();
  const NumberQuestionAttempted = await GetNumberQuestionAttempted();

  if (!participation) {
    // Handle the case when participation is not available
    return null; // or render a loading state or an error message
  }
  console.log("Participation:", participation);
  console.log("Quiz Participations:", participation?.user?.quizParticipations);
  console.log("Question Access:", participation?.user?.questionAccess);

  const TimeNormalize = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}m:${seconds}s`;
  };

  const cardData = [
    {
      icon: Trophy,
      variant: "warning",
      description: "My Rank🏆",
      value: participation?.rank,
    },
    {
      icon: Award,
      variant: "success",
      description: "My Score",
      value: participation?.score,
    },
    {
      icon: Timer,
      variant: "timer",
      description: "Total Time Invested",
      value: TimeNormalize(participation?.totalTimeTaken),
    },
    {
      icon: Activity,
      variant: "level",
      description: "Number Of Question Attempted!",
      value: NumberQuestionAttempted ?? 0,
    },
    
    {
      icon: BatteryFull,
      variant: "copy",
      description: "Registered Quiz!",
      value: NumberQuizAttempted ?? 0,
    },
  ];

  return (
    <div className="w-full grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 mb-10">
      {cardData.map((card, index) => (
        <Card key={index} className="mt-8">
          <CardHeader className="justify-center items-center ">
            <IconBadge
              icon={card.icon}
              //@ts-ignore
              variant={card.variant}
              size={"default"}
            />
            <CardDescription>{card.description}</CardDescription>
          </CardHeader>
          <CardContent className="flex-center mt-4">
            <CardTitle>{card.value}</CardTitle>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ProfileCards;
