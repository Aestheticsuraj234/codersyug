
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Code, FileCode2, GanttChartSquare, GitBranch, Pen, ScrollText, Youtube, } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge"




const StickyButton = () => {


    const MenuItems = [
        {
            id: 1,
            name: "E-book",
            icon: <FileCode2 className="dark:text-zinc-100 text-zinc-800 " />,
            routerLink: "/resources/create/ebook",
            isInDevelopment: false


        },
        {
            id: 2,
            name: "Notes",
            icon: <ScrollText className="dark:text-zinc-100 text-zinc-800 " />,
            routerLink: "/resources/create/notes",
            isInDevelopment: false

        },
        {
            id: 3,
            name: "Cheatsheets",
            icon: <Code className="dark:text-zinc-100 text-zinc-800 " />,
            routerLink: "/resources/create/cheatsheets",
            isInDevelopment: false


        },
        {
            id: 4,
            name: "Videos",
            icon: <Youtube className="dark:text-zinc-100 text-zinc-800 " />,
            routerLink: "/resources/create/Videos",
            isInDevelopment: true
        },
        {
            id:5,
            name: "Projects",
            icon: <GitBranch className="dark:text-zinc-100 text-zinc-800 " />,
            routerLink: "/resources/create/projects",
            isInDevelopment: false
        }
    ]
    return (
        <div className="fixed bottom-12 right-5 z-50 ">
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Button
                        size={"icon"}
                        shape={"circle"}
                        className="
                        bg-gradient-to-r from-gray-700 via-gray-900 to-black dark:from-indigo-300 dark:to-purple-400 rounded-ful  p-2 shadow-full h-16 w-16
"
                    >
                        <Pen size={24} className="text-white" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>Create New Resource</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {
                        MenuItems.map((item) => (
                            <Link href={item.isInDevelopment ? "#" : item.routerLink} key={item.id}>
                                <DropdownMenuItem   >
                                    <div className="flex items-center gap-2">
                                        {item.icon}
                                        <span>{item.name}</span>
                                        {item.isInDevelopment && <Badge variant="default">Coming Soon</Badge>}
                                    </div>
                                </DropdownMenuItem>
                            </Link>

                        ))
                    }

                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default StickyButton;