import React from 'react';
import { QuoteOutput } from 'editorjs-react-renderer';

const CustomQuoteRender = ({ data }: any) => {
    let content = null;

    if (typeof data === 'string') content = data;
    else if (typeof data === 'object' && data.text && typeof data.text === 'string') content = data.text;

    // Define a CSS object to style the left border
    const quoteStyle = {
        borderLeft: '4px solid #6574cd', // Adjust the color as needed (indigo in this case)
        paddingLeft: '10px', // Adjust the padding as needed
        fontStyle: 'italic', // Apply italic style
    };

    return (
        <div className="mt-20 rounded-xl flex-start bg-gray-100 text-xl dark:bg-gray-800 w-full dark:text-white text-gray-800" style={quoteStyle}>
            <span className='text-sm' style={{ marginRight: '10px' }}>Quote:</span>
            <QuoteOutput data={data} />
        </div>
    );
};

export default CustomQuoteRender;
