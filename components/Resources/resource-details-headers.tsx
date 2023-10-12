import React from 'react';

const ResourceDetailsHeader = ({
    category,
    type,
}: any) => {
    return (
        <div className='flex-center flex-col gap-3 sm:gap-5 mb-10'>
            <p className="font-semibold sm:text-bold dark:text-emerald-500 text-emerald-600 text-center uppercase tracking-[2px]">Unlock Your Path to Success and Achieve Unrivaled Excellence in Development</p>
            <h1 className="heading3 sm:heading2 w-full text-center  tracking-[-0.64px]">Elevate Your Skills to the Top 1% in <span className="text-gradient_blue">{category} </span>Development in Just One <span className='mt-2 bg-gradient-to-r text-transparent bg-clip-text  from-teal-500 to-lime-400'>{type}</span></h1>
            <p className="body-regular sm:base-regular mt-1 w-[310px] justify-center text-center text-zinc-500 dark:text-zinc-200 sm:mt-[10px] sm:w-full">Dive into the Cutting-Edge Tech of 2023 with Our In-Depth Content</p>
        </div>
    );
};

export default ResourceDetailsHeader;
