import axios from "axios"
import { ICommentUser } from "../interfaces/ICommentUser"
import { IAddReview } from "../interfaces/IAddReview"

const BASE_URL = 'https://localhost:7245/api'

type IResponseGetReviewsByCourse = {
  result: ICommentUser[],
  count: number
}

export default class CommentService {
  static async getReviewsByCourse(courseId: number, page: number, limit: number): Promise<IResponseGetReviewsByCourse> {
    const response = await axios.get(`${BASE_URL}/comment/review`, {
      params: {
        course: courseId,
        page,
        limit
      }
    })
    return response.data.data
  }

  static async createReview(data: IAddReview) {
    const token = localStorage.getItem('token')

    const response = await axios.post(`${BASE_URL}/comment/review`, data, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    return response.data.data
  }
}