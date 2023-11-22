import { LucideIcon } from "lucide-react";
import { cva, type VariantProps }  from "class-variance-authority";

import { cn } from "@/lib/utils";

const backgroundVariants = cva(
  "rounded-full flex items-center justify-center",
  {
    variants: {
      variant: {
        default: "bg-sky-100",
        success: "bg-emerald-100",
        warning: "bg-orange-100",
        timer: "bg-rose-100",
        level: "bg-indigo-100",
        copy: "bg-gray-100",
      },
      size: {
        default: "p-2",
        sm: "p-1",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    }
  }
);

const iconVariants = cva(
  "",
  {
    variants: {
      variant: {
        default: "text-sky-700",
        success: "text-emerald-700",
        warning: "text-orange-700",
        timer: "text-rose-700",
        level: "text-indigo-700",
        copy: "text-gray-700",
      },
      size: {
        default: "h-8 w-8",
        sm: "h-4 w-4"
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    }
  }
);

type BackgroundVariantsProps = VariantProps<typeof backgroundVariants>;
type IconVariantsProps = VariantProps<typeof iconVariants>;

interface IconBadgeProps extends BackgroundVariantsProps, IconVariantsProps {
  icon: LucideIcon;
};

export const IconBadge = ({
  icon: Icon,
  variant,
  size,
}: IconBadgeProps) => {
  return (
    <div className={cn(backgroundVariants({ variant, size }))}>
      <Icon className={cn(iconVariants({ variant, size }))} />
    </div>
  )
};