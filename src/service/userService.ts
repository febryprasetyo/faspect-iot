import cookie from "js-cookie"
import { TableUserType } from "../types/typeUser"
import { TypeParamQuery } from "../types/typePaginate"
const BaseURLApi = import.meta.env.VITE_URL_API

export const getPaginateUser = async(param: TypeParamQuery)=>{
    try {
        const resp = await fetch(`${BaseURLApi}/data/user/list`, {
            method: "POST",
            body: JSON.stringify({ limit: param.limit, offset: param.offset }),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${param.token}`
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

export const deleteUserById = async(id: number)=>{
    try {
        const resp = await fetch(`${BaseURLApi}/data/user/remove`, {
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

export const addUserService = async(payload: TableUserType)=>{
    try {
        const response = await fetch(`${BaseURLApi}/data/user/create`, {
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

export const updateUserService = async(payload: TableUserType)=>{
    try {
        const response = await fetch(`${BaseURLApi}/data/user/update`, {
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