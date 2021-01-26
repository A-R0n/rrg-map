import React, {lazy} from "react";
import {Header} from './Components/Header/Header.js';
import {SearchInputBox} from './SearchInputBox';
import './App.css';
const LazyLoadFilterButton = lazy(() => import("./LazyLoadFilterButton.js"));
import {MyGoogleMap} from './Components/MyGoogleMap/MyGoogleMap.js';

export default function App() {

  const [geoCords, setGeoCords] = React.useState([]);

  const mapRef = React.useRef();

  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  // the useCallback hook memoizes the panTo map function
  // By wrapping the function in useCallback, we prevent unnecessary re-renders
  // of the children, b/c they will be using the same function obj
  const panTo = React.useCallback((lat, lng) => {
    setGeoCords([lat, lng]);
  }, []);

  return (
    <div className="App"> 
      <Header />
      <div className="header">
        <SearchInputBox panTo={panTo}/>
        <React.Suspense fallback={<p>FB</p>}>
          {<LazyLoadFilterButton/>}
        </React.Suspense>
      </div>
      <MyGoogleMap geoCords={geoCords} onMapLoad={onMapLoad}/>
    </div>
  );
}

