import { useTranslation } from "react-i18next";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


import React, { useState } from 'react';

import backend_url from "../../../../Vars"

import {
    useParams
  } from "react-router-dom";

const UserDetails = () => {
    const { t } = useTranslation();

    let { _id } = useParams();

    const [saveddata, setData] = useState([]);

    React.useEffect(() => {
        fetch(backend_url+"/api/userDetail?id="+_id)
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
                            <div className='user-container'>
                                <Container>
                                    <Row>
                                        <Col xs="12" sm="12" md="6" lg="6" xl="6">
                                            <div>
                                                <img src={val["name"]}></img>
                                            </div>
                                        </Col>
                                        <Col xs="12" sm="12" md="12" lg="6" xl="6">
                                            <h1>{val["name"]}</h1>
                                        </Col>
                                    </Row>
                                </Container>
                            </div>
                        );
            })}
        </div>
        );
}

export default UserDetails;