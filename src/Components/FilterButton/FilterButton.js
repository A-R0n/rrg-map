import React from 'react';
import './FilterButton.css';
import { DialogOverlay, DialogContent } from "@reach/dialog";
import "@reach/dialog/styles.css";
import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
  } from "@reach/accordion";
  import "@reach/accordion/styles.css";


const climbingGrades = ["5.6", "5.7", "5.8", "5.9", "5.10a", "5.10b", "5.10c", "5.10d", "5.11a", "5.11b", "5.11c", "5.11d", "5.12a", "5.12b", "5.12c", "5.12d", "5.13a", "5.13b", "5.13c", "5.13d", "5.14a", "5.14b", "5.14c", "5.14d", "5.15a"];

const mapThruClimbingGrades = climbingGrades.map((val, idx) => {
    return (
        <div className="minAndMaxClimbingGrades" key={idx}>
            <option value={val}></option>
        </div>
    )
});

export const FilterButton = () => {
    const [showDialog, setShowDialog] = React.useState(false);
    const [proximity, setProximity] = React.useState(500);
    const open = () => setShowDialog(true);
    const close = () => setShowDialog(false);

    
    return (
        // inside the button needs to be an svg with the outline looking thing
        <div className="filterButton">
        <button className="filterbtn" onClick={open}>
            <img src="/filter.svg" alt="An actual filter" height="20px" width="25px" id="filter-icon"/>
            {/* <svg height="10pt" viewBox="-25 0 315 20" width="30pt"          xmlns="http://www.w3.org/2000/svg">
                <text x="-30" y="40" fontSize="6em" fill="#e6dcbf">FILTERS</text>
            </svg> */}
        </button>
        <DialogOverlay isOpen={showDialog} onDismiss={close}>
        <DialogContent className="dialogContent"
          style={{
            border: "solid 5px hsla(0, 0%, 0%, 0.5)",
            borderRadius: "10px"
          }}
          aria-label="Announcement"
        >
    <Accordion>
      <AccordionItem>
        <h3>
          <AccordionButton className="ac">Type</AccordionButton>
        </h3>
        <AccordionPanel>
          <p className="typeParagraph">
              <label id="labelForType">Sport<input type="checkbox"></input></label>
              <label id="labelForType">Trad<input type="checkbox"></input></label>
              <label id="labelForType">Bouldering<input type="checkbox"></input></label>
          </p>
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem>
        <h3>
          <AccordionButton className="ac">Grade</AccordionButton>
        </h3>
        <AccordionPanel>
        <label id="minGrade" for="min">min: </label>
        <input list="min-grade" name="min" id="min"/>
            <datalist id="min-grade">
                {mapThruClimbingGrades}
            </datalist>
        <label id="maxGrade" for="max">max: </label>
        <input list="max-grade" name="max" id="max"/>
            <datalist id="max-grade">
            {mapThruClimbingGrades}
        </datalist>
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem>
        <h3>
          <AccordionButton className="ac">Distance</AccordionButton>
        </h3>
        <AccordionPanel>
        <label for="myRange">miles away: </label>
            <input type="range" id="myRange" min="0" max="500" value={proximity} onChange={(e) => setProximity(e.target.value)}/>
        <p id="demo"></p>
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem>
        <h3>
          <AccordionButton className="ac">Conditions</AccordionButton>
        </h3>
        <AccordionPanel>
        <label id="labelForConditions">is dry <input type="checkbox"></input></label>
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem >
        <h3>
          <AccordionButton className="ac">Price (Parking)</AccordionButton>
        </h3>
        <AccordionPanel>
        <label id="labelForPrice">is free <input type="checkbox"></input></label>
        </AccordionPanel>
      </AccordionItem>
      <AccordionItem >
        <h3>
          <AccordionButton className="ac">Crag</AccordionButton>
        </h3>
        <AccordionPanel>
            N/A
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
          <button onClick={close}>Close</button>
        </DialogContent>
      </DialogOverlay>
        </div>
    );
}