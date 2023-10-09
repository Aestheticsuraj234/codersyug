import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,

} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

const Alert = ({
  triggertext,
  title,
  description,
  classNames
}: any) => {
  return (
    <Dialog>
      <DialogTrigger className={classNames} >{triggertext}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {description}
          </DialogDescription>
        </DialogHeader>
       
      </DialogContent>
    </Dialog>

  )
}

export default Alert