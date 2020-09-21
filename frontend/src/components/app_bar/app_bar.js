import React from 'react';
import Menu from './menu';
import SiteTitle from './site_title';
import Search from './search';
import User from './user';
import '../../css/app_bar.css';

function AppBar() {

    return(
        <div className="appbar_container">
            <Menu />
            <SiteTitle />
            <Search />  
            <User />
        </div>
    )
} 

export default AppBar