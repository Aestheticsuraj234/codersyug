import Image from "next/image"
import { AiFillGithub, AiFillThunderbolt } from "react-icons/ai"
import { BiWorld } from "react-icons/bi"
import { SiAppwrite } from "react-icons/si"

const DarkKeyFeatureCard = () => {
    return (
        <section className='bg-white dark:bg-[#0f172a] flex w-[100%] border  flex-col p-4 mt-12 rounded-lg max-w-full '>
            <h4 className='items-start justify-start flex text-left font-semibold text-green-500 '>Key Feature</h4>
            {/* subsection-1 */}
            <div className='flex md:flex-row  flex-col md:justify-between justify-center  items-center mt-3'>

                <h2 className='font-bold dark:text-white text-zinc-800  md:text-4xl text-3xl max-w-lg leading-10 '> Unleash Your Creativity with Sigma-Node's Multifaceted Content Platform</h2>
                <Image
                    src={"/assests/feeling.svg"}
                    width={340}
                    height={340}
                    className="object-contain"
                    alt=""
                />

            </div>
           
            <div className="grid md:grid-cols-2 grid-cols-1 gap-4 mt-6">
                {/* Card 1 */}
                <div className="p-4 rounded-lg ">
                    <h3 className="text-xl font-bold flex flex-row justify-start dark:text-white text-zinc-800 items-center text-left gap-3">
                        <AiFillGithub size={36} className="text-indigo-400" />
                        Automatic GitHub Backup
                    </h3>
                    <p className="text-base  dark:text-white text-zinc-800 font-semibold flex justify-start px-11 items-center">Effortless GitHub Backup Integration: Safeguard Your Content with Sigma-Node's Automatic Backup Feature.</p>
                </div>
                {/* card-2 */}
                <div className="p-4 rounded-lg ">
                    <h3 className="text-xl font-bold flex flex-row justify-start dark:text-white text-zinc-800  items-center text-left gap-3">
                        <BiWorld size={36} className="text-green-500" />
                        Social Sphere
                    </h3>
                    <p className="text-base dark:text-white text-zinc-800  font-semibold flex justify-start px-11 items-center">Stand Out in the Social Sphere: Create Your Online Presence on Sigma-Node's Platform without the Need for a Custom Domain.</p>
                </div>
                {/* card-3 */}
                <div className="p-4 rounded-lg ">
                    <h3 className="text-xl font-bold flex flex-row justify-start dark:text-white text-zinc-800  items-center text-left gap-3">
                        <SiAppwrite size={36} className="text-pink-600" />
                        Write in Markdown
                    </h3>
                    <p className="text-base dark:text-white text-zinc-800  font-semibold flex justify-start px-11 items-center">Seamless Markdown Writing Experience: Embrace Distraction-Free Creation with Sigma-Node's Dynamic Editor and Live Previews.</p>
                </div>
                {/* card-4 */}
                <div className="p-4 rounded-lg ">
                    <h3 className="text-xl font-bold flex flex-row justify-start dark:text-white text-zinc-800  items-center text-left gap-3">
                        <AiFillThunderbolt size={36} className="text-yellow-400" />
                        Unleash the Power of Next.js
                    </h3>
                    <p className="text-base dark:text-white text-zinc-800  font-semibold flex justify-start px-11 items-center">Experience Lightning-Fast, Next-Level Tech Publishing on Sigma-Node's Cutting-Edge Platform.</p>
                </div>

            </div>


        </section>
    )
}

export default DarkKeyFeatureCard