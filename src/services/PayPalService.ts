import axios from "axios"

const BASE_URL = 'https://localhost:7245/api'

export default class PayPalservice {
  static async createOrder(): Promise<number> {
    const token = localStorage.getItem("token")

    const response = await axios.post(`${BASE_URL}/payment/order`, null, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    const orderData = response.data

    return orderData.id

    if (orderData.id) {
      return orderData.id;
    }

    const errorDetail = orderData?.details?.[0];
    const errorMessage = errorDetail
      ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
      : JSON.stringify(orderData);

    throw new Error(errorMessage);
  }
}