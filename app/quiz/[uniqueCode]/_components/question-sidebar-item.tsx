"use client"
import React from 'react';
import { CheckCircle, Lock, PlayCircle } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';

import { AccessLevel } from '@prisma/client';
import { Separator } from '@/components/ui/separator';


interface QuestionSidebarItemProps {
  id: string;
  uniqueCode: string | null;
  isLocked: boolean;
  title: string | null;
  accessLevel: AccessLevel | null;
}

export const QuestionSidebarItem = ({
  title,
  id,
  uniqueCode,
  isLocked,
  accessLevel,
}: QuestionSidebarItemProps) => {
  const pathname = usePathname();
  const router = useRouter();


  const isActive = pathname?.includes(id);
  const Icon = isLocked ? Lock : (accessLevel === AccessLevel.ANSWERED ? CheckCircle : PlayCircle);

  const onClick = () => {
    router.push(`/quiz/${uniqueCode}/questions/${id}`);
  };



  return (
     <>
      <button
        type="button"
        disabled={isLocked}
        onClick={onClick} 
        className={cn(
          'flex items-center gap-x-2 text-slate-500 dark:text-slate-100 text-sm font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20',
          isActive && 'text-slate-700 bg-slate-200/20 hover:bg-slate-200/20 hover:text-slate-700',
          isLocked && 'cursor-not-allowed bg-indigo-100',
        )}
      >
        <div className="flex items-start justify-start gap-x-2 py-4">
          <Icon
            size={22}
            className={cn('text-slate-500 dark:text-green-50' , isActive && 'text-slate-700', isLocked && 'text-indigo-500')}
          />
          {title ? (title.length > 30 ? title.slice(0, 40) + '...' : title) : ''}
        </div>
        <div
          className={cn('ml-auto opacity-0 border-2 border-slate-700 dark:border-emerald-300 h-full transition-all', isActive && 'opacity-100')}
        />
      </button>
      <Separator
        className={cn(isActive && 'bg-slate-700 dark:bg-slate-50', isLocked && 'bg-slate-200')}
      />
 </>
  );
};
