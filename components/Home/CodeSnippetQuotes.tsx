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

    const code = `
    // Define a function to simulate the codersyug journey
    const codersyug = () => {
      // List of simplified features
      const features = [
        "Learn from Blogs and Tutorials",
        "Get Guidance from Mentors",
        "Find Study Materials and Books",
        "Share Notes with Peers",
        "Practice with Quizzes and Tests",
        "Code with AI Assistance",
        "Join Study Groups Online",
        "Assess and Improve Skills",
        "Personalized Learning Paths",
        "Earn Rewards for Learning"
      ];
    
      // Welcome message
      console.log("🚀 Welcome to codersyug - empower computer science students.!🚀");
    
      // Loop through and introduce each feature with a delay
      features.forEach((feature, index) => {
        setTimeout(() => {
          console.log("✨ Feature {index + 1}: {feature}");
        }, index * 2000); 
      });
    };
    
    // Start the codersyug journey
    codersyug();
    
`;

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
