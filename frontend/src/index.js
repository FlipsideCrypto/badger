import React from 'react';
import ReactDOM from 'react-dom/client';

import { StyledEngineProvider } from '@mui/material/styles';
import { HelmetProvider } from 'react-helmet-async';

import App from './App';

import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <StyledEngineProvider injectFirst>
            <HelmetProvider>
                <App />
            </HelmetProvider>
        </StyledEngineProvider>
    </React.StrictMode>
);