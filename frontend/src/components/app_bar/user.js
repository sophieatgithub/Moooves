import React from 'react';
import imageIcon from '../../media/user.png';

function User() {

    return(
        <button className="user_button" type="button">
            <img src={imageIcon} alt="user icon" className="appbar_user"/> 
        </button>
    )
} 

export default User