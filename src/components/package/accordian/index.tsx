// Accordion.jsx
import React from 'react';
import './accordian.scss';
import { ChevronDown } from 'lucide-react';

interface Props {
  title: string;
  content: any;
  isOpen: boolean;
  onToggle: any;
  description: string;
}

const Accordion: React.FC<Props> = ({ title, description, content, isOpen, onToggle }) => {
  return (
    <div key={title} className={`accordion-item ${isOpen ? 'open' : ''}`}>
      <div className="accordion-header" onClick={onToggle}>
        <div className="header-content">
          <span className="day-badge">{title}</span>
          <h3 className="day-title">{description}</h3>
        </div>
        <ChevronDown className={`chevron ${isOpen ? 'rotated' : ''}`} />
      </div>

      {isOpen && (
        <div className="accordion-content">
          {content}
        </div>
      )}
    </div>
  );
};

export default Accordion;