import { Calendar, Dumbbell, MoveRight, UserCircle2 } from 'lucide-react';
import Link from 'next/link';
import { format, parseISO } from 'date-fns';
import { IconBadge } from '@/components/Global/icon-badge';



const DetailCard = ({
  title,
  description,
  uniqueCode,
  participation,
  questions,

  level
}: any) => {


  return (
    <Link
      href={`/quiz/${uniqueCode}`}
      className="relative flex flex-col items-center gap-5 p-5 sm:p-6 overflow-hidden bg-transparent border border-slate-200 rounded-2xl sm:flex-row hover:border-slate-300 dark:hover:border-slate-600 dark:border-slate-800/80"
    >
      <div className="flex flex-col justify-between gap-4 w-full">
        <div className="flex flex-col w-full gap-3">
          <div className="flex flex-row flex-wrap sm:flex-nowrap gap-2 text-sm text-slate-600 dark:text-slate-300">
            <div className="flex flex-row gap-2">
              <span className="text-slate-500 dark:text-slate-400">
                <IconBadge size="sm" icon={Dumbbell} variant={"level"} />
              </span>
              <span className="font-semibold">
                {level}
              </span>
            </div>
            <span className="text-slate-200 dark:text-slate-800">|</span>
            <div className="flex flex-row gap-2">
              {/* Add your timer logic here */}
              <span className="font-medium">Number Of Questions</span>
              <div className="text-emerald-500 font-semibold">
                {questions}
              </div>
            </div>
          </div>
          <h2 className="mb-1 text-2xl font-bold text-slate-800 font-heading dark:text-slate-200">
            {title}
          </h2>
          <p className="text-slate-600 dark:text-slate-300 font-normal">
            {description.slice(0, 110)}...
          </p>
        </div>
        <div className="flex flex-row items-center justify-end w-full gap-5">
          <div className="flex flex-col items-start flex-1 gap-2 text-sm">
            <div className="flex md:flex-row flex-col items-center font-medium gap-2 text-slate-600 dark:text-slate-300">
              <UserCircle2 size={24} />
              <span className="flex ">{participation} participating</span>
            </div>
          </div>
          <div className="flex flex-row justify-start xl:justify-end">
            <Link
              href={`/quiz/${uniqueCode}`}
              className="rounded-full flex text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-800 hover:dark:border-slate-700 hover:bg-slate-50 hover:dark:bg-slate-800 focus:ring focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-800 disabled:bg-white disabled:border-slate-200 disabled:cursor-not-allowed disabled:text-slate-300 disabled:dark:bg-slate-950 disabled:dark:border-slate-800 disabled:dark:text-slate-800 text-xs py-1.5 px-4 items-center"
            >
              <span className="pr-1.5">Let's Start</span>
              <MoveRight size={24} />
            </Link>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default DetailCard;
