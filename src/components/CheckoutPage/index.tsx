import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import { Localenv } from "../../Environments/local.enum";
import FoodCard, { Hotelcardprops } from "../FoodCards";
import { Container } from "react-bootstrap";
import Navheader from "../Navbar";
import { checkoutPage } from "../../constant";
import colors from "../../assets/theme/colors.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export interface fooditem {
  name: string;
  costperItem: string;
  sold: boolean;
  hotelname:string
}

interface foodResponse {
  id: string;
  food: {
    Breakfast: fooditem[];
    Lunch: fooditem[];
    Dinner: fooditem[];
  };
  hotelname: string;
}

function CheckoutPage() {
  const [Timemode, setTimemode] = React.useState("");
  const gettime = new Date().getHours();
  React.useEffect(() => {
    if (gettime >= 0 && gettime <= 10) {
      setTimemode("Breakfast");
    } else if (gettime >= 11 && gettime <= 17) {
      setTimemode("Lunch");
    } else if (gettime >= 18 && gettime <= 24) {
      setTimemode("Dinner");
    }
  }, [gettime]);

  const addToCart = (item: Hotelcardprops) => {
    const storedCartItems = localStorage.getItem("cartItems");
    let cartItems:Hotelcardprops[]= [];
    if (storedCartItems) {
      cartItems=JSON.parse(storedCartItems);
    }
    const existingItem = cartItems.find((cartItems:fooditem)=>{
      if(cartItems.hotelname===item.hotelname){ return cartItems.name===item.name?true:false}});

    if (existingItem) {
      existingItem.quantity = item.quantity;
      existingItem.totalcost = item.totalcost;
    } else {
      cartItems.push(item);
    }
    
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };

  const { hotelname } = useParams();
  const [foods, showfoods] = React.useState<foodResponse>({} as foodResponse);
  React.useEffect(() => {
    const fetchdata = async (): Promise<foodResponse[]> => {
      const data = await axios.get(
        `/${Localenv.Food}?hotelname=${hotelname?.split("/").join("")}`
      );
      showfoods(data.data[0]);
      return data.data;
    };
    fetchdata();
  }, [hotelname]);

  const foodEntries = foods.food ? Object.entries(foods.food) : [];

  return (
    <Container>
      <Navheader />
      <div>
        <h3
          className="gilroy mt-5"
          onClick={() => {
            history.back();
          }}
        >
          <FontAwesomeIcon icon={faArrowLeft} /> {checkoutPage.back}
        </h3>
<h1 className="gilroy mt-5">{hotelname?.split("/")}</h1>

<div className="flex-row-center" id="Food-content">
  <h1
    className="gilroy"
    id="content-tittle"
    style={{ color: colors.SS2 }}
  >
    {checkoutPage.orderYourFavouritefood} {Timemode}
  </h1>
</div>
<div className="row">
  {foodEntries
    .filter(([key]) => key === Timemode)
    .map(([key, value]) =>
      value.map((item) => (
        <div className="col-md-4 col-12 mt-3" key={item.name + key}>
          <FoodCard
            name={item.name}
            costperItem={item.costperItem}
            quantity={0}
            totalcost={0}
            sold={!item.sold}
            addToCart={addToCart}
            hotelname={foods.hotelname}
          />
        </div>
      ))
    )}
</div>
</div>
    </Container>
  );
}

export default CheckoutPage;
