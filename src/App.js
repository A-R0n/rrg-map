import React, {lazy} from "react";
import {SearchInputBox} from './SearchInputBox';
import './App.css';
const MyComponent = lazy(() => import("./MyComponent.js"));
import {GoogleMap, useLoadScript} from "@react-google-maps/api";

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

  // removing async await raised my performance score from an 86 to an 89
  const panTo = React.useCallback((lat, lng) => {
    mapRef.current.panTo({lat, lng});
    setGeoCords([lat, lng]);
  }, []);

  if (loadError) return "Error Loading Maps";
  if(!isLoaded) return "Loading Maps";

  return (
    <div className="App"> 
      <h1>Red River Gorge</h1>
      <div className="header">
        <SearchInputBox panTo={panTo}/>
      </div>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={11}
        center={miguels}
        onLoad={onMapLoad}>
          <React.Suspense fallback={<p>directions fallback</p>}>
            {<MyComponent geoCords={geoCords} mapRef={mapRef}/>}
            </React.Suspense>
      </GoogleMap>
    </div>
  );
}

