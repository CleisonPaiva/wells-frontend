import {useState, useEffect} from "react";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {getWells} from "../services/wellService.ts";
import type {Well} from "../types/Well.ts";
import {InputText} from "primereact/inputtext";

export default function WellsPage() {
    const [wells, setWells] = useState<Well[]>([]);
    const [totalCount, setTotalCount] = useState(0);
    const [page, setPage] = useState(1);
    const [nameFilter, setNameFilter] = useState('');

    useEffect(() => {
        getWells({page, pageSize: 50, name: nameFilter || undefined}).then((result) => {
            setWells(result.data);
            setTotalCount(result.totalCount);
        });
    }, [page, nameFilter]);

    return (
        <div style={{ padding: '32px 40px', height: 'calc(100vh - 52px)', display: 'flex', flexDirection: 'column', gap: 24 }}>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                    <h1 style={{ fontSize: 24, fontWeight: 700, margin: 0 }}>Poços</h1>
                    <span style={{ fontSize: 13, color: '#888', marginTop: 4, display: 'block' }}>
                    {totalCount.toLocaleString()} registros encontrados
                </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <i className="pi pi-search" style={{ color: '#888' }} />
                    <InputText
                        value={nameFilter}
                        onChange={(e) => { setNameFilter(e.target.value); setPage(1); }}
                        placeholder="Buscar por nome do poço..."
                        style={{ width: 300 }}
                    />
                </div>
            </div>

            <div style={{ flex: 1, border: '1px solid #2a2a3e', borderRadius: 8, overflow: 'hidden' }}>
                <DataTable
                    value={wells}
                    paginator
                    rows={50}
                    totalRecords={totalCount}
                    lazy
                    first={(page - 1) * 50}
                    onPage={(e) => setPage((e.page ?? 0) + 1)}
                    stripedRows
                    scrollable
                    scrollHeight="calc(100vh - 280px)"
                    style={{ fontSize: 13 }}
                >
                    <Column field="name" header="Nome" frozen style={{ minWidth: 140 }} />
                    <Column field="nameWellOperator" header="Nome ANP" style={{ minWidth: 160 }} />
                    <Column field="organizationNumber" header="Nº ANP" style={{ minWidth: 140 }} />
                    <Column field="operator" header="Operador" style={{ minWidth: 150 }} />
                    <Column field="state" header="UF" style={{ minWidth: 70 }} />
                    <Column field="basin" header="Bacia" style={{ minWidth: 130 }} />
                    <Column field="status" header="Status" style={{ minWidth: 280 }} />
                    <Column field="classification" header="Classificação" style={{ minWidth: 280 }} />
                </DataTable>
            </div>
        </div>
    );
}