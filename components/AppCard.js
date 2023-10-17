"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import SyntaxHighlighter from 'react-syntax-highlighter';
import styles from './AppCard.module.css';

const CodeBlock = ({ node, inline, className, children, ...props }) => {
  const match = /language-(\w+)/.exec(className || '');

  const handleCopyClick = () => {
    navigator.clipboard.writeText(String(children).replace(/\n$/, ''));
  };

  return !inline && match ? (
    <div style={{ position: 'relative' }}>
      <button
        onClick={handleCopyClick}
        className={styles.copyButton} 
      >
        Copy
      </button>
      <SyntaxHighlighter language={match[1]} PreTag="div" style={docco} {...props}>
        {String(children).replace(/\n$/, '')}
      </SyntaxHighlighter>
    </div>
  ) : (
    <code className={className} {...props}>
      {children}
    </code>
  );
};


export default function AppCard({ id, name, description}) {
  const router = useRouter();
  const [streamingContent, setStreamingContent] = useState('');
  const [userContent, setUserContent] = useState('');

  const handleContentChange = (e) => {
    setUserContent(e.target.value);
  };

  const handleCopyClick = () => {
    navigator.clipboard.writeText(streamingContent);
  };

  const handleClearInput = () => {
    setUserContent('');
  };

  const handleGoToHome = () => {
    router.push("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    // Reset the streaming content
    setStreamingContent('');

    try {
      // Initiating Fetch for streaming with POST method
      const response = await fetch(`${apiBaseUrl}/openai/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, content: userContent }),
      });

      const reader = response.body.getReader();
      while (true) {
        const { done, value } = await reader.read();

        if (done) {
          break;
        }

        const text = new TextDecoder().decode(value);
        setStreamingContent((prevContent) => prevContent + text);
      }
      
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <div className="bg-white py-4 px-2 md:p-4 rounded-lg shadow-xl w-full max-w-2xl text-sm md:text-base lg:text-xl">
      <h1 className="text-3xl font-semibold mb-6">{name}</h1>
      <p className="text-base mb-4">{description}</p>
      <div className={`bg-gray-100 p-4 rounded-md mb-4 relative ${styles.cardBody}`}>
        <div className="p-2">
          <ReactMarkdown components={{ code: CodeBlock }} remarkPlugins={[remarkGfm]}>
            {streamingContent}
          </ReactMarkdown>
        </div>
        <button className={`${styles.copyButton} text-base`} onClick={handleCopyClick}>Copy</button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex space-x-4">
          <input
            type="text"
            value={userContent}
            onChange={handleContentChange}
            placeholder="Enter your content"
            className="border p-2 rounded w-full flex-grow"
          />
          <button type="button" onClick={handleClearInput} className="bg-gray-500 hover:bg-gray-600 text-white p-2 rounded w-1/5">
            Clear
          </button>
          <button type="button" onClick={handleGoToHome} className="bg-green-600 hover:bg-green-700 text-white p-2 rounded w-1/5">
            Back
          </button>
        </div>
        <div>
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded w-full">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
