import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import L from "leaflet";
import type { ItineraryDay } from "../types";

interface MapViewProps {
  days: ItineraryDay[];
}

// City coordinates for the itinerary
const cityCoordinates: Record<string, [number, number]> = {
  Lisboa: [38.7223, -9.1393],
  Lagos: [37.1028, -8.6742],
  Sevilla: [37.3886, -5.9823],
  Granada: [37.1773, -3.5986],
  Valencia: [39.4699, -0.3763],
  Barcelona: [41.3851, 2.1734],
  Madrid: [40.4168, -3.7038],
};

// Extract city name from route string
const extractCityFromRoute = (route: string): string => {
  if (route.includes(" → ")) {
    return route.split(" → ")[1] || route.split(" → ")[0];
  }
  if (route.includes(" - ")) {
    return route.split(" - ")[1] || route.split(" - ")[0];
  }

  for (const city of Object.keys(cityCoordinates)) {
    if (route.includes(city)) {
      return city;
    }
  }

  return route;
};

// Create custom icons for markers
const createMarkerIcon = (country: "portugal" | "spain", dayNumber: number) => {
  const color = country === "portugal" ? "#22c55e" : "#ef4444";

  return L.divIcon({
    className: "custom-div-icon",
    html: `
      <div style="
        background-color: ${color};
        width: 30px;
        height: 30px;
        border-radius: 50%;
        border: 3px solid white;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: bold;
        font-size: 14px;
        box-shadow: 0 3px 6px rgba(0,0,0,0.16);
      ">
        ${dayNumber}
      </div>
    `,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
  });
};

export const MapView: React.FC<MapViewProps> = ({ days }) => {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  // Create route coordinates
  const routeCoordinates = days
    .map((day) => {
      const city = extractCityFromRoute(day.route);
      const coords = cityCoordinates[city];
      return coords
        ? {
            day: day.day,
            city,
            coords,
            country: day.country,
            date: day.date,
            activities: day.activities,
            transport: day.transport,
            accommodation: day.accommodation,
            route: day.route,
            flag: day.flag,
          }
        : null;
    })
    .filter(Boolean);

  // Create polyline positions
  const polylinePositions = routeCoordinates.map((point) => point!.coords);

  const selectedDayData = selectedDay
    ? days.find((day) => day.day === selectedDay)
    : null;

  return (
    <div className="map-view-container">
      <div className="map-header">
        <h2 className="map-title">Mapa del Itinerario</h2>
      </div>

      <div className="map-content">
        <div className="map-wrapper">
          <MapContainer
            center={[39.5, -2.5]}
            zoom={6}
            style={{ height: "100%", width: "100%" }}
            scrollWheelZoom={true}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* Route polyline */}
            {polylinePositions.length > 1 && (
              <Polyline
                positions={polylinePositions}
                color="#6366f1"
                weight={4}
                opacity={0.8}
                dashArray="10, 10"
              />
            )}

            {/* City markers */}
            {routeCoordinates.map(
              (point) =>
                point && (
                  <Marker
                    key={point.day}
                    position={point.coords}
                    icon={createMarkerIcon(point.country, point.day)}
                    eventHandlers={{
                      click: () => setSelectedDay(point.day),
                    }}
                  />
                )
            )}
          </MapContainer>
        </div>

        {/* Day Details Panel */}
        {selectedDayData && (
          <div className={`day-details-panel ${selectedDayData.country}`}>
            <div className="panel-header">
              <h3>
                Día {selectedDayData.day} {selectedDayData.flag}
              </h3>
              <button
                onClick={() => setSelectedDay(null)}
                className="close-button"
                aria-label="Cerrar detalles"
              >
                ×
              </button>
            </div>
            <div className="panel-content">
              <div className="detail-item">
                <strong>Fecha:</strong> {selectedDayData.date}
              </div>
              <div className="detail-item">
                <strong>Ruta:</strong> {selectedDayData.route}
              </div>
              {selectedDayData.transport && (
                <div className="detail-item">
                  <strong>Transporte:</strong> {selectedDayData.transport.type}
                  {selectedDayData.transport.time &&
                    ` • ${selectedDayData.transport.time}`}
                  {selectedDayData.transport.distance &&
                    ` • ${selectedDayData.transport.distance}`}
                </div>
              )}
              {selectedDayData.accommodation && (
                <div className="detail-item">
                  <strong>Alojamiento:</strong> {selectedDayData.accommodation}
                </div>
              )}
              <div className="detail-item">
                <strong>Actividades:</strong>
                <p className="activities-text">{selectedDayData.activities}</p>
              </div>
            </div>
          </div>
        )}

        {/* Legend */}
        <div className="map-legend">
          <h4>Leyenda</h4>
          <div className="legend-items">
            <div className="legend-item">
              <div className="legend-marker portugal"></div>
              <span>Portugal</span>
            </div>
            <div className="legend-item">
              <div className="legend-marker spain"></div>
              <span>España</span>
            </div>
            <div className="legend-item">
              <div className="legend-line"></div>
              <span>Ruta del viaje</span>
            </div>
          </div>
          <p className="legend-note">
            Haz clic en los marcadores para ver detalles
          </p>
        </div>
      </div>
    </div>
  );
};
