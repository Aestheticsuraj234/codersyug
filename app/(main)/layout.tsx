import Navbar from "@/components/navbar";

const MainLayout = ({ children }:{
    children: React.ReactNode
 }) => {
 
     return(
         <div>
            <Navbar/>
             {children}
         </div>
     )
 }
 
 export default MainLayout;