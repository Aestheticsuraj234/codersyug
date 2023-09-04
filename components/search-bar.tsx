"use client";

import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { 
  CommandDialog, 
  CommandEmpty, 
  CommandGroup, 
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command";
import {Home} from "lucide-react"


export const SearchBar = () => {
  const [open, setOpen] = useState(false);
  
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    }

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down)
  }, []);

  const onClick = () => {
    setOpen(false);

  
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="group w-full h-10 rounded-md px-2 py-2 border flex justify-center  items-center gap-x-6  hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition"
      >
     
        <p
          className="font-semibold text-sm text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition"
        >
          Search
        </p>
        <kbd
          className="pointer-events-none inline-flex h-6 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground ml-auto"
        >
          <span className="text-lg">⌘</span>K
        </kbd>
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search all channels and members" />
        <CommandList>
          <CommandEmpty>
            No Results found
          </CommandEmpty>
         
              <CommandGroup  heading={"hello"}>
                  
                    
                      <CommandItem  onSelect={() => onClick()}>
                        <Home/>
                        <span>home</span>
                      </CommandItem>
                  
              </CommandGroup>
        
        </CommandList>
      </CommandDialog>
    </>
  )
}