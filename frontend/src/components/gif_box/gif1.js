import React from 'react';

function Gif(props) {

    const gifAddress = props.gif;
    const gif = "https://api.moves.bajescu.com/" + gifAddress;

    return(
        <div className="gif_container" >
            <img src={gif} className="gif" alt="gif of dance move" />        
        </div>
    )
} 

export default Gif