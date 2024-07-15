import axios from "axios";
import { ICartItemCourse } from "../interfaces/ICartItemCourse"
import { ICartWish } from "../interfaces/ICartWish"

const BASE_URL = 'https://localhost:7245/api'

export default class WishlistService {
    static async getUserWishlist(): Promise<ICartItemCourse[]> {
        const token = localStorage.getItem('token')
        const response = await axios.get(`${BASE_URL}/wishlist/`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        return response.data.data
    }
    static async createWishlistItem(courseId: number): Promise<ICartWish> {
        const token = localStorage.getItem('token')
        const response = await axios.post(`${BASE_URL}/wishlist/course/${courseId}`, null, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        return response.data.data
    }
    static async deleteWishlistItem(courseId: number) {
        const token = localStorage.getItem('token')
        await axios.delete(`${BASE_URL}/wishlist/course/${courseId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
    }
}