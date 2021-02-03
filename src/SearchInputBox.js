import axios from 'axios';
import './SearchInputBox.css';
import React, {useRef} from 'react';
import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption
} from "@reach/combobox";

import "@reach/combobox/styles.css";


export const SearchInputBox = (props, ref) => {
    const [allRoutes, setAllRoutes] = React.useState([]);
    const [inputExists, setInputExists] = React.useState(false);
    let [routeName, setRouteName] = React.useState("");
    let [parkingLotData, setParkingLotData] = React.useState([]);

    const miRef = useRef();

    // const routeNameWithinInput = React.useRef(null);

    // adding async await improved from 89 to 92
    const clickInInput = async () => {
        miRef.current.style.width = "70vw";
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
            props.panTo(parseFloat(geoCoordsFormatted[0]), parseFloat(geoCoordsFormatted[1]));
        })
    }, [parkingLotData]);

    // React.useEffect(() => {
    //     console.log("heyyy");
    //     setRouteName(routeName);
    // }, [routeName]);

    const handleUserTyping = async (event) => {
        console.log("yo");
        await setRouteName(event);
        await setInputExists(true);
    }

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

    // const resetInput = async (e) => {
    //     await setRouteName("");
    //     await setInputExists(false);
    // }

    return (
        <div className="searched">
            <Combobox className="cBox"
            // <Combobox className="black-box"
                onSelect={async (e) => {
                    await setRouteName(e);
                    await routeWithoutGrade(e);
                }}
            >
                {/* <label for="SearchInputBox">
                    <svg height="20" width="52">
                        <text x="0" y="20" fill="white">Search</text>
                    </svg>
                </label> */}
                {/* <ComboboxInput id="SearchInputBox" value={routeName} onChange={(e)=>{handleUserTyping(e.target.value)}} placeholder="Search for a route" onClick={clickInInput} /> */}
                <ComboboxInput className="special-box" value={routeName} onChange={(e)=>{handleUserTyping(e.target.value)}} placeholder="Search for a route" onClick={clickInInput} ref={miRef} />
                
                <ComboboxPopover>
                    <ComboboxList>
                        {routeIWantToClimb}
                    </ComboboxList>
                </ComboboxPopover>
            </Combobox>
            {/* <div id="beside-search-btn">
                <div id="inside-beside-search-btn">
                    {!inputExists || routeName.length === 0 ? <button id="mic-btn"onClick={e => resetInput(e)}>M</button> : null}
                    {inputExists && routeName.length > 0 ? <button id="cancel-btn"onClick={e => resetInput(e)}>X</button> : null}
                </div>
            </div> */}
        </div>
    )
};