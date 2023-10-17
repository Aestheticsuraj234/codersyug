import React from 'react';

const ParagraphRenderer = ({ data }: any) => {
    let content = null;

    if (typeof data === 'string') content = data;
    else if (typeof data === 'object' && data.text && typeof data.text === 'string') content = data.text;

    // Define CSS classes for dark and light modes
    const darkModeClasses = 'dark:text-zinc-300';
    const lightModeClasses = 'text-zinc-800'; // Modify this based on your light mode styling

    // Responsive text size classes
    const textSmClasses = 'sm:text-sm';
    const textMdClasses = 'md:text-md';
    const textLgClasses = 'lg:text-lg';

    return content ? (
        <p
            className={`font-semibold ${darkModeClasses} ${lightModeClasses} ${textSmClasses} ${textMdClasses} ${textLgClasses}`}
            dangerouslySetInnerHTML={{ __html: content }}
        />
    ) : <></>;
};

export default ParagraphRenderer;
