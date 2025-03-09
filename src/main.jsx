import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import  {StageProvider} from "./context/SetStageContext.jsx"
import {PropertyProvider} from "./context/PropertyContext.jsx"
createRoot(document.getElementById('root')).render(
  <PropertyProvider>
   <StageProvider>
    <App />
    </StageProvider>
  </PropertyProvider>
)
