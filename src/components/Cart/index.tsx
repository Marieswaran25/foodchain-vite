import React from "react";
import { Container } from "react-bootstrap";
import Navheader from "../Navbar";
import CartElement from "../CartElement";
import { Hotelcardprops } from "../FoodCards";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { cart, checkoutPage } from "../../constant";

function Cart() {
  const [cartitems, setcartItems] = React.useState<Hotelcardprops[]>([]);
  const [newcartitems, setnewcartitems] = React.useState<Hotelcardprops[]>([] as Hotelcardprops[]);
  React.useEffect(() => {
    const items = localStorage.getItem("cartItems");
    if (items) {
      const data = JSON.parse(items);
      setcartItems(data);
    }
  }, []);
  React.useEffect(() => {
    setnewcartitems(cartitems);
  }, [cartitems, newcartitems]);
  const handleDeleteItem = (itemName: string) => {
    const updatedCartItems = cartitems.filter((item) => item.name !== itemName);
    setcartItems(updatedCartItems);
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  };

  return (
    <Container>
      <Navheader />
      <div className="main-content">
        <div className="row">
          <div className="col-md-7 col-12">
            <h3 className="gilroy mt-5" onClick={() => {history.back()}}><FontAwesomeIcon icon={faArrowLeft} /> {checkoutPage.back}</h3>
            {cartitems.length === 0 ? (
              <h2 className="gilroy mt-5">{cart.emptycart}</h2>
            ) : (
              cartitems?.map((cartitems) => {
                return <CartElement name={cartitems.name} costperItem={cartitems.costperItem} quantity={cartitems.quantity} totalcost={Number(cartitems.costperItem) * cartitems.quantity} sold={false} key={cartitems.name} ondelete={() => handleDeleteItem(cartitems.name)} />;
              })
            )}
          </div>
          <div className="col-md-5 col-12"></div>
        </div>
      </div>
    </Container>
  );
}

export default Cart;
