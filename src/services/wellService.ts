import type {PaginatedResponse, Well, WellFilter, WellFiltersDto, WellMapDto, WellMapFilter} from "../types/Well.ts";
const API_URL = import.meta.env.VITE_API_URL;

//Pega todos os dados
export async function getWells(filter: WellFilter): Promise<PaginatedResponse<Well>> {
    const params = new URLSearchParams();
    params.append('page', filter.page.toString());
    params.append('pageSize', filter.pageSize.toString());
    if (filter.name) params.append('name', filter.name);
    if (filter.operator) params.append('operator', filter.operator);
    if (filter.state) params.append('state', filter.state);
    if (filter.basin) params.append('basin', filter.basin);
    if (filter.status) params.append('status', filter.status);
    if (filter.classification) params.append('classification', filter.classification);

    const response = await fetch(`${API_URL}/api/Wells?${params.toString()}`);
    const data = await response.json();

    return data;
}

//Filtra por nome
export async function getWellByName(name: string){

    const response = await fetch(`${API_URL}/api/wells/${name}`);
    const data = await response.json();

    return data;
}

//Dados para mapa e legenda
export async function getWellsForMap(filter: WellMapFilter): Promise<WellMapDto[]> {
    const params = new URLSearchParams();
    params.append('Zoom', filter.Zoom.toString());
    params.append('minLatitude', filter.minLatitude.toString());
    params.append('maxLatitude', filter.maxLatitude.toString());
    params.append('minLongitude', filter.minLongitude.toString());
    params.append('maxLongitude', filter.maxLongitude.toString());
    if (filter.name) params.append('name', filter.name);
    if (filter.operator) params.append('operator', filter.operator);
    if (filter.state) params.append('state', filter.state);
    if (filter.basin) params.append('basin', filter.basin);
    if (filter.status) params.append('status', filter.status);
    if (filter.classification) params.append('classification', filter.classification);

    const response = await fetch(`${API_URL}/api/wells/map?${params.toString()}`);
    const data = await response.json();

    return data;
}

//Dados de Filtro
export async function getFilters(): Promise<WellFiltersDto> {
    const response = await fetch(`${API_URL}/api/wells/filters`);
    return response.json();
}

//Importar arquivo
export async function importWells(file: File): Promise<void> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${API_URL}/api/WellsImport`, {
        method: 'POST',
        body: formData,
    });

    if (!response.ok) {
        throw new Error('Erro ao importar arquivo');
    }
}