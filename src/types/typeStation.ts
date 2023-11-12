export type PayloadStationType = {
    id : number
    device_id : {
        label: string
        value: number | null
    }
    nama_stasiun : string
    address : string
    province_id: {
        label: string
        value: number | null
    }
    city_id : {
        label: string
        value: number | null
    }
    nama_dinas : string
}

export type PayloadStationServiceType = {
    id : number
    device_id : number | null
    nama_stasiun : string
    address : string
    province_id: number | null
    city_id : number | null
    nama_dinas : string
}

export type TableStationType = {
    id : string
    id_mesin : string
    nama_stasiun : string
    address : string
    province_name?: string
    city_name? : string
    province_id: number | null
    city_id: number | null
}