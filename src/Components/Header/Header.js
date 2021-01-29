import React from 'react';
import './Header.css';
import {Title} from '../Title/Title.js';
import {SearchInputBox} from '../../SearchInputBox.js';
// const LazyLoadFilterButton = lazy(() => import("../../LazyLoadFilterButton.js"));


export const Header = (props) => {

    console.log(props)

    // the useCallback hook memoizes the panTo map function
  // By wrapping the function in useCallback, we prevent unnecessary re-renders
    const panTo = React.useCallback((lat, lng) => {
        props.setGeoCords([lat, lng]);
      }, []);

    return (
        <div className="header">
            <Title />
            <SearchInputBox panTo={panTo}/>
            {/* <React.Suspense fallback={<p>FB</p>}>
                {<LazyLoadFilterButton/>}
            </React.Suspense> */}
        </div>
    )
}