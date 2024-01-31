import React from "react";


interface list_item_props {
    title: string;
    extract: string;
    image: string;
    url: string;
  }

function New_list_item({ title, extract, image, url }: list_item_props) 
{
    return(
        <div className="item-news-container" onClick={() => window.location.assign("#"+url)}>
            <div className="item-news-header-image" style={{ 
            backgroundImage: "url("+image+")" 
            }}>
            </div>
            <div className="item-news-header">
                <h2 className="item-news-title">{title}</h2>
            </div>
        </div>
    );

}

export default New_list_item;