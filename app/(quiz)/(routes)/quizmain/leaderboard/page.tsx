import Link from "next/link";



import { columns } from "../_components/leaderbardTable/columns";
import { DataTable } from "../_components/leaderbardTable/data-table";
import Image from "next/image";

import LeaderBoard from "../_components/LeaderBoard";

import { getAllParticipants } from "@/server-action/quiz";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Terminal } from "lucide-react";


const Leaderboard = async() => {
  const LeaderBoardData = await getAllParticipants()
  return (
    
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
           LeaderBoardData.map((item) => {
             return {
               rank: item.rank,
               name: item.user.name,
               email: item.user.email,
               score: item.score,
               imageUrl: item.user.imageUrl
             }
           })
         } />

       </div>

     </div>
  )
}

export default Leaderboard