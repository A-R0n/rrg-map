import React from 'react';

import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
  } from "@reach/accordion";
  import "@reach/accordion/styles.css";

export const TestHeader = () => {
    return (
        <div>
    <Accordion>
      <AccordionItem>
      <h3>
          <AccordionButton className="ac">This needs to be an input box</AccordionButton>
        </h3>
      <AccordionPanel>
          <p>Red River Gorge</p>
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
    </Accordion>
      </div>
    )
}