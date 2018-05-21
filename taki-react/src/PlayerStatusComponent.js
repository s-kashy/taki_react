import React, { Component } from 'react';

import './style.css';

const PlayerStatusComponent=(props)=>{
let visibilityState = props.yourTurn ? "visible" : "hidden";

return(
<div>
	<p className="Turn"><span className="howsTurn" style={{visibility:visibilityState}}>Your Turn=></span>
	{props.name} ({props.numCards})</p>
</div>
	);




}

export default PlayerStatusComponent;