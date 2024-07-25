import axios from "axios";
import { IResponseUploadVideo } from "../interfaces/IResponseUploadVideo";

const BASE_URL =  import.meta.env.VITE_URL_API ?? 'https://localhost:7245/api'
export default class FileService {

  static async submitImage(Image: FormData):Promise<string> {
      const response = await axios.post(`${BASE_URL}/file/image`, Image, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data.data.url
  }

  static async submitVideo(video: FormData):Promise<IResponseUploadVideo> {
      const response = await axios.post(`${BASE_URL}/file/video`, video, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data.data
  }
}