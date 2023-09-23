import React, { useState } from 'react';

const Newspost = () => {
  const [newsText, setNewsText] = useState('');

  const handleNewsTextChange = (e) => {
    setNewsText(e.target.value);
  };

  const handlePostNews = () => {
    // Handle posting news logic here (e.g., send to the server)
    console.log('Posted news:', newsText);
    // Clear the text area after posting
    setNewsText('');
  };

  return (
    <div>
      <h3>Post News</h3>
      <textarea
        placeholder="Enter your news update..."
        value={newsText}
        onChange={handleNewsTextChange}
        rows="4"
      />
      <button onClick={handlePostNews}>Post</button>
    </div>
  );
};

export default Newspost;
