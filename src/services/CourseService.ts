import axios from "axios"
import { IEditCourse } from "../interfaces/IEditCourse"
import { ICoursePublic } from "../interfaces/ICoursePublic"
import { ICourseInstructor } from "../interfaces/ICourseInstructor"
import { ICourseSearch } from "../interfaces/ICourseSearch"

const BASE_URL =  import.meta.env.VITE_URL_API ?? 'https://localhost:7245/api'

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

  static async getCourseByUser(): Promise<ICourseInstructor[]> {
    const token = localStorage.getItem('token')

    const response = await axios.get(`${BASE_URL}/course/instructor`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    return response.data.data
  }

  static async getCoursePublic(courseId: number): Promise<ICoursePublic> {
    const token = localStorage.getItem('token')

    const response = await axios.get(`${BASE_URL}/course/public/${courseId}`, {
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

  static async create(title: string) {
    const token = localStorage.getItem('token')

    await axios.post(`${BASE_URL}/course`, {title} , {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  }
  
  static async getLesson(lessonId: number) {
    const token = localStorage.getItem('token')

    const response = await axios.get(`${BASE_URL}/course/lesson/${lessonId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    return response.data.data
  }

  static async delete(courseId: number) {
    const token = localStorage.getItem('token')

    await axios.delete(`${BASE_URL}/course/${courseId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  }

  static async publish(courseId: number) {
    const token = localStorage.getItem('token')

    await axios.put(`${BASE_URL}/course/publish/${courseId}`, null, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  }

  static async getCoursePopular(limit: number): Promise<ICourseSearch[]> {

    const response = await axios.get(`${BASE_URL}/course/popular?limit=${limit}`)

    return response.data.data
  }
  
  static async getInProcessCourses(): Promise<ICourseSearch[]> {
    const token = localStorage.getItem('token')

    const response = await axios.get(`${BASE_URL}/course/in-process`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    return response.data.data
  }
  static async getDoneCourses(): Promise<ICourseSearch[]> {
    const token = localStorage.getItem('token')

    const response = await axios.get(`${BASE_URL}/course/done`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    return response.data.data
  }
}