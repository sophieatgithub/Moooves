import React, { useState } from 'react';
import searchIcon from '../../media/search.png';

function Search() {
    const [parameters, setParameters] = useState(" ");

    const handleInput = event => {
        setParameters(event.target.value);
    }

    const passParameters = () => {
        console.log(parameters);
    }

    return (
        <div>
            <input onChange={handleInput} />
            <button onClick={passParameters}><img src={searchIcon} alt="search icon"/></button>
        </div>
    );
}

export default Search; 
export const parameters = () => {};