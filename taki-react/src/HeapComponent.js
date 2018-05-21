import React, { Component } from 'react';
import './style.css';
import CardComponent from './CardComponent'
import * as consts from './Consts.js'

const HeapComponent = (props) => {
	
	if(props.topCard.value == consts.CHANGE_COLOR_CARD_VALUE && props.topCard.color == consts.WHITE_COLOR)
	{
	 	return(
 				<table className="cardChoiseColor">
 				<tbody>
 				<tr>
 					<td className="Colorflex" id="red" onClick={props.clickOnColor} style={{backgroundColor:'red'}}></td>
 					<td className="Colorflex" id="blue" onClick={props.clickOnColor} style={{backgroundColor:'blue'}}></td>
 				</tr>
 				<tr>
 					<td className="Colorflex" id="yellow" onClick={props.clickOnColor}  style={{backgroundColor:'yellow'}}></td>
 					<td className="Colorflex" id="green" onClick={props.clickOnColor}  style={{backgroundColor:'green'}}></td>
 				</tr>
 				</tbody>
 				</table>
	
		 	);
		
	}
	else{
    return ( <CardComponent key="heap" visible={true} card={props.topCard} />);
    
		}


};

export default HeapComponent;