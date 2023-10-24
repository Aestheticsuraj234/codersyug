import QuizMainSidebar from "@/components/Quiz/quiz-dashboard/QuizMainSidebar";
import QuizNavigationbar from "@/components/Quiz/quiz-dashboard/quiz-navigation";

const QuizMainLayout = ({ children }: {
    children: React.ReactNode
}) => {

    return (
        <>
            <div className="h-full ">
                <div className="h-[80px] md:pl-56 fixed inset-y-0 w-full z-50">
                    <QuizNavigationbar />
                </div>
                <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50 ">
                    <QuizMainSidebar />
                </div>
                <main className="md:pl-60  nav-padding">
                    {children}
                </main>
            </div>
        </>
    )
}

export default QuizMainLayout;