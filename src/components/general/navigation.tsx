import React, { Component } from "react";

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
  
function Nav_button({ text }: nav_button_properties) {
    return (
      <button className="nav-button">{text}</button>
    );
}

const Navigation = () => {
    const { t } = useTranslation();
    return(
        <nav>
            <div className="nav-linebar">
                <div className="nav-button-container">
                    <Nav_button text={t("nav_users_text")}/>
                    <Nav_button text={t("nav_news_text")}/>
                    <Nav_button text={t("nav_lang_text")}/>
                </div>
            </div>
        </nav>
    );
}

export default Navigation;