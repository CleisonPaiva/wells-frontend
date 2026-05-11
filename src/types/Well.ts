export interface Well {
    name: string
    nameWellOperator: string
    organizationNumber: string
    operator: string
    state: string
    basin: string
    status: string
    classification: string
    latitude: number
    longitude: number
}


export interface WellMapDto {
    name: string
    status: string
    latitude: number
    longitude: number
}

export interface PaginatedResponse<T> {
    data: T[];
    totalCount: number
    page: number
    pageSize: number
}

export interface WellFilter {
    page: number
    pageSize: number
    name?: string
    operator?: string
    state?: string
    basin?: string
    status?: string
    classification?: string
}

export interface WellMapFilter {
    name?: string
    nameWellOperator?: string
    organizationNumber?: string
    operator?: string
    state?: string
    basin?: string
    status?: string
    classification?: string
    minLongitude: number
    maxLongitude: number
    minLatitude: number
    maxLatitude: number
    Zoom: number
}

export interface WellFiltersDto {
    states: string[];
    basins: string[];
    statuses: string[];
}