import React, { useState } from 'react';

import backend_url from "../../../../Vars"

import {
    useParams
  } from "react-router-dom";

import { useTranslation } from "react-i18next";

const NewsDetails = () => {
    const { t } = useTranslation();

    let { _id } = useParams();

    const [saveddata, setData] = useState([]);

    React.useEffect(() => {
        fetch(backend_url+"/api/newsDetail?id="+_id)
        .then((res) => res.json())
        .then((data) => {
            setData(data.data)
        });
      }, []);

      return(
        <div className="mainc-container">
            {
                saveddata.map((val) => {
                        return(
                            <div className='article-container'>
                                <h1 className='article-title'>
                                    {val["title"]}
                                </h1>
                                <div className='article-extract'>
                                    {val["extract"]}
                                </div>
                                <div className='inner-article-image'>
                                    <img className='news-inner-image' src={"/news_images/"+val["image"]}></img>
                                </div>
                                <div className='news-inner-content'>
                                    {val["content"]}
                                </div>
                            </div>
                        );
            })}
        </div>
        );
}

export default NewsDetails;