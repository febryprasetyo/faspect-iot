import cookie from "js-cookie"
import { TypeParamQuery } from "../types/typePaginate"
import { PayloadStationServiceType } from "../types/typeStation"
const BaseURLApi = import.meta.env.VITE_URL_API

export const getPaginateStation = async(param: TypeParamQuery)=>{
    try {
        const resp = await fetch(`${BaseURLApi}/data/station/list`, {
            method: "POST",
            body: JSON.stringify({ limit: param.limit, offset: param.offset }),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${cookie.get("token")}`
            }
        })
        const respJson = await resp.json()
        return respJson
    } catch (error) {
       if (error instanceof Error) {
         return error.message;
       }
    }
}

export const addStationService = async(payload: Omit<PayloadStationServiceType, "id">)=>{
    try {
        const response = await fetch(`${BaseURLApi}/data/station/create`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${cookie.get("token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        })
        const respJson = await response.json()
        return respJson
    } catch (error) {
        if (error instanceof Error) {
            return error.message;
        }
    }
}

export const updateStationService = async(payload: PayloadStationServiceType)=>{
    try {
        const response = await fetch(`${BaseURLApi}/data/station/update`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${cookie.get("token")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        })
        const respJson = await response.json()
        return respJson
    } catch (error) {
        if (error instanceof Error) {
            return error.message;
        }
    }
}

export const deleteStationById = async(id: number)=>{
    try {
        const resp = await fetch(`${BaseURLApi}/data/station/remove`, {
            method: "POST",
            body: JSON.stringify({ id }),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${cookie.get("token")}`
            }
        })
        const respJson = await resp.json()
        return respJson
    } catch (error) {
        if (error instanceof Error) {
            return error.message;
          }
    }
}