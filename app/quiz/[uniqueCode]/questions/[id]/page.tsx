"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Loader2, Timer } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
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
import { GetNumberOfQuestions, getQuestionById, modifyAccessLevel } from "@/server-action/quiz";
import { IconBadge } from "@/components/Global/icon-badge";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { AppContext } from "@/context/GlobalContext";
import { AccessLevel } from "@prisma/client";
import { cn } from "@/lib/utils";
import { access } from "fs";


const FormSchema = z.object({

  Option: z.string()
});

const QuestionIdPage = ({ params }: { params: { uniqueCode: any, id: any } }) => {
  const { toast } = useToast();
  const { quiz } = useContext(AppContext);
  const { setAnsweredQuestions, answeredQuestions } = quiz
  const [question, setQuestion] = useState<any>();

  const [nextQuestion, setNextQuestion] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [questionTimer, setQuestionTimer] = useState<number | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLastQuestion, setIsLastQuestion] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isAnswering, setIsAnswering] = useState(false);
  const [TotalQuestions, setTotalQuestions] = useState<number>(0);
  const router = useRouter();

  const getQuestion = async () => {
    setIsLoading(true);
    const { question, nextQuestion } = await getQuestionById(params.id, params.uniqueCode);
    setQuestion(question);
    setNextQuestion(nextQuestion);
    setQuestionTimer(question?.timer || null);
    setIsLoading(false);
  };

  const getNumberOfQuestions = async () => {
    const NumberOfQuestion = await GetNumberOfQuestions(params.uniqueCode);
    setTotalQuestions(NumberOfQuestion);

  }

  useEffect(() => {
    getNumberOfQuestions()
  }, [params.uniqueCode])



  useEffect(() => {
    getQuestion();
  }, [params.id]);

  // check if the question is last question or not
  useEffect(() => {
    if (nextQuestion === null) {
      setIsLastQuestion(true);
    }
  }, [nextQuestion])

  useEffect(() => {
    if (question && question.accessLevel === AccessLevel.ANSWERED) {
      setIsAnswered(true);
      setQuestionTimer(null);
    }
  }, [question])

  const ParsedOptions = question ? JSON.parse(question?.options) : null;

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(data: z.infer<typeof FormSchema>, e: React.FormEvent) {
    e.preventDefault();
    setIsAnswering(true);
    setAnsweredQuestions([...answeredQuestions, { question, answer: data.Option }]);
    await modifyAccessLevel(params.id, AccessLevel.ANSWERED);
    if (nextQuestion) {
      router.push(`/quiz/${params.uniqueCode}/questions/${nextQuestion.id}`);
      setIsAnswering(false);

    } else if (!nextQuestion) {
      setIsLastQuestion(true);
      setIsAnswering(false);

    }
  }

  useEffect(() => {
    function updateTimer() {
      if (questionTimer !== null && questionTimer > 0) {
        setQuestionTimer((prevTimer: any) => prevTimer - 1);
      } else if (questionTimer === 0) {
        console.log("Timer has reached 0");
        clearInterval(timerInterval);
      }
    }

    let timerInterval: any;

    if (questionTimer !== null) {
      timerInterval = setInterval(updateTimer, 1000);
    }

    return () => {
      clearInterval(timerInterval);
    };
  }, [questionTimer]);


  const BadgeText = question?.accessLevel === AccessLevel.ANSWERED ? "Answered👑" : question?.accessLevel === AccessLevel.UNLOCKED ? "Ready to Attempt👻" : "Locked❌"

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
                  question?.accessLevel === AccessLevel.ANSWERED && "bg-emerald-500",
                  question?.accessLevel === AccessLevel.UNLOCKED && "bg-yellow-500",
                  question?.accessLevel === AccessLevel.LOCKED && "bg-red-500"
                )}
              >
                {BadgeText}
              </Badge>

            </div>

            <div className="flex flex-row items-center space-x-7" />
            <div className="flex flex-row space-x-4 justify-center items-center">
              <IconBadge icon={Timer} variant={"timer"} />
              <h1 className="text-2xl font-semibold text-emerald-600-500">
                {questionTimer ? `00:00:${questionTimer}` : '00:00:00'}
              </h1>
            </div>
          </div>
          <div className="paddings flex flex-col justify-start items-start space-y-5 rounded-md m-4">
            <Form {...form}>
              {/* @ts-ignore */}
              <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
                <FormField
                  control={form.control}
                  name="Option"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>
                        <h1 className="text-2xl font-semibold">{question?.text}</h1>
                      </FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-6"
                        >
                          {ParsedOptions &&
                            ParsedOptions.map((option: any, index: any) => (
                              <FormItem className="flex items-center space-x-3 space-y-0" key={index}>
                                <FormControl>
                                  <RadioGroupItem value={option} />
                                </FormControl>
                                <FormLabel className="font-normal text-lg">{option}</FormLabel>
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
                      disabled={isAnswered}
                    >
                      Submit
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      size="lg"
                      className="bg-emerald-600 hover-bg-emerald-600"
                      disabled={isAnswered}
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
          <AlertDialog open={isDialogOpen} onOpenChange={(isOpen) => setIsDialogOpen(isOpen)}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  By continuously leaving the page, Your Quiz will be submitted automatically🥇
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to continue?<br />
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
