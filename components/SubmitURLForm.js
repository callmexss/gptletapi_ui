import React, { useState } from 'react';
import axios from 'axios';

const SubmitURLForm = () => {
  const [urlInput, setUrlInput] = useState('');
  const [urlError, setUrlError] = useState('');
  const [submitMessage, setSubmitMessage] = useState('');

  const isGptsUrl = (url) => {
    const pattern = /^https:\/\/chat\.openai\.com\/g\/[a-zA-Z0-9-]+$/;
    return pattern.test(url);
  };

  const handleSubmit = async () => {
    if (isGptsUrl(urlInput)) {
      setUrlError('');
      setSubmitMessage('Your URL is being processed, please wait...');

      try {
        const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
        await axios.post(`${apiBaseUrl}/process_url/`, { url: urlInput });

        setSubmitMessage('URL successfully submitted. Processing may take some time.');
      } catch (error) {
        console.error('Error submitting URL:', error);
        setSubmitMessage('Error occurred while submitting the URL.');
      }
    } else {
      setUrlError('Invalid URL. Please enter a valid GPTs URL.');
      setSubmitMessage('');
    }
  };

  return (
    <div className='mb-8'>
      <h2 className='text-2xl sm:text-3xl font-bold text-center mb-4'>Submit Your GPTs URL</h2>
      <div className='flex flex-col sm:flex-row items-center gap-3'>
        <input
          type='text'
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
          placeholder='https://chat.openai.com/g/...'
          className='flex-grow border p-2 rounded w-full'
        />
        <button onClick={handleSubmit} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
          Submit
        </button>
      </div>
      {urlError && <p className='text-red-500 text-center mt-2'>{urlError}</p>}
      {submitMessage && <p className='text-green-500 text-center mt-2'>{submitMessage}</p>}
    </div>
  );
};

export default SubmitURLForm;
