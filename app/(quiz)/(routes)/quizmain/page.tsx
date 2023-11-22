import Link from "next/link";

import DigitalHackathonTimer from "./_components/DigitalClock";
import ImageBanner from "./_components/ImageBanner";
import PrizeBox from "./_components/PrizeBox";
import { columns } from "./_components/leaderbardTable/columns"
import { DataTable } from "./_components/leaderbardTable/data-table"
import Image from "next/image";
import DashboardCalender from "./_components/Calender";
import LeaderBoard from "./_components/LeaderBoard";

import { getAllParticipants } from "@/server-action/quiz";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Terminal } from "lucide-react";





const Dashboard = async () => {
  const LeaderBoardData = await getAllParticipants()
  return (
    <div className="h-screen">
      <ImageBanner />
      <div className="flex justify-start items-start flex-col px-10 mt-8">
        <div className="flex justify-start items-start flex-col w-full">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-600 dark:from-green-600 via-gray-700 dark:via-yellow-400 to-black dark:to-emerald-500 bg-clip-text text-transparent">
            Best Prizes for the Best Quizzes
          </h1>
          <div className="mt-10 w-full">
            <PrizeBox />
          </div>
          {/* timer-card */}
          <div className="mt-10 w-full mb-10">
            <h1 className="
              text-2xl font-bold bg-gradient-to-r  from-gray-600 dark:from-green-600 via-gray-700 dark:via-yellow-400 to-black dark:to-emerald-500 bg-clip-text text-transparent
              mb-10
              text-center
            ">
              Time Remaining
            </h1>
            <DigitalHackathonTimer />
            <div className="flex justify-center">
              <Link href={"https://chat.whatsapp.com/FSRSe9N8jte5TqZ8aR0QeF"}>
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
          <div className="mt-10 w-full mb-10 relative flex-center overflow-hidden  bg-[url('/bg_date.jpg')] dark:bg-[url('/bg_date2.jpg')] bg-cover bg-center px-4 py-4  flex   rounded-md ">
            <DashboardCalender />
          </div>

          {/* Sponserships */}
          
         
          <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-600 dark:from-green-600 via-gray-700 dark:via-yellow-400 to-black dark:to-emerald-500 bg-clip-text text-transparent">
            Our Sponsors
          </h1>
          <Link id="sponsors" href={"https://www.bcacodewala.com/shop/master-html-to-react-ebook-fb/"} className="flex w-full flex-col sm:mt-6 sm:flex-row">
                <div className="flex flex-col gap-6 rounded-md border border-b-0 border-black-400 bg-black-200 sm:h-[320px] sm:w-1/2 sm:min-w-[404px] sm:justify-center sm:rounded-r-none sm:border-b sm:border-r-0">
                    <p className="text-green-500 ml-2 mt-5 self-center uppercase tracking-[2px] sm:ml-16 sm:mt-2 sm:self-start">Bonus #1 - Ebook (1000+ pages)</p>
                    <h2 className="text-2xl ml-2 max-w-md text-center sm:ml-16 sm:text-left">Master HTML to React</h2>
                </div>
                <div className="relative h-[320px] w-full overflow-hidden rounded-md rounded-t-none border border-t-0 border-black-400 bg-black-200 sm:w-2/3 sm:rounded-l-none sm:border-l-0 sm:border-t">
                    <div className="relative ml-12 h-[320px] w-full sm:ml-0 ">
                        <img
                            alt="bonuses"
                            loading="lazy"
                            decoding="async"
                            data-nimg="fill"
                            className="object-cover object-left"
                            sizes="100vw"
                            src="https://cloud.appwrite.io/v1/storage/buckets/64e6ef5650a3bc944e6f/files/653f72e5af748adf644e/view?project=64d3707fc8db92bf44ff&mode=admin"
                            style={{ position: 'absolute', height: '100%', width: '100%', inset: '0px', color: 'transparent' }}
                        />
                    </div>
                </div>
            </Link>


          
          {/* Leaderboard */}
          <div className="mt-10 w-full mb-10">
            <h1 className="
              text-2xl font-bold bg-gradient-to-r  from-gray-600 dark:from-green-600 via-gray-700 dark:via-yellow-400 to-black dark:to-emerald-500 bg-clip-text text-transparent
              mb-10
              text-center
            ">
              Leaderboard
            </h1>


          


            <div className="flex justify-center">  
            <LeaderBoard />
            </div>

            <div className="mx-auto py-10 w-full">
              <DataTable columns={columns} data={
                LeaderBoardData.map((item, index) => {
                  return {
                    rank: item.rank,
                    name: item.user.name,
                    email: item.user.email,
                    score: item.score,
                    imageUrl: item.user.imageUrl,
                    totalTimeTaken: item.totalTimeTaken
                  }
                })
              } />

            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
