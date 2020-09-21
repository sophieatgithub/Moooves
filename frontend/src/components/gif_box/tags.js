import React from 'react';

function Tags(props) {

    const tagArray = props.tag;


//Maps each tag in the array to its gif
    const Tags = ({tagArray}) => (
        <>
          {tagArray.map(tag => (
            <span className="tag" key={tag}>{tag}</span>
          ))}
        </>
      ); 

    return(
        <div className="tag_container">
            <Tags tagArray={tagArray} />
        </div>
    )
}

export default Tags