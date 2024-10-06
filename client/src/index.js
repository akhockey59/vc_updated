import React from "react";
import ReactDOM from 'react-dom/client'; // Use the new API from 'react-dom/client'
import App from "./App";
import './styles.css';

// Get the root element
const rootElement = document.getElementById("root");

// Create a root using React 18's createRoot API
const root = ReactDOM.createRoot(rootElement);

// Render the app using the new root
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
