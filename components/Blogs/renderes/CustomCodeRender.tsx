'use client';
import React, { useEffect, useRef, useState } from 'react';
import hljs from 'highlight.js/lib/core';
import 'highlight.js/styles/atom-one-dark.css'; // Import the theme you want to use
import { Button } from '@/components/ui/button';
import { Check, Copy } from 'lucide-react';

function CustomCodeRenderer({ data }: any) {
  const codeRef = useRef(null);
  const [copied, setCopied] = useState(false);

  const onCopy = () => {
    // Remove HTML tags only when code is other than HTML and dont include the highligh.js tags
    const codeToCopy = data.language !== 'html'
      ? data.code.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ')
      : data.code.replace(/&nbsp;/g, ' ');

    navigator.clipboard.writeText(codeToCopy);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  useEffect(() => {
    if (codeRef.current) {
      hljs.highlightBlock(codeRef.current);
    }
  }, [data.code, data.language]);

  return (
    <div className='
      flex-1
      justify-start
      items-center
      w-full
      overflow-x-auto
      rounded-md
      shadow-lg
      m-6
      p-6
      bg-zinc-100
      dark:bg-gray-900
      relative
      md:w-2/3   // Adjust the width for medium screens
      sm:w-full   // Make it full-width for small screens
    '>
      <Button className='absolute top-1 right-2' onClick={onCopy} size="icon" variant="ghost">
        {copied
          ? <Check className="w-4 h-4 text-green-400" />
          : <Copy className="w-4 h-4" />
        }
      </Button>
      <pre className='bg-gray-800 rounded-md p-4'>
        <code
          ref={codeRef}
          dangerouslySetInnerHTML={{ __html: data.code }}
          className='overflow-x-auto rounded-md font-semibold text-sm md:text-lg'
        />
      </pre>
    </div>
  );
}

export default CustomCodeRenderer;
