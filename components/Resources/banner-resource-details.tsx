import React from 'react'

const BannerDetailsResources = ({
    type,
    title,
}:any) => {
    return (
        <div className="flex w-full flex-col sm:mt-6 sm:flex-row mb-10">
            <div className="flex flex-col gap-6 rounded-md border border-b-0 border-black-400 bg-black-200 sm:h-[320px] sm:w-1/2 sm:min-w-[404px] sm:justify-center sm:rounded-r-none sm:border-b sm:border-r-0">
                <p className="small-semibold dark:text-emerald-500  text-emerald-600 font-semibold ml-2 mt-5 self-center uppercase tracking-[2px] sm:ml-16 sm:mt-2 sm:self-start">Check this - {type}</p>
                <h2 className="heading4 sm:heading2 ml-2 max-w-md text-center sm:ml-16 sm:text-left">{title}</h2>
            </div>
            <div className="relative h-[320px] w-full overflow-hidden rounded-md rounded-t-none border border-t-0 border-black-400 bg-black-200 sm:w-2/3 sm:rounded-l-none sm:border-l-0 sm:border-t">
                <div className="relative ml-12 h-[320px] w-full sm:ml-0 ">
                    <img alt="bonuses" loading="lazy" decoding="async" data-nimg="fill" className="object-cover object-left" sizes="100vw" src="https://www.jsmastery.pro/_next/image?url=%2Fassets%2Fcourses%2Fimages%2Fbonuses%2Fheader.webp&w=1920&q=75" />
                </div>
            </div>
        </div>
    )
}

export default BannerDetailsResources