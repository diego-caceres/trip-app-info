import React from 'react';
import type { ItineraryDay } from '../types';

interface ItineraryTableProps {
  days: ItineraryDay[];
}

export const ItineraryTable: React.FC<ItineraryTableProps> = ({ days }) => {
  return (
    <div className="table-container">
      <div className="table-wrapper">
        <table className="itinerary-table">
          <thead>
            <tr>
              <th>Día</th>
              <th>Fecha</th>
              <th>Ciudad/Ruta</th>
              <th>Transporte</th>
              <th>Alojamiento</th>
              <th className="activities-column">Actividades Principales</th>
            </tr>
          </thead>
          <tbody>
            {days.map((day) => (
              <tr key={day.day} className={`table-row ${day.country}`}>
                <td className="day-cell">
                  <div className="day-number">
                    <span className="day-flag">{day.flag}</span>
                    <span className="day-text">Día {day.day}</span>
                  </div>
                </td>
                <td className="date-cell">
                  <span className="date-text">{day.date}</span>
                </td>
                <td className="route-cell">
                  <span className="route-text">{day.route}</span>
                </td>
                <td className="transport-cell">
                  {day.transport ? (
                    <div className={`transport-badge ${day.country}`}>
                      <span className="transport-type">{day.transport.type}</span>
                      {day.transport.time && (
                        <span className="transport-detail">{day.transport.time}</span>
                      )}
                      {day.transport.distance && (
                        <span className="transport-detail">{day.transport.distance}</span>
                      )}
                    </div>
                  ) : (
                    <span className="no-transport">—</span>
                  )}
                </td>
                <td className="accommodation-cell">
                  {day.accommodation ? (
                    <span className="accommodation-text">{day.accommodation}</span>
                  ) : (
                    <span className="no-accommodation">—</span>
                  )}
                </td>
                <td className="activities-cell">
                  <div className="activities-summary">
                    {day.activities}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Mobile Cards for smaller screens */}
      <div className="mobile-cards">
        {days.map((day) => (
          <div key={day.day} className={`mobile-card ${day.country}`}>
            <div className="mobile-header">
              <div className="mobile-day">
                <span className="mobile-flag">{day.flag}</span>
                <span className="mobile-day-text">Día {day.day}</span>
              </div>
              <span className="mobile-date">{day.date}</span>
            </div>
            
            <div className="mobile-route">
              <strong>📍 {day.route}</strong>
            </div>
            
            {day.transport && (
              <div className="mobile-transport">
                🚗 {day.transport.type}
                {day.transport.time && <span> • {day.transport.time}</span>}
                {day.transport.distance && <span> • {day.transport.distance}</span>}
              </div>
            )}
            
            {day.accommodation && (
              <div className="mobile-accommodation">
                🏨 {day.accommodation}
              </div>
            )}
            
            <div className="mobile-activities">
              <strong>Actividades:</strong> {day.activities}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};