import React from 'react';
import { ChecklistOutput } from 'editorjs-react-renderer'; // Import the ChecklistOutput component

const CustomCheckListRender = ({ data }: any) => {
  return (
    <div className='
      flex
      flex-col
      justify-start
      items-start
      mt-8
      dark:text-zinc-100
      text-xl
      text-zinc-800
      font-medium
      dark:bg-gray-800
      bg-gray-100
      p-5
      rounded-xl
      md:w-2/3   // Adjust the width for medium screens
      sm:w-full   // Make it full-width for small screens
    '>
      <ChecklistOutput data={data} /> {/* Use the ChecklistOutput component */}
    </div>
  );
};

export default CustomCheckListRender;
