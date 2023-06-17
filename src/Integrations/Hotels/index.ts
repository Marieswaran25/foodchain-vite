import axios, { AxiosResponse } from "axios";
import { Localenv } from "../../Environments/local.enum";
interface HotelResponse {
  hotelname: string;
  mobile: string;
  address: string;
  ratings: number;
}
export const HotelDetails:Promise< AxiosResponse< HotelResponse[],any>>= axios.get<HotelResponse[]>(Localenv.Hotels).then(response=>{
  return response
});
