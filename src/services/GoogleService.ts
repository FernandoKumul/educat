import axios from "axios"

export default class GoogleService {
    static async TokenByGoogle(token: string) {
        await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${token}`, {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json'
            }
        })
    }
}