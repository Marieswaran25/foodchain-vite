import React from "react"
import { LandingPageInfo } from "../../constant"
import Navheader from "../Navbar"
import { Container } from "react-bootstrap"
import colors from '../../assets/theme/colors.module.scss'
import HotelCard from "../Hotelcards"
import { getAllhotels } from "../../Integrations/Hotels"



function LandingPage() {
  const [Timemode,setTimemode]=React.useState('');
  const gettime=new Date().getHours();
  console.log(getAllhotels())
  React.useEffect(()=>{
    if(gettime>=0&&gettime<=10){
      setTimemode('Breakfast ?')
    }
    else if(gettime>=11&&gettime<=17){
      setTimemode('Lunch ?')
    }
    else if(gettime>=18&&gettime<=24){
      setTimemode('Dinner ?')
    }
  },[gettime])
  return (
    <div>
          <Navheader />
          <Container>
          <div className="flex-row-center" id="main-content">
          <h1 className="gilroy" id="content-tittle" style={{color:colors.SS2}}>{LandingPageInfo.whereyourfood} {Timemode}</h1>
          </div>
          <div id="main-content">
          <HotelCard hotelname={"Amutham"} phoneno={"6383961454"} address={"2/5-2 East car street,vilathikulam"} rating={4} />
          </div>
          </Container>

    </div>
  )
}

export default LandingPage