import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Axios from "axios";
import { store } from "./app/store";
import { Provider } from "react-redux";
// import { AuthContextProvider } from './context/AuthContext'; 

// Axios.defaults.baseURL = "https://www.abc.com";
Axios.defaults.withCredentials = true;

ReactDOM.render(
  <React.StrictMode>
    {/* <AuthContextProvider> */}
    <Provider store={store}>
      <App />
      {/* </AuthContextProvider> */}
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
