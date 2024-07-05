import axios from "axios"
import { ICommentUser } from "../interfaces/ICommentUser"
import { IAddReview } from "../interfaces/IAddReview"
import { IEditReview } from "../interfaces/IEditReview"

const BASE_URL = 'https://localhost:7245/api'

type IResponseGetReviewsByCourse = {
  result: ICommentUser[],
  count: number,
  rating: number
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

  static async GetCourseReviewByUser(courseId: number): Promise<ICommentUser | null> {
    const token = localStorage.getItem('token')

    if(!token) return null

    const response = await axios.get(`${BASE_URL}/comment/review/course/${courseId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    return response.data.data
  }

  static async deleteComment(commentId: number) {
    const token = localStorage.getItem('token')

    await axios.delete(`${BASE_URL}/comment/${commentId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  }

  static async editReview(commentId: number, reviewData: IEditReview) {
    const token = localStorage.getItem('token')

    await axios.put(`${BASE_URL}/comment/review/${commentId}`, reviewData ,{
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  }
}