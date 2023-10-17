import React from 'react';
import { LinkToolOutput } from 'editorjs-react-renderer';

const CustomLinkRender = ({ data }: any) => {
    let content = null;

    if (typeof data === 'string') content = data;
    else if (typeof data === 'object' && data.text && typeof data.text === 'string') content = data.text;

    // Define CSS classes for dark and light modes
    const darkModeClasses = 'dark:text-zinc-100 text-zinc-800';
    const lightModeClasses = 'text-black'; // Modify this based on your light mode styling

    // Responsive text size classes
    const textSmClasses = 'sm:text-sm';
    const textMdClasses = 'md:text-md';
    const textLgClasses = 'lg:text-lg';

    return (
        <div className={`prose ${darkModeClasses} ${lightModeClasses} ${textSmClasses} ${textMdClasses} ${textLgClasses}`}>
            <LinkToolOutput data={data} />
        </div>
    );
};

export default CustomLinkRender;
