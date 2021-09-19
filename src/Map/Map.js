import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "./Map.css";
import countylines from "../data/CountyLayer.json";
import statelines from "../data/StatesLayer.json";
import FIPS from "../data/FIPS.js";

mapboxgl.accessToken =
  "pk.eyJ1IjoiYW5kcmV3dm8iLCJhIjoiY2t0b3I0cnEyMGZjcDJvcTU4Y3psYjlqdyJ9.pb11GshhAMZWwzwEs1jZJw";

function Map() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-97.6064);
  const [lat, setLat] = useState(38.6427);
  const [zoom, setZoom] = useState(4);
  const zoomThreshold = 6;

  useEffect(() => {
    // map already displayed
    if (map.current) return;

    // map boundaries
    const bounds = [
      [-195.3481, 18.5117], // Southwest coords
      [-65.0877, 73.1958], // Northeast coords
    ];

    // render the map with these cameraOptions
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/andrewvo/cktq1bdtq0nm517layvk2ksy0",
      center: [lng, lat],
      zoom: zoom,
      maxBounds: bounds, 
    });

    //map.current.addSource('county-layer', {
    //  type: 'geojson',
    //  data: '../data/CountyLayer.geojson'
    //});
//
    //map.addLayer({
    //  id: 'counties',
    //  // References the GeoJSON source defined above
    //  // and does not require a `source-layer`
    //  source: 'county-layer',
    //  type: 'vector',
    //  layout: {
    //  // Set the label content to the
    //  // feature's `name` property
    //    'text-field': ['get', 'name']
    //}});

  });

  useEffect(() => {
    map.current.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
      })
    );
  }, []);

  useEffect(() => {
    // no map displayed
    if (!map.current) return;

    // update current coords when user moves map
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });

  useEffect(() => {
    if (!map.current) return;

    // add state and county polygons
    map.current.on("load", () => {
        
      // add source for county polygons
      map.current.addSource("counties", {
            "type": "geojson",
            "data": countylines
      });

      // add source for state polygons
      map.current.addSource("states", {
            "type": "geojson",
            "data": statelines
      });

      // add layer showing county polygons
      map.current.addLayer({
          "id": "county-layer",
          "type": "fill",
          "source": "counties",
          "minzoom": zoomThreshold,
          "paint": {
              "fill-color": "rgba(240, 52, 52, 0.1)",
              "fill-outline-color": "rgba(240, 52, 52, 0.4)",
          }
      });

      // add layer showing state polygons
      map.current.addLayer({
          "id": "state-layer",
          "type": "fill",
          "source": "states",
          "maxzoom": zoomThreshold,
          "paint": {
              "fill-color": "rgba(240, 52, 52, 0.5)",
              "fill-outline-color": "rgba(240, 52, 52, 1)",
          }
      });

      // display county name and state on click
      map.current.on("click", "county-layer", (e) => {
        new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(`${e.features[0].properties.name}, ${e.features[0].properties.state}`)
            .addTo(map.current);
      });

      // change cursor to pointer when mouse over county-layer
      map.current.on("mouseenter", "county-layer", () => {
        map.current.getCanvas().style.cursor = "pointer";
      });

      // change cursor back to grab
      map.current.on("mouseleave", "county-layer", () => {
        map.current.getCanvas().style.cursor = "";
      });
    });
  });

  return (
    <>
      <div ref={mapContainer} className="map-container">
        <div id="coords">
          Latitude: {lat} | Longitude: {lng} | Zoom: {zoom}
        </div>
      </div>
    </>
  );
}

export default Map;
