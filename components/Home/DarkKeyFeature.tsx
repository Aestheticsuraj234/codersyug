import Image from "next/image";
import { BiWorld } from "react-icons/bi";
import { SiAppwrite } from "react-icons/si";
import { Bot } from "lucide-react";
import { AiFillThunderbolt } from "react-icons/ai";

const features = [
    {
        icon: <Bot size={36} className="text-indigo-400" />,
        title: "AI Powered Personalised Coding Mentor",
        description: "Presenting CodersYug AI-Powered Personalised Coding Mentor, a Revolutionary Tool that will Help You Learn to Code Faster and Better than Ever Before.",
    },
    {
        icon: <BiWorld size={36} className="text-green-500" />,
        title: "Coding Groups",
        description: "Join CodersYug Coding Groups to Connect with Like-Minded People, Share Your Knowledge, and Learn from Others.",
    },
    {
        icon: <SiAppwrite size={36} className="text-pink-600" />,
        title: "Learning Management System",
        description: "Based on skill assessments and career goals, CodersYug generates personalized learning paths with recommended courses, books, and resources.",
    },
    {
        icon: <AiFillThunderbolt size={36} className="text-yellow-400" />,
        title: "Unleash the Power of Next.js",
        description: "Experience Lightning-Fast, Next-Level Tech Publishing on CodersYug Cutting-Edge Platform.",
    },
];

const DarkKeyFeatureCard = () => {
    return (
        <section className="bg-white dark:bg-[#0f172a] flex w-[100%] border  flex-col p-4 mt-12 rounded-lg max-w-full ">
            <h4 className="items-start justify-start flex text-left font-semibold text-green-500 ">
                Key Feature
            </h4>
            {/* subsection-1 */}
            <div className="flex md:flex-row  flex-col md:justify-between justify-center  items-center mt-3">
                <h2 className="font-bold dark:text-white text-zinc-800  md:text-4xl text-xl max-w-lg leading-10 mb-10 ">
                    Offering a supportive community, valuable resources, and tools for skill development and career advancement.
                </h2>
                <Image
                    src={"/assests/feeling.svg"}
                    width={340}
                    height={340}
                    className="object-contain"
                    alt=""
                />
            </div>

            <div className="grid md:grid-cols-2 grid-cols-1 gap-4 mt-6">
                {features.map((feature, index) => (
                    <div key={index} className="p-4 rounded-lg ">
                        <h3 className="md:text-xl text-sm  font-bold flex flex-row justify-start dark:text-white text-zinc-800 items-center text-left gap-3">
                            {feature.icon}
                            {feature.title}
                        </h3>
                        <p className="md:text-base text-xs  dark:text-white text-zinc-800 font-semibold flex justify-start md:px-11  items-center">
                            {feature.description}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default DarkKeyFeatureCard;
