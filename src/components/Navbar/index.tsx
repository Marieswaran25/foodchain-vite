import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Navbar, Container, Card } from "react-bootstrap";
import logo from "../../assets/images/Logo.jpg";
import User from "../user";
import { UserDetails } from "../../constant";
import React from "react";
import colors from '../../assets/theme/colors.module.scss'

function Navheader() {
  const [opencard, showopencard] = React.useState(false as boolean);
  const props = {
    openuserInfo: (): JSX.Element => {
      return (
        <Card id="charcard">
          <Card.Body className="flex-column">
<div className="padding20 charcard" style={{backgroundColor:colors.B1}}>
<Card.Text className=" padding10 border-bottom">{UserDetails.MyAccount}</Card.Text>
            <Card.Text  className=" padding10 border-bottom" >{UserDetails.Myorders}</Card.Text>
            <Card.Text className=" padding10 border-bottom">{UserDetails.MyCart}</Card.Text>
            <Card.Link className="padding10" href="/login">{UserDetails.Signout}</Card.Link>
</div>
          </Card.Body>
        </Card>
      );
    },
  };
  return (
<Container>
<div className="">
<Navbar collapseOnSelect expand="lg" bg="transparent" variant="">
      <Container className="">
        <div className="flex-row-space2 full-width">
          <Navbar.Brand href="#home" className="flex-row-center gap20">
            <img src={logo} alt="Logo" className="logo" />
            <h4 className="text-dark">Food Chain</h4>
          </Navbar.Brand>
          <div className="flex-row-center gap20">
            <h2 className="text-center">
              <FontAwesomeIcon
                icon={faCartShopping}
                className="justify-content-end cart"
              ></FontAwesomeIcon>
            </h2>
            <User onclick={() => !opencard? showopencard(true):showopencard(false)} />
          </div>
        </div>

      </Container>
    </Navbar>
            <div>
            {
      opencard?props.openuserInfo():<></>
            }
           </div>
</div>
</Container>
  );
}

export default Navheader;