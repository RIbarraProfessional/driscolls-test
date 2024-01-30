import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

import React, { Component } from "react";
import './App.css';


import { Route, NavLink, Routes, HashRouter } from "react-router-dom";

import { useTranslation } from "react-i18next";
import { initReactI18next } from "react-i18next";
import i18n from "i18next";
import langEN from "./lang/en.json";
import langES from "./lang/es.json";


import Navigation from './components/general/navigation.tsx';

import MainContent from './components/general/maincontent.tsx'; 
import Users from './components/pages/users/Users.tsx'
import UserDetails from './components/pages/news/newsDetails/NewsDetails.tsx'
import News from './components/pages/news/News.tsx'
import NewsDetails from './components/pages/news/newsDetails/NewsDetails.tsx'

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
    <HashRouter>
      <div className="App">
        <div className='App-bodyback'>
          <div className='App-bodyback-overlay'>
            <header className="App-header">
            
            </header>
            <Navigation />
            <div className='App-body-content'>
              <div className="content">
              <Routes>
                <Route  index Component={News}/>
                <Route  path="/news" Component={News}/>
                <Route path="/news/:_id" element={<NewsDetails />} />
                <Route  path="/users" Component={Users}/>
                <Route path="/users/:_id" element={<UserDetails />} />
              </Routes>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </HashRouter>
  );
}

export default App;
