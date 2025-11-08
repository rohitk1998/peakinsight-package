// Accordion.jsx
import React, { useState } from 'react';
import './accordian.scss';

interface Props{
    title : string ;
    content: string ;
     isOpen: boolean;
    onToggle:any;
}

const Accordion: React.FC<Props> = ({ title, content, isOpen, onToggle }) => {
  return (
    <div className={`accordion ${isOpen ? 'accordion--active' : ''}`}>
      <button className="accordion__header" onClick={onToggle}>
        <span className="accordion__title">{title}</span>
        <span className="accordion__icon">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>
      <div className="accordion__content">
        <div className="accordion__body">
          {content}
        </div>
      </div>
    </div>
  );
};

export default Accordion;