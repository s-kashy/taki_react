import React, { Component } from 'react';
import CardComponent from './CardComponent'

import './style.css';


const ComputerPlayerComponent = (props) => {
    
    let cards=props.card.map(card=>{
    return(
            <CardComponent key={card.id} card={card} visible={false}  />
        )
    })
    
   return(
    <div>
    	{cards}
    </div>
    );
};

export default ComputerPlayerComponent;