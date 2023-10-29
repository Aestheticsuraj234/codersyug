"use client"
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "@/components/ui/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Timer } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
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
} from "@/components/ui/alert-dialog"

import { Button } from "@/components/ui/button";
import { getQuestionById } from "@/server-action/quiz";
import { IconBadge } from "@/components/Global/icon-badge";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Skeleton } from "@/components/ui/skeleton";

const FormSchema = z.object({
  type: z.string().nonempty({ message: "Please select an option" }),
});

const QuestionIdPage = ({ params }: { params: { id: any } }) => {
  const [question, setQuestion] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [questionTimer, setQuestionTimer] = useState<number | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);



  const getQuestion = async () => {
    setIsLoading(true);
    const res = await getQuestionById(params.id);
    setQuestion(res);
    setQuestionTimer(res?.timer || null);
    setIsLoading(false);
  };

  useEffect(() => {
    getQuestion();
  }, [params.id]);

  const ParsedOptions = question ? JSON.parse(question?.options) : null;

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function handleQuestionSubmission() {
    console.log("Question submitted!");
    // Handle logic when the timer reaches 0
    // For example, you can auto-submit the question or trigger the desired action
  }

  useEffect(() => {
    function disableRightClick(even:any) {
      // @ts-ignore
      if (event.button === 2) {
        // @ts-ignore
        event.preventDefault();
      }
    }

    document.addEventListener("contextmenu", disableRightClick);

    return () => {
      document.removeEventListener("contextmenu", disableRightClick);
    };
  }, []);

  useEffect(() => {
    function handleInspector() {
      // @ts-ignore
      if (window.__REACT_DEVTOOLS_GLOBAL_HOOK__ || /debugger|inspector/.test(new Error().stack)) return
    
    }

    handleInspector();
  }, []);

  useEffect(() => {
    let mouseOutCount = 0;
  
    function handleMouseLeave() {
      mouseOutCount += 1;
      if (mouseOutCount > 3) {
       return (
        setIsDialogOpen(true)
       )
        // Implement your form submission logic here.
      }
    }
  
    document.addEventListener("mouseleave", handleMouseLeave);
  
    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);
  

  useEffect(() => {
    // Define a function to update the timer every second
    function updateTimer() {
      if (questionTimer !== null && questionTimer > 0) {
        setQuestionTimer((prevTimer:any) => prevTimer - 1);
      } else if (questionTimer === 0) {
        // Timer has reached 0, trigger the submission logic
        handleQuestionSubmission();
        clearInterval(timerInterval);
      }
    }

    let timerInterval: any;

    // Check if there's a timer and start the interval
    if (questionTimer !== null) {
      timerInterval = setInterval(updateTimer, 1000);
    }

    return () => {
      clearInterval(timerInterval); // Clear the interval when the component unmounts
    };
  }, [questionTimer]);


  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <>
      {/* Timer */}
      <div className="flex justify-between items-center m-4">
        <div className="flex flex-row items-center space-x-7" />

        <div className="flex flex-row space-x-4 justify-center items-center">
          <IconBadge icon={Timer} variant={"timer"} />
          <h1 className="text-2xl font-semibold text-emerald-600-500">
            {questionTimer ? `00:00:${questionTimer}` : '00:00:00'}
          </h1>
        </div>
      </div>

      <div className="paddings flex flex-col justify-start items-start space-y-5   rounded-md m-4">
        {isLoading ? (
          <>
            <Skeleton className="w-[100%] h-[20%] rounded-full space-y-3" />
            <Skeleton className="w-[40%] h-[20%] rounded-full  space-y-3" />
            <Skeleton className="w-[40%] h-[20%] rounded-full space-y-3" />
            <Skeleton className="w-[40%] h-[20%] rounded-full space-y-3" />
            <Skeleton className="w-[40%] h-[20%] rounded-full space-y-3" />
          </>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
              <FormField
                control={form.control}
                name="type"
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
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-row items-start justify-start space-x-7 mt-7">
                <Button
                  type="submit"
                  size="lg"
                  disabled={form.formState.isSubmitting}
                >
                  Next
                </Button>
                <Button
                  type="button"
                  size="lg"
                  className="bg-gray-500 hover-bg-gray-600"
                  disabled={form.formState.isSubmitting}
                >
                  Skip
                </Button>
              </div>
            </form>
          </Form>
        )}
      </div>
      <AlertDialog open={isDialogOpen} onOpenChange={
        (isOpen) => {
          setIsDialogOpen(isOpen);
        }
      } >

  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>
        By continuously leaving the page, Your Quiz will be submitted automatically🥇
      </AlertDialogTitle>
      <AlertDialogDescription>
        Are you sure you want to continue?<br/>
        "Keep your mouse inside the window to avoid this".
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogAction>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
    </>
  );
};

export default QuestionIdPage;
