import './App.css';
import React from "react";
import {SearchInputBox} from './SearchInputBox';
import {GoogleMap, useLoadScript} from "@react-google-maps/api";
import {Directions} from './Directions.js';
import "@reach/combobox/styles.css";

export default function App() {
  
  const {isLoaded, loadError} = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
  });

  const [geoCords, setGeoCords] = React.useState([]);

  const mapRef = React.useRef();

  const mapContainerStyle = {
    width: "100vw",
    height: "100vh"
  };

  const miguels = {
    lat: 37.7831,
    lng: -83.6828
  };
  
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = React.useCallback((lat, lng) => {
    mapRef.current.panTo({lat, lng});
    setGeoCords([lat, lng]);
  }, []);

  if (loadError) return "Error Loading Maps";
  if(!isLoaded) return "Loading Maps";

  console.log("app");
  return (
    <div className="App"> 
      <h1>Red River Gorge</h1>
      <div className="header">
        <SearchInputBox panTo={panTo}/>
        {/* <LocateUser panTo={panTo}/> */}
      </div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={11}
        center={miguels}
        onLoad={onMapLoad}>
          
          {<Directions geoCords={geoCords} mapRef={mapRef}/>}
      </GoogleMap>
    </div>
  );
}

