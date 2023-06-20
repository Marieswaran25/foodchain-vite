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

interface fooditem {
  name: string;
  costperItem: string;
  sold: boolean;
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
  const [cartItems, setCartItems] = React.useState<Hotelcardprops[]>([]);
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
    if (
      cartItems.map((val: Hotelcardprops, index: number) => {
        if (val.name === item.name) {
          cartItems.splice(index, 1);
        }
      })
    )
      setCartItems((prevCartItems) => [...prevCartItems, item]);
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
  React.useEffect(() => {
    localStorage.setItem("cartitems", JSON.stringify(cartItems));
  }, [cartItems]);

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
        <h1>{}</h1>
        <div className="row">
          {foodEntries
            .filter(([key]) => key === Timemode)
            .map(([key, value]) =>
              value.map((item) => (
                <div className="col-md-4 col-12" key={item.name + key}>
                  <FoodCard
                    name={item.name}
                    costperItem={item.costperItem}
                    quantity={0}
                    totalcost={0}
                    sold={!item.sold}
                    addToCart={addToCart}
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
