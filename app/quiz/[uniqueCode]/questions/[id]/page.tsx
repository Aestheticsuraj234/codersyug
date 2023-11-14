"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Loader2, Timer } from "lucide-react";
import { useUser } from "@clerk/nextjs";
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

// Define the form schema using Zod
const FormSchema = z.object({
  Option: z.string(),
});

// Define the QuestionIdPage component
const QuestionIdPage = ({ params }: { params: { uniqueCode: any; id: any } }) => {
  // Destructure values from the AppContext
  const { quiz } = useContext(AppContext);
  const { setAnsweredQuestions, answeredQuestions } = quiz;
  const { toast } = useToast();

  // State variables for question, next question, loading, timer, and more
  const [question, setQuestion] = useState<any>();
  const [nextQuestion, setNextQuestion] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [questionTimer, setQuestionTimer] = useState<number | null>(null);
  const [isLastQuestion, setIsLastQuestion] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isAnswering, setIsAnswering] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [TotalQuestions, setTotalQuestions] = useState<number>(0);
  const [isLocked, setIsLocked] = useState<boolean>(false);
  const [userAccessLevel, setUserAccessLevel] = useState<any>(AccessLevel.LOCKED);
  const router = useRouter();

  // Function to fetch a question
  const getQuestion = async () => {
    setIsLoading(true);
    const { question, nextQuestion } = await getQuestionById(
      params.id,
      params.uniqueCode
    );
    setQuestion(question);
    setNextQuestion(nextQuestion);
    setQuestionTimer(question?.timer || null);
    setIsLoading(false);
  };

  // Function to fetch the user's access level for the current question
  const getUserAccessLevel = async () => {
    const accessLevel = await getCurrentUserQuestionAccessLevel(params.id);
    setUserAccessLevel(accessLevel);
  };

  // Fetch the number of questions for the quiz
  const getNumberOfQuestions = async () => {
    const NumberOfQuestion = await GetNumberOfQuestions(params.uniqueCode);
    setTotalQuestions(NumberOfQuestion);
  };

  // Effect hooks to fetch data on component mount
  useEffect(() => {
    getUserAccessLevel();
    getNumberOfQuestions();
    getQuestion();
  }, [params.id, params.uniqueCode]);

  // Effect hook to check if the question is the last question
  useEffect(() => {
    if (nextQuestion === null) {
      setIsLastQuestion(true);
    }
  }, [nextQuestion]);

  // Effect hook to check if the user has already answered the question
  useEffect(() => {
    if (userAccessLevel === AccessLevel.ANSWERED) {
      setIsAnswered(true);
      setQuestionTimer(null);
    }
  }, [question, userAccessLevel]);

  // Effect hook to check if the question is locked
  useEffect(() => {
    if (userAccessLevel === AccessLevel.LOCKED) {
      setIsLocked(true);
    }
  }, [question, userAccessLevel]);

  // Parse question options
  const ParsedOptions = question ? JSON.parse(question?.options) : null;

  // React Hook Form initialization
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  // Function to handle form submission
  async function onSubmit(data: z.infer<typeof FormSchema>, e: React.FormEvent) {
    e.preventDefault();
    setIsAnswering(true);

    // Calculate actual time taken
    const actualTimeTaken =
      question?.timer != null && questionTimer != null
        ? question?.timer - questionTimer
        : null;

    // Update the list of answered questions
    setAnsweredQuestions([
      ...answeredQuestions,
      { question, answer: data.Option, timeTaken: actualTimeTaken },
    ]);

    // Mark the current question as answered
    await modifyQuestionAccessTypeByCurrentUser(params.id, AccessLevel.ANSWERED);

    // If there is a next question, navigate to it
    if (nextQuestion) {
      router.push(`/quiz/${params.uniqueCode}/questions/${nextQuestion.id}`);
      await modifyQuestionAccessTypeByCurrentUser(
        nextQuestion.id,
        AccessLevel.UNLOCKED
      );
      setIsAnswering(false);
    } else if (!nextQuestion) {
      // If it's the last question, submit the quiz
      setIsLastQuestion(true);
      setIsSubmitting(true);

      // Call the backend API to submit the quiz
      try {
        const res = await axios.post("/api/quiz/submit", {
          questions: {
            quizId: params.uniqueCode,
            answeredQuestions,
          },
          actualTimeTaken,
        });

        // Log the response data (you might want to handle it differently)
        console.log(res.data);

        // Reset the submitting state
        setIsSubmitting(false);
      } catch (error) {
        // Handle the error (you might want to handle it differently)
        console.error("Error submitting quiz:", error);
        setIsSubmitting(false);
      }
    }
  }

  // Function to handle the timeout of the question
  const handleTimeout = async () => {
    if (!isAnswered) {
      // If the question has not been answered when the timer reaches 0
      setAnsweredQuestions([
        ...answeredQuestions,
        { question, answer: "", timeTaken: null },
      ]);

      // Mark the current question as answered
      await modifyQuestionAccessTypeByCurrentUser(params.id, AccessLevel.ANSWERED);

      // If there is a next question, navigate to it
      if (nextQuestion) {
        router.push(`/quiz/${params.uniqueCode}/questions/${nextQuestion.id}`);
        await modifyQuestionAccessTypeByCurrentUser(
          nextQuestion.id,
          AccessLevel.UNLOCKED
        );
        setIsAnswering(false);
      } else if (!nextQuestion) {
        // If it's the last question, submit the quiz
        setIsLastQuestion(true);
        setIsSubmitting(true);

        // Log the answered questions (you might want to handle it differently)
        console.log("Answered-Question:", answeredQuestions);

        // Reset the submitting state
        setIsSubmitting(false);
      }
    }
  };

  // Effect hook to handle the question timer reaching 0
  useEffect(() => {
    if (questionTimer === 0) {
      handleTimeout();
    }
  }, [questionTimer]);

  // Effect hook to update the question timer every second
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

  // Determine the text for the badge based on user access level
  const BadgeText =
    userAccessLevel === AccessLevel.ANSWERED
      ? "Answered👑"
      : userAccessLevel === AccessLevel.UNLOCKED
      ? "Ready to Attempt👻"
      : "Locked❌";

  // Render the UI
  return (
    <>
      {isLoading ? (
        <div className="flex flex-col justify-center items-center space-y-5 rounded-md m-4">
          <Loader2 className="w-10 h-10 animate-spin" />
        </div>
      ) : (
        <>
          {/* Your existing UI code here */}

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

          {/* Your existing UI code here */}
        </>
      )}
    </>
  );
};

export default QuestionIdPage;
