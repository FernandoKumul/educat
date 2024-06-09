import axios from "axios"
import { IRegisterUser } from "../assets/interfaces/IRegisterUser"
import { ILoginUser } from "../assets/interfaces/ILoginUser"

const BASE_URL = 'https://localhost:7245/api'

export default class AuthService {
  
  static async register(data: IRegisterUser) {
    await axios.post(`${BASE_URL}/auth/register`, data)
  }

  static async login(data: ILoginUser) {
    const response = await axios.post(`${BASE_URL}/auth/login`, data)
    localStorage.setItem('token', response.data.data.token)
  }
}