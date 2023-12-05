import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './Pages/App';
import 'semantic-ui-css/semantic.min.css';
import { AppProvider } from './Context/AppContext';
import { BrowserRouter } from 'react-router-dom';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AppProvider>
      <BrowserRouter>
      <App />
      </BrowserRouter>
    </AppProvider>
);
