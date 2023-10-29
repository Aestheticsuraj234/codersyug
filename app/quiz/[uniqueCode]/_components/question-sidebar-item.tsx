"use client";

import { CheckCircle, Lock, PlayCircle } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";

interface QuestionSidebarItemProps {
 
  id: string;
  uniqueCode: string |null;
  isLocked: boolean;
  title:string |null
};

export const QuestionSidebarItem = ({
  title,
  id,
  uniqueCode,
  isLocked,
}: QuestionSidebarItemProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = pathname?.includes(String(id));

  const onClick = () => {
    router.push(`/quiz/${uniqueCode}/questions/${id}`);
  }
  const Icon = isLocked ? Lock : isActive ? CheckCircle : PlayCircle;

  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        "flex items-center gap-x-2 text-slate-500 text-sm font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20",
        isActive && "text-slate-700 bg-slate-200/20 hover:bg-slate-200/20 hover:text-slate-700",
      )}
    >
      <div className="flex items-center gap-x-2 py-4">
        <Icon
          size={22}
          className={cn(
            "text-slate-500",
            isActive && "text-slate-700",
          )}
        />
        {title}
      </div>
      <div className={cn(
        "ml-auto opacity-0 border-2 border-slate-700 h-full transition-all",
        isActive && "opacity-100"
      )} />
    </button>
  )
}