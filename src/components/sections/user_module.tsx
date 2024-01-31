import React from "react";

import { useTranslation } from "react-i18next";
import { initReactI18next } from "react-i18next";
import i18n from "i18next";
import langEN from "../../lang/en.json";
import langES from "../../lang/es.json";

import "../../assets/css/user_module.css";

import User_table_contents from "./user_table_contents.tsx";
import User_new_modal from "./user_new_modal.tsx";

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

function create_user_function()
{
    console.log("click");
}

const User_module = () => {
    const { t } = useTranslation();
    


    return(
        <div className="user-module-container">
            <h1 className="user-module-title">{t("user_module_title")}</h1>
            <div className="user_module_table_container">
                <User_table_contents />
            </div>
            <User_new_modal/>
        </div>
    );
}

export default User_module;