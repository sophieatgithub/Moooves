import React from 'react';
import SiteTitle from './site_title';
import Filter from './filter';
import Search from './search';
import '../../css/app_bar.css';

function AppBar() {

    return(
        <div className="flex_container">
            <SiteTitle />
            <Filter />
            <Search />  
        </div>
    )
} 

export default AppBar