import React from 'react';
import Title from './title';
import Gif from './gif';
import Tags from './tags';
import '../../css/gif_grid.css';

function GifBox(props) {

// Maps the appropriate props the the correct elements
    const GifBox = ({movesArray}) => (
        <>
            {movesArray.map(move => (
                <div className="gifGridItem">
                <Title title={move.title} />
                <Gif gif={move.thumbnail} />
                <Tags tag={move.tags} />
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