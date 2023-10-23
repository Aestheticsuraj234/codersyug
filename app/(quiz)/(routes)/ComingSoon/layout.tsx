import QuizNavbar from "@/components/Quiz/quiz-navbar";

const QuizLayout = ({ children }: {
    children: React.ReactNode
}) => {

    return (
        <>
            <QuizNavbar />
         
                {children}
            

        </>
    )
}

export default QuizLayout;