import React from 'react';
import { ListOutput } from 'editorjs-react-renderer';

const CustomListRender = ({ data }: any) => {
  let content = null;

  if (typeof data === 'string') content = data;
  else if (typeof data === 'object' && data.items && typeof data.items === 'string') content = data.items;

  // Define CSS classes for dark and light modes
  const darkModeClasses = 'dark:text-zinc-300';
  const lightModeClasses = 'text-zinc-600'; // Modify this based on your light mode styling

  // Responsive text size classes
  const textSmClasses = 'sm:text-sm';
  const textMdClasses = 'md:text-md';
  const textLgClasses = 'lg:text-lg';

  return (
    <div className={`prose ${darkModeClasses} ${lightModeClasses} ${textSmClasses} ${textMdClasses} ${textLgClasses}`}>
      <ListOutput
        data={{
          items: content,
          style: data.style,
        }}
      />
    </div>
  );
};

export default CustomListRender;
