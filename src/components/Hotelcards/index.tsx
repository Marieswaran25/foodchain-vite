import { Button, Card } from "react-bootstrap";
import image from "../../assets/images/3.png";
import Ratings from "../Ratings";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faLocationDot, faPhone, faUtensils } from "@fortawesome/free-solid-svg-icons";
import colors from "../../assets/theme/colors.module.scss";
import { LandingPageInfo } from "../../constant";
import { useNavigate } from "react-router-dom";

export interface HotelResponse {
    hotelname: string;
    mobile: string;
    address: string;
    ratings: number;
    type: string;
}

function HotelCard(props: HotelResponse) {
    const navigate = useNavigate();
    return (
        <Card>
            <Card.Header className="flex-row-center">
                <Card.Img className="hotelimg" src={image}></Card.Img>
            </Card.Header>
            <Card.Body className="flex-column-center gap3">
                <Card.Title className="gilroy flex-row-center gap10" style={{ fontSize: "x-large" }}>
                    <FontAwesomeIcon icon={faUtensils} style={{ color: colors.B4 }} /> {props.hotelname}
                </Card.Title>
                <Card.Text className="gilroy flex-row-center gap10">
                    <FontAwesomeIcon icon={faCircle} style={props.type == "Vegeterian" ? { color: colors.SS5 } : { color: colors.ES8 }} id={props.type} /> {props.type}
                </Card.Text>
                <Card.Text className="gilroy flex-row-center gap10 text-muted">
                    <FontAwesomeIcon icon={faLocationDot} style={{ color: colors.ES8 }}></FontAwesomeIcon> {props.address}
                </Card.Text>
                <Card.Text className="gilroy flex-row-center gap10">
                    <FontAwesomeIcon icon={faPhone} style={{ color: colors.SS9 }}></FontAwesomeIcon> {props.mobile}
                </Card.Text>
                <Ratings rating={props.ratings} />
                <Button
                    className="gilroy flex-row-center padding20"
                    style={{ backgroundColor: colors.N3, border: "none" }}
                    id="takedine"
                    onClick={() => {
                        navigate(encodeURIComponent(`/${props.hotelname}`));
                    }}
                >
                    {LandingPageInfo.VisitHotel}
                </Button>
            </Card.Body>
        </Card>
    );
}

export default HotelCard;
