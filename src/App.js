import React from "react";
import {Header} from './Components/Header/Header.js';
import './App.css';
import MyGoogleMap from './Components/MyGoogleMap/MyGoogleMap.js';

export default function App() {

  const [geoCords, setGeoCords] = React.useState([]);

  const mapRef = React.useRef();

  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  console.log(geoCords);

  return (
    <div className="App"> 
      <Header setGeoCords={setGeoCords}/>
      <MyGoogleMap geoCords={geoCords} onMapLoad={onMapLoad}/>
    </div>
  );
}

