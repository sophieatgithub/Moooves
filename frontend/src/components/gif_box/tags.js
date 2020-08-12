import React from 'react';

function Tags(props) {

    const tagArray = props.tag;

    const Tags = ({tagArray}) => (
        <>
          {tagArray.map(tag => (
            <span className="tag" key={tag}>{tag}</span>
          ))}
        </>
      ); 

    return(
        <div>
            <Tags tagArray={tagArray} />
        </div>
    )
}

export default Tags