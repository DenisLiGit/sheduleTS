import axios from "axios";
import { sheduleI } from "../redux/sheduleReducer";

interface getSheduleI {
    shedule: Array<sheduleI> | []
}

interface editSheduleI {
    shedule: sheduleI
}

interface setDelSheduleI {
    message: string
}

const sheduleApi = {
    async getShedule (userId: string | null) {
        try {
            const res = await axios.get<getSheduleI>(
                `/api/shedule/getShedule?userId=${userId}`)

            return res.data
        } catch (error) {
            return error.response.data
        }
    },
    async editShedule (userId: string | null, sheduleId: string | null) {
        try {
            const res = await axios.get<editSheduleI>(
                `/api/shedule/editShedule?userId=${userId}&sheduleId=${sheduleId}`)

            return res
        } catch (error) {
            return error.response.data
        }
    },
    async setShedule (userId: string | null, shedule: sheduleI) {
        try {
            const res = await axios.post<setDelSheduleI>(
                `/api/shedule/setShedule`, {
                    userId,
                    shedule
                })

            return res
        } catch (error) {
            return error.response.data
        }
    },
    async deleteShedule (userId: string | null, sheduleId: string | null) {
        try {
            const res = await axios.delete<setDelSheduleI>(
                `/api/shedule/deleteShedule?userId=${userId}&sheduleId=${sheduleId}`)

            console.log('4',res)
            return res
        } catch (error) {
            return error.response.data
        }
    }
}

export default sheduleApi