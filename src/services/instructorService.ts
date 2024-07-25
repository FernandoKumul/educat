import axios from "axios";
import { IInstructorInfo } from "../interfaces/IInstructorInfo";

const BASE_URL =  import.meta.env.VITE_URL_API ?? 'https://localhost:7245/api'

export default class InstructorService{
    static async getInstructorProfile(token: string): Promise<IInstructorInfo>{
        const response = await axios.get(`${BASE_URL}/Instructor/profile`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        return response.data.data
    }
    static async updateInstructor(token: string, instructor: IInstructorInfo): Promise<void>{
        await axios.put(`${BASE_URL}/Instructor/edit`, instructor, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }   
}