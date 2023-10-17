"use client"
import React from 'react';

import { AiFillWarning } from 'react-icons/ai';

const CustomWarningRender = ({ data }: any) => {
    console.log(data);
  return (
    <div className='m-7 rounded-md shadow-lg border-l-4 border-yellow-500 p-4 mb-10 w-full'>
      <div className='text-yellow-500'>
        {/* Add your icon here */}
       <AiFillWarning className='text-4xl' />
      </div>
      <div className='ml-3 flex  flex-start flex-col '>
        {data.title && <h3 className='text-lg font-medium dark:text-zinc-100 text-zinc-700'>{data.title}</h3>}
        {data.message && <p className=' dark:text-zinc-400 text-zinc-900'>{data.message}</p>}
      </div>
    </div>
  );
};

export default CustomWarningRender;
