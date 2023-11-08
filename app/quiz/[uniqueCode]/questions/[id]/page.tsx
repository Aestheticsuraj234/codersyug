"use client";
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
  FormMessage,
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
import { set } from "date-fns";

const FormSchema = z.object({
  Option: z.string(),
});

const QuestionIdPage = ({
  params,
}: {
  params: { uniqueCode: any; id: any };
}) => {
  const { quiz } = useContext(AppContext);
  const { toast } = useToast();

  const { setAnsweredQuestions, answeredQuestions } = quiz;
  const [question, setQuestion] = useState<any>();
  const [nextQuestion, setNextQuestion] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [questionTimer, setQuestionTimer] = useState<number | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLastQuestion, setIsLastQuestion] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isAnswering, setIsAnswering] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [TotalQuestions, setTotalQuestions] = useState<number>(0);
  const [isLocked, setIsLocked] = useState<boolean>(false);
  const [userAccessLevel, setUserAccessLevel] = useState<any>(
    AccessLevel.LOCKED
  );
  const router = useRouter();

  const getQuestion = async () => {
    setIsLoading(true);
    // @ts-ignore
    const { question, nextQuestion } = await getQuestionById(
      params.id,
      params.uniqueCode
    );
    setQuestion(question);
    setNextQuestion(nextQuestion);
    setQuestionTimer(question?.timer || null);
    setIsLoading(false);
  };

  const getUserAccessLevel = async () => {
    const accessLevel = await getCurrentUserQuestionAccessLevel(params.id);
    setUserAccessLevel(accessLevel);
  };

  useEffect(() => {
    getUserAccessLevel();
  }, [params.id]);

  const getNumberOfQuestions = async () => {
    const NumberOfQuestion = await GetNumberOfQuestions(params.uniqueCode);
    setTotalQuestions(NumberOfQuestion);
  };

  useEffect(() => {
    getNumberOfQuestions();
  }, [params.uniqueCode]);

  useEffect(() => {
    getQuestion();
  }, [params.id]);

  // check if the question is last question or not
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

  const ParsedOptions = question ? JSON.parse(question?.options) : null;

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(
    data: z.infer<typeof FormSchema>,
    e: React.FormEvent
  ) {
    e.preventDefault();
    setIsAnswering(true);
    const actualTimeTaken =
    question?.timer != null && questionTimer != null
      ? question?.timer - questionTimer
      : null;
    setAnsweredQuestions([
      ...answeredQuestions,
      { question, answer: data.Option, timeTaken: actualTimeTaken },
    ]);
    // @ts-ignore
    await modifyQuestionAccessTypeByCurrentUser(
      params.id,

      AccessLevel.ANSWERED
    );
    if (nextQuestion) {
      router.push(`/quiz/${params.uniqueCode}/questions/${nextQuestion.id}`);
      // @ts-ignore
      await modifyQuestionAccessTypeByCurrentUser(
        nextQuestion.id,
        AccessLevel.UNLOCKED
      );
      setIsAnswering(false);
    } else if (!nextQuestion) {
      setIsLastQuestion(true);
      setIsSubmitting(true);
      const res = await axios.post("/api/quiz/submit", {
        uniqueCode: params.uniqueCode,
        answers: answeredQuestions,
      });
      const { data } = res;
      console.log(data);
      if (data.status === 201) {
        toast({
          title: "Quiz Submitted Successfully",
          description: "Redirecting to the dashboard home page",
        });
        router.push("/quizmain/profile");
        setIsSubmitting(false);
      } else {
        toast({
          title: "Something went wrong",
          description: "Please try again later",
        });
        router.refresh();
        setIsSubmitting(false);
      }
    }
  }

  console.log("Answered-Question:", answeredQuestions);

  const handleTimeout = async () => {
    if (!isAnswered) {
      // If the question has not been answered when the timer reaches 0
      setAnsweredQuestions([
        ...answeredQuestions,
        { question, answer: "", timeTaken: null },
      ]);

      await modifyQuestionAccessTypeByCurrentUser(
        params.id,

        AccessLevel.ANSWERED
      );

      if (nextQuestion) {
        router.push(`/quiz/${params.uniqueCode}/questions/${nextQuestion.id}`);
        // @ts-ignore
        await modifyQuestionAccessTypeByCurrentUser(
          nextQuestion.id,
          AccessLevel.UNLOCKED
        );
        setIsAnswering(false);
      } else if (!nextQuestion) {
        setIsLastQuestion(true);
        setIsSubmitting(true);
        const res = await axios.post("/api/quiz/submit", {
          uniqueCode: params.uniqueCode,
          answers: answeredQuestions,
        });
        const { data } = res;
        console.log(data);
        if (data.status === 201) {
          toast({
            title: "Quiz Submitted Successfully",
            description: "Redirecting to the dashboard home page",
          });
          router.push("/quizmain/profile");
          setIsSubmitting(false);
        } else {
          toast({
            title: "Something went wrong",
            description: "Please try again later",
          });
          router.refresh();
          setIsSubmitting(false);
        }
      }
    }
  };

  useEffect(() => {
    if (questionTimer === 0) {
      handleTimeout();
    }
  }, [questionTimer]);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      if (questionTimer !== null && questionTimer > 0) {
        setQuestionTimer((prevTimer: any) => prevTimer - 1);
      }
    }, 1000);

    return () => {
      clearInterval(timerInterval);
    };
  }, [questionTimer]);

  const BadgeText =
    userAccessLevel === AccessLevel.ANSWERED
      ? "Answered👑"
      : userAccessLevel === AccessLevel.UNLOCKED
      ? "Ready to Attempt👻"
      : "Locked❌";

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
              {/* @ts-ignore */}
              <form
              // @ts-ignore
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
                  {isLastQuestion ? (
                    <Button
                      type="submit"
                      size="lg"
                      className="bg-emerald-600 hover-bg-emerald-600"
                      disabled={
                        isAnswered ||
                        (isLocked && userAccessLevel !== AccessLevel.UNLOCKED)
                      }
                    >
                       {isSubmitting ? (
                        <div className="flex flex-row space-x-2 items-center">
                          <Loader2 className="w-5 h-5 animate-spin" />
                        </div>
                      ) : (
                        <h1>Submit</h1>
                      )}
                    </Button>
                  ) : (
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
                        <h1>Next</h1>
                      )}
                    </Button>
                  )}
                </div>
              </form>
            </Form>
          </div>
          <AlertDialog
            open={isDialogOpen}
            onOpenChange={(isOpen) => setIsDialogOpen(isOpen)}
          >
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  By continuously leaving the page, Your Quiz will be submitted
                  automatically🥇
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to continue?
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
