import React, { useEffect, useState } from 'react';
import 'react-quill/dist/quill.snow.css';

import dynamic from 'next/dynamic';
import { Loader2Icon } from 'lucide-react';
const QuillNoSSRWrapper = dynamic(import('react-quill'), {
  ssr: false,
  loading: () => <div className="flex justify-center items-center h-64"><Loader2Icon className="animate-spin" size={64} /></div>,
});

// Define a props interface
interface QuillEditorProps {
  value: string;
  onChange: (value: string) => void;
  modules: Record<string, unknown>; // You can define a more specific type for modules if needed
  formats: string[];
  className?: string;
}

const QuillEditor = ({ value, onChange, modules, formats, className }: QuillEditorProps) => {
  return (
    <QuillNoSSRWrapper value={value} onChange={onChange} modules={modules} formats={formats} className={className} theme="snow" />
  );
};

const RichTextEditor = () => {
  const [editorState, setEditorState] = useState('');
  const modules = {
    toolbar: [
      [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'align': [] }],
      ['link', 'image', 'video'],
      ['clean'],
      [{ 'background': [] }, { 'color': [] }, { 'font': [] }, { 'code': [] }, { 'script': 'super' }, { 'script': 'sub' }],
      ['blockquote', 'indent', 'list'],
      [{ 'align': [] }, { 'direction': 'rtl' }],
      ['code-block'],
      [{ 'formula': 'formula' }],
    ],
  };

  const formats = [
    'header', 'font', 'list', 'bold', 'italic', 'underline', 'strike',
    'align', 'link', 'image', 'video', 'clean', 'background', 'color', 'code',
    'script', 'blockquote', 'indent', 'direction', 'code-block', 'formula',
  ];

  return (
    <QuillEditor
      value={editorState}
      onChange={setEditorState}
      modules={modules}
      formats={formats}
      className="bg-white dark:bg-gray-700 dark:text-white"
    />
  );
};

export default RichTextEditor;
