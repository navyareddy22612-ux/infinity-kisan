import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { LocationProvider } from './context/LocationContext';
import { LanguageProvider } from './context/LanguageContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <LanguageProvider>
            <LocationProvider>
                <App />
            </LocationProvider>
        </LanguageProvider>
    </React.StrictMode>
);
