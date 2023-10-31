"use client";
import React from 'react';
import { CheckCircle, Lock, PlayCircle } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { cn } from '@/lib/utils';
import { questionAccessType } from '@/server-action/quiz';
import { AccessLevel } from '@prisma/client';

interface QuestionSidebarItemProps {
  id: string;
  uniqueCode: string | null;
  isLocked: boolean;
  title: string | null;

}

export const QuestionSidebarItem = ({
  title,
  id,
  uniqueCode,
  isLocked,

}: QuestionSidebarItemProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const [isAnswer, setIsAnswer] = React.useState<boolean>(false);


  const isActive = pathname?.includes(String(id));

  const onClick = () => {
    router.push(`/quiz/${uniqueCode}/questions/${id}`);
  };

  const isAnswered = async ()=>{
    const res = await questionAccessType(id);
    if(res === AccessLevel.ANSWERED){
      setIsAnswer(true)
    }
    return res;
  }

  useEffect(()=>{
    isAnswered()
  },[id])

  const Icon = isLocked ? Lock : isAnswer ? CheckCircle : PlayCircle;
  

  return (
    <button
      onClick={onClick}
      type="button"
      disabled={isLocked} // Disable the item if it's locked
      className={cn(
        'flex items-center gap-x-2 text-slate-500 text-sm font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20',
        isActive && 'text-slate-700 bg-slate-200/20 hover:bg-slate-200/20 hover:text-slate-700',
        isLocked && 'cursor-not-allowed  bg-rose-100 ', // Make the item clickable only if it's locked
      )}
    >
      <div className="flex items-start justify-start gap-x-2 py-4 ">
        <Icon
          size={22}
          className={cn('text-slate-500', isActive && 'text-slate-700' , isLocked && 'text-rose-500')}
        />
        {title ? (title.length > 30 ? title.slice(0, 40) + '...' : title) : ''}
      </div>
      <div
        className={cn(
          'ml-auto opacity-0 border-2 border-slate-700 h-full transition-all',
          isActive && 'opacity-100'
        )}
      />
    </button>
  );
};
