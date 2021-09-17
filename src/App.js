import "./App.css";
import Map from "./Map/Map.js";
import React, { useState } from "react";
import ReactMapGL from "react-map-gl";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken =
  "pk.eyJ1IjoiamFpbWVqdXN0byIsImEiOiJja3RubHdxa2IwNDBkMm9vMzBqMmsxZzV1In0.GrfCgBDgjmUf1ouM7xBOSQ";
const App = () => {
  const setUserLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setViewport({
        ...viewport,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        zoom: 10,
      });
    });
  };

  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 42.35,
    longitude: -70.9,
    zoom: 9,
  });

  return (
    <div className="App">
      <button onClick={() => setUserLocation()}>My Location</button>
      <ReactMapGL
        mapboxApiAccessToken={mapboxgl.accessToken}
        {...viewport}
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
        mapStyle="mapbox://styles/mapbox/streets-v11"
      />
    </div>
  );
};

export default App;

// import "./App.css";
// import Map from "./Map/Map.js";
// import React from "react";

// function App() {
//   return (
//     <div className="App">
//       <Map />
//     </div>
//   );
// }

// export default App;
