"use client"

import { useState } from 'react';
import styles from './AppPage.module.css';

export default function AppPage({ params, searchParams }) {
  const [streamingContent, setStreamingContent] = useState('');
  const [userContent, setUserContent] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);

  const handleContentChange = (e) => {
    setUserContent(e.target.value);
  };

  const handleCopyClick = () => {
    navigator.clipboard.writeText(streamingContent);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const id = params.id;

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
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl">
        <h1 className="text-3xl mb-4">{searchParams.name}</h1>
        <div className="bg-gray-100 p-4 rounded-md mb-4 relative">
          <pre className="text-sm overflow-auto whitespace-pre-wrap">{streamingContent}</pre>
          <button className={styles.copyButton} onClick={handleCopyClick}>Copy</button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={userContent}
            onChange={handleContentChange}
            placeholder="Enter your content"
            className="border p-2 rounded w-full"
          />
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded w-full">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
