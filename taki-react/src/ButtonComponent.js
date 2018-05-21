import React, {
    Component
} from 'react';
import img from './img/blank_card.png'
import './style.css';

const ButtonComponent = (props) => {
let visibilityState = props.visible ? "block" : "none";


        return(
            <div >
             <button className={props.className} style={{display: visibilityState}} onClick={props.onButtonClick}>{props.name}</button>
            </div>


           )
}

export default ButtonComponent;