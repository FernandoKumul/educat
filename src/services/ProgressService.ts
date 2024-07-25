import axios from "axios";

const BASE_URL = 'https://localhost:7245/api'

export default class ProgressService {
  static async addProgress(lessonId: number) {
    const token = localStorage.getItem('token')

    await axios.post(`${BASE_URL}/lesson-progress/${lessonId}`, null, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

  }
}