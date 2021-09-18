// eslint-disable-next-line
import React, {useState, useEffect} from 'react';

import "./App.css";
import Map from "./Map/Map";
import Alert from "./Alert/Alert";
import Legend from "./Legend/Legend";
import Feed from "./Feed/Feed";

const INIT_LOCATION = {
  lat: null,
  lon: null, 
  fips: null,
  county_name: null,
  state_name: null,
  state_code: null,
}

function App() {
  const [location, setLocation] = useState(INIT_LOCATION);
  // eslint-disable-next-line
  const updateLocationHandler = (loc) => {
    setLocation(prevLocation => {
      return {
      lat: loc.lat,
      lon: loc.lon, 
      fips: loc.fips,
      county_name: loc.county_name,
      state_name: loc.state_name,
      state_code: loc.state_code};
    });
  }
  // eslint-disable-next-line
  const setLocationCoordsHandler = (loc) => {
    setLocation(prevLocation => {
      return {
      ...prevLocation, 
      lat: loc.fips,
      lon: loc.county_name};
    });
  }
  
  // const locationFIP = "41035";
  // const locationState = "OR";
  // const locationFIP = "42003";
  // const locationState = "PA";
  let d = 1;
  return (
    <div className="App">
<<<<<<< HEAD
<<<<<<< HEAD
=======

>>>>>>> 6c5ec0d3f155cfb1a398d36dda5c2e8f8738e9fb
      <div className = 'container'>
        <Alert userState={location.state_code} userFIP={location.fips} />
      </div>
<<<<<<< HEAD
=======
      {/* <Alert userState={locationState} userFIP={locationFIP} /> */}
      <Alert userState={location.state_code} userFIP={location.fips} />
>>>>>>> origin/main
=======

      {/* <Alert userState={locationState} userFIP={locationFIP} /> */}
>>>>>>> 6c5ec0d3f155cfb1a398d36dda5c2e8f8738e9fb
      <div className="container">
        <Map />
        {/* <Map updateLocation = { updateLocationHandler} setLocation = {setLocationCoordsHandler} /> */}
        <Legend className="left-side" />
        <Feed dn={d} className="right-side" />
      </div>
    </div>
  );
}

export default App;
