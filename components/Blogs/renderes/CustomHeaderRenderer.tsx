import React from 'react';

const CustomHeaderRenderer = ({ data }: any) => {
  let content = null;
  const { text, level } = data;

  if (typeof text === 'string' && typeof level === 'number') {
    const HeadingTag = `h${level}`;
    content = text;

    return React.createElement(
      HeadingTag,
      { className: 'text-zinc-700 dark:text-zinc-300 ' }, // Add responsive text size classes
      content
    );
  }

  return null; // Return null if data is not valid
};

export default CustomHeaderRenderer;
