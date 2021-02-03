import React, {useRef, useState, lazy} from "react";
import './App.css';
import AnimateHeight from 'react-animate-height';

import {CancelButtonOutside} from './Components/CancelButton/CancelButtonOutside';
import {RedRiverGorge} from './Components/Title/RedRiverGorge/RedRiverGorge';
import {SearchInputBox} from './SearchInputBox';
import MyGoogleMap from './Components/MyGoogleMap/MyGoogleMap.js';


export default function App() {


  const [geoCords, setGeoCords] = React.useState([]);

  const [height, setHeight] = useState(30);
  const [cancelButton, setCancelButton] = useState(false);

  const searchInputBoxRef = useRef();
  const cancelBtnRef = useRef();
  const micBtnRef = useRef();
  const mapRef = useRef();
  const mapRefTrick = useRef();


  const toggle = () => {
    setHeight(0);
    
    // searchInputBoxRef.current.style.width = "70%";
    searchInputBoxRef.current.style.width = "70vw";
    
    setCancelButton(true);

    // cancelBtnRef.current.style.width = "30%";
    // cancelBtnRef.current.style.width = "30vw";
    cancelBtnRef.current.style.left = "0";

    
    micBtnRef.current.style.border = "1px solid orange";
    micBtnRef.current.style.borderLeft = "1px solid black";

    mapRefTrick.current.style.opacity = ".2";

  }


  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = React.useCallback((lat, lng) => {
    mapRef.current.panTo({lat, lng});
    setGeoCords([lat, lng]);
    mapRefTrick.current.style.opacity = "1";

  }, []);

  // console.log(geoCords);

  return (
    <main className="App"> 
      <div className="flex-container">
      <AnimateHeight id="mother" duration={ 500 } height={ height } style={{flexShrink: 0}}>
          <RedRiverGorge />
      </AnimateHeight>
        <div className="father">
          <i className="fas fa-search-location" id="search-loc"></i>
          {/* <input className="black-box" type="text" onClick={() => toggle()} ref={searchInputBoxRef}></input> */}
          <div className="input-father" onClick={() => toggle()} ref={searchInputBoxRef}>
            <SearchInputBox panTo={panTo}/>
          </div>
          <div className="step-father" ref={cancelBtnRef}>
            <i className="fas fa-microphone" id="mic" ref={micBtnRef}></i>
            {cancelButton ? <CancelButtonOutside /> : null}
          </div>
        </div>
      </div>
      <div ref={mapRefTrick} className="GoogleMap">
      <MyGoogleMap geoCords={geoCords} onMapLoad={onMapLoad} />
      </div>
      {/* <MyGoogleMap geoCords={geoCords} onMapLoad={onMapLoad} /> */}
      
    </main>
  );
}

