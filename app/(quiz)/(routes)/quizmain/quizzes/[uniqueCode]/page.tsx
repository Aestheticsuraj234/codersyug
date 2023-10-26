import React from 'react';
import  Link  from 'next/link'; // Use the appropriate router library
import {
 
  
    BrainCircuit,
  Github,
  Youtube,
} from 'lucide-react';
import {BsWhatsapp,BsInstagram, BsTelegram}     from 'react-icons/bs';
const QuizDetailPage = ({
    params: { uniqueCode }
}: {
    params: { uniqueCode: string }
}) => {
  return (
    <div className="p-6 max-w-screen-2xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="order-2 lg:order-1 col-span-1 lg:col-span-3 flex flex-col space-y-6">
          <div className="border rounded-md p-6">
            <div className="flex items-center gap-x-2 mb-1">
              <div className="rounded-full flex items-center justify-center bg-emerald-100 p-1">
                <BrainCircuit  className="text-emerald-500 h-4 w-4" />
              </div>
              <span className="text-xs text-muted-foreground">10 Questions</span>
            </div>
            <h3 className="font-semibold text-lg md:text-2xl mb-2 capitalize">
              Fullstack Javascript Quiz
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit quo inventore nemo id tempora sed est ipsa minus sequi libero ut ad quasi delectus velit praesentium, vitae voluptate aspernatur. Illo?
            </p>
            <div className="flex gap-1 flex-wrap">
              <div className="border-indigo-300 border-2 bg-indigo-100 px-2.5 py-0.5 text-xs transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground font-semibold rounded-md text-center flex items-center justify-center">
                Day-1
              </div>
              <div className="border-rose-300 border-2 bg-rose-100 px-2.5 py-0.5 text-xs transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground font-semibold rounded-md text-center flex items-center justify-center">
                Beginner
              </div>
             
            </div>
          </div>
          <div className="flex gap-x-2 items-center">
            <Link
              href="https://chat.whatsapp.com/L5zr51Y9gUd8gyqs6f2SpI"
              target="_blank"
              className="hover:opacity-75 transition w-full p-4 border rounded-md flex flex-col items-center gap-y-2"
            >
              <BsWhatsapp size={30} className="text-[#25d366]" />
              <span className="text-xs text-muted-foreground">WhatsApp</span>
            </Link>
            <Link
              href="https://www.instagram.com/codersyug.dev/"
              target="_blank"
              className="cursor-pointer hover:opacity-75 transition w-full p-4 border rounded-md flex flex-col items-center gap-y-2"
            >
              <BsInstagram size={30} className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white rounded-md"  />
              <span className="text-xs text-muted-foreground">Instagram</span>
            </Link>
            <Link
              href="https://t.me/codersyug_dev"
              target='_blank'

              className="cursor-pointer hover:opacity-75 transition w-full p-4 border rounded-md flex flex-col items-center gap-y-2"
            >
              <BsTelegram size={30} className="text-[#24A1DE]" />
              <span className="text-xs text-muted-foreground">Telegram</span>
            </Link>
          </div>
        </div>
        <div className="order-1 lg:order-2 lg:col-span-2 flex flex-col space-y-6">
          <div className="border rounded-md p-6 text-secondary bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-sky-900 via-sky-950 to-gray-900">
            <div className="mb-7">
              <h4 className="font-semibold text-xl mb-4">
                Start the quiz
              </h4>
              <p className="text-sm text-neutral-200">
                After you start the quiz, you cannot pause it❌. Are you sure you want to start the quiz?🥇
              </p>
            </div>
            <button
              className="inline-flex items-center justify-center text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground hover:bg-secondary/80 h-9 rounded-md px-3 w-full"
              type="button"
            >
                    Start For Free
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizDetailPage;
