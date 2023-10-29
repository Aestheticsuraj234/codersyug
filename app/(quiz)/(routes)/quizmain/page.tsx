import Link from "next/link";
import DigitalHackathonTimer from "./_components/DigitalClock";
import ImageBanner from "./_components/ImageBanner";
import PrizeBox from "./_components/PrizeBox";
import { LeaderBoards, columns } from "./_components/leaderbardTable/columns"
import { DataTable } from "./_components/leaderbardTable/data-table"
import Image from "next/image";
import DashboardCalender from "./_components/Calender";
import LeaderBoard from "./_components/LeaderBoard";
import { sampleLeaderboardData } from './_components/leaderboardData';
async function getData(): Promise<LeaderBoards[]> {
 
  return sampleLeaderboardData
}
const Dashboard = async () => {
  const data = await getData()
  return (
    <div className="h-screen">
      <ImageBanner />
      <div className="flex justify-start items-start flex-col px-10 mt-8">
        <div className="flex justify-start items-start flex-col w-full">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-600 via-gray-700 to-black bg-clip-text text-transparent">
            Best Prizes for the Best Quizzes
          </h1>
          <div className="mt-10 w-full">
            <PrizeBox />
          </div>
          {/* timer-card */}
          <div className="mt-10 w-full mb-10">
            <h1 className="
              text-2xl font-bold bg-gradient-to-r from-gray-600 via-gray-700 to-black bg-clip-text text-transparent
              mb-10
              text-center
            ">
              Time Remaining
            </h1>
            <DigitalHackathonTimer />
            <div className="flex justify-center">
              <Link href={"https://chat.whatsapp.com/L5zr51Y9gUd8gyqs6f2SpI"}>
                <button
                  className="
                  mt-10
                  bg-gradient-to-r from-green-500 to-green-700
                  text-white
                  px-4 py-2
                  rounded-md
                  text-lg
                  font-bold
                  hover:opacity-90
                "
                >
                  Join Our WhatsApp Group for Updates
                </button>
              </Link>
            </div>
          </div>
          {/* Remaining Time */}
          <div className="mt-10 w-full mb-10 relative flex-center overflow-hidden  bg-[url('/bg_date.jpg')] bg-cover bg-center px-4 py-4  flex   rounded-md ">
            <DashboardCalender />
          </div>
          {/* Leaderboard */}
          <div className="mt-10 w-full mb-10">
            <h1 className="
              text-2xl font-bold bg-gradient-to-r from-gray-600 via-gray-700 to-black bg-clip-text text-transparent
              mb-10
              text-center
            ">
              Leaderboard
            </h1>
            <div className="flex justify-center">
              <LeaderBoard />
            </div>

            <div className="mx-auto py-10 w-full">
                <DataTable columns={columns} data={data} />
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
