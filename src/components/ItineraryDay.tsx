import React from 'react';
import type { ItineraryDay as ItineraryDayType } from '../types';
import { TransportInfo } from './TransportInfo';
import { Suggestion } from './Suggestion';

interface ItineraryDayProps {
  day: ItineraryDayType;
  isCompact?: boolean;
}

export const ItineraryDay: React.FC<ItineraryDayProps> = ({ day, isCompact = false }) => {
  return (
    <div className={`day-card ${isCompact ? 'compact' : ''}`}>
      {/* Header with gradient */}
      <div className={`day-card-header ${day.country} ${isCompact ? 'compact' : ''}`}>
        <div className={`day-header-content ${isCompact ? 'compact' : ''}`}>
          <div className={`day-info ${isCompact ? 'compact' : ''}`}>
            <h3>Día {day.day} {day.flag && day.flag}</h3>
            <div className="date">{day.date}</div>
          </div>
          <div className={`route-info ${isCompact ? 'compact' : ''}`}>
            <div className="label">Ruta</div>
            <div className="route">{day.route}</div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className={`day-card-content ${day.country} ${isCompact ? 'compact' : ''}`}>
        {/* Transport */}
        {day.transport && (
          <div className={`content-section ${isCompact ? 'compact' : ''}`}>
            <div className={`section-header ${isCompact ? 'compact' : ''}`}>
              <div className={`section-dot ${day.country} ${isCompact ? 'compact' : ''}`}></div>
              <span className={`section-title ${day.country} ${isCompact ? 'compact' : ''}`}>Transporte:</span>
              <TransportInfo transport={day.transport} country={day.country} isCompact={isCompact} />
            </div>
          </div>
        )}

        {/* Activities */}
        <div className={`content-section ${isCompact ? 'compact' : ''}`}>
          <div className={`section-header ${isCompact ? 'compact' : ''}`}>
            <div className={`section-dot ${day.country} ${isCompact ? 'compact' : ''}`}></div>
            <h4 className={`section-title ${day.country} ${isCompact ? 'compact' : ''}`}>Actividades</h4>
          </div>
          <p className={`activities-text ${day.country} ${isCompact ? 'compact' : ''}`}>{day.activities}</p>
        </div>

        {/* Accommodation */}
        {day.accommodation && (
          <div className={`content-section ${isCompact ? 'compact' : ''}`}>
            <div className={`section-header ${isCompact ? 'compact' : ''}`}>
              <div className={`section-dot ${day.country} ${isCompact ? 'compact' : ''}`}></div>
              <span className={`section-title ${day.country} ${isCompact ? 'compact' : ''}`}>Alojamiento:</span>
              <span className={`activities-text ${day.country} ${isCompact ? 'compact' : ''}`} style={{ marginLeft: 0 }}>{day.accommodation}</span>
            </div>
          </div>
        )}

        {/* Suggestions - Hidden in compact view */}
        {day.suggestions.length > 0 && !isCompact && (
          <div className="content-section">
            <div className="section-header">
              <div className={`section-dot ${day.country}`}></div>
              <h4 className={`section-title ${day.country}`}>Recomendaciones</h4>
            </div>
            <div className="suggestions-container">
              {day.suggestions.map((suggestion, index) => (
                <Suggestion
                  key={index}
                  suggestion={suggestion}
                  country={day.country}
                  isCompact={isCompact}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};