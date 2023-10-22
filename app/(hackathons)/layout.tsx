import Footer from "@/components/Global/footer";
import AppBar from "@/components/Hackathon/AppBar";

const AuthLayout = ({ children }: {
    children: React.ReactNode
}) => {

    return (
        <>
            <div className='flex justify-start items-center flex-col dark:bg-black paddings min-h-screen  w-full '>
                <AppBar />
                {children}
            </div>
            <Footer />
        </>
    )
}

export default AuthLayout;