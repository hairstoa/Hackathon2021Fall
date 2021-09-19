import React, { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "./Map.css";
import countylines from "../data/CountyLayer.json";
import statelines from "../data/StatesLayer.json";
import FIPSdata from "../data/FIPS.js";
import {getDroughtStats} from "../DroughtStats/api.droughtStats.js";
import axios from "axios";

mapboxgl.accessToken =
  "pk.eyJ1IjoiYW5kcmV3dm8iLCJhIjoiY2t0b3I0cnEyMGZjcDJvcTU4Y3psYjlqdyJ9.pb11GshhAMZWwzwEs1jZJw";


// color suggestions for drought categories


// get today's date
const timeElapsed = Date.now();
const today = new Date(timeElapsed);

function Map(props) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-97.6064);
  const [lat, setLat] = useState(38.6427);
  const [zoom, setZoom] = useState(4);
  const zoomThreshold = 6;
  const [clickedCounty, setClickedCounty] = useState("");
  const [droughtData, setDroughtData] = useState([]);
  const droughtDataRef = useRef(droughtData);

  useEffect(() => {
    droughtDataRef.current = droughtData;
  }, [droughtData]);


  useEffect(() => {
    const categories = [];
    axios.get(`https://usdmdataservices.unl.edu/api/CountyStatistics/GetDroughtSeverityStatisticsByAreaPercent?aoi=${clickedCounty}&startdate=${today.toLocaleDateString()}&enddate=${today.toLocaleDateString()}&statisticsType=1`)
      .then((response) => {
        const data = response.data[0];
        for (const [key, value] of Object.entries(data)) {
            if ( (key == "None") || (key == "D0") || (key == "D1") || (key == "D2") || (key == "D3") || (key == "D4") ) {
                categories.push(`${key}: ${value}%`);
            }
        }
        setDroughtData(categories);
      })
      .catch(err => {
        console.log(err);
      })
  }, [clickedCounty]);


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
      if (!map.current.getSource("counties")) {
        map.current.addSource("counties", {
              "type": "geojson",
              "data": countylines
        });
      }

      // add source for state polygons
      if (!map.current.getSource("states")) {
        map.current.addSource("states", {
            "type": "geojson",
            "data": statelines
        });
      } 

      // add layer showing county polygons
      if (!map.current.getLayer("county-border")) {
        map.current.addLayer({
            "id": "county-borders",
            "type": "line",
            "source": "counties",
            "minzoom": zoomThreshold,
            "paint": {
                "line-color": "red",
                "line-width": 2
            }
        });
      }
      
      // add layer to fill county according to drought severity
      if (!map.current.getLayer("county-fills")) {
        map.current.addLayer({
            "id": "county-fills",
            "type": "fill",
            "source": "counties",
            "minzoom": zoomThreshold,
            "paint": {
              "fill-color": "red",
              "fill-opacity": 0.1
            }
        });
      }

      // add layer showing state polygons
      if (!map.current.getLayer("state-layer")) {
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
      }

      // display county name and state on click
      map.current.on("click", "county-fills", (e) => {
        const countyName = e.features[0].properties.name;
        const stateName = e.features[0].properties.state;
        const fipsObj = FIPSdata.fips;
        let countyFIPS;
        
        // retrieve FIPS for county
        for (let i = 0; i < fipsObj.length; i++) {
          if (fipsObj[i].County === countyName && fipsObj[i].State === stateName) {
            countyFIPS = fipsObj[i].Code;
            console.log(countyFIPS);
            console.log(stateName);
            setClickedCounty(countyFIPS);
            break;
          }
        }

        // TODO: retrieve drought data from api
        getDroughtStats(countyFIPS);

        props.updateLocation({
          fips: countyFIPS,
          state_code: stateName
        });
        
        console.log(droughtDataRef.current);
        // county and state popup
        new mapboxgl.Popup()
            .setLngLat(e.lngLat)
            .setHTML(`<h2 id="popup_location">${countyName}, ${stateName}</h2> <br>
            <table>
              <thead>
                <th colspan=2 id="category_title">Drought Categories</th>
              </thead>
              <tbody>
                <tr>
                  <td><div class="square" id="cat_none"/></td>
                  <td>${droughtDataRef.current[0]}</td>
                </tr>
                <tr>
                  <td><div class="square" id="cat_d0"/></td>
                  <td>${droughtDataRef.current[1]}</td>
                </tr>
                <tr>
                  <td><div class="square" id="cat_d1"/></td>
                  <td>${droughtDataRef.current[2]}</td>
                </tr>
                <tr>
                  <td><div class="square"  id="cat_d2"></td>
                  <td>${droughtDataRef.current[3]}</td>
                </tr>
                <tr>
                  <td><div class="square" id="cat_d3"/></td>
                  <td>${droughtDataRef.current[4]}</td>
                </tr>
                <tr>
                  <td><div class="square" id="cat_d4"/></td>
                  <td>${droughtDataRef.current[5]}</td>
                </tr>
              </tbody>`
            )
            .addTo(map.current);
      });

      // change cursor to pointer when mouse over county-layer
      map.current.on("mouseenter", "county-fills", () => {
        map.current.getCanvas().style.cursor = "pointer";
      });

      // change cursor back to grab
      map.current.on("mouseleave", "county-fills", () => {
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
