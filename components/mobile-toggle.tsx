import { Github, Menu } from "lucide-react"

import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

import Navbar from '@/components/navbar'
import { MainNav } from "./main-nav";
import { SearchBar } from "./search-bar";
import { ThemeToggle } from "./theme-toggle";
import { MobileNavigation } from "./mobile-navigation";
import { UserButton } from "@clerk/nextjs";


export const MobileToggle = () => {
    return (
        <Sheet>
            <SheetHeader className="
            md:hidden
            flex h-16 items-center px-4
            flex-row
            ">
                <SheetTrigger asChild>

                    <Button variant="ghost" size="icon" className="md:hidden">
                        <Menu size={30} />
                    </Button>

                </SheetTrigger>
                <div className=' md:hidden ml-auto flex items-center space-x-4' >
                    <SearchBar />

                    <ThemeToggle />
                    <UserButton afterSignOutUrl="/" />
                </div>
            </SheetHeader>
            <SheetContent side="left" className="p-0 flex gap-0">
                <MobileNavigation />
            </SheetContent>

        </Sheet>
    )
}