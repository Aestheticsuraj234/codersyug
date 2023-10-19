import AppBar from "@/components/Hackathon/AppBar";

const AuthLayout = ({ children }:{
    children: React.ReactNode
 }) => {
 
     return(
      <div className='flex justify-start items-center flex-col paddings bg-[url("/Background-Hackathon.png")] min-h-screen  w-full bg-cover bg-center '>
            <AppBar />
             {children}
             </div>
     )
 }
 
 export default AuthLayout;