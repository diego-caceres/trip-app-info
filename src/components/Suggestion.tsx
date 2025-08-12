import React, { useState } from 'react';
import type { Suggestion as SuggestionType } from '../types';

interface SuggestionProps {
  suggestion: SuggestionType;
  country: 'portugal' | 'spain';
  onStatusChange?: (status: 'pending' | 'completed') => void;
  isCompact?: boolean;
}

export const Suggestion: React.FC<SuggestionProps> = ({ 
  suggestion, 
  country, 
  onStatusChange,
  isCompact = false
}) => {
  const [status, setStatus] = useState<'pending' | 'completed'>(
    suggestion.status || 'pending'
  );

  const handleStatusChange = () => {
    const newStatus = status === 'pending' ? 'completed' : 'pending';
    setStatus(newStatus);
    onStatusChange?.(newStatus);
  };

  return (
    <div className={`suggestion-item ${suggestion.type} ${suggestion.type === 'tip' ? country : ''} ${isCompact ? 'compact' : ''}`}>
      <div className={`suggestion-content ${isCompact ? 'compact' : ''}`}>
        <button
          onClick={handleStatusChange}
          className={`suggestion-checkbox ${status === 'completed' ? `completed ${country}` : ''} ${isCompact ? 'compact' : ''}`}
          aria-label={status === 'completed' ? `Marcar como pendiente: ${suggestion.title}` : `Marcar como completado: ${suggestion.title}`}
        >
          {status === 'completed' && (
            <svg style={{ width: isCompact ? '0.625rem' : '0.75rem', height: isCompact ? '0.625rem' : '0.75rem', color: 'white' }} fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          )}
        </button>
        <div className={`suggestion-text ${isCompact ? 'compact' : ''}`}>
          <h4>{suggestion.title}</h4>
          <p className={status === 'completed' ? 'completed' : ''}>
            {suggestion.content}
          </p>
        </div>
      </div>
    </div>
  );
};