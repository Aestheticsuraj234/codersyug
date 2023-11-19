import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import UserInfomation from "./_components/UserInfomation";
import ProfileCards from "./_components/ProfileCards";
import QuizUserParticipated from "./_components/QuizUserParticipated";
import { DataTable } from "./_components/questiontable/data-table";
import { columns } from "./_components/questiontable/column";
import { getUserAttemptedQuestions } from "@/server-action/quiz";

const Profile = async () => {
  const profile = await currentProfile();

  const Data = await getUserAttemptedQuestions();
  if (!profile) {
    return redirect("/sign-in");
  }

  // Use optional chaining (?.) to handle the possibility of null
  const Participation = await db.quizParticipation.findUnique({
    where: {
      userId: profile.userId,
    },
    include: {
      user: true,
      quiz: true,
    },
  });

  return (
    <div className="mx-4">
      <UserInfomation participation={Participation} />
      <ProfileCards participation={Participation} />
      <QuizUserParticipated />
      <div className="mx-auto py-10 w-full">
        <DataTable
          columns={columns}
          data={Data.map((item, index) => {
            return {
              question: item.text,
              accesslevel: item.accessLevel,
            };
          })}
        />
      </div>
    </div>
  );
};

export default Profile;
