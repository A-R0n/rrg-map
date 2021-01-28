import React, {lazy} from 'react';
import './Header.css';
import {Title} from '../Title/Title.js';
import {SearchInputBox} from '../../SearchInputBox.js';
const LazyLoadFilterButton = lazy(() => import("../../LazyLoadFilterButton.js"));


export const Header = () => {

    const [geoCords, setGeoCords] = React.useState([]);

    const panTo = React.useCallback((lat, lng) => {
        setGeoCords([lat, lng]);
      }, []);

    return (
        <div className="header">
            <Title />
            <SearchInputBox panTo={panTo}/>
            <React.Suspense fallback={<p>FB</p>}>
                {<LazyLoadFilterButton/>}
            </React.Suspense>
        </div>
    )
}