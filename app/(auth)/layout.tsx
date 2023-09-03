const AuthLayout = ({ children }:{
    children: React.ReactNode
 }) => {
 
     return(
         <div className="flex justify-center items-center">
             {children}
         </div>
     )
 }
 
 export default AuthLayout;