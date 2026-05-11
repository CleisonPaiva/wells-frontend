import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MapPage from './pages/MapPage.tsx'
import '@arcgis/core/assets/esri/themes/dark/main.css'
import './index.css'
import WellsPage from "./pages/WellsPage.tsx";
import Layout from './components/Layout.tsx'
import ImportPage from "./pages/ImportPage.tsx";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout><MapPage /></Layout>} />
                <Route path="/wells" element={<Layout><WellsPage /></Layout>} />
                <Route path="/import" element={<Layout><ImportPage/></Layout>} />
            </Routes>
        </BrowserRouter>
    </StrictMode>
)