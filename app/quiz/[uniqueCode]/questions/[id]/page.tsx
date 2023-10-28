"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Timer } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { toast } from "@/components/ui/use-toast"
import { IconBadge } from "@/components/Global/icon-badge"

const FormSchema = z.object({
  type: z.enum(["all", "mentions", "none"], {
    required_error: "You need to select a notification type.",
  }),
})

const QuestionIdPage = () => {

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }
  return (
    <>
    {/* timer */}
   <div className="flex justify-between items-center m-4">
   <div className="flex flex-row items-center space-x-7">
    <h1 className="text-xl font-semibold">Question 1/10</h1>      
      </div>

    <div className="flex flex-row space-x-4 justify-center items-center">
      <IconBadge  icon={Timer} variant={"timer"}  />
      <h1 className="text-2xl font-semibold text-emerald-600-500">00:00:20</h1>
      </div>
   
   </div>
    <div className='paddings flex flex-col justify-start items-start space-y-5 bg-slate-100  rounded-md m-4'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>  <h1 className='text-2xl font-semibold'>1. Who is the Founder of Facebook?</h1></FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-6"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="all" />
                      </FormControl>
                      <FormLabel className="font-normal text-lg">
                        All new messages
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="mentions" />
                      </FormControl>
                      <FormLabel className="font-normal text-lg">
                        Direct messages and mentions
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="none" />
                      </FormControl>
                      <FormLabel className="font-normal text-lg">Nothing</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-row items-start justify-start space-x-7 mt-7 ">
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
               className="bg-gray-500 hover:bg-gray-600" 
              disabled={form.formState.isSubmitting}
            >
              Skip
            </Button>

          </div>
         
        </form>
      </Form>

    </div>
    </>
  )
}

export default QuestionIdPage