import React from "react";

import {  NavLink } from "react-router-dom";

interface list_item_props {
    title: string;
    extract: string;
    image: string;
    url: string;
  }

function New_list_item({ title, extract, image, url }: list_item_props) 
{
    return(
        <NavLink  to={url}>
            <div className="item-news-container" onClick={() => window.location.assign("#"+url)}>
                <div className="item-news-header-image" style={{ 
                backgroundImage: "url("+image+")" 
                }}>
                </div>
                <div className="item-news-header">
                    <h2 className="item-news-title">{title}</h2>
                </div>
            </div>
        </NavLink>
    );

}

export default New_list_item;