import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// packaging complete app for routing
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    // <React.StrictMode>
    // routing container
    <BrowserRouter>
        <App />
    </BrowserRouter>
    // </React.StrictMode>
);

reportWebVitals();
