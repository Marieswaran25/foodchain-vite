import React from "react";
import { orderconfirmation } from "../../constant";
import { Container } from "react-bootstrap";
import colors from "../../assets/theme/colors.module.scss";

function OrderConfirmation() {
    const [orderno, setorderno] = React.useState("");
    React.useEffect(() => {
        const ordernum = localStorage.getItem("orderno");
        if (ordernum) {
            setorderno(ordernum);
        }
    });
    return (
        <Container fluid style={{ backgroundColor: colors.B1, height: "100vh" }} className=" flex-column-center">
            <Container>
                <div style={{}} className="text-center">
                    <p className="gilroy text-info">{orderconfirmation.confirmed}</p>
                    <p className="gilroy">
                        {orderconfirmation.orderno} <span className="text-danger">{orderno}</span>
                    </p>
                    <p>{orderconfirmation.email}</p>
                </div>
                <div style={{ marginTop: "5%" }}>
                    <h1 style={{ color: colors.SS2 }} id="content-tittle" className="gilroy text-center">
                        {orderconfirmation.thanks}
                    </h1>
                    <h1 style={{ color: colors.SS2 }} id="content-tittle" className="gilroy text-center">
                        {orderconfirmation.visitAgain}
                    </h1>
                </div>
            </Container>
        </Container>
    );
}

export default OrderConfirmation;
