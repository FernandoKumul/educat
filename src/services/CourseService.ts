import axios from "axios"
import { IEditCourse } from "../interfaces/IEditCourse"

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

  static async saveDraft(courseId: number, course: IEditCourse) {
    const token = localStorage.getItem('token')

    await axios.put(`${BASE_URL}/course/save-draft/${courseId}`, course , {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  }
}