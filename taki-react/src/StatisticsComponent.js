import React, { Component } from 'react';

import './style.css';

const StatisticsComponent = (props) => {

	   return(
		   	<div className="footer">
			    <div className="stats">Total turns
			    	<span className="statsResult">{props.totalNumTurns}</span>
			    </div>
			    <div className="stats">Game duration (in sec)
			    <span className="statsResult">	{props.totalGameTime}</span>
			    </div >
			    <div className="stats">Average time for game play (in sec)
			    <span className="statsResult">	{props.humanAvgTimeForGamePlay}</span>
			    </div>
			     <div className="stats">Times with single card
				<span className="statsResult">	{props.humanTimesWithSingleCard}</span>
			    </div>
		    </div>
	    )
     
}

export default StatisticsComponent;
