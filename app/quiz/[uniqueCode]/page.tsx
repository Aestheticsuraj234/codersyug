import { db } from "@/lib/db";
import { redirect } from "next/navigation";

const QuestionUniqueCodePage = async ({
    params
  }: {
    params: { uniqueCode: string; }
  }) =>{

    const quiz = await db.quiz.findUnique({
        where: {
            uniqueCode: params.uniqueCode
        },
        include: {
          questions: true
        },
       
      });
    
      
      if(!quiz){
        return redirect("/")
      }

      return redirect(`/quiz/${params.uniqueCode}/questions/${quiz.questions[0].id}`)
  }

  export default QuestionUniqueCodePage;