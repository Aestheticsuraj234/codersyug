"use client"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
  
  } from "@/components/ui/dialog"
  import { Input } from "@/components/ui/input";
  import { Button } from "@/components/ui/button";
  import { Label } from "@/components/ui/label";
  import { Check, Copy } from "lucide-react";
import { useState } from "react";
  
  const DownloadLinkAlert = ({
    triggertext,
    title,
    description,
    classNames,
    downloadLink
  }: any) => {
    const [copied, setCopied] = useState(false);

    const onCopy = () => {
        navigator.clipboard.write(downloadLink);
        setCopied(true);
    
        setTimeout(() => {
          setCopied(false);
        }, 1000);
      };


    return (
      <Dialog>
        <DialogTrigger className={classNames} >{triggertext}</DialogTrigger>
        <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
           {title}
          </DialogTitle>
        </DialogHeader>
        <div className="p-6">
          <Label
            className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70"
          >
            Download-link
          </Label>
          <div className="flex items-center mt-2 gap-x-2">
            <Input
             
              className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
              value={downloadLink}
            />
            <Button  onClick={onCopy} size="icon">
              {copied 
                ? <Check className="w-4 h-4" /> 
                : <Copy className="w-4 h-4" />
              }
            </Button>
          </div>
         
        </div>
      </DialogContent>

      </Dialog>
  
    )
  }
  
  export default DownloadLinkAlert