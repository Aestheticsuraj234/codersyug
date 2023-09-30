import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import {

    Heart,
    BookMarked,
    Flame,
    Newspaper,
    Plus,
    History,

} from "lucide-react";
import Link from "next/link";
interface SidebarLinkProps {
    Icon: any;
    route: string;
    label: string;
}

const sidebarLinks = [
    {
        Icon: <Flame />,
        route: "/blogs",
        label: "Popular",
    },
    {
        Icon: <Heart />,
        route: "/blogs/most-liked",
        label: "Most Liked",
    },

    {
        Icon: <Plus />,
        route: "/blogs/submit-article",
        label: "Submit Article",
    },
    {
        Icon: <BookMarked />,
        route: "/blogs/saved",
        label: "Saved",
    },
    {
        Icon: <History />,
        route: "/blogs/reading-history",
        label: "Reading History",
    },
];
const BlogBottomBar = () => {
    return (
        <div className='md:hidden w-80  h-14 fixed z-50 rounded-2xl bg-white dark:bg-zinc-800 shadow-md bottom-10  mx-2  px-4 py-4'>

            <div className='flex flex-row w-full justify-between items-center'>
                {sidebarLinks.map((item: SidebarLinkProps, index) => (
                    <TooltipProvider key={index}>
                        <Link href={item.route}>
                            <Tooltip>
                                <TooltipTrigger>{item.Icon}</TooltipTrigger>
                                <TooltipContent>
                                    <p>{item.label}</p>
                                </TooltipContent>
                            </Tooltip>
                        </Link>
                    </TooltipProvider>
                ))}

            </div>
        </div>
    );
};

export default BlogBottomBar;
