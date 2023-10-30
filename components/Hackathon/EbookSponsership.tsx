"use client"
import Link from 'next/link';
import React from 'react';
import { Button } from '../ui/button';

const EbookSponsorship = () => {
    const Participate = [
        {
            id: 1,
            step: '1',
            title: '📝 Frontend',
            description: 'Complete Html, Css, JavaScritp, Bootstrap and React.js From Beginner to Advance 🥳'
        },
        {
            id: 2,
            step: '2',
            title: '📧 Source Code',
            description: '450 Html, Css,Bootstrap , JavaScript and React Projects (Source Code)'
        },
        {
            id: 3,
            step: '3',
            title: '🤝 HandWritten Note',
            description: ' Free Hand-Written Notes Of🤯 HTML ,CSS ,JavaScript ,React.js'
        },
        {
            id: 4,
            step: '4',
            title: '🔗 Most Asked Interview Questions',
            description: '250+ Most Asked Interview Questions Of👌🏻 HTML ,CSS ,JavaScript ,React.js.'
        },
        {
            id: 5,
            step: '5',
            title: '🤔Complete Guidance ',
            description: 'Complete Guidence on Web Development , Freelancing and internships ,Resume '
        },

    ];

    const onRedirect = () => {
        window.open('https://www.bcacodewala.com/shop/master-html-to-react-ebook-fb/', '_blank');
    }
    return (
        <>
            <h1 className="text-2xl font-bold text-center  md:text-4xl text-gray-800 dark:text-white">Our Product Sponsership👑</h1>
            <p className="max-w-2xl mb-6 font-semibold text-gray-500 lg:mb-8 md:text-base lg:text-xl dark:text-gray-400">
                Click to know more
            </p>
            <Link id="sponsors" href={"https://www.bcacodewala.com/shop/master-html-to-react-ebook-fb/"} className="flex w-full flex-col sm:mt-6 sm:flex-row">
                <div className="flex flex-col gap-6 rounded-md border border-b-0 border-black-400 bg-black-200 sm:h-[320px] sm:w-1/2 sm:min-w-[404px] sm:justify-center sm:rounded-r-none sm:border-b sm:border-r-0">
                    <p className="text-green-500 ml-2 mt-5 self-center uppercase tracking-[2px] sm:ml-16 sm:mt-2 sm:self-start">Bonus #1 - Ebook (1000+ pages)</p>
                    <h2 className="text-2xl ml-2 max-w-md text-center sm:ml-16 sm:text-left">Master HTML to React</h2>
                </div>
                <div className="relative h-[320px] w-full overflow-hidden rounded-md rounded-t-none border border-t-0 border-black-400 bg-black-200 sm:w-2/3 sm:rounded-l-none sm:border-l-0 sm:border-t">
                    <div className="relative ml-12 h-[320px] w-full sm:ml-0 ">
                        <img
                            alt="bonuses"
                            loading="lazy"
                            decoding="async"
                            data-nimg="fill"
                            className="object-cover object-left"
                            sizes="100vw"
                            src="https://cloud.appwrite.io/v1/storage/buckets/64e6ef5650a3bc944e6f/files/653f72e5af748adf644e/view?project=64d3707fc8db92bf44ff&mode=admin"
                            style={{ position: 'absolute', height: '100%', width: '100%', inset: '0px', color: 'transparent' }}
                        />
                    </div>
                </div>
            </Link>
            <p className="max-w-2xl mb-6  mt-6 font-semibold text-gray-500 lg:mb-8 md:text-base lg:text-xl dark:text-gray-400">
                In this Ebook You Get🥵
            </p>
            <div className='flex flex-col justify-between items-start mt-10 space-y-4'>
                {Participate.map((item) => (
                    <div key={item.id} className='flex w-full flex-row items-center gap-5 p-5 sm:p-6 dark:bg-gray-900 bg-zinc-100 border border-slate-200 rounded-2xl hover:border-slate-300 dark:hover:border-slate-600 dark:border-slate-800/80'>
                        <div className="flex flex-row items-center justify-center flex-shrink-0 w-16 h-16 dark:bg-gray-800 bg-zinc-200 rounded-full sm:w-20 sm:h-20">
                            <span className="text-2xl font-bold text-gradient ">{item.step}</span>
                        </div>
                        <div className="flex flex-col items-start justify-center flex-1 space-y-1">
                            <h3 className="text-lg font-semibold dark:text-gray-100  text-gray-700">{item.title}</h3>
                            <p className="text-sm text-gray-400">{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
            <Button onClick={onRedirect}  className='mt-6 rounded-lg'>
                Get The E-book
            </Button>
        </>
    );
}

export default EbookSponsorship;
