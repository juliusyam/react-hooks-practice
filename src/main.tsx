import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { UtilitiesContextProvider } from './contexts/UtilitiesContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <UtilitiesContextProvider>
      <App />
    </UtilitiesContextProvider>
  </React.StrictMode>,
)
