import axios from "axios"

const BASE_URL =  import.meta.env.VITE_URL_API ?? 'https://localhost:7245/api'

export default class LikeService {
  static async toggleLike(commentId: number): Promise<boolean> {
    const token = localStorage.getItem('token')

    const response = await axios.post(`${BASE_URL}/like/review/toggle`, null, {
      headers: {
        'Authorization': `Bearer ${token}`
      },
      params: {
        comment: commentId
      }
    })

    return response.data.data
  }
}