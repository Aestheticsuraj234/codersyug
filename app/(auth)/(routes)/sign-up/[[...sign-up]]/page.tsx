import { SignUp } from "@clerk/nextjs";
 
export default function Page() {
  return (
    <div 
    className="
    flex
    justify-center
    items-center
    h-screen
    w-screen
    bg-gradient-to-r from-rose-700 to-pink-600

    
    
    ">
      <SignUp/>
    </div>
  )
}