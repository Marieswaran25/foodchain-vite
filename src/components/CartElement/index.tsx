import { Card } from "react-bootstrap";
import images from "../../assets/images/1.png";
import {
  faPlus,
  faMinus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import colors from "../../assets/theme/colors.module.scss";
import { Hotelcardprops } from "../FoodCards";
import { fooditem } from "../CheckoutPage";

export interface cartprops {
  name: string;
  costperItem: string;
  quantity: number;
  totalcost: number;
  sold: boolean;
}
function CartElement(props: cartprops) {
  const [quantity, setquantity] = React.useState(props.quantity);
  function DeleteItemfromCart(){
    const storedCartItems = localStorage.getItem("cartItems");
    let cartItems:Hotelcardprops[]= [];
    if (storedCartItems) {
      cartItems=JSON.parse(storedCartItems);
    }
     const existitems=cartItems.find((cartitems:fooditem,index:number)=>{
      return cartitems.name===props.name?cartItems.splice(index,1):false});

      if(existitems){
        localStorage.setItem('cartItems',JSON.stringify(cartItems))
      }

  }
  return (
    <Card
      style={{ border: "1px solid #d9d9d9", minWidth: "60%" }}
      className="mt-5"
    >
      <div className="row cartsection">
        <div className="col-md-3 col-12 flex-row-center">
          <Card.Img
            src={images}
            style={{ height: "100px", width: "100px" }}
          ></Card.Img>
        </div>
        <div className="col-md-9 col-12 flex-column-space ">
            <FontAwesomeIcon icon={faTrash} onClick={DeleteItemfromCart} style={{marginLeft:"80%"}} className="deletecartitem"/>
          <Card.Text className="gilroy mt-1" style={{"fontSize":"x-large"}}>{props.name.replace(props.name.charAt(0),props.name.charAt(0).toUpperCase())}</Card.Text>
          <Card.Text className='gilroy text-warning' style={{fontSize:'x-large'}}> &#8377; { `${props.costperItem}`}</Card.Text>

          <div className="flex-row-center gap20" style={{marginLeft:'70%'}}>
            <FontAwesomeIcon
              icon={faPlus}
              onClick={() => {
                setquantity((count) => (count = count + 1));
              }}
              style={{
                border: "1px solid #0397d6",
                fontWeight: "bold",
                padding: "2px",
                borderRadius: "50%",
                fontSize: "small",
                color: colors.C6,
              }}
            />
            <center>
              <h3
                className="gilroy text-dark text-center mt-2"
                style={{ fontSize: "20px" }}
              >
                {quantity}
              </h3>
            </center>
            <FontAwesomeIcon
              icon={faMinus}
              onClick={() => {
                setquantity((count) =>
                  count > 1 ? (count = count - 1) : (count = 1)
                );
              }}
              style={{
                border: "1px solid #0397d6",
                fontWeight: "bold",
                padding: "2px",
                borderRadius: "50%",
                fontSize: "small",
                color: colors.C6,
              }}
            />
          </div>
        </div>
      </div>
    </Card>
  );
}

export default CartElement;
