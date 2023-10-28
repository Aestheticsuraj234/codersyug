import React from 'react';

const prizeItems = [
    {
        name: "Coding Keyboard & Mouse",
        position: "1st Place",
        imageUrl: "/keyboard_mouse.png",
    },
    {
        name: "Laptop Stand",
        position: "2nd Place",
        imageUrl: "/laptop-stand.png",
    },
    {
        name: "Coding Stickers",
        position: "3rd Place",
        imageUrl: "https://cloud.appwrite.io/v1/storage/buckets/64e6ef5650a3bc944e6f/files/6537c01fbdee1ea28074/view?project=64d3707fc8db92bf44ff&mode=admin",
    },
    {
        name: "Codersyug T-Shirt",
        position: "For Top 5 Participants",
        imageUrl: "https://cloud.appwrite.io/v1/storage/buckets/64e6ef5650a3bc944e6f/files/6537c07143df4a1edf0e/view?project=64d3707fc8db92bf44ff&mode=admin",
    },
];

const PrizeBox = () => {
    return (
        <div className='grid md:grid-cols-2  grid-cols-1 gap-4 bg-zinc-100 px-2 py-2 rounded-md w-full'>
            {prizeItems.map((prize, index) => (
                <div key={index} className='flex flex-row items-center gap-4'>
                    <div className='w-32 h-32 rounded-full bg-white flex items-center justify-center overflow-hidden'>
                        <img
                            src={prize.imageUrl}
                            alt={prize.name}
                            className='h-32 w-auto object-contain'
                            style={{ maxHeight: '100%' }}
                        />
                    </div>
                    <div>
                        <p className='text-lg font-bold text-gray-700'>
                            {prize.name}
                        </p>
                        <span className='text-sm'>
                            {prize.position}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default PrizeBox;
