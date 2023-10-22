"use client";
import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

const StickyButton = () => {
    const [isMounted, setIsMounted] = useState(false);
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        setIsMounted(true);

        const handleScroll = () => {
            if (window.scrollY > 100) {
                setShowButton(true);
            } else {
                setShowButton(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    if (!isMounted || !showButton) {
        return null;
    }

    return (
        <div className="relative">
            <div className="absolute -inset-2 rounded-lg bg-gradient-to-r from-yellow-600 via-orange-600 to-red-600 opacity-75 blur"></div>
            <div className="fixed bottom-12 right-5 z-50">
                <div
                    className="bg-gradient-to-r from-yellow-300 to-green-600 px-3 py-3 rounded-full cursor-pointer shadow-gradient"
                    onClick={scrollToTop}
                >
                    <ArrowUp size={25} className="text-white" />
                </div>
            </div>
        </div>
    );
};

export default StickyButton;
