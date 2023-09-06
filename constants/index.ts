import {
    Flame,
    Newspaper,
    Heart,
    Plus,
    BookMarked,
    History,
    Settings,
} from "lucide-react";

// Todo: Add badges to sidebar links later
export const sidebarLinks = [
    {
        Icon: Flame,
        route: "/",
        label: "Popular",
    },
    {
        Icon: Heart,
        route: "/most-liked",
        label: "Most Liked",
    },
    {
        Icon: Newspaper,
        route: "/best-discussions",
        label: "Best Discussions",
    },
    {
        Icon: Plus,
        route: "blogs/submit-article",
        label: "Submit Article",
    },
    {
        Icon: BookMarked,
        route: "/saved",
        label: "Saved",
    },
    {
        Icon: History,
        route: "blogs/reading-history",
        label: "Reading History",
    },
    {
        Icon: Settings,
        route: "blogs/customize-feed",
        label: "Customize Feed",
    },
];
