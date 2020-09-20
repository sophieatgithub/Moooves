import React from 'react';
import { ReactFreezeframe } from 'react-freezeframe';

const Gif = (props) => {

  const gifAddress = props.gif;
  const gif = "https://api.moves.bajescu.com/" + gifAddress;

  return (
    <ReactFreezeframe 
      src={gif} 
      />
  )
}

export default Gif