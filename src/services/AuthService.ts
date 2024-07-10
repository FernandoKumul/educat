import axios from "axios"
import { IRegisterUser } from "../interfaces/IRegisterUser"
import { ILoginUser } from "../interfaces/ILoginUser"
import { IUserAuth } from "../interfaces/IUserAuth"

const BASE_URL = 'https://localhost:7245/api'

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
  static async TokenByGoogle(access_Token: string) {
    const response = await axios.post(`${BASE_URL}/auth/google`, {accessToken: access_Token})
    localStorage.setItem('token', response.data.data.token)
  }
}