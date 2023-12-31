"use client"
import {
  Dialog,
  DialogContent,

  DialogHeader,
  DialogTitle,
  DialogTrigger,

} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { incrementViewOnDownload } from "@/server-action/action";


const DownloadLinkAlert = ({
  slug,
  triggertext,
  title,
  description,
  classNames,
  downloadLink
}: any) => {
  const [copied, setCopied] = useState(false);

  const onCopy = () => {
    navigator.clipboard.writeText(downloadLink);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  const handleDownloadCount = async (slug: string) => {
    await incrementViewOnDownload(slug)
  }
  return (
    <Dialog >
      <DialogTrigger className={classNames} onClick={async () => {
        await handleDownloadCount(slug);
      }}>{triggertext}</DialogTrigger>
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
            <Button onClick={onCopy} size="icon">
              {copied
                ? <Check className="w-4 h-4 text-green-400" />
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