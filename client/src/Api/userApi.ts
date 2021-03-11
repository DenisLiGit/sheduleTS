import axios from "axios";
import {userInfoI} from "../redux/userReducer";

export interface loginI {
    userId: string | null
    token: string | null
}

export interface registerI {
    message: string
}

const userApi = {
    async login(userInfo: userInfoI) {
        try {
            const res = await axios.post<loginI>('/api/auth/login', {
                userInfo
            }, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })

            return res.data
        } catch (error) {
            return error.response
        }
    },
    async register(userInfo: userInfoI) {
        try {
            const res = await axios.post<registerI>('/api/auth/register', {
                userInfo
            }, {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })

            return res
        } catch (error) {
            return error.response
        }
    }
}


export default userApi