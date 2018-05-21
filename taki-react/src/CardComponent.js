import React, {
    Component
} from 'react';
import img from './img/blank_card.png'
import './style.css';

const CardComponent = (props) => {
    let styleColor=props.color;
    let value = props.card ? props.card.value : null
    let id = props.card ? props.card.id : null
    let color = props.card ? props.card.color : null
    if(props.visible){
        return ( 
            <button onClick = {props.onCardClick}  className = "card" value = { value} 
                id ={id} style={{backgroundColor: color}}> {value} < /button> 
                )

    }
    else{
        return(
           < button  onClick = {props.onCardClick} className = "card" value = { value} 
           id ={id} style={{backgroundImage: "url("+img+")"}} />

           )

    }


}

export default CardComponent;