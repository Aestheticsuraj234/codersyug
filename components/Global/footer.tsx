import { Code2 } from "lucide-react";
import Link from "next/link";
import React from "react";
import { FaInstagram, FaTelegram, FaWhatsapp } from "react-icons/fa";

function Footer() {
    const ServicesListData = [
        {
            id: 1,
            title: "Become a Creator on CodersYug & Share your Knowledge🧠",
        },
        {
            id: 2,
            title: "Create & Read Blogs📚",
        },
        {
            id: 3,
            title: "Create & Download Resources👑 & Earn",
        },
        {
            id: 4,
            title: "Create & Watch Tutorials📚",
        },
        {
            id: 5,
            title: "Host & Join Events🎉",
        },
        {
            id: 6,
            title: "Create & Join Study Groups📚",
        },
        {
            id: 8,
            title: "Share Mock Interviews & Interview Experiences📚",
        },
    ];

    const socialLinks = [
        { link: "https://www.instagram.com/codersyug.dev/", icon: <FaInstagram className="text-3xl cursor-pointer hover:text-yellow-600" /> },
        { link: "https://t.me/codersyug", icon: <FaTelegram className="text-3xl cursor-pointer hover:text-blue-500" /> },
        { link: "https://whatsapp.com/channel/0029Va6ua1r3AzNNToQQCW0R", icon: <FaWhatsapp className="text-3xl cursor-pointer hover:text-green-600" /> },
    ];

    const generateListItems = (items:any) => {
        return items.map((item:any) => (
            <li key={item.id} className="text-gray-500 hover:text-gray-800 text-md pb-2 font-semibold dark:hover:text-indigo-300 cursor-pointer">
                {item.href ? (
                    <Link href={item.href}>{item.title}</Link>
                ) : (
                    item.title
                )}
            </li>
        ));
    };

    return (
        <>
            <div className="bg-gray-100 dark:bg-[#161a22] h-1/2 w-full flex md:flex-row flex-col justify-around items-start p-20">
                <div className="p-5">
                    <ul>
                        <Link href={"/"} className="text-zinc-800 cursor-pointer dark:text-zinc-100 font-bold text-2xl pb-6 flex flex-row flex-center text-start gap-2">
                            <Code2 className="text-zinc-800 dark:text-zinc-100 cursor-pointer font-bold" size={30} />
                            CODERSYUG
                        </Link>

                        <div className="flex gap-6 pb-5">
                            {socialLinks.map((socialLink, index) => (
                                <Link key={index} href={socialLink.link}>
                                    {socialLink.icon}
                                </Link>
                            ))}
                        </div>
                    </ul>
                </div>
                <div className="p-5">
                    <ul>
                        <p className="text-zinc-800 dark:text-zinc-100 font-bold text-2xl pb-4">Services</p>
                        {generateListItems(ServicesListData)}
                    </ul>
                </div>
                <div className="p-5">
                    <ul>
                        <p className="text-zinc-800 dark:text-zinc-100 font-bold text-2xl pb-4">Company</p>
                        {generateListItems([
                            { id: 1, title: "About🔎" },
                         
                            { id: 2, title: "Privacy Policy🔑" , href:"/privacy-policy" },
                            { id: 3, title: "Terms & Conditions👩‍💻"  ,href:"/terms-conditions" },
                            { id: 4, title: "Code of Conduct🌏" ,href:"/code-of-conduct"},
                        ])}
                    </ul>
                </div>
                <div className="p-5">
                    <ul>
                        <p className="text-zinc-800 dark:text-zinc-100  font-bold text-2xl pb-4">Support</p>
                        {generateListItems([
                            { id: 1, title: "Report a Bug🐛", href: "https://github.com/Aestheticsuraj234/codersyug/issues" },
                            { id: 2, title: "Contact Us📞" },
                            { id: 3, title: "FAQ's" },
                            { id: 4, title: "Help Center📚" },
                            { id: 5, title: "Sitemap🗺️" },
                        ])}
                    </ul>
                </div>
            </div>
            <div className="flex flex-col justify-center items-center text-center p-5 bg-gray-50 dark:bg-[#272b34]">
                <h1 className="text-gray-800 dark:text-gray-100 font-semibold">
                    © 2021-2022 All rights reserved | Build with{" "}
                    <span className="text-rose-600">❤</span> by{" "}
                    <span className="hover:text-gray-700 dark:hover:text-indigo-300 font-semibold cursor-pointer">
                        CodersYug team
                    </span>
                </h1>
            </div>
        </>
    );
}

export default Footer;
