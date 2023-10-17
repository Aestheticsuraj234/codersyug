"use client"
import React from 'react';
import { DelimiterOutput } from 'editorjs-react-renderer'; // Import the ChecklistOutput component

const CustomCheckListRender = ({ data }: any) => {


    return (
        <div className='
    
mt-10 mb-10
dark:text-zinc-100
text-xl
text-zinc-800  

    '>
            <DelimiterOutput /> {/* Use the ChecklistOutput component */}
        </div>
    );
};

export default CustomCheckListRender;
