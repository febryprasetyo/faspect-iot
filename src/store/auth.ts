import { create } from "zustand";
import cookie from "js-cookie"

type UserDataType = {
    user_id: number
	username: string
	fullname: string
	email: string
	phone: string
	is_active: boolean
	role_id: string
	role_name: string
}

type State = {
    user: UserDataType | null
    isLogin: boolean
    token: string | null
    loadingLogin: boolean
    errMsg: string
}

type PayloadLoginType = {
    username: string
    password: string 
}
type Action = {
    actionLogin: (payload: PayloadLoginType)=> void
    setLoadingLogin: (payload: boolean) => void
    logOut: ()=> void
}

export const useAuth = create<State & Action>((set)=> ({
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user") || '') : null,
    isLogin: cookie.get("token") ? true : false,
    loadingLogin: false,
    token: cookie.get("token") || null,
    errMsg: "",
    setLoadingLogin: (payload)=>{
        return set({ loadingLogin: payload })
    },
    logOut: ()=>{
        localStorage.removeItem("user")
        cookie.remove("token", { path: '/' })
        return set({ isLogin: false, user: null, token: null })
    },
    actionLogin: async(payload: PayloadLoginType)=> {
        localStorage.removeItem("user")
        try {
            const resp = await fetch(`${import.meta.env.VITE_URL_API}/auth/login`, {
                method: "POST",
                body: JSON.stringify(payload),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const respJson = await resp.json()
            if (respJson?.success) {
               localStorage.setItem("user", JSON.stringify(respJson.user_data))
               const expiredToken = new Date(new Date().getTime() + respJson?.token?.expires_in * 1000) // respon expires_in nya detik dalam 1 jam, aku kali 1000 agar berubah ke milidetik
               cookie.set("token", respJson?.token?.access_token, { expires: expiredToken, path: "/" })
               return set((state)=> ({ ...state, user: respJson?.user_data, token: respJson?.token?.access_token, isLogin: true, loadingLogin: false }))
            } else {
               return set((state)=> ({ ...state, errMsg: respJson.message, loadingLogin: false }))
            }
        } catch (error) {
            let message: string
            if (error instanceof Error) {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                message = error.message
                return set((state)=> ({ ...state, errMsg: message, loadingLogin: false }))
            }
        } 
        
        
    }
}))