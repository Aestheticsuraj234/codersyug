"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { useEffect, useState } from "react";

export function AlertDialogDemo() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const RuleArray = [
    {
      id: 1,
      rule: "Single Registration",
      ruleDescription:
        "🔒 One user can register with a unique email ID. Attempting the quiz with multiple IDs by the same user leads to disqualification.",
    },
    {
      id: 2,
      rule: "Window Screen Limit",
      ruleDescription:
        "🖥️ Ensure you stay within the window screen during the quiz. Going outside more than three times results in disqualification.",
    },
    {
      id: 3,
      rule: "Consecutive Question Attempt",
      ruleDescription:
        "🧠 Questions must be attempted consecutively. Skipping or revisiting questions out of order may lead to a disqualified quiz.",
    },
    {
      id: 4,
      rule: "Additional Note",
      ruleDescription:
        "🚫 Any form of cheating or unauthorized assistance during the quiz will result in immediate disqualification.",
    },
    {
      id: 5,
      rule: "Additional Note",
      ruleDescription:
        "🕒 Be mindful of the time limit for each question. Late submissions may not be considered.",
    },
  ];

  useEffect(() => {
    setIsDialogOpen(true);
  }, []);

  return (
    <div className="max-h-screen paddings">
    <AlertDialog
      open={isDialogOpen}
      onOpenChange={(isOpen) => {
        setIsDialogOpen(isOpen);
      }}
   
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>🌐 Quiz-Wuiz Rules:</AlertDialogTitle>
          <AlertDialogDescription>
            {RuleArray.map((rule) => (
              <div key={rule.id} className="flex-start mb-2 mt-2 flex-col">
                <h1 className="text-lg font-bold">{rule.rule}</h1>
                <p className="text-base font-normal"> {rule.ruleDescription}</p>
              </div>
            ))}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    </div>
  );
}
