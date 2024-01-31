import React, { useState } from 'react';

import axios from 'axios';

import { useTranslation } from "react-i18next";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import backend_url from "../../Vars.js"

import New_list_item from "../sections/news_list_item.tsx"

import "../../assets/css/newscontent.css"



function News_module () {
    const { t } = useTranslation();

    const [saveddata, setData] = useState([]);

    React.useEffect(() => {
        fetch(backend_url+"/api/newsList")
        .then((res) => res.json())
        .then((data) => {
            setData(data.data)
            
        });
      }, []);

    return(
        <div className="mainc-container">
            <div className='news-list-container'>
            <Container>
                <Row>
                    {saveddata.map((val) => {
                        var url = val["id"];
                        return(
                            <Col xs="12" sm="12" md="6" lg="4">
                                <New_list_item  title={val["title"]} extract={val["extract"]} image={"/news_images/"+val["image"]} url={"/news/"+url}/>
                            </Col>
                        );
                    })}
                
                </Row>
            </Container>
            </div>
        </div>
    );
    
}

export default News_module;