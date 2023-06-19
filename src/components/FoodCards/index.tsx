
import { Button, Card } from 'react-bootstrap'
import React from 'react';
import img from '../../assets/images/2.png'
import { faCircle, faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export type Hotelcardprops = {
    name:string,
    costperItem:string,
    quantity:number,
    totalcost:number,
    sold:boolean,
    addToCart:(item:Hotelcardprops)=>void
}
export type addtoCart={
addToCart:(item:Hotelcardprops)=>void
}

function FoodCard(props: Hotelcardprops) {
    const [quantity,setquantity]=React.useState(1);
    function hadleaddtocart(){
        const item = {
            name: props.name,
            costperItem: props.costperItem,
            quantity: quantity,
            totalcost: Number(props.costperItem) * quantity,
            sold: props.sold,
            addToCart:props.addToCart
          };
          props.addToCart(item)
    }

  return (
  <div className="bg-img">
      <Card style={{border:'1px solid gray'}} className='card-overlay'>
      <Card.Text className={`gilroy ${props.sold?'text-success':'text-danger'} mt-4`} style={{"position":"absolute",marginLeft:'70%'}}>  <FontAwesomeIcon
            icon={faCircle}
            style={{fontSize:'x-small' }}
          /> {props.sold?'Available':'Sold'}</Card.Text>

        <Card.Body className='flex-column-center gap3'>
            <Card.Img src={img} className="hotelimg"></Card.Img>
            <Card.Text className='gilroy text-light' style={{fontSize:'x-large'}}>{props.name.replace(props.name.charAt(0),props.name.charAt(0).toUpperCase())}</Card.Text>
            <Card.Text className='gilroy text-warning' style={{fontSize:'x-large'}}> &#8377; { `${props.costperItem}`}</Card.Text>
            <div className="flex-row-center gap20">
                <Button  variant='secondary'onClick={()=>{setquantity(count=>count=count+1)}} disabled={!props.sold}><FontAwesomeIcon icon={faPlus} /></Button>
                <h3 className='gilroy text-light'>{quantity}</h3>
                <Button variant='secondary' onClick={()=>{setquantity(count=>count>1?count=count-1:count=1)}} disabled={!props.sold}><FontAwesomeIcon icon={faMinus} /></Button>
            </div>
            {/* <Card.Text className='gilroy text-warning mt-4 border padding10' style={{fontSize:'x-large'}}> &#8377; {Number(props.costperItem)*quantity}</Card.Text> */}
            <Button variant='warning' className='padding15 gilroy mt-5' disabled={!props.sold} id={props.name} 
            onClick={hadleaddtocart}>Add to Cart</Button>
        </Card.Body>
    </Card>
  </div>
  )
}

export default FoodCard