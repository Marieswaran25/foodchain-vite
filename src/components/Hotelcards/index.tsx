import { Card } from 'react-bootstrap'
import image from '../../assets/images/3.png'
import Ratings from '../Ratings';

interface Hotelcard{
    hotelname:string,
    phoneno:string,
    address:string,
    rating:number
}
function HotelCard(props:Hotelcard) {
  return (
    <Card>
        <Card.Header>
            <Card.Img  className="hotelimg"src={image}></Card.Img>
        </Card.Header>
        <Card.Body>
            <Card.Title className='gilroy'>{props.hotelname}</Card.Title>
            <Card.Text className='gilroy'>{props.address}</Card.Text>
            <Card.Text className='gilroy'>{props.phoneno}</Card.Text>
            <Ratings rating={3}/>

        </Card.Body>
    </Card>
  )
}

export default HotelCard;