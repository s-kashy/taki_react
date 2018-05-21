import React, {
    Component
} from 'react';

import './style.css';

const WinnerComponent = (props) => {



        return(
            <div className="gameOver" >
            <p >{props.name} won!</p>
            </div>

           );
}

export default WinnerComponent;