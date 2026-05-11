import { useNavigate, useLocation } from "react-router-dom";

export default function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = (path: string) => location.pathname === path;

    const navItem = (path: string, label: string, icon: string) => (
        <div
            onClick={() => navigate(path)}
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '6px 16px',
                cursor: 'pointer',
                borderRadius: 6,
                fontSize: 14,
                color: isActive(path) ? 'white' : '#aaa',
                background: isActive(path) ? 'rgba(255,255,255,0.1)' : 'transparent',
                transition: 'all 0.2s',
            }}
        >
            <i className={icon} style={{ fontSize: 14 }} />
            {label}
        </div>
    );

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            padding: '0 20px',
            height: 52,
            background: '#0f0f1a',
            borderBottom: '1px solid #222',
            zIndex: 1000,
        }}>
            <span style={{
                color: 'white',
                fontWeight: 700,
                fontSize: 15,
                marginRight: 24,
                letterSpacing: 1
            }}>
                🛢️ WellsGIS
            </span>

            {navItem('/', 'Mapa', 'pi pi-map')}
            {navItem('/wells', 'Poços', 'pi pi-list')}
            {navItem('/import', 'Importar', 'pi pi-upload')}
        </div>
    );
}