import React from 'react';
import { startTime } from './youtube_link';
import Title from './title';
import Gif from './gif1';
import Tags from './tags';
import '../../css/gif_grid.css';
import '../../css/gif_items.css';

function GifBox(props) {


// Maps the appropriate props the the correct elements
    const GifBox = ({movesArray}) => (
        <>
            {movesArray.map(move => (
                <div className="gifGridItem">
                <a href={move.videos[0].url + "&t=" + Number(Number((move.videos[0].start.split(":")[0]*60))+Number(move.videos[0].start.split(":")[1]))} target="_blank">
                    <Gif gif={move.thumbnail} />
                </a>
                    <Title title={move.title} />
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