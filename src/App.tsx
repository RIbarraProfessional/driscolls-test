import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

import React from 'react';
import logo from './logo.svg';
import './App.css';

import { useTranslation } from "react-i18next";
import { initReactI18next } from "react-i18next";
import i18n from "i18next";
import langEN from "./lang/en.json";
import langES from "./lang/es.json";


import Navigation from './components/general/navigation.tsx';
import MainContent from './components/general/maincontent.tsx'; 

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

function App() {
  const { t } = useTranslation();
  return (
    <div className="App">
      <div className='App-bodyback'>
        <div className='App-bodyback-overlay'>
          <header className="App-header">
          
          </header>
          <Navigation />
          <div className='App-body-content'>
            <MainContent />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
