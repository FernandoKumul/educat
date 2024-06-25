import axios from "axios";
import { IInstructorInfo } from "../interfaces/IInstructorInfo";

const BASE_URL = 'https://localhost:7245/api'

export default class InstructorService{
    static async getInstructorProfile(token: string): Promise<IInstructorInfo>{
        const response = await axios.get(`${BASE_URL}/Instructor/profile`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        console.log(response.data.data)
        return response.data.data
    }
}