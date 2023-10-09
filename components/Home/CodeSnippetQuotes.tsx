"use client"
import React, { useEffect } from 'react';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import 'highlight.js/styles/github-dark.css'

hljs.registerLanguage('javascript', javascript);

const CodeSnippetQuotes = () => {
  useEffect(() => {
    hljs.highlightAll();
  }, []);


  // Write a motivational quote here
  const code = `
// We are all in the gutter, but some of us are looking at the stars.
   while(AchievingGoals){
        console.log('Do not give up')
   }
    `


  const highlightedCode = hljs.highlight(code, { language: 'javascript' }).value;

  return (
    <div className=' hidden md:flex justify-center items-center w-full'>
      <pre className=' bg-gray-800 h-auto w-auto border-2 dark:border-indigo-300 rounded-md shadow-lg border-pink-700 text-white '>
        <code
          className="block whitespace-pre overflow-x-auto rounded-md"
          dangerouslySetInnerHTML={{
            __html: highlightedCode,
          }}
        />
      </pre>
    </div>
  );
};

export default CodeSnippetQuotes;
