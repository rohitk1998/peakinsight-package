// Accordion.jsx
import React from 'react';
import './accordian.scss';

interface Props{
    title : string ;
    content: any ;
     isOpen: boolean;
    onToggle:any;
    description: string;
}

const Accordion: React.FC<Props> = ({ title, description, content, isOpen, onToggle }) => {
  console.log('isOpen',isOpen);
  
  return (
    <div className={`accordion ${isOpen ? 'accordion--active' : ''}`}>
      <button className="accordion__header" onClick={onToggle}>
        <span className="accordion__title" >
          <span style={{ fontSize: '14px', fontWeight: 'bold', color: 'white',background: '#00c494',padding: '0.5rem 1rem',borderRadius: '20px'}}>{title}</span>
           <span style={{ fontSize: '16px', fontWeight: 'normal', color: 'grey',marginLeft:"20px" }}>{description}</span></span>
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