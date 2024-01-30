import React from "react";

import { useTranslation } from "react-i18next";
import { initReactI18next } from "react-i18next";
import i18n from "i18next";
import langEN from "../../../../lang/en.json";
import langES from "../../../../lang/es.json";


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

const NewsDetails = () => {
    const { t } = useTranslation();
    return(
        <div className="mainc-container">
            veas
        </div>
    );
}

export default NewsDetails;