import React from 'react';

function Gif(props) {

    const gifAddress = props.gif;
    const gif = "https://api.moves.bajescu.com/" + gifAddress;

    console.log(props);
    return(
        <div>
            <img src={gif} className="gif" alt="gif of dance move" />        
        </div>
    )
} 

export default Gif