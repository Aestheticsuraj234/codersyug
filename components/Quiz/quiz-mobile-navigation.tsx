import { Github, Menu } from "lucide-react"

import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

import { ThemeToggle } from "../Global/theme-toggle";

import { UserButton } from "@clerk/nextjs";
import QuizNavbarClock from "./quiz-navbar-clock";


export const QuizMobileNavbar = () => {
    return (
        <Sheet>
            <SheetHeader className="
            md:hidden
            flex h-16 items-center px-4
            flex-row
            ">
                   <QuizNavbarClock/>
                <div className=' md:hidden ml-auto flex items-center space-x-4' >
                    {/* <SearchBar /> */}
                  
                    <ThemeToggle />
                    <UserButton afterSignOutUrl="/" />
                </div>
            </SheetHeader>
        
        </Sheet>
    )
}