import React from 'react';
import Gif from './gif';
import Tags from './tags';

function GifBox(props) {
    return(
        <>
            <Gif isLoading={props.isLoading} gif={props.gif} />
            <Tags isLoading={props.isLoading} tag={props.tag} />
        </>
    )
}

export default GifBox