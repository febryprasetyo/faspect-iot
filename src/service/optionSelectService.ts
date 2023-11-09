import cookie from "js-cookie"
const BaseURLApi = import.meta.env.VITE_URL_API

export const getOptionDevice = async()=>{
    try {
        const response = await fetch(`${BaseURLApi}/data/station/device-list`, {
            headers: {
                "Authorization": `Bearer ${cookie.get("token")}`
            }
        })
        const respJson = response.json()
        return respJson
    } catch (error) {
        if (error instanceof Error) {
            return error.message;
        }
    }
}

export const getOptionDeviceStation = async()=>{
    try {
        const response = await fetch(`${BaseURLApi}/data/station/device-list`, {
            headers: {
                "Authorization": `Bearer ${cookie.get("token")}`
            }
        })
        const respJson = response.json()
        return respJson
    } catch (error) {
        if (error instanceof Error) {
            return error.message;
        }
    }
}

export const getOptionProvincies = async()=>{
    try {
        const response = await fetch(`${BaseURLApi}/data/station/province-list`, {
            headers: {
                "Authorization": `Bearer ${cookie.get("token")}`
            }
        })
        const respJson = response.json()
        
        return respJson
    } catch (error) {
        if (error instanceof Error) {
            return error.message;
        }
    }
}

export const getOptionCities = async(id: number)=>{
    try {
        const response = await fetch(`${BaseURLApi}/data/station/city-list/${id}`, {
            headers: {
                "Authorization": `Bearer ${cookie.get("token")}`
            }
        })
        const respJson = response.json()
        return respJson
    } catch (error) {
        if (error instanceof Error) {
            return error.message;
        }
    }
}