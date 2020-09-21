import React from 'react';
import '../../css/menu_burger.css';

function Menu() {

    return(
        <button className="menu_button" type="button">
            <div className="menu_burger"></div>
            <div className="menu_burger"></div>
            <div className="menu_burger"></div>
        </button>

    )
} 

export default Menu