"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { set, useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "../ui/use-toast"
import { VerifyUniqueCode } from "@/server-action/hackathon"
import { useEffect, useState } from "react"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"

const formSchema = z.object({
  uniqueCode: z.string().min(10, {
    message: "uniqueCode must be at  least 10 characters.",
  }),
})

export function QuizCodeForm() {
  const { toast } = useToast();
  const [isVerifying, setIsVerifying] = useState(false);
  const router = useRouter();
  // ...
  const form = useForm({
    resolver: zodResolver(formSchema),

  })

  const onSubmit = async (values: any) => {
    try {
      setIsVerifying(true);
      const res = await VerifyUniqueCode(values.uniqueCode);
      console.log(res);
      if(res==="Invalid unique code"){
        toast({
          title: "Error",
          description: "Invalid unique code",
        })
        return;
      }
      else if (res==="User is not logged in"){
        toast({
          title: "Error",
          description: "User is not logged in",
        })
        return;
      }
      else{
        toast({
          title: "Success",
          description: "You are verified",
        })
        router.push("/ComingSoon")
        return;
      }

    } catch (error) {
      console.log(error);
      toast({
        title: "Error",
        description: "Something went wrong",
      })


    }
    finally {
      setIsVerifying(false);
    }

  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="uniqueCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Enter Your Unique-Code👩‍💻</FormLabel>
              <FormControl>
                <Input placeholder="e.g user_2W9UqGJ8Mx2W2qEZgEmo6bAonsnsd" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">
          {isVerifying ? <Loader2
          className="animate-spin"
          
          /> : "Verify"}
        </Button>
      </form>
    </Form>
  )
}
