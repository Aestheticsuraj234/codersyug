import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import UserInformation from "./_components/UserInfomation";
import ProfileCards from "./_components/ProfileCards";
import QuizUserParticipated from "./_components/QuizUserParticipated";
import { DataTable } from "./_components/questiontable/data-table";
import { columns } from "./_components/questiontable/column";
import { getUserAttemptedQuestions } from "@/server-action/quiz";

const Profile = async () => {
  const profile = await currentProfile();
  const data = await getUserAttemptedQuestions();

  if (!profile) {
    return redirect("/sign-in");
  }

  const participation = await db.quizParticipation.findUnique({
    where: {
      userId: profile.userId,
    },
    include: {
      user: true,
      quiz: true,
    },
  });

  // Convert the object to an array
  const dataArray = Object.values(data).map((item) => ({
    id: item?.questionId || "No ID",
    question: item?.text || "No Question",
    status: item?.accessLevel || "No Status",
    correctAnswer: item?.correctOption || "No Answer",
  }));

  return (
    <div className="mx-4">
      <UserInformation participation={participation} />
      <ProfileCards participation={participation} />
      <QuizUserParticipated />
      <div className="mx-auto py-10 w-full">
        <DataTable columns={columns} data={dataArray} />
      </div>
    </div>
  );
};

export default Profile;
