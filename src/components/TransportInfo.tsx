import React from 'react';
import type { Transport } from '../types';

interface TransportInfoProps {
  transport: Transport | null;
  country: 'portugal' | 'spain';
  isCompact?: boolean;
}

export const TransportInfo: React.FC<TransportInfoProps> = ({ transport, country, isCompact = false }) => {
  if (!transport) return null;

  return (
    <div className={`transport-info ${country} ${isCompact ? 'compact' : ''}`}>
      <span style={{ fontWeight: 800 }}>{transport.type}</span>
      {transport.time && (
        <>
          <div className="transport-dot"></div>
          <span style={{ fontWeight: 500 }}>{transport.time}</span>
        </>
      )}
      {transport.distance && (
        <>
          <div className="transport-dot"></div>
          <span style={{ fontWeight: 500 }}>{transport.distance}</span>
        </>
      )}
    </div>
  );
};