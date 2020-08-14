import React from 'react';
import Gif from './gif';
import Tags from './tags';

function GifBox(props) {

// Maps the appropriate props the the correct elements
    const GifBox = ({movesArray}) => (
        <>
            {movesArray.map(move => (
                <div>
                <Gif isLoading={props.isLoading} gif={move.thumbnail} />
                <Tags isLoading={props.isLoading} tag={move.tags} />
                </div>
            ))}
        </>
    )

//Checks to see if the data has loaded before rendering
        if (!props.isLoading) {
            return (
                <GifBox movesArray={props.movesArray} />
            )
        } else {
            return(
                <h1>loading</h1>
            ) 
        }
}

export default GifBox