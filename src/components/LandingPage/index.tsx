import React from "react";
import { LandingPageInfo } from "../../constant";
import Navheader from "../Navbar";
import { Container } from "react-bootstrap";
import colors from "../../assets/theme/colors.module.scss";
import HotelCard, { HotelResponse } from "../Hotelcards";
import Spinner from "../Spinner";
import axios from "axios";
// import { HotelDetails } from "../../Integrations/Hotels"
import { Localenv } from "../../Environments/local.enum";

function LandingPage() {
  const [Timemode, setTimemode] = React.useState("");
  const [hotellist, sethotellist] = React.useState<HotelResponse[]>([]);

  const gettime = new Date().getHours();
  React.useEffect(() => {
    if (gettime >= 0 && gettime <= 10) {
      setTimemode("Breakfast ?");
    } else if (gettime >= 11 && gettime <= 17) {
      setTimemode("Lunch ?");
    } else if (gettime >= 18 && gettime <= 24) {
      setTimemode("Dinner ?");
    }
  }, [gettime]);

  React.useEffect(() => {
    const fetchdata = async () => {
      const HotelResponse = await axios.get<HotelResponse[]>(Localenv.Hotels);
      sethotellist(HotelResponse.data);
    };
    fetchdata();
  }, []);
  return (
    <div>
      <Navheader />
      <Container>
        <div className="flex-row-center" id="main-content">
          <h1
            className="gilroy"
            id="content-tittle"
            style={{ color: colors.SS2 }}
          >
            {LandingPageInfo.whereyourfood} {Timemode}
          </h1>
        </div>
        <div id="main-content" className="flex-row-center">
          {hotellist.length == 0 ? (
            <Spinner />
          ) : (
            <div className="row">
              {hotellist.map((val) => {
                return (
                  <div className="col-md-6 col-12 mt-4">
                    <HotelCard
                      hotelname={val.hotelname}
                      mobile={val.mobile}
                      address={val.address}
                      ratings={val.ratings}
                      type={val.type}
                    />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}

export default LandingPage;
