import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  

const Alert = ({
  triggertext,
  title,
  description,
  classNames
}:any) => {
  return (
    <AlertDialog>
    <AlertDialogTrigger className={classNames} >{triggertext}</AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>{title}</AlertDialogTitle>
        <AlertDialogDescription>
        {description}
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        {/* <AlertDialogCancel>Cancel</AlertDialogCancel> */}
        <AlertDialogAction>Continue</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
  
  )
}

export default Alert