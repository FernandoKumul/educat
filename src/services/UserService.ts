import axios from "axios"

const BASE_URL = 'https://localhost:7245/api'

export default class UserService {
  static async becomeInstructor(): Promise<void> {
    const token = localStorage.getItem('token')

    await axios.post(`${BASE_URL}/user/convert-to-instructor`, null, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  }
}