import axios from "axios"
import { IRegisterUser } from "../interfaces/IRegisterUser"
import { ILoginUser } from "../interfaces/ILoginUser"
import { IUserAuth } from "../interfaces/IUserAuth"

const BASE_URL =  import.meta.env.VITE_URL_API ?? 'https://localhost:7245/api'

export default class AuthService {

  static async register(data: IRegisterUser) {
    await axios.post(`${BASE_URL}/auth/register`, data)
  }

  static async login(data: ILoginUser) {
    const response = await axios.post(`${BASE_URL}/auth/login`, data)
    localStorage.setItem('token', response.data.data.token)
  }

  static async verifyToken(token: string): Promise<IUserAuth> {
    const response = await axios.get(`${BASE_URL}/auth/verify-token`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    return response.data.data
  }
  static async TokenByGoogle(accessToken: string) {
    const response = await axios.post(`${BASE_URL}/auth/google?accessToken=${accessToken}`)
    localStorage.setItem('token', response.data.data.token)
  }
  static async SendEmailRecovery(email: string) {
    await axios.get(`${BASE_URL}/auth/send-email-recovery?email=${email}`)
  }
  static async ChangePassword(token: string, password: string) {
    await axios.put(`${BASE_URL}/auth/change-password?token=${token}&newPassword=${password}`)
  }
}