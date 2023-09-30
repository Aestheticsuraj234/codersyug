import Footer from "@/components/Global/footer"; 
import Navbar from "@/components/Global/navbar";

const MainLayout = ({ children }:{
    children: React.ReactNode
 }) => {
 
     return(
         <div>
            <Navbar/>
             {children}
             <Footer/>
         </div>
     )
 }
 
 export default MainLayout;