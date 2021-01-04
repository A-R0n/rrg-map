import React from 'react';
import {DirectionsService, DirectionsRenderer} from "@react-google-maps/api";

export const Directions = (fields) => {

    const [isSelected, setIsSelected] = React.useState(false);
    const [response, setResponse] = React.useState(null);

    const directionsCallback = React.useCallback((response) => {
        if (response !== null) {
            if (response.status === 'OK') {
                setResponse(response)
            } else {
              console.log('response: ', response)
            }
          } 
    }, []);

    React.useEffect(() => {
        setIsSelected(true);
        setResponse(null);
    }, [fields.geoCords]);

    const miguels = {
        lat: 37.7831,
        lng: -83.6828
    };

    return (
        <div>
            {(isSelected && fields.geoCords.length > 0 && response === null) &&
          (<DirectionsService
            options={{
              destination: fields.geoCords[0] + "," + fields.geoCords[1],
              origin: miguels,
              travelMode: "DRIVING"
            }}
            callback={directionsCallback}
              // optional
            onUnmount={(ds) => {
                console.log('DirectionsService unmount: ', ds);
                setIsSelected(false);
              }}
          />)}
          {(response !== null) && (<DirectionsRenderer options={{directions: response}} />)}
        </div>
    )
}