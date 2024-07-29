import axios from "axios"
import { IUserAuth } from "../interfaces/IUserAuth"

const BASE_URL =  import.meta.env.VITE_URL_API ?? 'https://localhost:7245/api'

export default class UserEditService {
    static async updateUser(user: IUserAuth): Promise<void>{
        const token = localStorage.getItem('token')

        await axios.put(`${BASE_URL}/user/edit`, user, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

    }   
}