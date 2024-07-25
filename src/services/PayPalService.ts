import axios from "axios"

const BASE_URL =  import.meta.env.VITE_URL_API ?? 'https://localhost:7245/api'

export default class PayPalservice {
  static async createOrder(): Promise<string> {
    const token = localStorage.getItem("token")

    const response = await axios.post(`${BASE_URL}/payment/order`, null, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    const orderData = response.data.data

    return orderData.id
  }

  static async captureOrder(ordenId: string): Promise<any> {
    const token = localStorage.getItem("token")

    const response = await axios.post(`${BASE_URL}/payment/order/${ordenId}/capture`, null, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    const orderData = response.data.data

    return orderData
  }
}