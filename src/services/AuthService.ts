import axios from "axios"
import { IRegisterUser } from "../assets/interfaces/IRegisterUser"

const BASE_URL = 'https://localhost:7245/api'

export default class AuthService {
  
  static async register(data: IRegisterUser) {
    await axios.post(`${BASE_URL}/auth/register`, data)
  }
}