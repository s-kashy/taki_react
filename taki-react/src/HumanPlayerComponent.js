import React, { Component } from 'react';
import CardComponent from './CardComponent'

import './style.css';
const HumanPlayerComponent = (props) => {
    
    let cards=props.card.map(card=>{
    return(
            <CardComponent key={card.id} card={card} onCardClick={props.onCardClick} visible={true}  />
        )
    })
    
   return(
    <div>
    {cards}
    </div>
    );
};

export default HumanPlayerComponent;