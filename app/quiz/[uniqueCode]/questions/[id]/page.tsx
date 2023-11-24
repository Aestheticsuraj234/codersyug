"use client";
// ###################################_______________________IMPORTS_______________________###################################
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Loader2, Timer } from "lucide-react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CheatingByCurrentUser,
  GetNumberOfQuestions,
  getCurrentUserQuestionAccessLevel,
  getQuestionById,
  modifyQuestionAccessTypeByCurrentUser,
} from "@/server-action/quiz";
import { IconBadge } from "@/components/Global/icon-badge";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { AppContext } from "@/context/GlobalContext";
import { AccessLevel } from "@prisma/client";
import { cn } from "@/lib/utils";
import axios from "axios";

const FormSchema = z.object({
  Option: z.string(),
});

const QuestionIdPage = ({
  params,
}: {
  params: { uniqueCode: any; id: any };
}) => {
  // ###################################_______________________USE STATES_______________________###################################
  const { quiz } = useContext(AppContext);
  const { toast } = useToast();

  const { setAnsweredQuestions, answeredQuestions ,  questionTimer, setQuestionTimer} = quiz;
  const [question, setQuestion] = useState<any>();
  const [nextQuestion, setNextQuestion] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLastQuestion, setIsLastQuestion] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isAnswering, setIsAnswering] = useState(false);
  const [TotalQuestions, setTotalQuestions] = useState<number>(0);
  const [isLocked, setIsLocked] = useState<boolean>(false);


  const [userAccessLevel, setUserAccessLevel] = useState<any>(
    AccessLevel.LOCKED
  );
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(true);
  const router = useRouter();

  // !###################################___________FUNCTIONS____________###################################

  const getQuestion = async () => {
    setIsLoading(true);
    try {
  
      // @ts-ignore
      const { question, nextQuestion } = await getQuestionById(
        params.id,
        params.uniqueCode
      );
      setQuestion(question);
      setNextQuestion(nextQuestion);
      setQuestionTimer(question?.timer || null);
    } catch (error) {
      console.error("Error fetching question:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getUserAccessLevel = async () => {
    try {
      const accessLevel = await getCurrentUserQuestionAccessLevel(params.id);
      setUserAccessLevel(accessLevel);
    } catch (error) {
      console.error("Error fetching user access level:", error);
    }
  };

  const getNumberOfQuestions = async () => {
    try {
      const numberOfQuestions = await GetNumberOfQuestions(params.uniqueCode);
      setTotalQuestions(numberOfQuestions);
    } catch (error) {
      console.error("Error fetching number of questions:", error);
    }
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const actualTimeTaken =
    question?.timer != null && questionTimer != null
      ? question?.timer - questionTimer
      : null;

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      // Stop the timer immediately
      setIsTimerRunning(false);

      setIsAnswering(true);

      // Update answeredQuestions array with the current question's data
      const updatedAnsweredQuestions = [
        ...answeredQuestions,
        { question, answer: data.Option, timeTaken: actualTimeTaken },
      ];

      // Case 1: Answering a question
      setAnsweredQuestions(updatedAnsweredQuestions);

      // Update access level for the current question
      await modifyQuestionAccessTypeByCurrentUser(
        params.id,
        AccessLevel.ANSWERED
      );

      if (nextQuestion) {
        // Case 2: Moving to the next question
        router.push(`/quiz/${params.uniqueCode}/questions/${nextQuestion.id}`);
        await modifyQuestionAccessTypeByCurrentUser(
          nextQuestion.id,
          AccessLevel.UNLOCKED
        );
      } else if (!nextQuestion) {
        // Case 3: Submitting the last question
        setIsLastQuestion(true);

        // Log the updated answeredQuestions array
        console.log(
          "Updated Answered-Question:",
          JSON.stringify(updatedAnsweredQuestions)
        );

        // Update state to ensure it's synchronous
        setAnsweredQuestions(updatedAnsweredQuestions);
        setIsAnswering(true);

        try {
          // Make the API call with the updated answeredQuestions array
          const res = await axios.post("/api/quiz/submit", {
            uniqueCode: params.uniqueCode,
            answeredQuestions: updatedAnsweredQuestions,
          });
          setIsAnswered(true);

          if (res.status === 201) {
            setIsAnswering(false);
            toast({
              title: "Quiz Submitted Successfully",
              description: "Redirecting.... to your profile.",
            });
            router.push("/quizmain/profile");
          } else {
            toast({
              title: "Uh oh! Something went wrong.",
              description: "There was a problem with your request.",
            });
            form.reset();
          }
        } catch (error) {
          console.error("Error submitting quiz:", error);
        } finally {
          setIsAnswering(false);
        }
      }
    } catch (error) {
      console.error("Error submitting:", error);
    }
  }

  const handleTimeout = async () => {
    if (!isAnswered) {
      try {
        setIsAnswering(true);

        // Update answeredQuestions array with the current question's data
        const updatedAnsweredQuestions = [
          ...answeredQuestions,
          { question, answer: "", timeTaken: null },
        ];

        // Case 1: Answering a question
        setAnsweredQuestions(updatedAnsweredQuestions);

        // Update access level for the current question
        await modifyQuestionAccessTypeByCurrentUser(
          params.id,
          AccessLevel.ANSWERED
        );

        if (nextQuestion) {
          // Case 2: Moving to the next question
          router.push(
            `/quiz/${params.uniqueCode}/questions/${nextQuestion.id}`
          );
          await modifyQuestionAccessTypeByCurrentUser(
            nextQuestion.id,
            AccessLevel.UNLOCKED
          );
        } else if (!nextQuestion) {
          // Case 3: Submitting the last question
          setIsLastQuestion(true);

          // Log the updated answeredQuestions array
          console.log(
            "Updated Answered-Question:",
            JSON.stringify(updatedAnsweredQuestions)
          );

          // Update state to ensure it's synchronous
          setAnsweredQuestions(updatedAnsweredQuestions);
          setIsAnswering(true);

          try {
            // Make the API call with the updated answeredQuestions array
            const res = await axios.post("/api/quiz/submit", {
              uniqueCode: params.uniqueCode,
              answeredQuestions: updatedAnsweredQuestions,
            });
            setIsAnswered(true);

            if (res.status === 201) {
              setIsAnswering(false);
              toast({
                title: "Quiz Submitted Successfully",
                description: "Redirecting.... to your profile.",
              });
              router.push("/quizmain/profile");
            } else {
              toast({
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request.",
              });
              form.reset();
            }
          } catch (error) {
            console.error("Error submitting quiz:", error);
          } finally {
            setIsAnswering(false);
          }
        }
      } catch (error) {
        console.error("Error submitting:", error);
      } finally {
        // Stop the timer when the answer is submitted
        setIsTimerRunning(false);
      }
    }
  };

  const HandleCheating = async () => {
    try {
      console.log("UserAccesslevel",userAccessLevel);
      if (userAccessLevel !== AccessLevel.ANSWERED) {
        setIsTimerRunning(false);
        const updatedQuizParticipation = await CheatingByCurrentUser(
          params.uniqueCode
        );
        if (updatedQuizParticipation?.isCheated) {
          toast({
            title: "Rule Violation❌",
            description:
              "You have been disqualified from the quiz. If you have any queries, please contact us!.",
          });
          router.push("/quizmain/quizzes");
        }
      }
    } catch (error) {
      console.error("Error cheating:", error);
    } finally {
      // Stop the timer when the answer is submitted
      setIsTimerRunning(false);
    }
  };
  

  // ###################################_______________________USE EFFECTS_______________________###################################

  let mouseOutCount = 0;


  useEffect(
    () => {
      async function handleMouseLeave() {
        mouseOutCount += 1;
        console.log("Mouse out count:", mouseOutCount);
        console.log("UserAccesslevel",userAccessLevel);
        if (mouseOutCount >= 1 && userAccessLevel !== AccessLevel.ANSWERED) {
          setIsDialogOpen(true);
        }
        if (mouseOutCount === 4 && userAccessLevel !== AccessLevel.ANSWERED) {
          console.log("Calling HandleCheating");
          await HandleCheating();
        }
      }
      
      document.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        document.removeEventListener("mouseleave", handleMouseLeave);
      };
    },
    [userAccessLevel]
  );

  
  useEffect(() => {
    // Disable copy-paste and context menu
    const handleCopyPaste = (event: ClipboardEvent) => {
      event.preventDefault();
    };

    const handleContextMenu = (event: Event) => {
      event.preventDefault();
    };

    document.addEventListener('copy', handleCopyPaste);
    document.addEventListener('cut', handleCopyPaste);
    document.addEventListener('paste', handleCopyPaste);
    window.addEventListener('contextmenu', handleContextMenu);

    return () => {
      document.removeEventListener('copy', handleCopyPaste);
      document.removeEventListener('cut', handleCopyPaste);
      document.removeEventListener('paste', handleCopyPaste);
      window.removeEventListener('contextmenu', handleContextMenu);
    };
  }, []);

    useEffect(() => {
    // Disable text selection
    const handleSelectStart = (event: Event) => {
      event.preventDefault();
    };

    document.addEventListener('selectstart', handleSelectStart);

    return () => {
      document.removeEventListener('selectstart', handleSelectStart);
    };
  }, []);

  useEffect(() => {
    // Disable right-click
    const handleContextMenu = (event: Event) => {
      event.preventDefault();
    };

    // Disable inspect mode
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.key === "F12" ||
        (event.ctrlKey && event.shiftKey && event.key === "I")
      ) {
        event.preventDefault();
      }
    };

    // Attach event listeners
    window.addEventListener("contextmenu", handleContextMenu);
    window.addEventListener("keydown", handleKeyDown);

    // Clean up event listeners
    return () => {
      window.removeEventListener("contextmenu", handleContextMenu);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (questionTimer === 0 && isTimerRunning) {
      handleTimeout();
    }
  }, [questionTimer]);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      // Check if the userAccessLevel is locked
      if (userAccessLevel !== AccessLevel.LOCKED) {
        // Update the timer only if it's not locked
        if (questionTimer !== null && questionTimer > 0 && isTimerRunning) {
          setQuestionTimer((prevTimer: any) => prevTimer - 1);
        }
      }
    }, 1000);

    return () => {
      clearInterval(timerInterval);
    };
  }, [questionTimer, isTimerRunning, userAccessLevel]);


  useEffect(() => {
    getQuestion();
    getUserAccessLevel();
    getNumberOfQuestions();
  }, [params.id, params.uniqueCode]);

  useEffect(() => {
    if (nextQuestion === null) {
      setIsLastQuestion(true);
    }
  }, [nextQuestion]);

  useEffect(() => {
    if (userAccessLevel === AccessLevel.ANSWERED) {
      setIsAnswered(true);
      setQuestionTimer(null);
    }
  }, [question, userAccessLevel]);

  useEffect(() => {
    if (userAccessLevel === AccessLevel.LOCKED) {
      setIsLocked(true);
    }
  }, [question, userAccessLevel]);

  // ########################################`_______________________RENDER_______________________#####################################

  const ParsedOptions = question ? JSON.parse(question?.options) : null;

  const BadgeText =
    userAccessLevel === AccessLevel.ANSWERED
      ? "Answered👑"
      : userAccessLevel === AccessLevel.UNLOCKED
      ? "Ready to Attempt👻"
      : "Locked❌";

  console.log("Answered-Question:", JSON.stringify(answeredQuestions));

  return (
    <>
      {isLoading ? (
        <div className="flex flex-col justify-center items-center space-y-5 rounded-md m-4">
          <Loader2 className="w-10 h-10 animate-spin" />
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center m-4">
            <div className="flex flex-row space-x-4 justify-center items-center">
              <h1 className="text-2xl font-semibold text-emerald-600-500">
                Question {question?.order} of {TotalQuestions}🤔
              </h1>
              <Badge
                className={cn(
                  userAccessLevel === AccessLevel.ANSWERED && "bg-emerald-500",
                  userAccessLevel === AccessLevel.UNLOCKED && "bg-yellow-500",
                  userAccessLevel === AccessLevel.LOCKED && "bg-red-500"
                )}
              >
                {BadgeText}
              </Badge>
            </div>

            <div className="flex flex-row items-center space-x-7" />
            <div className="flex flex-row space-x-4 justify-center items-center">
              <IconBadge icon={Timer} variant={"timer"} />
              <h1 className="text-2xl font-semibold text-emerald-600-500">
                {questionTimer ? `00:00:${questionTimer}` : "00:00:00"}
              </h1>
            </div>
          </div>
          <div className="paddings flex flex-col justify-start items-start space-y-5 rounded-md m-4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-2/3 space-y-6"
              >
                <FormField
                  control={form.control}
                  name="Option"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>
                        <h1 className="text-2xl font-semibold">
                          {question?.text}
                        </h1>
                      </FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-6"
                        >
                          {ParsedOptions &&
                            ParsedOptions.map((option: any, index: any) => (
                              <FormItem
                                className="flex items-center space-x-3 space-y-0"
                                key={index}
                              >
                                <FormControl>
                                  <RadioGroupItem value={option} />
                                </FormControl>
                                <FormLabel className="font-normal text-lg">
                                  {option}
                                </FormLabel>
                              </FormItem>
                            ))}
                        </RadioGroup>
                      </FormControl>
                    </FormItem>
                  )}
                />
                <div className="flex flex-row items-start justify-start space-x-7 mt-7">
                  <Button
                    type="submit"
                    size="lg"
                    className="bg-emerald-600 hover-bg-emerald-600"
                    disabled={
                      isAnswered ||
                      (isLocked && userAccessLevel !== AccessLevel.UNLOCKED)
                    }
                  >
                    {isAnswering ? (
                      <div className="flex flex-row space-x-2 items-center">
                        <Loader2 className="w-5 h-5 animate-spin" />
                      </div>
                    ) : (
                      <h1>{isLastQuestion ? "Submit" : "Next"}</h1>
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
          <AlertDialog
            open={isDialogOpen}
            onOpenChange={(isOpen) => {
              setIsDialogOpen(isOpen);
            }}
          >
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  By continuously leaving the page, Your Quiz will be submitted
                  automatically🥇
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to continue? (You Got Only 3 Warnings)
                  <br />
                  "Keep your mouse inside the window to avoid this".
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogAction>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
      )}
    </>
  );
};

export default QuestionIdPage;