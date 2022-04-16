import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Axios from "axios";
import { AuthContextProvider } from './context/AuthContext'; 

// Axios.defaults.baseURL = "https://www.abc.com";
Axios.defaults.withCredentials = true;

ReactDOM.render(
  <React.StrictMode>
    <AuthContextProvider>
    <App />
    </AuthContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
