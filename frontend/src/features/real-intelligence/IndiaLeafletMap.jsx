import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useLocale } from "../../hooks/usePreferences";
import { Maximize2, RotateCcw } from "lucide-react";

const NAME_TO_ID = {
  "andaman and nicobar": "in-andaman-and-nicobar-islands",
  "andaman and nicobar islands": "in-andaman-and-nicobar-islands",
  "andhra pradesh": "in-andhra-pradesh",
  "arunachal pradesh": "in-arunachal-pradesh",
  "assam": "in-assam",
  "bihar": "in-bihar",
  "chandigarh": "in-chandigarh",
  "chhattisgarh": "in-chhattisgarh",
  "dadra and nagar haveli": "in-dadra-and-nagar-haveli-and-daman-and-diu",
  "daman and diu": "in-dadra-and-nagar-haveli-and-daman-and-diu",
  "dadra and nagar haveli and daman and diu": "in-dadra-and-nagar-haveli-and-daman-and-diu",
  "delhi": "in-delhi",
  "nct of delhi": "in-delhi",
  "goa": "in-goa",
  "gujarat": "in-gujarat",
  "haryana": "in-haryana",
  "himachal pradesh": "in-himachal-pradesh",
  "jammu and kashmir": "in-jammu-and-kashmir",
  "jharkhand": "in-jharkhand",
  "karnataka": "in-karnataka",
  "kerala": "in-kerala",
  "ladakh": "in-ladakh",
  "lakshadweep": "in-lakshadweep",
  "madhya pradesh": "in-madhya-pradesh",
  "maharashtra": "in-maharashtra",
  "manipur": "in-manipur",
  "meghalaya": "in-meghalaya",
  "mizoram": "in-mizoram",
  "nagaland": "in-nagaland",
  "orissa": "in-odisha",
  "odisha": "in-odisha",
  "puducherry": "in-puducherry",
  "pondicherry": "in-puducherry",
  "punjab": "in-punjab",
  "rajasthan": "in-rajasthan",
  "sikkim": "in-sikkim",
  "tamil nadu": "in-tamil-nadu",
  "telangana": "in-telangana",
  "tripura": "in-tripura",
  "uttar pradesh": "in-uttar-pradesh",
  "uttaranchal": "in-uttarakhand",
  "uttarakhand": "in-uttarakhand",
  "west bengal": "in-west-bengal",
};

export function resolveRegionId(featureName) {
  if (!featureName) return null;
  const clean = featureName.toLowerCase().replace(/[^a-z0-9\s]/g, "").trim();
  return NAME_TO_ID[clean] || null;
}

// Choropleth color palette matching DESIGN.md §3.3 (teal -> sage -> ochre -> terracotta)
function getChoroplethColor(value, min, max) {
  if (value === undefined || value === null) return "#ECEAE6";
  const range = max - min || 1;
  const ratio = Math.max(0, Math.min(1, (value - min) / range));

  if (ratio < 0.25) return "#2F6F6A"; // teal
  if (ratio < 0.5) return "#6F8F72";  // sage
  if (ratio < 0.75) return "#C8922E"; // ochre
  if (ratio < 0.9) return "#9E4A26";  // deep terracotta
  return "#B5562E"; // terracotta
}

export function IndiaLeafletMap({
  rows,
  names,
  indicator,
  period,
  hoveredRegionId,
  selectedRegionId,
  onHoverRegion,
  onSelectRegion,
}) {
  const { t, locale } = useLocale();
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const geoJsonLayerRef = useRef(null);
  const layersByRegionIdRef = useRef(new Map());
  const [geoData, setGeoData] = useState(null);
  const [activeHoverInfo, setActiveHoverInfo] = useState(null);

  const nf = new Intl.NumberFormat(locale, { minimumFractionDigits: 1, maximumFractionDigits: 1 });

  // Map regionId -> observation row
  const rowMap = new Map((rows || []).map((r) => [r.region_id, r]));

  // Calculate min and max for choropleth scale
  const values = (rows || []).map((r) => r.value).filter((v) => typeof v === "number");
  const minValue = values.length ? Math.min(...values) : 0;
  const maxValue = values.length ? Math.max(...values) : 100;

  // 1. Fetch simplified India states GeoJSON
  useEffect(() => {
    let active = true;
    fetch("/india_states.json")
      .then((res) => res.json())
      .then((data) => {
        if (active) setGeoData(data);
      })
      .catch((err) => console.error("Error loading India states GeoJSON:", err));
    return () => {
      active = false;
    };
  }, []);

  // 2. Initialize Leaflet Map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    // Center of India
    const map = L.map(mapContainerRef.current, {
      center: [22.8, 80.5],
      zoom: 4.4,
      minZoom: 3.5,
      maxZoom: 8,
      zoomSnap: 0.2,
      scrollWheelZoom: false,
      attributionControl: false,
    });

    // Pure keyless vector choropleth map (no third-party watermarked raster tiles)

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // 3. Render and style GeoJSON states
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !geoData) return;

    if (geoJsonLayerRef.current) {
      map.removeLayer(geoJsonLayerRef.current);
    }
    layersByRegionIdRef.current.clear();

    const layer = L.geoJSON(geoData, {
      style: (feature) => {
        const name = feature?.properties?.name;
        const regionId = resolveRegionId(name);
        const row = regionId ? rowMap.get(regionId) : null;
        const val = row?.value;
        const isHovered = regionId && hoveredRegionId === regionId;
        const isSelected = regionId && selectedRegionId === regionId;

        const fillColor = val !== undefined ? getChoroplethColor(val, minValue, maxValue) : "#ECEAE6";

        return {
          fillColor,
          fillOpacity: isHovered || isSelected ? 0.95 : 0.75,
          color: isHovered || isSelected ? "#B5562E" : "#8A7C70",
          weight: isHovered || isSelected ? 2.5 : 1,
          dashArray: val !== undefined ? "" : "3, 3",
        };
      },
      onEachFeature: (feature, featureLayer) => {
        const rawName = feature?.properties?.name || "Unknown";
        const regionId = resolveRegionId(rawName);
        if (regionId) {
          layersByRegionIdRef.current.set(regionId, featureLayer);
        }

        const displayName = (regionId && names?.get(regionId)) || rawName;
        const row = regionId ? rowMap.get(regionId) : null;

        featureLayer.on({
          mouseover: (e) => {
            const target = e.target;
            target.setStyle({
              weight: 2.5,
              color: "#B5562E",
              fillOpacity: 0.95,
            });
            if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
              target.bringToFront();
            }
            if (regionId) {
              onHoverRegion?.(regionId);
            }
            setActiveHoverInfo({
              name: displayName,
              regionId,
              value: row ? row.value : null,
              row,
            });
          },
          mouseout: (e) => {
            const isHovered = regionId && hoveredRegionId === regionId;
            const isSelected = regionId && selectedRegionId === regionId;
            const val = row?.value;

            if (!isHovered && !isSelected) {
              geoJsonLayerRef.current?.resetStyle(e.target);
            }
            onHoverRegion?.(null);
            setActiveHoverInfo(null);
          },
          click: () => {
            if (row) {
              onSelectRegion?.(row);
            }
          },
        });
      },
    }).addTo(map);

    geoJsonLayerRef.current = layer;
  }, [geoData, rows, indicator, minValue, maxValue, names]);

  // 4. Update highlighting when hoveredRegionId changes from list
  useEffect(() => {
    if (!geoJsonLayerRef.current) return;
    layersByRegionIdRef.current.forEach((layer, rId) => {
      const isHovered = rId === hoveredRegionId;
      const isSelected = rId === selectedRegionId;
      const row = rowMap.get(rId);
      if (isHovered || isSelected) {
        layer.setStyle({
          weight: 2.8,
          color: "#B5562E",
          fillOpacity: 0.95,
        });
        if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
          layer.bringToFront();
        }
      } else {
        layer.setStyle({
          weight: 1,
          color: "#8A7C70",
          fillOpacity: 0.75,
        });
      }
    });
  }, [hoveredRegionId, selectedRegionId]);

  const resetView = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView([22.8, 80.5], 4.4, { animate: true });
    }
  };

  return (
    <div className="india-leaflet-container">
      {/* Map Header Toolbar */}
      <div className="india-map-toolbar">
        <div className="india-map-legend">
          <span className="legend-label">{t(`real.${indicator}`)} scale:</span>
          <div className="legend-gradient-bar" />
          <div className="legend-bounds">
            <span>{nf.format(minValue)}%</span>
            <span>{nf.format((minValue + maxValue) / 2)}%</span>
            <span>{nf.format(maxValue)}%</span>
          </div>
        </div>
        <button
          type="button"
          className="map-control-btn"
          onClick={resetView}
          title="Reset map view to India"
          aria-label="Reset map view"
        >
          <RotateCcw size={14} />
          <span>Reset</span>
        </button>
      </div>

      {/* Actual Leaflet DOM container */}
      <div ref={mapContainerRef} className="leaflet-dom-map" />

      {/* Floating Region Detail Inspector Card on Hover */}
      {activeHoverInfo && (
        <div className="map-hover-card" role="status" aria-live="polite">
          <div className="hover-card-header">
            <strong>{activeHoverInfo.name}</strong>
            <span className="hover-indicator-pill">{t(`real.${indicator}`)}</span>
          </div>
          <div className="hover-card-body">
            {activeHoverInfo.value !== null ? (
              <div className="hover-value-row">
                <span className="hover-value-num">{nf.format(activeHoverInfo.value)}%</span>
                <span className="hover-period-label">{period} · PLFS</span>
              </div>
            ) : (
              <p className="hover-missing-label">{t("real.unavailable")}</p>
            )}
          </div>
          {activeHoverInfo.row && (
            <div className="hover-card-footer">
              <span className="hover-hint-text">Click state to view detailed evidence</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
