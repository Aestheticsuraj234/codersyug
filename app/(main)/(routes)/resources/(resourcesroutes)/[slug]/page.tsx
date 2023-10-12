
import { getResourcesBySlug, incrementViewOnDownload, isResourcePurchasedByCurrentUser } from '@/server-action/action';
import Image from "next/image"
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import DownloadButton from '@/components/Resources/download-button';
import { ResourceAccessType } from '@prisma/client';
import { Badge } from '@/components/ui/badge';
import { Gift, LockIcon, Unlock } from 'lucide-react';
import PurchaseButton from '@/components/Resources/purchase-button';
import DownloadLinkAlert from '@/components/Resources/purchased-link-code_block';
import ResourceDetailsHeader from '@/components/Resources/resource-details-headers';
import { Separator } from "@/components/ui/separator"
import { formatDate } from '@/lib/utils';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

const ResoucesDownloadPage = async ({
    params: { slug }
}: {
    params: { slug: string }
}) => {



    const resources = await getResourcesBySlug(slug);
    const isUnlocked = await isResourcePurchasedByCurrentUser(slug);
    const parsedTechstack = resources?.techStack ? JSON.parse(resources.techStack) : [];




    return (
        <section className='nav-padding paddings mt-6 hero-height  y-paddings'>
            <ResourceDetailsHeader
                category={resources?.category}
                type={resources?.type}
            />
            <Separator />
            <div className="  flex w-[100%] flex-col items-center justify-center gap-5 lg:flex-row ">
                <div className='flex flex-1 flex-col items-start justify-center'>
                    <div className='flex flex-row items-center justify-start gap-2  w-full mt-2 mb-2 '>
                        {
                            resources?.accessType === ResourceAccessType.FREE ? (
                                <Badge variant={"free"} className='h-8'><div className='flex justify-center items-center gap-2 flex-row'>
                                    <Gift size={16} className='text-xs' />
                                    <p>Free</p>
                                </div></Badge>
                            ) : (
                                <Badge variant={`${isUnlocked ? "destructive" : "paid"}`} className='h-8'>
                                    {isUnlocked ? (
                                        <div className='flex justify-center items-center gap-2 flex-row'>
                                            <Unlock size={16} className='text-xs' />
                                            <p>Unlocked</p>
                                        </div>
                                    ) : (
                                        <div className='flex justify-center items-center gap-2 flex-row'>
                                            <LockIcon size={16} className='text-xs' />
                                            <p>locked</p>
                                        </div>
                                    )}
                                </Badge>
                            )
                        }
                        •
                        <span className='flex-center gap-2 body-semibold text-zinc-700 dark:text-zinc-300'>
                            {resources?.createdAt && formatDate(resources.createdAt)}
                        </span>

                    </div>
                    <p className="text-emerald-500 small-bold mb-2.5 text-center uppercase">CODERSYGUG - FOR THE DEVELOPERS BY THE DEVELOPER</p>

                    <h1 className="sm:heading2 heading3 ">{resources?.Title}</h1>
                    <div className='text-white-800 mt-6 text-[20px]'>

                        <p className="max-w-2xl mb-6 font-semibold text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400 ">{resources?.Description}</p>

                        {parsedTechstack && parsedTechstack.length > 0 && (
                            <div className="overflow-x-auto max-w-full">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Tech Stack🎊</h3>
                                <ScrollArea className="no-scrollbar">
                                    <ul className="dark:text-zinc-100 text-zinc-800 text-xs no-scrollbar flex gap-2 py-2 sm:max-w-md">
                                        {parsedTechstack.map((techstack: any) => (
                                            <button
                                                key={techstack}
                                                className={`bg-gradient-to-r mb-4 from-gray-700 via-gray-900 to-black dark:from-indigo-300 dark:to-purple-400 text-white font-normal whitespace-nowrap rounded-lg px-4 py-2 capitalize `}
                                            >
                                                {techstack}
                                            </button>
                                        ))}
                                        <ScrollBar orientation="horizontal" />
                                    </ul>
                                </ScrollArea>
                            </div>
                        )}


                        <div>
                            {
                                resources?.accessType === ResourceAccessType.FREE ? (
                                    <DownloadButton
                                        downloadLink={resources?.DownloadLink}
                                        slug={slug}
                                        text="Download Now"
                                        className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-gradient-to-r from-gray-700 via-gray-900 to-black dark:from-indigo-300 dark:to-purple-400 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
                                    />
                                )
                                    : (
                                        isUnlocked ? (
                                            <DownloadLinkAlert
                                                slug={slug}
                                                classNames={"inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-gradient-to-r from-gray-700 via-gray-900 to-black dark:from-indigo-300 dark:to-purple-400 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"}
                                                triggertext={"Reveal Link"}
                                                downloadLink={resources?.DownloadLink}
                                                title={"Download Link"}
                                                description={resources?.Description?.split(" ").slice(0, 10).join(" ")}
                                            />

                                        ) : (
                                            <PurchaseButton
                                                downloadLink={resources?.DownloadLink}
                                                slug={slug}
                                                text="Buy Now"
                                                price={resources?.Price}
                                                className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-gradient-to-r from-gray-700 via-gray-900 to-black dark:from-indigo-300 dark:to-purple-400 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
                                            />
                                        )
                                    )
                            }

                        </div>


                    </div>


                </div>

                <div className="flex flex-1 justify-center mt-10 lg:mb-12 lg:justify-end lg:pr-12">
                    <Image src={resources?.Thumbnail as string | StaticImport} alt="ebook image" loading="lazy" width="270" height="370" draggable={false} className="rounded-lg object-contain lg:rotate-12" />
                </div>

            </div>
        </section>
    );
};

export default ResoucesDownloadPage;