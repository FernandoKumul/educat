import axios from "axios"
import { ICartItemCourse } from "../interfaces/ICartItemCourse"
import { ICartWish } from "../interfaces/ICartWish"

const BASE_URL = 'https://localhost:7245/api'

export default class CartService {
  static async getUserCart(): Promise<ICartItemCourse[]> {
    const token = localStorage.getItem('token')

    const response = await axios.get(`${BASE_URL}/cart/`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    return response.data.data
  }
  static async createCartItem(courseId: number): Promise<ICartWish> {
    const token = localStorage.getItem('token')

    const response = await axios.post(`${BASE_URL}/cart/course/${courseId}`, null, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    return response.data.data
  }

  static async deleteCartItem(cartItemId: number) {
    const token = localStorage.getItem('token')

    await axios.delete(`${BASE_URL}/cart/${cartItemId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  }
}