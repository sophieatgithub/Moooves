import React from 'react';

function Gif(props) {

    return(
        <div>
            <img src={props.gif} alt="gif of dance move" />        
        </div>
    )
}

export default Gif