import axios from "axios"

const BASE_URL =  import.meta.env.VITE_URL_API ?? 'https://localhost:7245/api'

export default class UserService {
  static async becomeInstructor(): Promise<string> {
    const token = localStorage.getItem('token')

    const response = await axios.post(`${BASE_URL}/user/convert-to-instructor`, null, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    return response.data.data.token
  }
}