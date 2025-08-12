import { useState } from "react";
import type { ItineraryData } from "./types";
import { ItineraryDay } from "./components/ItineraryDay";
import { ItineraryTable } from "./components/ItineraryTable";
import itineraryData from "./data/itinerary.json";

type ViewMode = "normal" | "compact" | "table";

function App() {
  const data = itineraryData as ItineraryData;
  const [viewMode, setViewMode] = useState<ViewMode>("normal");

  const getNextViewMode = (): ViewMode => {
    switch (viewMode) {
      case "normal":
        return "compact";
      case "compact":
        return "table";
      case "table":
        return "normal";
      default:
        return "normal";
    }
  };

  const getViewLabel = (): string => {
    switch (viewMode) {
      case "normal":
        return "Vista Normal";
      case "compact":
        return "Vista Compacta";
      case "table":
        return "Vista Tabla";
      default:
        return "Vista Normal";
    }
  };

  const getViewIcon = () => {
    switch (viewMode) {
      case "normal":
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z" />
          </svg>
        );
      case "compact":
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M4 18h17v-6H4v6zM4 5v6h17V5H4z" />
          </svg>
        );
      case "table":
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M10 10.02h5V21h-5zM17 21h3c1.1 0 2-.9 2-2v-9h-5v11zm3-18H5c-1.1 0-2 .9-2 2v3h19V5c0-1.1-.9-2-2-2zM3 19c0 1.1.9 2 2 2h3V10H3v9z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="app-container">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <h1>{data.tripInfo.title}</h1>
          <p>{data.tripInfo.subtitle}</p>
          <div className="header-info">
            <div className="header-info-item">
              <div className="header-dot green"></div>
              <span style={{ fontWeight: 500 }}>Salida:</span>
              <span style={{ fontWeight: 300 }}>
                {data.tripInfo.departure.city} - {data.tripInfo.departure.date}{" "}
                {data.tripInfo.departure.time}
              </span>
            </div>
            <div className="header-info-item">
              <div className="header-dot red"></div>
              <span style={{ fontWeight: 500 }}>Regreso:</span>
              <span style={{ fontWeight: 300 }}>
                {data.tripInfo.return.city} - {data.tripInfo.return.date}{" "}
                {data.tripInfo.return.time}
              </span>
            </div>
            <div className="header-info-item">
              <div className="header-dot yellow"></div>
              <span style={{ fontWeight: 500 }}>Duración:</span>
              <span style={{ fontWeight: 300 }}>{data.tripInfo.duration}</span>
            </div>
          </div>

          {/* View Toggle Button */}
          <div className="view-toggle-container">
            <button
              onClick={() => setViewMode(getNextViewMode())}
              className="view-toggle-button"
              aria-label={`Cambiar a ${getViewLabel()}`}
            >
              <span className="toggle-icon">{getViewIcon()}</span>
              <span className="toggle-text">{getViewLabel()}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main
        className={`main-content ${
          viewMode === "compact" ? "compact-view" : ""
        }`}
      >
        {viewMode === "table" ? (
          <ItineraryTable days={data.days} />
        ) : (
          /* Itinerary Grid */
          <div
            className={`itinerary-grid ${
              viewMode === "compact" ? "compact-grid" : ""
            }`}
          >
            {data.days.map((day, index) => (
              <div
                key={day.day}
                className="card-wrapper"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ItineraryDay day={day} isCompact={viewMode === "compact"} />
              </div>
            ))}
          </div>
        )}

        {/* General Recommendations - Hidden in compact and table view */}
        {data.generalRecommendations.length > 0 && viewMode === "normal" && (
          <section className="recommendations-section">
            <div className="recommendations-card">
              <h2 className="recommendations-title">
                Recomendaciones Generales
              </h2>
              <div className="recommendations-grid">
                {data.generalRecommendations.map((recommendation, index) => (
                  <div key={index} className="recommendation-item">
                    <div className="recommendation-dot"></div>
                    <p className="recommendation-text">{recommendation}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <p className="footer-text">
            Itinerario de viaje de{" "}
            <span className="footer-highlight blue">Muri y Dado</span> por
            Portugal y España •{" "}
            <span className="footer-highlight purple">
              {data.tripInfo.countries} países
            </span>{" "}
            •{" "}
            <span className="footer-highlight blue">
              {data.tripInfo.cities} ciudades
            </span>
          </p>
          <div className="footer-dots">
            <div className="footer-dot portugal"></div>
            <div className="footer-dot spain"></div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
