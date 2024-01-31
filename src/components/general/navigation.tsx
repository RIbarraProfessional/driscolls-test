import React, { Component } from "react";

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import { Route, NavLink, HashRouter } from "react-router-dom";

import { useTranslation } from "react-i18next";
import { initReactI18next } from "react-i18next";
import i18n from "i18next";
import langEN from "../../lang/en.json";
import langES from "../../lang/es.json";

import '../../assets/css/navigation.css'

const resources = {
    en: {
        translation: langEN,
    },
    es: {
        translation: langES,
    },
};
  
i18n.use(initReactI18next).init({
    resources,
    lng: "en",
    fallbackLng: "en",
    interpolation: {
        escapeValue: false,
    },
});

interface nav_button_properties {
    text: string;
}
  
function handleLanguageChange(newLang)
{
    i18n.changeLanguage(newLang);
}

const Navigation = () => {
    const { t } = useTranslation();
    return(
    <Navbar expand="lg" className="bg-body-tertiary top-navbar">
      <Container>
        <Navbar.Brand href="#"></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto navbar-buttons-container">
            <NavLink className="nav-button navigation-Navlink" to="/users">{t("nav_users_text")}</NavLink>
            <NavLink className="nav-button navigation-Navlink" to="/news">{t("nav_news_text")}</NavLink>
            <NavDropdown title={t("nav_lang_text")}  className="nav-button-dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#" onClick={() => handleLanguageChange("en")}>
                    {t("nav_lang_text_en")}
                </NavDropdown.Item>
                <NavDropdown.Item href="#" onClick={() => handleLanguageChange("es")}>
                    {t("nav_lang_text_es")}
                </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    );
}

export default Navigation;