import { useState, useEffect } from "react";
import type { ItineraryData } from "./types";
import { ItineraryDay } from "./components/ItineraryDay";
import { ItineraryTable } from "./components/ItineraryTable";
import { MapView } from "./components/MapView";
import itineraryData from "./data/itinerary.json";

type ViewMode = "normal" | "compact" | "table";

function App() {
  const data = itineraryData as ItineraryData;

  // Check if mobile on initial load
  const [isMobile, setIsMobile] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("compact");
  const [showMap, setShowMap] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      // Set initial view mode based on screen size
      if (mobile && viewMode === "normal") {
        setViewMode("compact");
      }
    };

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    // Check on mount
    checkMobile();

    // Add event listeners
    window.addEventListener("resize", checkMobile);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [viewMode]);

  const getNextViewMode = (): ViewMode => {
    if (isMobile) {
      // On mobile, only toggle between compact and table
      switch (viewMode) {
        case "compact":
          return "table";
        case "table":
          return "compact";
        case "normal":
          return "compact"; // fallback
        default:
          return "compact";
      }
    } else {
      // On desktop, cycle through all three modes
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
    }
  };

  const getViewLabel = (): string => {
    const nextMode = getNextViewMode();
    switch (nextMode) {
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
    const nextMode = getNextViewMode();
    switch (nextMode) {
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
      <header className={`header ${isScrolled ? "scrolled" : ""}`}>
        <div className="header-content">
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

          {/* View Toggle and Map Buttons */}
          <div className="header-buttons">
            <button
              onClick={() => {
                setViewMode(getNextViewMode());
                setShowMap(false);
              }}
              className="view-toggle-button"
              aria-label={`Cambiar a ${getViewLabel()}`}
            >
              <span className="toggle-icon">{getViewIcon()}</span>
              <span className="toggle-text">{getViewLabel()}</span>
            </button>

            <button
              onClick={() => setShowMap(!showMap)}
              className={`map-button ${showMap ? "active" : ""}`}
              aria-label={showMap ? "Ver itinerario" : "Ver mapa"}
            >
              <span className="map-icon">
                {showMap ? (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" />
                  </svg>
                ) : (
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M20.5 3l-.16.03L15 5.1 9 3 3.36 4.9c-.21.07-.36.25-.36.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1 5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5zM15 19l-6-2.11V5l6 2.11V19z" />
                  </svg>
                )}
              </span>
              <span className="map-text">
                {showMap ? "Itinerario" : "Mapa"}
              </span>
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
        {showMap ? (
          <MapView days={data.days} />
        ) : viewMode === "table" ? (
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

        {/* General Recommendations - Hidden in compact, table and map view */}
        {data.generalRecommendations.length > 0 &&
          viewMode === "normal" &&
          !showMap && (
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
            •{" "}
            <span className="footer-highlight purple">
              {data.tripInfo.duration} días
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
