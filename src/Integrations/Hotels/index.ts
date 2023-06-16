import axios from "axios";
// import { Localenv } from "../../Environments/local.enum";
interface HotelResponse {
  hotelname: string;
  mobile: string;
  address: string;
  ratings: number;
}
export async function getAllhotels(): Promise<HotelResponse[]|boolean > {
  try {
    const response = await axios.get("api/hotels");
    return await response.data;
  } catch (error) {
    return false
  }
}