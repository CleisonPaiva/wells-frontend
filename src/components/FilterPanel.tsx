import {useState, useEffect} from "react";
import {Sidebar} from "primereact/sidebar";
import {Dropdown} from "primereact/dropdown";
import {Button} from "primereact/button";
import {getFilters} from "../services/wellService.ts";
import type {WellFiltersDto} from "../types/Well.ts";

export interface WellTextFilter {
    state?: string | null;
    basin?: string | null;
    status?: string | null;
}
interface Props {
    visible: boolean,
    onClose: () => void,
    onApply: (filter: WellTextFilter) => void;
}

export default function FilterPanel({visible, onClose, onApply}: Props) {
    const [filters, setFilters] = useState<WellFiltersDto | null>(null);
    const [state, setState] = useState<string | null>(null);
    const [basin, setBasin] = useState<string | null>(null);
    const [status, setStatus] = useState<string | null>(null);

    useEffect(() => {
        getFilters().then(setFilters);
    }, []);

    return (
        <Sidebar visible={visible} position="left" onHide={onClose}>
            <div style={{ padding: '8px 16px' }}>
                <h2 style={{ marginBottom: 24, fontSize: 18, borderBottom: '1px solid #444', paddingBottom: 12 }}>
                    Filtros
                </h2>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    <div>
                    <span style={{ fontSize: 11, color: '#888', textTransform: 'uppercase', letterSpacing: 1 }}>
                        Estado
                    </span>
                        <Dropdown
                            value={state}
                            onChange={(e) => setState(e.value)}
                            options={filters?.states ?? []}
                            placeholder="Selecione um estado"
                            style={{ width: '100%', marginTop: 6 }}
                        />
                    </div>

                    <div>
                    <span style={{ fontSize: 11, color: '#888', textTransform: 'uppercase', letterSpacing: 1 }}>
                        Bacia
                    </span>
                        <Dropdown
                            value={basin}
                            onChange={(e) => setBasin(e.value)}
                            options={filters?.basins ?? []}
                            placeholder="Selecione uma bacia"
                            style={{ width: '100%', marginTop: 6 }}
                        />
                    </div>

                    <div>
                    <span style={{ fontSize: 11, color: '#888', textTransform: 'uppercase', letterSpacing: 1 }}>
                        Status
                    </span>
                        <Dropdown
                            value={status}
                            onChange={(e) => setStatus(e.value)}
                            options={filters?.statuses ?? []}
                            placeholder="Selecione um status"
                            style={{ width: '100%', marginTop: 6 }}
                        />
                    </div>

                    <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                        <Button label="Aplicar" style={{ flex: 1 }} onClick={() => onApply({ state, basin, status })} />
                        <Button label="Limpar" severity="secondary" style={{ flex: 1 }} onClick={() => {
                            setState(null);
                            setBasin(null);
                            setStatus(null);
                        }} />
                    </div>
                </div>
            </div>
        </Sidebar>
    );

}