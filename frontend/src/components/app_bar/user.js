import React from 'react';
import imageIcon from '../../media/user.png';

function User() {

    return(
        <div>
            <img src={imageIcon} alt="user icon" className="appbar_user"/> 
        </div>
    )
} 

export default User