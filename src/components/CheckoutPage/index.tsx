import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom"
import { Localenv } from "../../Environments/local.enum";
import FoodCard, { Hotelcardprops } from "../FoodCards";

interface fooditem {
    name:string,
    costperItem:string,
    sold:boolean
   }

interface foodResponse{
    id:string,
    food:{
        Morning:fooditem[],
        Lunch:fooditem[],
        Night:fooditem[],
    },
    hotelname:string
}


function CheckoutPage() {
    const [cartItems, setCartItems] = React.useState<Hotelcardprops[]>([]);

    const addToCart = (item:Hotelcardprops) => {
        if(cartItems.map((val:Hotelcardprops,index:number)=>{
            if(val.name===item.name){
                cartItems.splice(index,1);
            }
        }))
      setCartItems((prevCartItems) => [...prevCartItems, item]);
    };

    const {hotelname}=useParams();
    const [foods,showfoods]=React.useState<foodResponse>()
    React.useEffect(()=>{
        const fetchdata=async():Promise<foodResponse[]>=>{
            const data=await axios.get(`/${Localenv.Food}?hotelname=${hotelname?.split('/').join('')}`);
            showfoods(data.data[0])
            return data.data;
        }
        fetchdata()
    },[hotelname])
  return (
    <div>
        <h1>{hotelname?.split('/')}</h1>
        <h1>{foods?.food.Lunch[0].name}</h1>
        <FoodCard name={'dosa'} costperItem={"20"} sold={true} quantity={0} totalcost={0} addToCart={addToCart}/>
        <FoodCard name={'idly'} costperItem={"10"} sold={true} quantity={0} totalcost={0}  addToCart={addToCart}/>
        <button onClick={()=>(console.log(cartItems))}></button>


    </div>
  )
}

export default CheckoutPage