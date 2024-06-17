import axios from "axios"
import { IRegisterUser } from "../interfaces/IRegisterUser"
import { ILoginUser } from "../interfaces/ILoginUser"
import { IUserAuth } from "../interfaces/IUserAuth"
import { IUserGoogle } from "../interfaces/IUserGoogle"

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
  static async TokenByGoogle(token: string) {
    const userGoogle = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json'
      }
    })
    const dataUser: IUserGoogle = {
      picture: userGoogle.data.picture,
      givenName: userGoogle.data.given_name,
      familyName: userGoogle.data.family_name,
      email: userGoogle.data.email,
      emailVerified: userGoogle.data.verified_email
    }
    const response = await axios.post(`${BASE_URL}/auth/google`, dataUser)
    localStorage.setItem('token', response.data.data.token)
  }
}