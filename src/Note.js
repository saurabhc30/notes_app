import React from 'react';
import ReactMarkdown from 'react-markdown';

const Note = ({ title, content }) => {
  return (
    <div className="note">
      <h2>{title}</h2>
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}

export default Note;
