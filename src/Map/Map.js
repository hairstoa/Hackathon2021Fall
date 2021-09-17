import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import 'mapbox-gl/dist/mapbox-gl.css';
import "./Map.css";

mapboxgl.accessToken = "pk.eyJ1IjoiamFpbWVqdXN0byIsImEiOiJja3RubHdxa2IwNDBkMm9vMzBqMmsxZzV1In0.GrfCgBDgjmUf1ouM7xBOSQ";

function Map() {

    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(-97.6064);
    const [lat, setLat] = useState(38.6427);
    const [zoom, setZoom] = useState(4);

    useEffect(() => {
        // map already displayed
        if (map.current) return;
        
        // map boundaries
        const bounds = [
            [-195.3481, 18.5117],       // Southwest coords
            [-65.0877, 73.1958]         // Northeast coords
        ];
    
        // render the map
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [lng, lat],
            zoom: zoom,
            maxBounds: bounds
        });
    });

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

    const setUserLocation = () => {
        
        // button works
        // TODO: update the map's lat and lon
        navigator.geolocation.getCurrentPosition((position) => {
            setLng(position.coords.longitude);
            setLat(position.coords.latitude);
            setZoom(10);
            console.log(`button lat: ${position.coords.latitude}`);
            console.log(`button lon: ${position.coords.longitude}`);
            console.log(`current lon: ${lng}`);
            console.log(`current lat: ${lat}`);
        });
    };

    return(
        <>
            <button onClick={() => setUserLocation()}>My Location</button>
            <div ref={mapContainer} className="map-container">
                <div id="coords">Latitude: {lat} | Longitude: {lng} | Zoom: {zoom}</div>
            </div>
        </>
    )
}

export default Map;