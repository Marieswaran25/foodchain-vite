import {Card} from 'react-bootstrap';
import images from '../../assets/images/1.png';
import {faPlus, faMinus, faTrash} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from 'react';
import colors from '../../assets/theme/colors.module.scss';
import {Hotelcardprops} from '../FoodCards';
import {fooditem} from '../CheckoutPage';

export interface cartprops {
    name: string;
    costperItem: string;
    quantity: number;
    totalcost: number;
    sold: boolean;
    ondelete: () => void;
}
function CartElement(props: cartprops) {
    const [quantity, setquantity] = React.useState(props.quantity);

    function changequantityonCart(quantity: number) {
        const storedCartItems = localStorage.getItem('cartItems');
        let cartItems: Hotelcardprops[] = [];
        if (storedCartItems) {
            cartItems = JSON.parse(storedCartItems);
        }
        const existitems = cartItems.find((cartitems: fooditem,index:number) => {
            return cartitems.name === props.name ? cartItems.splice(index,index) : false;
        });

        if (existitems) {
            existitems.quantity = quantity, existitems.totalcost = quantity * Number(props.costperItem);

        }
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
    return (
        <Card style={{border: '1px solid #d9d9d9',borderRadius:'10px'}} className='mt-5'>
            <div className='cartsection flex-row-space'>
                <div className='flex-row-space' style={{width: '60%'}}>
                    <Card.Img src={images} style={{height: '100px', width: '100px'}} className='img-fluid' />
                    <div className='flex-column-space' style={{width: '40%'}}>
                        <Card.Text className='gilroy mt-1' style={{fontSize: 'x-large'}}>
                            {props.name.replace(props.name.charAt(0), props.name.charAt(0).toUpperCase())}
                        </Card.Text>
                        <Card.Text className='gilroy text-warning' style={{fontSize: 'x-large'}}>
                            &#8377; {`${Number(props.costperItem) * quantity}`}
                        </Card.Text>
                    </div>
                </div>
                <div className='flex-column-space gap20'>
                    <FontAwesomeIcon icon={faTrash} onClick={props.ondelete} className='deletecartitem mx-5 mb-3' />
                    <div className='flex-row-center gap20'>
                        <FontAwesomeIcon
                            icon={faPlus}
                            onClick={() => {
                                const newQuantity = quantity + 1;
                                newQuantity >= 1 ? setquantity(newQuantity) : setquantity(1);
                                newQuantity >= 1 ? changequantityonCart(newQuantity) : changequantityonCart(1);
                            }}
                            style={{border: '1px solid #0397d6', fontWeight: 'bold', padding: '2px', borderRadius: '50%', fontSize: 'small', color: colors.C6}}
                        />
                        <center>
                            <h3 className='gilroy text-dark text-center mt-2' style={{fontSize: '20px'}}>
                                {quantity}
                            </h3>
                        </center>
                        <FontAwesomeIcon
                            icon={faMinus}
                            onClick={() => {
                                const newQuantity = quantity - 1;
                                newQuantity >= 1 ? setquantity(newQuantity) : setquantity(1);
                                newQuantity >= 1 ? changequantityonCart(newQuantity) : changequantityonCart(1);
                            }}
                            style={{border: '1px solid #0397d6', fontWeight: 'bold', padding: '2px', borderRadius: '50%', fontSize: 'small', color: colors.C6}}
                        />
                    </div>
                </div>
            </div>
        </Card>
    );
}

export default CartElement;
