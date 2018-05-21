import React, { Component } from 'react';
import CardComponent from './CardComponent'

import './style.css';

const DeckComponent = (props) => {
    
   return(
    <div>
    <CardComponent onCardClick={props.onCardClick} visible={false} />
    <span className="labelDeck">Deck</span>
    </div>
    )
   
}
export default DeckComponent;
