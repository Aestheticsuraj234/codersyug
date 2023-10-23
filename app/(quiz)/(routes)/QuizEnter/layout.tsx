import QuizNavbar from "@/components/Quiz/quiz-navbar";

const QuizLayout = ({ children }: {
    children: React.ReactNode
}) => {

    return (
        <>
            <QuizNavbar />
            <div>
                {children}
            </div>

        </>
    )
}

export default QuizLayout;