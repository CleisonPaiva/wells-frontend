import {Sidebar} from 'primereact/sidebar';
import type {Well} from "../types/Well.ts";
import 'primereact/resources/themes/lara-dark-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

interface Props {
    well: Well | null;
    onClose: () => void;
}

export default function WellPanel({well, onClose}: Props) {
    return (
        <Sidebar visible={well !== null} position="right" onHide={onClose}>
            <div style={{padding: '8px 16px'}}>
                <h2 style={{marginBottom: 24, fontSize: 18, borderBottom: '1px solid #444', paddingBottom: 12}}>
                    {well?.name}
                </h2>

                <div style={{display: 'flex', flexDirection: 'column', gap: 16}}>
                    {[
                        {label: 'Operador', value: well?.operator},
                        {label: 'Bacia', value: well?.basin},
                        {label: 'Estado', value: well?.state},
                        {label: 'Status', value: well?.status},
                        {label: 'Classificação', value: well?.classification},
                        {label: 'Latitude', value: well?.latitude},
                        {label: 'Longitude', value: well?.longitude},
                    ].map(({label, value}) => (
                        <div key={label}>
                        <span style={{fontSize: 11, color: '#888', textTransform: 'uppercase', letterSpacing: 1}}>
                            {label}
                        </span>
                            <div style={{marginTop: 4, fontSize: 14}}>
                                {value || 'N/A'}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Sidebar>
    );
}