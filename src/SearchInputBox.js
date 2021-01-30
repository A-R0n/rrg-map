import axios from 'axios';
import './SearchInputBox.css';
import React from 'react';
import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption
} from "@reach/combobox";

import "@reach/combobox/styles.css";


export const SearchInputBox = (panTo) => {
    const [allRoutes, setAllRoutes] = React.useState([]);
    let [routeName, setRouteName] = React.useState("");
    let [parkingLotData, setParkingLotData] = React.useState([]);

    // adding async await improved from 89 to 92
    const clickInInput = async () => {
        await axios.get("/api/routes").then(res => {
            setAllRoutes(res.data);
        }); 
    }

    let routeIWantToClimb = allRoutes.length > 0 && allRoutes.filter((route) => {
        return (
            routeName.length > 2 && route.routename.toLowerCase().includes(routeName.toLowerCase())
        );
    })
    .map((route, index) => {
        return (
        <ComboboxOption key = {index} value = {`${route.routename}, ${route.difficulty}`}>
        </ComboboxOption>
        )
    });

    let getParkingLotId = async (id) => {
        let response = await axios.get(`/api/parkinglot/${id}`);
        await setParkingLotData(response.data);
    }

    React.useEffect(() => {
        parkingLotData.map(parkingLot => {
            let geoCoordsFormatted = parkingLot.geocoords.split(",");
            panTo.panTo(parseFloat(geoCoordsFormatted[0]), parseFloat(geoCoordsFormatted[1]));
        })
    }, [parkingLotData]);

    React.useEffect(() => {
        setRouteName(routeName);
    }, [routeName])

    let findCords = async (name) => {
        console.log(name);
        allRoutes.length > 0 && await allRoutes.filter(route => {
            return (
                route.routename === name
            )
        })
        .map((route) => {
            getParkingLotId(route.parkinglotid);
        })
    };

    let routeWithoutGrade = async (e) => {
        let routesName = e.split(",");
        await findCords(routesName[0]);
    }

    return (
        <div className="searched">
            <Combobox className="cBox"
                onSelect={async (e) => {
                    await setRouteName(e);
                    await routeWithoutGrade(e);
                }}
            >
                <label for="SearchInputBox">
                    <svg height="20" width="52">
                        <text x="0" y="20" fill="white">Search</text>
                    </svg>
                </label>
                <ComboboxInput id="SearchInputBox" value={routeName} onChange={(e)=>{setRouteName(e.target.value)}} placeholder="Route Name" onClick={clickInInput} />
                
                <ComboboxPopover>
                    <ComboboxList>
                        {routeIWantToClimb}
                    </ComboboxList>
                </ComboboxPopover>
            </Combobox>
        </div>
    )
};