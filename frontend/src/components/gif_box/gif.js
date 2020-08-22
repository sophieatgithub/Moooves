import React from 'react';

function Gif(props) {

    const gifAddress = props.gif;
    const gif = "http://192.168.100.41:5555/" + gifAddress;

    console.log(props);
    return(
        <div>
            <img src={gif} className="gif" alt="gif of dance move" />        
        </div>
    )
} 

export default Gif