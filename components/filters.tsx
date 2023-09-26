"use client"

import { useState } from "react"

const links = ["All", "Next 13", "Frontend", "Backend", "Fullstack"]

const Filters = () => {

    const [active, setActive] = useState("");

    const handleFilter = (link: string) => {
        setActive(link)
    }
console.log({ active})
    return (
        <ul className="dark:text-zinc-100 text-zinc-800 body-text no-scrollbar flex max-w-full gap-2 overflow-auto py-12 sm:max-w-2xl">
            {links.map((link) => (
                <button
                    key={link}
                    onClick={() => handleFilter(link)}
                    className={`${active === link ? "bg-gradient-to-r from-gray-700 via-gray-900 to-black dark:from-indigo-300 dark:to-purple-400 text-white font-semibold" : ""} whitespace-nowrap rounded-lg px-8 py-2.5 capitalize `}
                >
                    {link}

                </button>
            ))}
        </ul>
    )
}

export default Filters