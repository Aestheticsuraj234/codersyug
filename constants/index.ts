import {

    Heart,
    BookMarked,
    Flame,
    Newspaper,
    Plus,
    History,
   
} from "lucide-react";

export const sidebarLinks = [
    {
        Icon: Flame,
        route: "/blogs",
        label: "Popular",
    },
    {
        Icon: Heart,
        route: "/blogs/most-liked",
        label: "Most Liked",
    },
    {
        Icon: Newspaper,
        route: "/blogs/best-discussions",
        label: "Best Discussions",
    },
    {
        Icon: Plus,
        route: "/blogs/submit-article",
        label: "Submit Article",
    },
    {
        Icon: BookMarked,
        route: "/blogs/saved",
        label: "Saved",
    },
    {
        Icon: History,
        route: "/blogs/reading-history",
        label: "Reading History",
    },

];


