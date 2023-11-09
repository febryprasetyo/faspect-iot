import cookie from "js-cookie"
import { TypeParamQuery } from "../types/typePaginate"
import { PayloadDeviceType } from "../types/typeDevice"
const BaseURLApi = import.meta.env.VITE_URL_API

export const getPaginateDevice = async(param: TypeParamQuery)=>{
    try {
        const resp = await fetch(`${BaseURLApi}/data/device/list`, {
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

export const deleteDeviceById = async(id: number)=>{
    try {
        const resp = await fetch(`${BaseURLApi}/data/device/remove`, {
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

export const addDeviceService = async(payload: PayloadDeviceType)=>{
    try {
        const response = await fetch(`${BaseURLApi}/data/device/create`, {
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

export const updateDeviceService = async(payload: PayloadDeviceType)=>{
    try {
        const response = await fetch(`${BaseURLApi}/data/device/update`, {
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