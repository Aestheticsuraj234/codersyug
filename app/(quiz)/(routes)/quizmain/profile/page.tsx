import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import UserInfomation from "./_components/UserInfomation";
import ProfileCards from "./_components/ProfileCards";
import QuizUserParticipated from "./_components/QuizUserParticipated";

const Profile = async () => {
  const profile = await currentProfile();

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

    </div>
  );
};

export default Profile;