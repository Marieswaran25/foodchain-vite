import React from "react";
import { Button, Container } from "react-bootstrap";
import Navheader from "../Navbar";
import CartElement from "../CartElement";
import { Hotelcardprops } from "../FoodCards";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { cart, checkoutPage } from "../../constant";
import Address from "../Address";
import colors from "../../assets/theme/colors.module.scss";
import PaymentInfo from "../PaymentInfo";
import { fooditem } from "../CheckoutPage";

function Cart() {
    const [cartitems, setcartItems] = React.useState<Hotelcardprops[]>([]);
    const [newcartitems, setnewcartitems] = React.useState<Hotelcardprops[]>([] as Hotelcardprops[]);
    const [paymentinfo, setpaymentinfo] = React.useState(false);
    const [totalcost, setTotalcost] = React.useState(0);
    const [totalitems, setTotalItems] = React.useState(0);
    const [summay, showsummary] = React.useState(false);

    React.useEffect(() => {
        const items = localStorage.getItem("cartItems");
        if (items) {
            const data = JSON.parse(items);
            setcartItems(data);
        }
    }, [paymentinfo]);

    React.useEffect(() => {
        setnewcartitems(cartitems);
    }, [cartitems, newcartitems]);

    React.useEffect(() => {
        if (cartitems.length === 0) {
            setpaymentinfo(false);
        } else {
            setpaymentinfo(true);
            let amount = 0;
            let itemsCount = 0;
            cartitems.forEach((item) => {
                amount += Number(item.costperItem) * item.quantity;
                itemsCount += item.quantity;
            });
            console.log(amount);
            setTotalcost(amount);
            setTotalItems(itemsCount);
        }
    }, [cartitems]);
    React.useEffect(() => {
        const items = localStorage.getItem("Address");
        if (items) {
            showsummary(true);
        }
    });

    const handleDeleteItem = (itemName: string) => {
        const updatedCartItems = cartitems.filter((item: fooditem) => item.name !== itemName);
        setcartItems(updatedCartItems);
        localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    };
    function HandleqtyChangeAdd(itemname: string, quantity: number) {
        let newquantity = quantity + 1;
        let updatedCartItems: Hotelcardprops[] = cartitems.filter((item: fooditem, index: number) => {
            if (item.name === itemname) {
                cartitems[index].quantity = newquantity;
                cartitems[index].totalcost = newquantity * Number(cartitems[index].costperItem);
            }
        });
        setcartItems(updatedCartItems);
        localStorage.setItem("cartItems", JSON.stringify(cartitems));
    }
    function HandleqtyChangeMinus(itemname: string, quantity: number) {
        let newquantity = quantity - 1;
        if(newquantity>=1){
            let updatedCartItems: Hotelcardprops[] = cartitems.filter((item: fooditem, index: number) => {
                if (item.name === itemname) {
                    cartitems[index].quantity = newquantity;
                    cartitems[index].totalcost = newquantity * Number(cartitems[index].costperItem);
                }
            });
            setcartItems(updatedCartItems);
            localStorage.setItem("cartItems", JSON.stringify(cartitems));
        }
    }
    return (
        <div style={{ backgroundColor: colors.B1, height: "100vh" }}>
            <Container>
                <Navheader />
                <div className="main-content">
                    <h3
                        className="gilroy mt-5"
                        onClick={() => {
                            history.back();
                        }}
                    >
                        <FontAwesomeIcon icon={faArrowLeft} /> {checkoutPage.back}
                    </h3>
                    <div className="row">
                        <div className="col-md-6 col-12">
                            {cartitems.length === 0 ? (
                                <h2 className="gilroy mt-5">{cart.emptycart}</h2>
                            ) : (
                                cartitems?.map((cartitem) => {
                                    return <CartElement name={cartitem.name} costperItem={cartitem.costperItem} quantity={cartitem.quantity} totalcost={Number(cartitem.costperItem) * cartitem.quantity} sold={false} key={cartitem.name} ondelete={() => handleDeleteItem(cartitem.name)} handlequantityAddition={() => HandleqtyChangeAdd(cartitem.name, cartitem.quantity)} handlequantityDeletion={() => HandleqtyChangeMinus(cartitem.name, cartitem.quantity)} />;
                                })
                            )}
                            <Button className="gilroy padding15 mt-5" disabled={cartitems.length === 0} onClick={() => setpaymentinfo(true)}>
                                {checkoutPage.makePayment}
                            </Button>
                        </div>
                        <div className="col-md-6 col-12">
                            {paymentinfo && (
                                <div className="">
                                    <Address />
                                    {summay ? <PaymentInfo key={totalcost} totalcost={totalcost} totalitems={totalitems} /> : <></>}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}

export default Cart;
