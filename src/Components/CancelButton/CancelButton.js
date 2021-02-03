import React from 'react';

export const CancelButton = (props) => {

    const routeNameWithinInput = React.useRef(props);


    const clearInput = e => {

    }
    return (
        <button onClick={e => clearInput(e)} ref={routeNameWithinInput}>
            X
        </button>
    )
}