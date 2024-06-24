import axios from "axios"
import { IEditCourse } from "../interfaces/IEditCourse"
import { ICoursePublic } from "../interfaces/ICoursePublic"

const BASE_URL = 'https://localhost:7245/api'

export default class CourseService {
  static async getCourseToEdit(courseId: number): Promise<IEditCourse> {
    const token = localStorage.getItem('token')

    const response = await axios.get(`${BASE_URL}/course/to-edit/${courseId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    return response.data.data
  }

  static async getCoursePublic(courseId: number): Promise<ICoursePublic> {
    const response = await axios.get(`${BASE_URL}/course/public/${courseId}`)
    return response.data.data
  }

  static async saveDraft(courseId: number, course: IEditCourse) {
    const token = localStorage.getItem('token')

    await axios.put(`${BASE_URL}/course/save-draft/${courseId}`, course , {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  }
}